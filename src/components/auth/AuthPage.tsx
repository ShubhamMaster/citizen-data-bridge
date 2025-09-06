import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff } from "lucide-react";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import TwoFactorLogin from "@/pages/TwoFactorLogin";
import { supabase } from "@/integrations/supabase/client";

const AuthPage: React.FC = () => {
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [name, setName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  // 2FA state
  const [show2FA, setShow2FA] = useState(false);
  const [twoFAUser, setTwoFAUser] = useState<{id: string, email: string} | null>(null);

  const togglePasswordVisibility = () => setShowPassword((s) => !s);

  const ensureProfileOnSignup = async (uid: string, email: string, fullName?: string) => {
    // Create profile row with default role “user” if not present
    const { error } = await supabase.from("profiles").upsert(
      {
        id: uid,
        email,
        full_name: fullName || null,
        role: "user",
      },
      { onConflict: "id" }
    );
    if (error) console.error("profiles upsert on sign-up error:", error.message);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await signIn(signInEmail.trim(), signInPassword);
      if (result?.error) {
        throw new Error(result.error.message || "Failed to sign in");
      }
      
      // Check if 2FA is required
      if (result?.requiresOTP && result?.user) {
        console.log('2FA required, showing 2FA form...');
        setTwoFAUser(result.user);
        setShow2FA(true);
        toast({ 
          title: "2FA Required", 
          description: "Please check your email for verification code." 
        });
        return;
      }
      
      toast({ title: "Signed in" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign in",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await signUp(signUpEmail.trim(), signUpPassword, name.trim());
      if (result?.error) {
        throw new Error(result.error.message || "Failed to sign up");
      }

      // For successful signup, just show success message
      // Profile creation happens automatically via auth hooks

      toast({
        title: "Account created",
        description: "We created your account. You can sign in now.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign up",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (show2FA && twoFAUser) {
    return (
      <TwoFactorLogin
        userId={twoFAUser.id}
        email={twoFAUser.email}
        onSuccess={() => {
          setShow2FA(false);
          setTwoFAUser(null);
          toast({ title: "Successfully logged in!" });
        }}
        onBack={() => {
          setShow2FA(false);
          setTwoFAUser(null);
          // Clear temporary password
          sessionStorage.removeItem('tempPassword');
        }}
      />
    );
  }

  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
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
              onClick={() => setShowForgotPassword(false)}
            >
              Back to Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
          <CardDescription>Sign in to your account or create a new one</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="signin" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    placeholder="you@company.com"
                    type="email"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signin-password"
                      placeholder="Your password"
                      type={showPassword ? "text" : "password"}
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">Toggle password</span>
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <Button
                variant="link"
                className="w-full"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot Password?
              </Button>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signUpEmail">Email</Label>
                  <Input
                    id="signUpEmail"
                    placeholder="you@company.com"
                    type="email"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signUpPassword">Password</Label>
                  <div className="relative">
                    <Input
                      id="signUpPassword"
                      placeholder="Choose a strong password"
                      type={showPassword ? "text" : "password"}
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      required
                      autoComplete="new-password"
                      minLength={6}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">Toggle password</span>
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
