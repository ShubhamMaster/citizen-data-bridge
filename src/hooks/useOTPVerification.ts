
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface OTPState {
  isLoading: boolean;
  isVerifying: boolean;
  isVerified: boolean;
  error: string | null;
}

export const useOTPVerification = () => {
  const { toast } = useToast();
  const [otpState, setOtpState] = useState<OTPState>({
    isLoading: false,
    isVerifying: false,
    isVerified: false,
    error: null
  });

  const sendOTP = async (userId: string, email: string, otpType: string) => {
    setOtpState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const { data: otpCode, error } = await supabase.rpc('generate_otp_with_history', {
        p_user_id: userId,
        p_otp_type: otpType,
        p_email: email,
        p_expires_minutes: 10
      });

      if (error) throw error;

      // Send OTP via email using dedicated AUTH_EMAIL_API_KEY
      const { error: emailError } = await supabase.functions.invoke('send-auth-otp', {
        body: {
          email,
          otpCode,
          otpType,
          userName: email.split('@')[0]
        }
      });

      if (emailError) throw emailError;

      setOtpState(prev => ({ ...prev, isLoading: false }));
      
      toast({
        title: "OTP Sent",
        description: `A verification code has been sent to ${email}`,
        variant: "default"
      });

      return otpCode;
    } catch (error: any) {
      setOtpState(prev => ({ ...prev, isLoading: false, error: error.message }));
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP",
        variant: "destructive"
      });
      throw error;
    }
  };

  const verifyOTP = async (userId: string, otpCode: string, otpType: string) => {
    setOtpState(prev => ({ ...prev, isVerifying: true, error: null }));

    try {
      const { data: isValid, error } = await supabase.rpc('verify_otp', {
        p_user_id: userId,
        p_otp_code: otpCode,
        p_otp_type: otpType
      });

      if (error) throw error;

      if (isValid) {
        setOtpState(prev => ({ ...prev, isVerifying: false, isVerified: true }));
        toast({
          title: "OTP Verified",
          description: "Verification successful",
          variant: "default"
        });
        return true;
      } else {
        throw new Error('Invalid or expired OTP code');
      }
    } catch (error: any) {
      setOtpState(prev => ({ ...prev, isVerifying: false, error: error.message }));
      toast({
        title: "Verification Failed",
        description: error.message || "Invalid or expired OTP code",
        variant: "destructive"
      });
      return false;
    }
  };

  const resetOTP = () => {
    setOtpState({
      isLoading: false,
      isVerifying: false,
      isVerified: false,
      error: null
    });
  };

  return {
    otpState,
    sendOTP,
    verifyOTP,
    resetOTP
  };
};
