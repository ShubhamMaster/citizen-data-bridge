
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap,
  DollarSign,
  Headphones,
  Shield,
  Trash2
} from "lucide-react";

interface QuickActionsProps {
  stats: any;
}

const QuickActions: React.FC<QuickActionsProps> = ({ stats }) => {
  const navigate = useNavigate();

  return (
    <Card className="card-modern">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={() => navigate('/admin/interns')} 
          className="w-full justify-start" 
          variant="outline"
        >
          <GraduationCap className="h-4 w-4 mr-2" />
          Manage Interns
          {stats?.interns.pending > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {stats.interns.pending}
            </Badge>
          )}
        </Button>
        
        <Button 
          onClick={() => navigate('/admin/salary')} 
          className="w-full justify-start" 
          variant="outline"
        >
          <DollarSign className="h-4 w-4 mr-2" />
          Review Salary Inquiries
          {stats?.salaryInquiries.pending > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {stats.salaryInquiries.pending}
            </Badge>
          )}
        </Button>
        
        <Button 
          onClick={() => navigate('/admin/support')} 
          className="w-full justify-start" 
          variant="outline"
        >
          <Headphones className="h-4 w-4 mr-2" />
          Handle Support Tickets
          {stats?.supportTickets.pending > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {stats.supportTickets.pending}
            </Badge>
          )}
        </Button>
        
        <Button 
          onClick={() => navigate('/admin/manage-admins')} 
          className="w-full justify-start" 
          variant="outline"
        >
          <Shield className="h-4 w-4 mr-2" />
          Manage Admins
        </Button>
        
        <Button 
          onClick={() => navigate('/admin/recycle-bin')} 
          className="w-full justify-start" 
          variant="outline"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Recycle Bin
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
