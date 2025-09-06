import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface Props {
  userId: string;
  email: string;
  otpType: string;
  onSuccess: () => void;
  onClose: () => void;
}

const OTPVerification: React.FC<Props> = ({ userId, email, otpType, onSuccess, onClose }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Verify OTP using the database function
      const { data: isValid, error } = await supabase.rpc('verify_otp', {
        p_user_id: userId,
        p_otp_code: otp,
        p_otp_type: otpType
      });

      if (error) {
        console.error('OTP verification error:', error);
        throw new Error(error.message || 'Verification failed');
      }

      if (!isValid) {
        toast({
          title: "Invalid / expired code",
          description: "Please recheck the code or request a new one.",
          variant: "destructive",
        });
        return;
      }

      // If this is password reset, generate token and redirect
      if (otpType === 'password_reset') {
        console.log('Password reset OTP verified, generating token...');
        const token = crypto.randomUUID();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

        console.log('Updating profile with reset token:', { token, expiresAt });
        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            reset_token: token,
            reset_expires_at: expiresAt,
            password_reset_status: "not_reset",
          })
          .eq("id", userId);

        if (updateError) {
          console.error('Error updating profile with reset token:', updateError);
          toast({
            title: "Error",
            description: "Failed to generate reset link. Please try again.",
            variant: "destructive",
          });
          return;
        }

        console.log('Profile updated successfully, redirecting to reset page...');
        navigate(`/reset-password?token=${encodeURIComponent(token)}`);
      } else {
        // For other OTP types, call success callback
        onSuccess();
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Verification failed.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleVerify} className="space-y-4">
      <Label htmlFor="otp">Enter the 6-digit code sent to {email}</Label>
      <Input
        id="otp"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
        placeholder="123456"
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Verifying..." : "Verify"}
      </Button>
    </form>
  );
};

export default OTPVerification;
