
import React, { memo } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopBar from '@/components/admin/AdminTopBar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import SessionManager from '@/components/SessionManager';

const AdminLayout: React.FC = memo(() => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();

  console.log('AdminLayout - User:', user?.email, 'Role:', userRole, 'Loading:', loading);

  // Redirect if not admin - but only after loading is complete
  React.useEffect(() => {
    if (!loading && (!user || (userRole !== 'super_admin' && userRole !== 'admin'))) {
      console.log('AdminLayout - Redirecting to login. User exists:', !!user, 'Role:', userRole);
      navigate('/login');
    }
  }, [user, userRole, navigate, loading]);

  // Don't render anything if no user or wrong role
  if (!user || (userRole !== 'super_admin' && userRole !== 'admin')) {
    return null;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen bg-background flex w-full">
        <AdminSidebar />
        
        <SidebarInset className="flex-1 flex flex-col min-w-0">
          <AdminTopBar />
          
          <main className="flex-1 overflow-auto p-6">
            <React.Suspense fallback={
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="loader w-5 h-5" />
              </div>
            }>
              <Outlet />
            </React.Suspense>
          </main>
        </SidebarInset>
      </div>
      
      {/* Add Session Manager for proper session handling */}
      <SessionManager />
    </SidebarProvider>
  );
});

AdminLayout.displayName = 'AdminLayout';

export default AdminLayout;
