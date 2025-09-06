import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import OTPVerification from "@/components/auth/OTPVerification";

interface Props {
  onBack?: () => void;
}

const ForgotPasswordForm: React.FC<Props> = ({ onBack }) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [userId, setUserId] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Submitting password reset request for:', email);

      // Call the edge function to handle password reset
      const { data, error } = await supabase.functions.invoke('handle-password-reset', {
        body: { email: email.trim() }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || 'Failed to process reset request');
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      console.log('Password reset request successful:', data);

      toast({
        title: "Reset code sent",
        description: "Check your email for the verification code.",
      });

      // Store user ID and show OTP verification
      if (data?.userId) {
        setUserId(data.userId);
        setShowOTP(true);
      }

    } catch (err: any) {
      console.error('Password reset error:', err);
      toast({
        title: "Error",
        description: err.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSuccess = () => {
    toast({
      title: "Success",
      description: "Redirecting to password reset page...",
    });
  };

  // Show OTP verification if email was sent successfully
  if (showOTP) {
    return (
      <div className="space-y-4">
        <OTPVerification
          userId={userId}
          email={email}
          otpType="password_reset"
          onSuccess={handleOTPSuccess}
          onClose={() => setShowOTP(false)}
        />
        <Button 
          variant="link" 
          className="w-full" 
          onClick={() => setShowOTP(false)}
        >
          Back to Email Entry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Sending..." : "Send Reset Code"}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
