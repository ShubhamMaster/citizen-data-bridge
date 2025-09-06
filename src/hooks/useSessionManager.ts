
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface SessionState {
  isExpired: boolean;
  isExtending: boolean;
  showExpiryWarning: boolean;
  timeLeft: number;
  tokenRefreshCount: number;
}

export const useSessionManager = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [sessionState, setSessionState] = useState<SessionState>({
    isExpired: false,
    isExtending: false,
    showExpiryWarning: false,
    timeLeft: 0,
    tokenRefreshCount: 0
  });

  const updateLoginStatus = useCallback(async (status: 'login' | 'logout', sessionToken?: string) => {
    if (!user) return;

    try {
      await supabase.rpc('update_login_status', {
        p_user_id: user.id,
        p_status: status,
        p_session_token: sessionToken
      });
    } catch (error) {
      console.error('Error updating login status:', error);
    }
  }, [user]);

  const refreshAuthToken = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) throw error;
      
      if (data.session) {
        setSessionState(prev => ({ 
          ...prev, 
          tokenRefreshCount: prev.tokenRefreshCount + 1,
          timeLeft: 7200000 // 2 hours
        }));
        
        // Update login status with new session
        await updateLoginStatus('login', data.session.access_token);
        
        toast({
          title: "Session Refreshed",
          description: "Your session has been automatically renewed.",
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      await handleSessionExpiry();
    }
  }, [updateLoginStatus]);

  const checkSessionExpiry = useCallback(async () => {
    if (!user) return;

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('session_expires_at, login_status')
        .eq('id', user.id)
        .single();

      if (profile?.session_expires_at && profile.login_status === 'login') {
        const expiryTime = new Date(profile.session_expires_at).getTime();
        const currentTime = new Date().getTime();
        const timeLeft = Math.max(0, expiryTime - currentTime);

        setSessionState(prev => ({ ...prev, timeLeft }));

        // Auto-refresh token 10 minutes before expiry
        if (timeLeft <= 600000 && timeLeft > 0 && sessionState.tokenRefreshCount < 5) {
          await refreshAuthToken();
        }
        // Show warning 5 minutes before expiry
        else if (timeLeft <= 300000 && timeLeft > 0 && !sessionState.showExpiryWarning) {
          setSessionState(prev => ({ ...prev, showExpiryWarning: true }));
        }
        // Session expired
        else if (timeLeft <= 0) {
          setSessionState(prev => ({ ...prev, isExpired: true }));
          await handleSessionExpiry();
        }
      }
    } catch (error) {
      console.error('Error checking session expiry:', error);
    }
  }, [user, sessionState.showExpiryWarning, sessionState.tokenRefreshCount, refreshAuthToken]);

  const handleSessionExpiry = useCallback(async () => {
    await updateLoginStatus('logout');
    await signOut();
    
    toast({
      title: "Session Expired",
      description: "Your session has expired. Please login again.",
      variant: "destructive"
    });

    setTimeout(() => {
      navigate('/login'); // Changed from /auth to /login
    }, 2000);
  }, [updateLoginStatus, signOut, toast, navigate]);

  const extendSession = useCallback(async () => {
    if (!user) return;

    setSessionState(prev => ({ ...prev, isExtending: true }));

    try {
      await refreshAuthToken();
      
      setSessionState(prev => ({
        ...prev,
        isExpired: false,
        isExtending: false,
        showExpiryWarning: false,
        timeLeft: 7200000 // 2 hours
      }));

      toast({
        title: "Session Extended",
        description: "Your session has been extended for 2 more hours.",
        variant: "default"
      });
    } catch (error) {
      console.error('Error extending session:', error);
      setSessionState(prev => ({ ...prev, isExtending: false }));
    }
  }, [user, refreshAuthToken, toast]);

  useEffect(() => {
    if (user) {
      const interval = setInterval(checkSessionExpiry, 60000); // Check every minute
      return () => clearInterval(interval);
    }
  }, [user, checkSessionExpiry]);

  // Auto-refresh token every 30 minutes for active users
  useEffect(() => {
    if (user) {
      const autoRefreshInterval = setInterval(() => {
        if (sessionState.tokenRefreshCount < 10) { // Limit auto-refreshes
          refreshAuthToken();
        }
      }, 1800000); // 30 minutes
      
      return () => clearInterval(autoRefreshInterval);
    }
  }, [user, refreshAuthToken, sessionState.tokenRefreshCount]);

  return {
    sessionState,
    updateLoginStatus,
    extendSession,
    handleSessionExpiry,
    refreshAuthToken
  };
};
