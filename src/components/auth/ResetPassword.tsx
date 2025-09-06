// src/components/auth/ResetPassword.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Database } from "@/integrations/supabase/types";

// Type for profiles with reset fields
type ProfileWithReset = {
  id: string;
  reset_expires_at?: string | null;
  password_reset_status?: string | null;
  reset_token?: string | null;
};

const ResetPassword: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [sp] = useSearchParams();
  const token = sp.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Validate token on load
  useEffect(() => {
    const run = async () => {
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        // Validate token in profiles table
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("id, reset_token, reset_expires_at, password_reset_status")
          .eq("reset_token", token)
          .maybeSingle();

        if (error || !profile) {
          toast({
            title: "Invalid reset link",
            description: "This reset link is invalid.",
            variant: "destructive",
          });
          navigate("/login", { replace: true });
          return;
        }

        // Check if token is expired (older than 10 minutes)
        const now = new Date();
        const expiresAt = new Date(profile.reset_expires_at);
        
        if (now > expiresAt) {
          toast({
            title: "Link expired",
            description: "This reset link has expired. Redirecting...",
            variant: "destructive",
          });
          
          // Redirect to main site after 3 seconds
          setTimeout(() => {
            window.location.href = "https://civoranexus.com";
          }, 3000);
          return;
        }

        // Check if already reset
        if (profile.password_reset_status === 'reset_successfully') {
          toast({
            title: "Already used",
            description: "This reset link has already been used.",
            variant: "destructive",
          });
          navigate("/login", { replace: true });
          return;
        }

        setUserId(profile.id);
        setLoading(false);

      } catch (err: any) {
        console.error('Token validation error:', err);
        toast({
          title: "Error",
          description: "Failed to validate reset link.",
          variant: "destructive",
        });
        navigate("/login", { replace: true });
      }
    };

    run();
  }, [token, navigate, toast]);

  // ✅ Handle password reset
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    if (password.length < 6) {
      toast({
        title: "Weak password",
        description: "Use at least 6 characters.",
        variant: "destructive",
      });
      return;
    }
    if (password !== confirm) {
      toast({
        title: "Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create Supabase admin client for password update
      const { error: updateError } = await supabase.functions.invoke('update-user-password', {
        body: { 
          userId, 
          newPassword: password,
          resetToken: token
        }
      });

      if (updateError) {
        throw new Error(updateError.message || "Failed to update password");
      }

      // Update profile status to reset_successfully
      await supabase
        .from("profiles")
        .update({ 
          reset_token: null,
          password_reset_status: "reset_successfully"
        } as any)
        .eq("id", userId);

      toast({
        title: "Password updated",
        description: "You can now sign in with your new password.",
      });
      
      navigate("/login", { replace: true });
    } catch (err: any) {
      console.error('Password update error:', err);
      toast({
        title: "Error",
        description: err.message || "Failed to update password.",
        variant: "destructive",
      });
    }
  };

  if (loading) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
      <div>
        <Label htmlFor="pwd">New password</Label>
        <Input
          id="pwd"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="cpwd">Confirm password</Label>
        <Input
          id="cpwd"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Update Password
      </Button>
    </form>
  );
};

export default ResetPassword;
