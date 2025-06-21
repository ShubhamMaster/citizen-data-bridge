
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { 
  LayoutDashboard,
  GraduationCap,
  Calendar, 
  MessageSquare, 
  Briefcase,
  DollarSign,
  Headphones,
  Trash2,
  Shield,
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activeTab: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  isCollapsed, 
  onToggle, 
  activeTab 
}) => {
  const navigate = useNavigate();
  const { data: stats } = useDashboardStats();

  const menuItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      path: '/admin',
      count: 0
    },
    {
      id: 'interns',
      label: 'Interns',
      icon: GraduationCap,
      path: '/admin/interns',
      count: stats?.interns.pending || 0
    },
    {
      id: 'scheduled-calls',
      label: 'Scheduled Calls',
      icon: Calendar,
      path: '/admin/scheduled-calls',
      count: stats?.scheduledCalls.pending || 0
    },
    {
      id: 'contact-messages',
      label: 'Contact Messages',
      icon: MessageSquare,
      path: '/admin/contact-messages',
      count: 0
    },
    {
      id: 'jobs',
      label: 'Job Management',
      icon: Briefcase,
      path: '/admin/jobs',
      count: 0
    },
    {
      id: 'salary',
      label: 'Salary Inquiries',
      icon: DollarSign,
      path: '/admin/salary',
      count: stats?.salaryInquiries.pending || 0
    },
    {
      id: 'support',
      label: 'Support Tickets',
      icon: Headphones,
      path: '/admin/support',
      count: stats?.supportTickets.pending || 0
    },
    {
      id: 'manage-admins',
      label: 'Manage Admins',
      icon: Shield,
      path: '/admin/manage-admins',
      count: 0
    },
    {
      id: 'recycle-bin',
      label: 'Recycle Bin',
      icon: Trash2,
      path: '/admin/recycle-bin',
      count: 0
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      path: '/admin/profile',
      count: 0
    }
  ];

  return (
    <div className={`bg-white border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } flex-shrink-0`}>
      <div className="p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="w-full flex items-center justify-center"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <nav className="px-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              onClick={() => navigate(item.path)}
              className={`w-full justify-start h-12 ${
                isCollapsed ? 'px-3' : 'px-4'
              } ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="ml-3 truncate">{item.label}</span>
                  {item.count > 0 && (
                    <Badge 
                      variant="secondary" 
                      className="ml-auto bg-orange-100 text-orange-800 text-xs"
                    >
                      {item.count}
                    </Badge>
                  )}
                </>
              )}
              {isCollapsed && item.count > 0 && (
                <div className="absolute left-10 top-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {item.count}
                </div>
              )}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
