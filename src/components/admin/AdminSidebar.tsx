
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Briefcase, 
  DollarSign,
  Headphones,
  BarChart3,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  User
} from 'lucide-react';

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { 
      key: 'overview', 
      label: 'Overview', 
      icon: BarChart3, 
      path: '/admin',
      description: 'Dashboard overview and stats'
    },
    { 
      key: 'interns', 
      label: 'Interns', 
      icon: GraduationCap, 
      path: '/admin/interns',
      description: 'Manage intern records and verification'
    },
    { 
      key: 'scheduled-calls', 
      label: 'Scheduled Calls', 
      icon: Calendar, 
      path: '/admin/scheduled-calls',
      description: 'Manage scheduled calls'
    },
    { 
      key: 'contact-messages', 
      label: 'Contact Messages', 
      icon: MessageSquare, 
      path: '/admin/contact-messages',
      description: 'View contact form submissions'
    },
    { 
      key: 'jobs', 
      label: 'Job Listings', 
      icon: Briefcase, 
      path: '/admin/jobs',
      description: 'Manage job postings'
    },
    { 
      key: 'salary', 
      label: 'Salary Inquiries', 
      icon: DollarSign, 
      path: '/admin/salary',
      description: 'Handle salary inquiries'
    },
    { 
      key: 'support', 
      label: 'Technical Support', 
      icon: Headphones, 
      path: '/admin/support',
      description: 'Manage support tickets'
    },
    { 
      key: 'profile', 
      label: 'Profile', 
      icon: User, 
      path: '/admin/profile',
      description: 'Admin profile settings'
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin' || location.pathname === '/admin/overview';
    }
    return location.pathname === path;
  };

  return (
    <div className={cn(
      "bg-card border-r border-border flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-primary">Admin Panel</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="p-2"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <nav className="p-2 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Button
                key={item.key}
                variant={active ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-auto p-3",
                  isCollapsed && "px-3",
                  active && "bg-primary text-primary-foreground"
                )}
                onClick={() => handleNavigation(item.path)}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className={cn("h-4 w-4", !isCollapsed && "mr-3")} />
                {!isCollapsed && (
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  </div>
                )}
              </Button>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
};

export default AdminSidebar;
