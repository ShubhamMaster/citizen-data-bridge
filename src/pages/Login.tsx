import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import Loading from "@/components/Loading";
import TwoFactorLogin from "@/pages/TwoFactorLogin"; // ✅ OTP screen
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm"; // ✅ Forgot pass
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// SignIn result type
type SignInResult = {
  user?: {
    id: string;
    email: string;
    twoFactorEnabled?: boolean;
  };
  requiresOTP?: boolean;   // ✅ optional
  error?: { message: string };
};


const Login: React.FC = () => {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 2FA state
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [pendingUser, setPendingUser] = useState<SignInResult["user"] | null>(null);

  // Forgot password state
  const [showForgot, setShowForgot] = useState(false);

  // Auto redirect if already logged in
  useEffect(() => {
    if (user) {
      const redirectPath = (location.state as any)?.from || "/admin/dashboard";
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate, location.state]);

  // Ensure profile has a role
  const ensureProfileHasRole = async (uid: string, uemail: string) => {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, email, role")
      .eq("id", uid)
      .maybeSingle();

    if (!profile) {
      await supabase.from("profiles").insert({ id: uid, email: uemail, role: "user" });
    } else if (!profile.role) {
      await supabase.from("profiles").update({ role: "user" }).eq("id", uid);
    }
  };

  // Login handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result: SignInResult = await signIn(email.trim(), password);

      if (result.error) {
        toast({ title: "Error", description: result.error.message, variant: "destructive" });
        return;
      }

      // If 2FA required
      if (result.requiresOTP && result.user?.twoFactorEnabled) {
        setPendingUser(result.user);
        setShowOTPModal(true);
        toast({
          title: "Two-Factor Authentication",
          description: "Enter the verification code sent to your email.",
        });
        return;
      }

      // Normal login
      if (result.user?.id && result.user.email) {
        await ensureProfileHasRole(result.user.id, result.user.email);
      }

      toast({ title: "Success", description: "Signed in successfully!" });
      navigate((location.state as any)?.from || "/admin/dashboard", { replace: true });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  // OTP success
  const handleOTPSuccess = async () => {
    setShowOTPModal(false);
    if (pendingUser?.id && pendingUser.email) {
      await ensureProfileHasRole(pendingUser.id, pendingUser.email);
    }
    setPendingUser(null);
    toast({ title: "Success", description: "Two-factor verification completed!" });
    navigate((location.state as any)?.from || "/admin/dashboard", { replace: true });
  };

  const handleOTPClose = () => {
    setShowOTPModal(false);
    setPendingUser(null);
  };

  // Show OTP entry screen
  if (showOTPModal && pendingUser) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
          <TwoFactorLogin
            userId={pendingUser.id}
            email={pendingUser.email!}
            onSuccess={handleOTPSuccess}
            onBack={handleOTPClose}
          />
        </main>
        <Footer />
      </div>
    );
  }

  // Show Forgot Password screen
  if (showForgot) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Reset Password</CardTitle>
              <CardDescription>Enter your email to receive a reset code</CardDescription>
            </CardHeader>
            <CardContent>
              <ForgotPasswordForm />
              <Button 
                variant="link" 
                className="w-full mt-4" 
                onClick={() => setShowForgot(false)}
              >
                Back to Sign In
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // Default login screen
  return (
    <div className="min-h-screen relative">
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2 pb-6">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Sign in to access your admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="h-11 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="h-11 pr-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setShowPassword((s) => !s)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">Toggle password</span>
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium" 
                disabled={isLoading}
              >
                {isLoading ? <Loading size="sm" className="min-h-0 w-5 h-5" /> : "Sign In"}
              </Button>

              <Button
                type="button"
                variant="link"
                className="w-full text-blue-600 hover:text-blue-700 font-medium"
                onClick={() => setShowForgot(true)}
              >
                Forgot your password?
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      
      {/* Footer that appears after scrolling */}
      <div className="absolute top-[100vh] w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Login;
