
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, User, Edit, Lock } from "lucide-react";

const AdminProfilePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [details, setDetails] = useState({ email: "", name: "" });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);

  // Load user session details
  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session || !session.user) {
        setLoading(false);
        setUser(null);
        return;
      }
      setUser(session.user);
      setDetails({
        email: session.user.email || "",
        name: session.user.user_metadata?.name || "",
      });
      setLoading(false);
    })();
  }, []);

  // Update email and name
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Update email if changed
      if (details.email !== user.email) {
        const { error } = await supabase.auth.updateUser({
          email: details.email,
        });
        if (error) throw new Error(error.message);
      }
      // Update name (user_metadata) if changed
      if (details.name !== user.user_metadata?.name) {
        const { error } = await supabase.auth.updateUser({
          data: { name: details.name },
        });
        if (error) throw new Error(error.message);
      }
      toast({
        title: "Profile updated",
        description: "Your profile was successfully updated.",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message || "Failed to update profile.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  // Update password
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSaving(true);

    try {
      if (!newPassword) throw new Error("New password required.");
      // The Supabase API does not require the old password to update password in client-side context
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw new Error(error.message);
      toast({
        title: "Password updated",
        description: "Your password has been reset.",
      });
      setOldPassword("");
      setNewPassword("");
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message || "Failed to update password.",
        variant: "destructive",
      });
    } finally {
      setPasswordSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-12 text-civora-navy">
        <Loader2 className="animate-spin h-6 w-6 mr-3" /> Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <User className="inline mr-2" /> Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-600 text-sm">No user information found.</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>
            <User className="inline mr-2" /> My Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-3" onSubmit={handleSave}>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="profile-email">
                Email
              </label>
              <Input
                id="profile-email"
                type="email"
                autoComplete="email"
                value={details.email}
                onChange={(e) => setDetails({ ...details, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="profile-name">
                Name
              </label>
              <Input
                id="profile-name"
                type="text"
                autoComplete="name"
                value={details.name}
                onChange={(e) => setDetails({ ...details, name: e.target.value })}
                placeholder="Your Name"
              />
            </div>
            <Button type="submit" className="bg-civora-teal hover:bg-civora-teal/90" disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
              Save Profile
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            <Lock className="inline mr-2" /> Change Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-3" onSubmit={handlePasswordChange}>
            {/* Optionally show old password field, but Supabase does not require it for password change */}
            {/* <div>
              <label className="block text-sm font-medium mb-1" htmlFor="old-password">
                Old Password
              </label>
              <Input
                id="old-password"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div> */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="new-password">
                New Password
              </label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                autoComplete="new-password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="bg-civora-navy hover:bg-civora-navy/90" disabled={passwordSaving}>
              {passwordSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Lock className="h-4 w-4 mr-2" />}
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProfilePage;
