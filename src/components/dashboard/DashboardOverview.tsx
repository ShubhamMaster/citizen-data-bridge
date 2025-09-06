
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Building2, 
  FileText, 
  HeadphonesIcon, 
  Calendar,
  Database
} from 'lucide-react';
import Loading from '@/components/Loading';

interface TableInfo {
  name: string;
  columns: string[];
  data: any[];
  totalCount: number;
}

interface DashboardOverviewProps {
  tables: TableInfo[];
  loading: boolean;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ tables, loading }) => {
  if (loading) {
    return <Loading size="md" className="min-h-[200px]" />;
  }

  // Group tables by category for overview
  const categories = {
    users: {
      title: "User Management",
      description: "User accounts, profiles, and authentication",
      icon: Users,
      tables: ['profiles', 'admin_logs', 'otp_verifications']
    },
    company: {
      title: "Company Data",
      description: "Company information and business data",
      icon: Building2,
      tables: ['civora_nexus_companies', 'civora_nexus_company_contacts', 'civora_nexus_company_addresses']
    },
    forms: {
      title: "Form Submissions",
      description: "Various form submissions and inquiries",
      icon: FileText,
      tables: ['contact_submissions', 'collaboration_requests']
    },
    support: {
      title: "Support & Communications",
      description: "Customer support and communications",
      icon: HeadphonesIcon,
      tables: ['support_tickets', 'scheduled_calls', 'email_history']
    },
    events: {
      title: "Events & Applications",
      description: "Events and recruitment applications",
      icon: Calendar,
      tables: ['upcoming_events', 'event_registrations', 'applications']
    },
    system: {
      title: "System Management",
      description: "System administration and maintenance",
      icon: Database,
      tables: ['recycle_bin']
    }
  };

  const getCategoryTotal = (categoryTables: string[]) => {
    return categoryTables.reduce((sum, tableName) => {
      const table = tables.find(t => t.name === tableName);
      return sum + (table?.totalCount || 0);
    }, 0);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(categories).map(([key, category]) => {
        const totalRecords = getCategoryTotal(category.tables);
        const Icon = category.icon;
        
        return (
          <Card key={key} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" />
                {category.title}
              </CardTitle>
              <CardDescription className="text-xs">{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRecords.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {category.tables.length} tables
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardOverview;
