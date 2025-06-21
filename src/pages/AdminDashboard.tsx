
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useSessionTimer } from "@/hooks/useSessionTimer";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import TabRenderer from "@/components/admin/TabRenderer";
import { useDashboardStats } from "@/hooks/useDashboardStats";

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userRole, signOut } = useAuth();
  const { timeLeft, showWarning, extendSession, formatTime, setShowWarning } = useSessionTimer();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { data: stats, isLoading: statsLoading } = useDashboardStats();

  // Determine active tab from URL
  const getActiveTabFromPath = () => {
    const path = location.pathname;
    if (path === '/admin' || path === '/admin/overview') return 'overview';
    if (path === '/admin/interns') return 'interns';
    if (path === '/admin/scheduled-calls') return 'scheduled-calls';
    if (path === '/admin/contact-messages') return 'contact-messages';
    if (path === '/admin/jobs') return 'jobs';
    if (path === '/admin/salary') return 'salary';
    if (path === '/admin/support') return 'support';
    if (path === '/admin/recycle-bin') return 'recycle-bin';
    if (path === '/admin/manage-admins') return 'manage-admins';
    if (path === '/admin/profile') return 'profile';
    return 'overview';
  };

  const activeTab = getActiveTabFromPath();

  // Redirect non-super-admin users
  useEffect(() => {
    if (userRole && userRole !== 'super_admin') {
      navigate('/');
    }
  }, [userRole, navigate]);

  if (statsLoading) {
    return (
      <div className="min-h-screen bg-background flex w-full">
        <div className="flex items-center justify-center w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex w-full">
      <AdminHeader 
        user={user}
        timeLeft={timeLeft}
        formatTime={formatTime}
        extendSession={extendSession}
        signOut={signOut}
      />

      <div className="flex w-full pt-20">
        <AdminSidebar 
          isCollapsed={isSidebarCollapsed} 
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          activeTab={activeTab}
        />
        
        <main className="flex-1 overflow-auto">
          <div className="container-custom py-8">
            <TabRenderer
              activeTab={activeTab}
              stats={stats}
              showWarning={showWarning}
              timeLeft={timeLeft}
              formatTime={formatTime}
              extendSession={extendSession}
              setShowWarning={setShowWarning}
              userRole={userRole}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
