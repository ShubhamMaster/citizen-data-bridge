
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Shield } from "lucide-react";

interface SystemStatusProps {
  timeLeft: number;
  formatTime: (seconds: number) => string;
  extendSession: () => void;
  userRole: string | null;
}

const SystemStatus: React.FC<SystemStatusProps> = ({
  timeLeft,
  formatTime,
  extendSession,
  userRole
}) => {
  return (
    <Card className="card-modern">
      <CardHeader>
        <CardTitle>System Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Database Status</span>
          <Badge variant="default" className="bg-green-100 text-green-800">Connected</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">API Status</span>
          <Badge variant="default" className="bg-green-100 text-green-800">Operational</Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Session Time</span>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium">{formatTime(timeLeft)}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">User Role</span>
          <Badge className="bg-purple-100 text-purple-800">
            <Shield className="w-3 h-3 mr-1" />
            {userRole}
          </Badge>
        </div>
        <Button 
          onClick={extendSession} 
          variant="outline" 
          className="w-full text-orange-600 border-orange-200 hover:bg-orange-50"
        >
          <Clock className="w-4 h-4 mr-2" />
          Extend Session
        </Button>
      </CardContent>
    </Card>
  );
};

export default SystemStatus;
