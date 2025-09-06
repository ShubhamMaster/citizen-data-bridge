
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertCircle } from 'lucide-react';
import { useSessionManager } from '@/hooks/useSessionManager';

const LiveSessionTimer: React.FC = () => {
  const { sessionState } = useSessionManager();
  const [timeDisplay, setTimeDisplay] = useState('');
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      if (sessionState.timeLeft > 0) {
        const hours = Math.floor(sessionState.timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((sessionState.timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((sessionState.timeLeft % (1000 * 60)) / 1000);
        
        setTimeDisplay(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        setIsWarning(sessionState.timeLeft < 600000); // 10 minutes warning
      } else {
        setTimeDisplay('Expired');
        setIsWarning(true);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [sessionState.timeLeft]);

  return (
    <div className="flex items-center space-x-2">
      <Clock className={`w-4 h-4 ${isWarning ? 'text-destructive' : 'text-muted-foreground'}`} />
      <Badge 
        variant={isWarning ? 'destructive' : 'secondary'}
        className="font-mono text-xs"
      >
        {timeDisplay}
      </Badge>
      {isWarning && (
        <AlertCircle className="w-4 h-4 text-destructive animate-pulse" />
      )}
    </div>
  );
};

export default LiveSessionTimer;
