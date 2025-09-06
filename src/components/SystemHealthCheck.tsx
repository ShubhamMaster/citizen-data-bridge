
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface HealthCheckResult {
  name: string;
  status: 'success' | 'error' | 'warning';
  message: string;
  details?: string;
}

const SystemHealthCheck = () => {
  const [results, setResults] = useState<HealthCheckResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  const runHealthChecks = async () => {
    setIsRunning(true);
    const checks: HealthCheckResult[] = [];

    // Test 1: Database Connection
    try {
      const { data, error } = await supabase.from('profiles').select('count').limit(1);
      if (error) throw error;
      checks.push({
        name: 'Database Connection',
        status: 'success',
        message: 'Database is accessible'
      });
    } catch (error: any) {
      checks.push({
        name: 'Database Connection',
        status: 'error',
        message: 'Database connection failed',
        details: error.message
      });
    }

    // Test 2: API Keys Configuration
    try {
      const { data: apiKeys, error } = await supabase.from('api_keys').select('*');
      if (error) throw error;
      
      const emailKey = apiKeys?.find(key => key.key_name === 'email');
      if (emailKey && emailKey.is_active) {
        checks.push({
          name: 'Email API Configuration',
          status: 'success',
          message: 'Email API key is configured and active'
        });
      } else {
        checks.push({
          name: 'Email API Configuration',
          status: 'warning',
          message: 'Email API key not found or inactive'
        });
      }
    } catch (error: any) {
      checks.push({
        name: 'API Keys Configuration',
        status: 'error',
        message: 'Failed to check API keys',
        details: error.message
      });
    }

    // Test 3: Email Function
    try {
      const { data, error } = await supabase.functions.invoke('send-noreply-email', {
        body: {
          to: 'test@example.com',
          subject: 'Health Check Test',
          message: 'This is a health check test email',
          isDryRun: true
        }
      });
      
      if (error) throw error;
      checks.push({
        name: 'Email Function',
        status: 'success',
        message: 'Email function is working'
      });
    } catch (error: any) {
      checks.push({
        name: 'Email Function',
        status: 'error',
        message: 'Email function failed',
        details: error.message
      });
    }

    // Test 4: Form Tables
    const formTables = ['contact_submissions', 'collaboration_requests'];
    for (const table of formTables) {
      try {
        const { data, error } = await supabase.from(table as any).select('count').limit(1);
        if (error) throw error;
        checks.push({
          name: `${table} Table`,
          status: 'success',
          message: `${table} table is accessible`
        });
      } catch (error: any) {
        checks.push({
          name: `${table} Table`,
          status: 'error',
          message: `${table} table check failed`,
          details: error.message
        });
      }
    }

    setResults(checks);
    setIsRunning(false);
    
    const errorCount = checks.filter(c => c.status === 'error').length;
    const warningCount = checks.filter(c => c.status === 'warning').length;
    
    toast({
      title: "Health Check Complete",
      description: `${checks.length - errorCount - warningCount} passed, ${warningCount} warnings, ${errorCount} errors`,
      variant: errorCount > 0 ? "destructive" : "default"
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'success':
        return 'default';
      case 'error':
        return 'destructive';
      case 'warning':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          System Health Check
          <Button
            onClick={runHealthChecks}
            disabled={isRunning}
            size="sm"
            variant="outline"
          >
            {isRunning ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            {isRunning ? 'Running...' : 'Run Check'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {results.length === 0 ? (
          <Alert>
            <AlertDescription>
              Click "Run Check" to test system components and integrations.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4">
            {results.map((result, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(result.status)}
                  <div>
                    <div className="font-medium">{result.name}</div>
                    <div className="text-sm text-muted-foreground">{result.message}</div>
                    {result.details && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {result.details}
                      </div>
                    )}
                  </div>
                </div>
                <Badge variant={getStatusVariant(result.status) as any}>
                  {result.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SystemHealthCheck;
