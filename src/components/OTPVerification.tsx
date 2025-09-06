
import React, { useState } from 'react';
import { useOTPVerification } from '@/hooks/useOTPVerification';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface OTPVerificationProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
  email: string;
  otpType: string;
  title?: string;
  description?: string;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  open,
  onClose,
  onSuccess,
  userId,
  email,
  otpType,
  title = "OTP Verification",
  description = "Please enter the verification code sent to your email"
}) => {
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const { otpState, sendOTP, verifyOTP, resetOTP } = useOTPVerification();

  const handleSendOTP = async () => {
    try {
      await sendOTP(userId, email, otpType);
      setOtpSent(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleVerifyOTP = async () => {
    if (otpCode.length !== 6) return;

    const isValid = await verifyOTP(userId, otpCode, otpType);
    if (isValid) {
      onSuccess();
      handleClose();
    }
  };

  const handleClose = () => {
    setOtpCode('');
    setOtpSent(false);
    resetOTP();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {!otpSent ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                We'll send a verification code to: <strong>{email}</strong>
              </p>
              <Button 
                onClick={handleSendOTP} 
                disabled={otpState.isLoading}
                className="w-full"
              >
                {otpState.isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  'Send Verification Code'
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Enter 6-digit code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                  className="text-center text-lg tracking-wider"
                />
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  onClick={handleVerifyOTP} 
                  disabled={otpCode.length !== 6 || otpState.isVerifying}
                  className="flex-1"
                >
                  {otpState.isVerifying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    'Verify Code'
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleSendOTP}
                  disabled={otpState.isLoading}
                >
                  Resend
                </Button>
              </div>
            </div>
          )}
          
          {otpState.error && (
            <p className="text-sm text-destructive">{otpState.error}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OTPVerification;
