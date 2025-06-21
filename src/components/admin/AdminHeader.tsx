
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Clock, LogOut, User } from 'lucide-react';

interface AdminHeaderProps {
  user: any;
  timeLeft: number;
  formatTime: (seconds: number) => string;
  extendSession: () => void;
  signOut: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  user,
  timeLeft,
  formatTime,
  extendSession,
  signOut
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/auth');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-border shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/dbdd7bff-f52d-46d3-9244-f5e7737d7c95.png" 
            alt="Civora Nexus Logo" 
            className="w-8 h-8 object-contain" 
          />
          <div>
            <span className="text-lg font-bold text-primary">Admin Dashboard</span>
            <span className="block text-xs text-secondary">Civora Nexus</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-lg">
            <Clock className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-800">
              {formatTime(timeLeft)}
            </span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/admin/profile')}
            className="flex items-center gap-2"
          >
            <User className="h-4 w-4" />
            Profile
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={extendSession}
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700 border-orange-200 hover:bg-orange-50"
          >
            <Clock className="h-4 w-4" />
            Extend
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
