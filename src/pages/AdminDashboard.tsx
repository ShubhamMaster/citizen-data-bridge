
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDashboard = () => {
  const [websiteVisits, setWebsiteVisits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndLoad = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate("/login");
          return;
        }
        await loadWebsiteVisits();
        setLoading(false);
      } catch {
        setLoading(false);
        navigate("/login");
      }
    };
    checkAuthAndLoad();
  }, [navigate]);

  const loadWebsiteVisits = async () => {
    try {
      const { data, error } = await supabase
        .from("website_visits")
        .select("*")
        .order('visited_at', { ascending: false })
        .limit(100);
      if (!error && data) {
        setWebsiteVisits(data);
      }
    } catch {}
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-civora-teal rounded-full border-t-transparent" />
        <span className="ml-4 text-civora-navy">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-civora-navy">Admin Dashboard</h1>
              <p className="text-gray-600">Civora Nexus Management Portal</p>
            </div>
            <Button variant="outline" onClick={async () => {
              await supabase.auth.signOut();
              navigate("/");
            }}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="visitors" className="space-y-6">
          <TabsList className="flex flex-wrap space-x-2 mb-4">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="jobs">Job Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="content">Content Management</TabsTrigger>
            <TabsTrigger value="contacts">Contact Messages</TabsTrigger>
            <TabsTrigger value="calls">Scheduled Calls</TabsTrigger>
            <TabsTrigger value="visitors">Website Visitors</TabsTrigger>
          </TabsList>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Applications management coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <CardTitle>Job Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Job postings and applications management coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Analytics dashboard coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Content editing coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Contact messages will show here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calls">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Scheduled calls management coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="visitors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Visitors Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto max-h-96">
                  <table className="w-full text-xs">
                    <thead>
                      <tr>
                        <th className="px-2 py-1">Date</th>
                        <th className="px-2 py-1">Path</th>
                        <th className="px-2 py-1">Device</th>
                        <th className="px-2 py-1">Brand</th>
                        <th className="px-2 py-1">Model</th>
                        <th className="px-2 py-1">OS</th>
                        <th className="px-2 py-1">Browser</th>
                        <th className="px-2 py-1">City</th>
                        <th className="px-2 py-1">Country</th>
                        <th className="px-2 py-1">IP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {websiteVisits.length === 0 ? (
                        <tr>
                          <td colSpan={10} className="text-center text-gray-400 py-4">
                            No visits logged yet
                          </td>
                        </tr>
                      ) : (
                        websiteVisits.map((v) => (
                          <tr key={v.id}>
                            <td className="px-2 py-1">
                              {new Date(v.visited_at).toLocaleString()}
                            </td>
                            <td className="px-2 py-1">{v.path}</td>
                            <td className="px-2 py-1">{v.device_type}</td>
                            <td className="px-2 py-1">{v.device_brand}</td>
                            <td className="px-2 py-1">{v.device_model}</td>
                            <td className="px-2 py-1">{v.os_name}</td>
                            <td className="px-2 py-1">{v.browser_name}</td>
                            <td className="px-2 py-1">{v.city}</td>
                            <td className="px-2 py-1">{v.country}</td>
                            <td className="px-2 py-1">{v.ip_address}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
