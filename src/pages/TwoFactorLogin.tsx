import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  userId: string;
  email: string;
  onSuccess: () => void;
  onBack: () => void;
}

const TwoFactorLogin: React.FC<Props> = ({ userId, email, onSuccess, onBack }) => {
  const { toast } = useToast();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;

    setLoading(true);
    try {
      // Verify OTP using the database function
      const { data: isValid, error } = await supabase.rpc("verify_otp", {
        p_user_id: userId,
        p_otp_code: otp,
        p_otp_type: "2fa_login"
      });

      if (error) {
        console.error("2FA verify error:", error);
        toast({
          title: "Error",
          description: error.message || "Could not verify code",
          variant: "destructive",
        });
        return;
      }

      if (!isValid) {
        toast({
          title: "Invalid OTP",
          description: "Please check your code and try again",
          variant: "destructive",
        });
        return;
      }

      // Update login stats and sign in user
      try {
        await supabase.rpc('update_login_stats', { user_id: userId });
        
        // Sign in the user after successful 2FA
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password: sessionStorage.getItem('tempPassword') || ''
        });

        if (signInError) {
          console.error('Sign in error after 2FA:', signInError);
          throw signInError;
        }

        sessionStorage.removeItem('tempPassword'); // Clean up
        toast({ title: "2FA Success", description: "You are now logged in." });
        onSuccess();
      } catch (statsError) {
        console.warn('Error updating login stats:', statsError);
        // Still proceed with login
        onSuccess();
      }
    } catch (err: any) {
      console.error("2FA verify error:", err);
      toast({ title: "Error", description: "Could not verify code", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Two-Factor Verification</CardTitle>
          <CardDescription>
            Enter the 6-digit code we sent to <b>{email}</b>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">One-Time Code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Verify"}
            </Button>

            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={onBack}
              disabled={loading}
            >
              Cancel
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TwoFactorLogin;
