
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useSessionTimer = () => {
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [showWarning, setShowWarning] = useState(false);
  const { signOut } = useAuth();
  const { toast } = useToast();

  const extendSession = useCallback(() => {
    setTimeLeft(7200); // Reset to 2 hours
    setShowWarning(false);
    toast({
      title: "Session Extended",
      description: "Your session has been extended for 2 more hours.",
    });
  }, [toast]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = Math.max(0, prev - 1);
        
        // Show warning at 5 minutes (300 seconds) left
        if (newTime === 300 && !showWarning) {
          setShowWarning(true);
          toast({
            title: "Session Expiring Soon",
            description: "Your session will expire in 5 minutes. Click 'Extend Session' to continue.",
            variant: "destructive",
          });
        }
        
        // Auto logout when time reaches 0
        if (newTime === 0) {
          signOut();
          toast({
            title: "Session Expired",
            description: "Your session has expired. Please log in again.",
            variant: "destructive",
          });
        }
        
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [signOut, showWarning, toast]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return {
    timeLeft,
    showWarning,
    extendSession,
    formatTime,
    setShowWarning,
  };
};
