
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  GraduationCap,
  DollarSign,
  Headphones,
  Shield,
  Trash2,
  Clock,
  AlertTriangle
} from "lucide-react";
import DashboardCards from "./DashboardCards";
import QuickActions from "./QuickActions";
import SystemStatus from "./SystemStatus";

interface DashboardOverviewProps {
  stats: any;
  showWarning: boolean;
  timeLeft: number;
  formatTime: (seconds: number) => string;
  extendSession: () => void;
  setShowWarning: (show: boolean) => void;
  userRole: string | null;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  stats,
  showWarning,
  timeLeft,
  formatTime,
  extendSession,
  setShowWarning,
  userRole
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Monitor and manage your business operations</p>
      </div>

      {/* Session Warning Alert */}
      {showWarning && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="flex items-center justify-between">
            <span className="text-orange-800">
              Your session will expire in {formatTime(timeLeft)}. 
            </span>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={extendSession}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Extend Session
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setShowWarning(false)}
              >
                Dismiss
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <DashboardCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions stats={stats} />
        <SystemStatus 
          timeLeft={timeLeft}
          formatTime={formatTime}
          extendSession={extendSession}
          userRole={userRole}
        />
      </div>
    </div>
  );
};

export default DashboardOverview;
