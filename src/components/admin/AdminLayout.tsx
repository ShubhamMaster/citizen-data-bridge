
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSessionManager } from '@/hooks/useSessionManager';
import AdminSidebar from './AdminSidebar';
import AdminTopBar from './AdminTopBar';
import { SidebarProvider } from '@/components/ui/sidebar';

const AdminLayout: React.FC = () => {
  const { user, userRole } = useAuth();
  const { sessionState } = useSessionManager();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Redirect if not admin
  useEffect(() => {
    if (!user || userRole !== 'super_admin') {
      navigate('/login');
    }
  }, [user, userRole, navigate]);

  if (!user || userRole !== 'super_admin') {
    return null;
  }

  return (
    <SidebarProvider defaultOpen={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="min-h-screen bg-background flex w-full">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col min-w-0">
          <AdminTopBar />
          
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
