
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSessionManager } from '@/hooks/useSessionManager';
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
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const SessionExpiryPopup: React.FC = () => {
  const { user } = useAuth();
  const { sessionState, extendSession, handleSessionExpiry } = useSessionManager();
  const [countdown, setCountdown] = useState(5);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (sessionState.showExpiryWarning) {
      setShowWarning(true);
      setCountdown(5);
    }
  }, [sessionState.showExpiryWarning]);

  useEffect(() => {
    if (sessionState.isExpired && countdown > 0) {
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

      return () => clearInterval(timer);
    }
  }, [sessionState.isExpired, countdown, handleSessionExpiry]);

  const handleExtendSession = async () => {
    await extendSession();
    setShowWarning(false);
  };

  if (!user) return null;

  return (
    <>
      {/* Session Expiry Warning */}
      <AlertDialog open={showWarning && !sessionState.isExpired}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Session Expiring Soon</AlertDialogTitle>
            <AlertDialogDescription>
              Your session will expire in {Math.ceil(sessionState.timeLeft / 60000)} minutes. 
              Do you want to extend your session?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowWarning(false)}>
              Dismiss
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleExtendSession} disabled={sessionState.isExtending}>
              {sessionState.isExtending ? 'Extending...' : 'Extend Session'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Session Expired with Auto-Logout */}
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

export default SessionExpiryPopup;
