
import React, { useState } from 'react';
import { useOTPVerification } from '@/hooks/useOTPVerification';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';

interface TwoFactorLoginProps {
  userId: string;
  email: string;
  onSuccess: () => void;
  onBack: () => void;
}

const TwoFactorLogin: React.FC<TwoFactorLoginProps> = ({
  userId,
  email,
  onSuccess,
  onBack
}) => {
  const [otpCode, setOtpCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();
  const { verifyOTP } = useOTPVerification();

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length !== 6) return;

    setIsVerifying(true);
    console.log('Starting OTP verification for user:', userId);

    try {
      const isValid = await verifyOTP(userId, otpCode, '2fa_login');
      console.log('OTP verification result:', isValid);
      
      if (isValid) {
        console.log('OTP verified successfully, completing login...');
        
        // Update login status and stats after successful OTP verification
        try {
          await supabase.rpc('update_login_status', {
            p_user_id: userId,
            p_status: 'login',
            p_session_token: crypto.randomUUID()
          });

          await supabase.rpc('update_login_stats', { user_id: userId });
          console.log('Login status and stats updated successfully');
        } catch (error) {
          console.error('Error updating login status/stats:', error);
          // Don't fail the login for this, just log the error
        }

        // Create a new session for the user
        // We need to sign in the user again after successful OTP verification
        // This is a workaround since we signed them out during the 2FA check
        try {
          // Get user data from profiles table
          const { data: userProfile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

          if (profileError) {
            console.error('Error fetching user profile:', profileError);
            throw new Error('Failed to complete login');
          }

          console.log('User profile fetched successfully, proceeding with success callback');

          toast({
            title: "Success",
            description: "Two-factor authentication completed successfully!",
            variant: "default"
          });

          // Call success callback which should handle navigation
          onSuccess();
          
          // Additional redirect as fallback
          setTimeout(() => {
            const urlParams = new URLSearchParams(window.location.search);
            const redirectPath = urlParams.get('redirect');
            
            if (redirectPath && redirectPath.startsWith('/admin')) {
              window.location.href = redirectPath;
            } else {
              window.location.href = '/admin/dashboard';
            }
          }, 1000);

        } catch (sessionError) {
          console.error('Error creating session after OTP verification:', sessionError);
          toast({
            title: "Login Error",
            description: "OTP verified but failed to complete login. Please try signing in again.",
            variant: "destructive"
          });
        }
      } else {
        console.log('OTP verification failed');
        toast({
          title: "Verification Failed",
          description: "Invalid or expired OTP code. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      console.error('OTP verification error:', error);
      toast({
        title: "Verification Failed",
        description: error.message || "Invalid or expired OTP code",
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Two-Factor Authentication</CardTitle>
        <CardDescription>
          Enter the 6-digit code sent to {email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVerifyOTP} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">Verification Code</Label>
            <Input
              id="otp"
              type="text"
              placeholder="000000"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
              className="text-center text-lg tracking-wider"
              required
            />
          </div>
          
          <div className="flex space-x-2">
            <Button 
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <Button
              type="submit"
              disabled={otpCode.length !== 6 || isVerifying}
              className="flex-1"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify & Login'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TwoFactorLogin;
