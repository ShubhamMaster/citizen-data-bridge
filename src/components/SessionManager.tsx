
import React, { useEffect, useState } from 'react';
import { useSessionManager } from '@/hooks/useSessionManager';
import { useAuth } from '@/contexts/AuthContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Progress } from '@/components/ui/progress';

const SessionManager: React.FC = () => {
  const { user } = useAuth();
  const { sessionState, extendSession, handleSessionExpiry } = useSessionManager();
  const [autoLogoutTimer, setAutoLogoutTimer] = useState<NodeJS.Timeout | null>(null);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (sessionState.isExpired) {
      setCountdown(5);
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSessionExpiry();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setAutoLogoutTimer(timer);
    }

    return () => {
      if (autoLogoutTimer) {
        clearInterval(autoLogoutTimer);
      }
    };
  }, [sessionState.isExpired, handleSessionExpiry]);

  if (!user) return null;

  return (
    <>
      {/* Session Expiry Warning */}
      <AlertDialog open={sessionState.showExpiryWarning && !sessionState.isExpired}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Session Expiring Soon</AlertDialogTitle>
            <AlertDialogDescription>
              Your session will expire in {Math.ceil(sessionState.timeLeft / 60000)} minutes. 
              Do you want to extend your session?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleSessionExpiry}>
              Logout
            </AlertDialogCancel>
            <AlertDialogAction onClick={extendSession} disabled={sessionState.isExtending}>
              {sessionState.isExtending ? 'Extending...' : 'Extend Session'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Session Expired with Countdown */}
      <AlertDialog open={sessionState.isExpired}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Session Expired</AlertDialogTitle>
            <AlertDialogDescription>
              Your session has expired. You will be automatically logged out in {countdown} seconds.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4">
            <Progress value={(5 - countdown) * 20} className="w-full" />
            <div className="text-center text-sm text-muted-foreground">
              Auto-logout in {countdown} seconds...
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleSessionExpiry}>
              Logout Now
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SessionManager;
