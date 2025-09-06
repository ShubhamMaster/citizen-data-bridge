
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'super_admin' | 'admin';
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ 
  children, 
  requiredRole = 'super_admin' 
}) => {
  const { user, userRole, loading } = useAuth();
  const location = useLocation();

  console.log('AdminProtectedRoute - User:', user?.email, 'Role:', userRole, 'Loading:', loading);

  // Show loading only briefly - if still loading after reasonable time, redirect to login
  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-96" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If no user, redirect to login with return path
  if (!user) {
    console.log('AdminProtectedRoute - No user, redirecting to login');
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Check if user has required role (super_admin can access admin routes too)
  const hasAccess = userRole === requiredRole || userRole === 'super_admin';
  
  if (!hasAccess) {
    console.log('AdminProtectedRoute - Access denied. User role:', userRole, 'Required:', requiredRole);
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-destructive mb-2">Access Denied</h2>
              <p className="text-muted-foreground">
                You need {requiredRole} privileges to access this page.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Current role: {userRole || 'No role assigned'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  console.log('AdminProtectedRoute - Access granted');
  return <>{children}</>;
};

export default AdminProtectedRoute;
