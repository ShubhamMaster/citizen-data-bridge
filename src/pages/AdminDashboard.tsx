import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Briefcase, 
  FileText, 
  BarChart3, 
  Download,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Loader2,
  Save,
  Mail
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import JobManagement from "@/components/JobManagement";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableCaption } from "@/components/ui/table";
import AdminProfilePage from "@/components/AdminProfilePage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";

const dashboardTabs = [
  { value: "applications", label: "Applications" },
  { value: "jobs", label: "Job Management" },
  { value: "analytics", label: "Analytics" },
  { value: "content", label: "Content Management" },
  { value: "contact-messages", label: "Contact Messages" },
  { value: "calls", label: "Scheduled Calls" },
  { value: "visitors", label: "Visitors" },
];

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobsSearchTerm, setJobsSearchTerm] = useState('');
  const [contactsSearchTerm, setContactsSearchTerm] = useState('');
  const [callsSearchTerm, setCallsSearchTerm] = useState('');
  const [stats, setStats] = useState({ totalVisitors: 0, totalApplications: 0, activeJobs: 0, pendingReviews: 0 });
  const [applications, setApplications] = useState<any[]>([]);
  const [recentVisitors, setRecentVisitors] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [scheduledCalls, setScheduledCalls] = useState<any[]>([]);
  const [isUpdatingCall, setIsUpdatingCall] = useState<number | null>(null);
  const navigate = useNavigate();
  const [viewedApp, setViewedApp] = useState<any | null>(null);
  const [statusSaving, setStatusSaving] = useState<string | null>(null);
  const [websiteVisits, setWebsiteVisits] = useState<any[]>([]);
  const [showVisitorsTable, setShowVisitorsTable] = useState(false);
  const [session, setSession] = useState<any>(null); // Track Supabase session
  const [sessionExpiry, setSessionExpiry] = useState<Date | null>(null);
  const [remainingTime, setRemainingTime] = useState<string | null>(null);
  const logoutTimerRef = useRef<any>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tabValue, setTabValue] = useState("applications");
  const isMobile = useIsMobile();

  // Helper: get remaining seconds from sessionExpiry
  const getRemainingSeconds = () => {
    if (!sessionExpiry) return null;
    return Math.floor((sessionExpiry.getTime() - Date.now()) / 1000);
  };

  useEffect(() => {
    // Setup session and expiration tracking
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (newSession?.expires_at) {
        const expiry = new Date(newSession.expires_at * 1000);
        setSessionExpiry(expiry);
      } else {
        setSessionExpiry(null);
      }
    });

    // Get session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.expires_at) {
        setSessionExpiry(new Date(session.expires_at * 1000));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Count down timer to show remaining session time
  useEffect(() => {
    if (!sessionExpiry) {
      setRemainingTime(null);
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
      return;
    }

    function updateRemaining() {
      const ms = sessionExpiry.getTime() - Date.now();
      if (ms <= 0) {
        setRemainingTime("Expired");
        handleLogout();
        return;
      }
      // calculate as HH:MM:SS
      const totalSeconds = Math.floor(ms / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      setRemainingTime(
        `${hours > 0 ? hours + "h " : ""}${minutes}m ${seconds}s`
      );
      // schedule next update
      logoutTimerRef.current = setTimeout(updateRemaining, 1000);
    }

    updateRemaining();

    return () => {
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    };
    // eslint-disable-next-line
  }, [sessionExpiry]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate("/login");
          return;
        }

        setIsLoggedIn(true);
        setLoading(false);

        // Load data
        await loadDashboardData();
        await loadContactMessages();
        await loadScheduledCalls();
        await loadWebsiteVisits();
      } catch (error) {
        console.error("Auth check error:", error);
        setLoading(false);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  const loadDashboardData = async () => {
    try {
      // Load applications
      const { data: applicationsData } = await supabase
        .from("applications")
        .select("*")
        .order('created_at', { ascending: false });
      
      if (applicationsData) {
        setApplications(applicationsData);
        setStats(prev => ({ ...prev, totalApplications: applicationsData.length }));
      }

      // Load jobs count
      const { data: jobsData } = await supabase
        .from("jobs")
        .select("id, is_active");
      
      if (jobsData) {
        const activeJobs = jobsData.filter(job => job.is_active).length;
        setStats(prev => ({ ...prev, activeJobs }));
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const loadContactMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order('created_at', { ascending: false });
      if (!error && data) {
        setContactMessages(data);
      }
    } catch (error) {
      console.error("Error loading contact messages:", error);
    }
  };

  const loadScheduledCalls = async () => {
    try {
      const { data, error } = await supabase
        .from("scheduled_calls")
        .select("*")
        .order('created_at', { ascending: false });
      if (!error && data) setScheduledCalls(data);
    } catch (e) {
      console.error("Error loading scheduled calls:", e);
    }
  };

  const loadWebsiteVisits = async () => {
    try {
      const { data, error } = await supabase
        .from("website_visits")
        .select("*")
        .order('visited_at', { ascending: false })
        .limit(100); // latest 100

      if (!error && data) {
        setWebsiteVisits(data);
        setStats(prev => ({ ...prev, totalVisitors: data.length }));
      }
    } catch (e) {
      // silent
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setSessionExpiry(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewed: 'bg-blue-100 text-blue-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  // CSV Export for applications (Excel compatible)
  const exportCSV = () => {
    if (applications.length === 0) {
      toast({
        title: "Nothing to export",
        description: "There are no applications to export.",
      });
      return;
    }
    const csvHeaders = [
      "Applicant Name",
      "Applicant Email",
      "Position",
      "Applied Date",
      "Status"
    ];
    const csvRows = applications.map((app) => [
      `"${(app.application_data?.name ?? '').replace(/"/g, '""')}"`,
      `"${(app.application_data?.email ?? '').replace(/"/g, '""')}"`,
      `"${(app.application_data?.position ?? 'General Application').replace(/"/g, '""')}"`,
      `"${new Date(app.created_at).toLocaleString().replace(/"/g, '""')}"`,
      `"${(app.status ?? 'pending').replace(/"/g, '""')}"`
    ]);
    const csvContent = [csvHeaders, ...csvRows].map(row => row.join(",")).join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "job-applications.csv");
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 0);
  };

  // --- Multiple Applications: Export All as PDF ---
  const exportPDF = async () => {
    if (!applications.length) {
      toast({ title: "Nothing to export", description: "No applications available." });
      return;
    }
    try {
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      let y = 720; // reserve header space

      let page = pdfDoc.addPage([595, 842]);
      // --- Header: Logo (left) & Company Name (right) on light background ---
      // Background rectangle (light blue/gray)
      page.drawRectangle({
        x: 0, y: 762, width: 595, height: 80,
        color: rgb(225/255, 238/255, 255/255)
      });

      // Remove the direct await usage and use an async IIFE:
      await (async () => {
        try {
          const logoUrl = window.location.origin + COMPANY_LOGO_PATH;
          const logoImageRes = await fetch(logoUrl);
          const logoImageBytes = await logoImageRes.arrayBuffer();
          const logoImage = await pdfDoc.embedPng(logoImageBytes);
          page.drawImage(logoImage, {
            x: 35, y: 772, width: 65, height: 65
          });
        } catch {}
      })();

      // Company name (right of logo)
      page.drawText(COMPANY_LETTERHEAD.companyName, {
        x: 110, y: 797, size: 22, font: fontBold, color: rgb(0.13,0.22,0.36)
      });

      y = 720; // below header

      for (const app of applications) {
        if (y < 120) {
          page = pdfDoc.addPage([595, 842]);
          // draw header again for each page
          page.drawRectangle({
            x: 0, y: 762, width: 595, height: 80,
            color: rgb(225/255, 238/255, 255/255)
          });
          // Repeat header logo usage inside async IIFE:
          await (async () => {
            try {
              const logoUrl = window.location.origin + COMPANY_LOGO_PATH;
              const logoImageRes = await fetch(logoUrl);
              const logoImageBytes = await logoImageRes.arrayBuffer();
              const logoImage = await pdfDoc.embedPng(logoImageBytes);
              page.drawImage(logoImage, {
                x: 35, y: 772, width: 65, height: 65
              });
            } catch {}
          })();
          page.drawText(COMPANY_LETTERHEAD.companyName, {
            x: 110, y: 797, size: 22, font: fontBold, color: rgb(0.13,0.22,0.36)
          });
          y = 720;
        }
        const safeText = (text: string) => (text ? String(text).replace(/[^\x00-\x7F]/g, "?") : "");
        page.drawText(`Applicant: ${safeText(app.application_data?.name ?? 'N/A')}`, { x: 40, y, size: 12, font: fontBold });
        y -= 18;
        page.drawText(`Email: ${safeText(app.application_data?.email ?? 'N/A')}`, { x: 40, y, size: 11, font });
        y -= 14;
        page.drawText(`Position: ${safeText(app.application_data?.position ?? 'General Application')}`, { x: 40, y, size: 11, font });
        y -= 14;
        page.drawText(`Applied: ${new Date(app.created_at).toLocaleString()}`, { x: 40, y, size: 11, font });
        y -= 14;
        page.drawText(`Status: ${safeText(app.status ?? 'pending')}`, { x: 40, y, size: 11, font });
        y -= 14;
        page.drawText(`Message: ${safeText(app.application_data?.message ?? '')}`, { x: 40, y, size: 11, font });
        y -= 20;
        page.drawText("-------------------------------------------", { x: 40, y, size: 8, font, color: rgb(0.7,0.7,0.7) });
        y -= 18;
      }
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "job-applications.pdf");
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 0);
    } catch (err) {
      toast({
        title: "PDF export failed",
        description: typeof err === "string" ? err : "There was a problem exporting PDF.",
        variant: "destructive"
      });
    }
  };

  // Helper to download a file by URL and trigger native browser download
  const downloadFileByUrl = async (url: string, filename: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("File not found");
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      }, 0);
    } catch (err) {
      toast({
        title: "Download failed",
        description: "Unable to download the attached file.",
        variant: "destructive"
      });
    }
  };

  // Download individual application as PDF
  const downloadAppPDF = async (app: any) => {
    try {
      const { PDFDocument, rgb, StandardFonts } = await import("pdf-lib");

      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontNormal = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pageWidth = 595;
      const pageHeight = 842;

      const page = pdfDoc.addPage([pageWidth, pageHeight]);

      // Header - light background with logo and company name
      page.drawRectangle({
        x: 0,
        y: pageHeight - 80,
        width: pageWidth,
        height: 80,
        color: rgb(225/255, 238/255, 255/255)
      });

      // Again, use an async IIFE for await:
      await (async () => {
        try {
          const logoUrl = window.location.origin + COMPANY_LOGO_PATH;
          const logoImageRes = await fetch(logoUrl);
          const logoImageBytes = await logoImageRes.arrayBuffer();
          const logoImage = await pdfDoc.embedPng(logoImageBytes);
          page.drawImage(logoImage, {
            x: 35,
            y: pageHeight - 70,
            width: 65,
            height: 65,
          });
        } catch {}
      })();

      // Company name (right of logo)
      page.drawText(COMPANY_LETTERHEAD.companyName, {
        x: 110,
        y: pageHeight - 35,
        size: 22,
        font,
        color: rgb(0.13, 0.22, 0.36)
      });

      // Main Content (application fields)
      let contentY = pageHeight - 100;
      const safeText = (text: string) => (text ? String(text).replace(/[^\x00-\x7F]/g, "?") : "");
      const drawField = (label: string, value: string) => {
        page.drawText(`${label}:`, {
          x: 50,
          y: contentY,
          size: 12,
          font,
          color: rgb(20/255, 54/255, 134/255),
        });
        page.drawText(safeText(value), {
          x: 180,
          y: contentY,
          size: 12,
          font: fontNormal,
          color: rgb(50/255, 50/255, 50/255),
          maxWidth: pageWidth - 210,
        });
        contentY -= 28;
      };

      drawField("Applicant Name", app.application_data?.name ?? "N/A");
      drawField("Email", app.application_data?.email ?? "N/A");
      drawField("Position", app.application_data?.position ?? "General Application");
      drawField("Applied Date", new Date(app.created_at).toLocaleString());
      drawField("Status", app.status ?? "pending");
      if (app.application_data?.message) {
        drawField("Message", app.application_data?.message);
      }
      if (app.application_data?.resume_name) {
        drawField("Resume", app.application_data.resume_name);
      }

      // Download PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const filename = `job-application-${(app.application_data?.name || "applicant")
        .replace(/\s+/g, "_")
        .toLowerCase()}.pdf`;
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 0);
    } catch (err) {
      toast({
        title: "PDF download failed",
        description: typeof err === "string" ? err : "There was a problem downloading PDF (may be Unicode in text).",
        variant: "destructive"
      });
    }
  };

  // Application status update
  const handleStatusChange = async (appId: number, newStatus: string) => {
    setStatusSaving(String(appId));
    const { error } = await supabase.from("applications").update({ status: newStatus }).eq("id", appId);
    if (error) {
      toast({ title: "Update failed", description: "Could not update application status.", variant: "destructive" });
    } else {
      setApplications((apps) => apps.map(a => a.id === appId ? { ...a, status: newStatus } : a));
      toast({ title: "Status Updated", description: "The application status has been updated." });
    }
    setStatusSaving(null);
  };

  // The original downloadAppPDF function remains, but we'll create a new download logic:
  const handleDownloadApplication = async (app: any) => {
    // Assume common fields; adjust field names as per your model!
    const attachmentUrl = app.application_data?.resume_url || app.application_data?.attachment_url;
    const attachmentName =
      app.application_data?.resume_name ||
      app.application_data?.attachment_name ||
      "attachment";

    if (attachmentUrl) {
      // Download the attached file (PDF, DOCX, etc.)
      await downloadFileByUrl(attachmentUrl, attachmentName);
    } else {
      // No attached file, generate PDF as before
      await downloadAppPDF(app);
    }
  };

  const toggleCallDone = async (callId: number, newDone: boolean) => {
    setIsUpdatingCall(callId);
    const { error } = await supabase
      .from("scheduled_calls")
      .update({ is_done: newDone })
      .eq("id", callId);
    if (error) {
      toast({ title: "Update failed", description: "Could not update call status.", variant: "destructive" });
    } else {
      setScheduledCalls(calls =>
        calls.map(c => c.id === callId ? { ...c, is_done: newDone } : c)
      );
      toast({ title: "Call updated", description: `Marked as ${newDone ? "done" : "not done"}.` });
    }
    setIsUpdatingCall(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-civora-teal rounded-full border-t-transparent" />
        <span className="ml-4 text-civora-navy">Loading dashboard...</span>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-red-500 mb-4">Access Denied</div>
        <p className="text-gray-600 mb-4">You need to be logged in to view this page.</p>
        <Button onClick={() => navigate("/login")}>Go to Login</Button>
      </div>
    );
  }

  // Add local search helpers
  const filteredApplications = applications.filter(app =>
    (app.application_data?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (app.application_data?.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (app.application_data?.position || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredContactMessages = contactMessages.filter(msg =>
    (msg.name || '').toLowerCase().includes(contactsSearchTerm.toLowerCase()) ||
    (msg.email || '').toLowerCase().includes(contactsSearchTerm.toLowerCase()) ||
    (msg.message || '').toLowerCase().includes(contactsSearchTerm.toLowerCase())
  );

  const filteredScheduledCalls = scheduledCalls.filter(call =>
    (call.name || '').toLowerCase().includes(callsSearchTerm.toLowerCase()) ||
    (call.reason || '').toLowerCase().includes(callsSearchTerm.toLowerCase()) ||
    (call.date || '').toString().toLowerCase().includes(callsSearchTerm.toLowerCase()) ||
    (call.time || '').toLowerCase().includes(callsSearchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              {/* Hamburger for mobile */}
              <div className="md:hidden flex items-center">
                <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                  <DrawerTrigger asChild>
                    <button
                      className="mr-2 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-civora-teal transition md:hidden"
                      aria-label="Open main menu"
                    >
                      <Menu className="h-7 w-7 text-civora-navy" />
                    </button>
                  </DrawerTrigger>
                  <DrawerContent className="max-w-xs w-full">
                    <DrawerHeader>
                      <DrawerTitle>Main Menu</DrawerTitle>
                    </DrawerHeader>
                    <div className="flex flex-col gap-1 px-4">
                      {dashboardTabs.map((tab) => (
                        <button
                          key={tab.value}
                          className={`px-4 py-3 my-0.5 text-left rounded-md text-base font-medium hover:bg-civora-teal/10 transition ${
                            tabValue === tab.value ? "bg-civora-teal text-white" : "text-civora-navy"
                          }`}
                          onClick={() => {
                            setTabValue(tab.value);
                            setDrawerOpen(false);
                          }}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </DrawerContent>
                </Drawer>
                <h1 className="text-xl font-bold text-civora-navy">Admin Dashboard</h1>
              </div>
              {/* Logo/Title for desktop */}
              <div className="hidden md:block">
                <h1 className="text-2xl font-bold text-civora-navy">Admin Dashboard</h1>
                <p className="text-gray-600">Civora Nexus Management Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Remaining Time Badge */}
              {remainingTime && (
                <div
                  className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors duration-200
                    ${
                      remainingTime === "Expired"
                        ? "bg-red-100 text-red-800"
                        : getRemainingSeconds() !== null && getRemainingSeconds() <= 300
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }
                  `}
                  title="Remaining session time"
                  data-testid="session-remaining"
                >
                  Session expires in: {remainingTime}
                </div>
              )}

              {/* Profile Icon with menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="rounded-full focus:outline-none focus:ring-2 focus:ring-civora-teal/70 transition-shadow shadow-lg hover:ring-4 hover:ring-civora-teal/40"
                    aria-label="Open profile menu"
                  >
                    <Avatar className="w-9 h-9">
                      {/* Fake fallback for now (initials), enhance if session provides avatar in future */}
                      <AvatarImage src={session?.user?.user_metadata?.avatar_url ?? ""} alt="Profile" />
                      <AvatarFallback>
                        {session?.user?.user_metadata?.name
                          ? session.user.user_metadata.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                              .toUpperCase()
                          : "AD"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-50 bg-white shadow-lg min-w-[160px] p-0">
                  <DropdownMenuItem
                    onClick={() => setProfileOpen(true)}
                    className="hover:bg-civora-teal/10 focus:bg-civora-teal/20 cursor-pointer"
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="hover:bg-red-100 focus:bg-red-200 text-red-600 cursor-pointer"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Website Visitors card now just shows stats, does not toggle anything */}
          <Card
            className="group transition-shadow hover:shadow-md"
            tabIndex={0}
            aria-pressed={false}
            title="Website visitors"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Website Visitors</p>
                  <p className="text-3xl font-bold text-civora-navy">{stats.totalVisitors}</p>
                  <p className="text-xs text-gray-500">
                    Since launch
                  </p>
                </div>
                <Users className="h-8 w-8 text-civora-teal" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Job Applications</p>
                  <p className="text-3xl font-bold text-civora-navy">{stats.totalApplications}</p>
                  <p className="text-xs text-gray-500">Total received</p>
                </div>
                <FileText className="h-8 w-8 text-civora-teal" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Open Positions</p>
                  <p className="text-3xl font-bold text-civora-navy">{stats.activeJobs}</p>
                  <p className="text-xs text-gray-500">Currently hiring</p>
                </div>
                <Briefcase className="h-8 w-8 text-civora-teal" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Reviews</p>
                  <p className="text-3xl font-bold text-civora-navy">{stats.pendingReviews}</p>
                  <p className="text-xs text-gray-500">Need attention</p>
                </div>
                <BarChart3 className="h-8 w-8 text-civora-teal" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div>
          {/* Tab row for desktop/tablet */}
          <div className="hidden md:block">
            <Tabs value={tabValue} onValueChange={setTabValue} className="space-y-6">
              <TabsList
                className="w-full overflow-x-auto no-scrollbar flex gap-2 mb-4"
                style={{
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {dashboardTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex-shrink-0 min-w-[120px]"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {dashboardTabs.map((tab) => (
                <TabsContent
                  key={tab.value}
                  value={tab.value}
                  className="space-y-6"
                  forceMount
                >
                  {renderTabContent(tab.value)}
                </TabsContent>
              ))}
            </Tabs>
          </div>
          {/* On mobile, just show content of selected tab (choose via Drawer) */}
          <div className="md:hidden">
            {renderTabContent(tabValue)}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {profileOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-2 sm:p-0">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-fade-in-up">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setProfileOpen(false)}
              aria-label="Close profile"
            >×</button>
            {/* Place the AdminProfilePage in modal */}
            <AdminProfilePage />
          </div>
        </div>
      )}
    </div>
  );

  // Helper to render tab content by value
  function renderTabContent(tab: string) {
    switch (tab) {
      case "applications":
        return (
          // ... keep existing code for Applications tab ...
          <TabsContent value="applications" forceMount className="space-y-6">
            {/* ... applications table, export etc ... */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Job Applications</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Search applications..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                        aria-label="Search applications"
                      />
                    </div>
                    {/* Export Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={exportCSV}>Export as Excel (CSV)</DropdownMenuItem>
                        <DropdownMenuItem onClick={exportPDF}>Export as PDF</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredApplications.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                    <p className="text-gray-500">As a new company, you'll see job applications here once candidates start applying.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Applicant</th>
                          <th className="text-left py-3 px-4">Position</th>
                          <th className="text-left py-3 px-4">Applied Date</th>
                          <th className="text-left py-3 px-4">Status</th>
                          <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredApplications.map((app) => (
                          <tr key={app.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium">{app.application_data?.name || 'N/A'}</p>
                                <p className="text-sm text-gray-600">{app.application_data?.email || 'N/A'}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4">{app.application_data?.position || 'General Application'}</td>
                            <td className="py-3 px-4">{new Date(app.created_at).toLocaleDateString()}</td>
                            <td className="py-3 px-4">
                              <select
                                value={app.status || "pending"}
                                disabled={statusSaving === String(app.id)}
                                className="border rounded p-1 text-xs min-w-[120px] bg-white"
                                onChange={e => handleStatusChange(app.id, e.target.value)}
                              >
                                <option value="pending">Pending</option>
                                <option value="in process">In Process</option>
                                <option value="reviewed">Reviewed</option>
                                <option value="accepted">Accepted</option>
                                <option value="rejected">Rejected</option>
                              </select>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => setViewedApp(app)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDownloadApplication(app)}
                                  title={
                                    app.application_data?.resume_url || app.application_data?.attachment_url
                                      ? "Download attachment"
                                      : "Download as PDF"
                                  }
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {/* Application details modal */}
                    {viewedApp && (
                      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
                        <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
                          <button
                            className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-xl"
                            onClick={() => setViewedApp(null)}
                          >×</button>
                          <h3 className="text-lg font-bold mb-2">Application Details</h3>
                          <dl className="text-sm">
                            <dt className="font-semibold">Name</dt>
                            <dd className="mb-2">{viewedApp.application_data?.name ?? 'N/A'}</dd>
                            <dt className="font-semibold">Email</dt>
                            <dd className="mb-2">{viewedApp.application_data?.email ?? 'N/A'}</dd>
                            <dt className="font-semibold">Position</dt>
                            <dd className="mb-2">{viewedApp.application_data?.position ?? 'N/A'}</dd>
                            <dt className="font-semibold">Applied</dt>
                            <dd className="mb-2">{new Date(viewedApp.created_at).toLocaleString()}</dd>
                            <dt className="font-semibold">Status</dt>
                            <dd className="mb-2 capitalize">{viewedApp.status ?? 'pending'}</dd>
                            <dt className="font-semibold">Message</dt>
                            <dd className="mb-2">{viewedApp.application_data?.message ?? ''}</dd>
                          </dl>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        );
      case "jobs":
        return (
          <TabsContent value="jobs" forceMount className="space-y-6">
            <div className="flex justify-end mb-4">
              <div className="relative w-72">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search jobs..."
                  value={jobsSearchTerm}
                  onChange={e => setJobsSearchTerm(e.target.value)}
                  className="pl-10"
                  aria-label="Search jobs"
                  // Note: this only affects if JobManagement supports filter prop, otherwise show for UI consistency
                  disabled
                  title="For demo: JobManagement search to be added in JobManagement component"
                />
              </div>
            </div>
            <JobManagement />
          </TabsContent>
        );
      case "analytics":
        return (
          <TabsContent value="analytics" forceMount className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Coming Soon</h3>
                  <p className="text-gray-500">As a new company, we're setting up analytics tracking. Visitor data will appear here once implemented.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        );
      case "content":
      case "content-management":
        return (
          <TabsContent value={tab} forceMount className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Website Content Section Management */}
              <Card>
                <CardHeader>
                  <CardTitle>Website Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ContentEditor section="hero" label="Edit Hero Section" />
                  <ContentEditor section="services" label="Manage Services" />
                  <ContentEditor section="about" label="Update About Us" />
                  <ContentEditor section="contact" label="Contact Information" />
                </CardContent>
              </Card>

              {/* Company Settings (static, unchanged) */}
              <Card>
                <CardHeader>
                  <CardTitle>Company Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input
                      id="company-name"
                      defaultValue="Civora Nexus"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input
                      id="contact-email"
                      defaultValue="civoranexus@gmail.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company-status">Company Status</Label>
                    <Input
                      id="company-status"
                      defaultValue="Newly Launched Startup"
                      className="mt-1"
                      readOnly
                    />
                  </div>
                  <Button className="w-full bg-civora-teal hover:bg-civora-teal/90">
                    Save Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        );
      case "contact-messages":
        return (
          <TabsContent value="contact-messages" forceMount className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
                <div className="flex justify-end mt-2">
                  <div className="relative w-72">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search messages..."
                      value={contactsSearchTerm}
                      onChange={e => setContactsSearchTerm(e.target.value)}
                      className="pl-10"
                      aria-label="Search contact messages"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredContactMessages.length === 0 ? (
                  <div className="text-center py-8">
                    <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No contact messages yet</h3>
                    <p className="text-gray-500">Messages submitted via the website contact form will appear here.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Name</th>
                          <th className="text-left py-3 px-4">Email</th>
                          <th className="text-left py-3 px-4">Message</th>
                          <th className="text-left py-3 px-4">Submitted At</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredContactMessages.map((msg) => (
                          <tr key={msg.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium">{msg.name}</td>
                            <td className="py-3 px-4 text-civora-teal">{msg.email}</td>
                            <td className="py-3 px-4">{msg.message}</td>
                            <td className="py-3 px-4 text-xs text-gray-500">
                              {new Date(msg.created_at).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        );
      case "calls":
        return (
          <TabsContent value="calls" forceMount className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Calls</CardTitle>
                <div className="flex justify-end mt-2">
                  <div className="relative w-72">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search calls..."
                      value={callsSearchTerm}
                      onChange={e => setCallsSearchTerm(e.target.value)}
                      className="pl-10"
                      aria-label="Search scheduled calls"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredScheduledCalls.length === 0 ? (
                  <div className="text-center py-8">
                    <Table className="w-full mb-4">
                      <TableCaption>No calls scheduled.</TableCaption>
                    </Table>
                    <p className="text-gray-500 mt-2">Calls scheduled via the website will appear here.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Time</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Scheduled At</TableHead>
                          <TableHead>Done?</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredScheduledCalls.map((call) => (
                          <TableRow key={call.id}>
                            <TableCell>{call.name}</TableCell>
                            <TableCell>
                              {call.date ? new Date(call.date).toLocaleDateString() : ""}
                            </TableCell>
                            <TableCell>{call.time}</TableCell>
                            <TableCell className="whitespace-pre-line">{call.reason}</TableCell>
                            <TableCell>
                              {call.created_at
                                ? new Date(call.created_at).toLocaleString()
                                : ""}
                            </TableCell>
                            <TableCell>
                              <button
                                className={`inline-flex items-center justify-center w-10 h-6 rounded-full border ${call.is_done ? "bg-civora-teal border-civora-teal" : "bg-gray-200 border-gray-300"} transition-colors duration-150`}
                                onClick={() => toggleCallDone(call.id, !call.is_done)}
                                disabled={isUpdatingCall === call.id}
                                aria-pressed={!!call.is_done}
                                title={call.is_done ? "Mark as not done" : "Mark as done"}
                              >
                                <span
                                  className={`block w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-150 ${call.is_done ? "translate-x-4" : "translate-x-0"}`}
                                />
                                {isUpdatingCall === call.id && (
                                  <span className="absolute right-0 top-0 mr-1 mt-0.5 animate-spin w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full" />
                                )}
                              </button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        );
      case "visitors":
        return (
          <TabsContent value="visitors" forceMount className="space-y-6">
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
        );
      default:
        return null;
    }
  }
};

// Company Letterhead constants (customizable to match your design)
const COMPANY_LOGO_PATH = "/lovable-uploads/d5ddd61f-899e-4acf-a773-b03d953ab99f.png";
const COMPANY_LETTERHEAD = {
  companyName: "Civora Nexus Pvt. Ltd.",
  slogan: "Connecting Citizens Through Intelligent Innovation",
  email: "info@civoranexus.com",
  phone: "+91-9146 2687 10",
  address: "Sangamner, Maharashtra – 422605 India",
  cin: "U12345MH2025PTC123456",
  gstin: "27ABCDE1234F1Z5",
  logoText: "Civora Nexus", // Placeholder for the logo area (could be replaced by drawing or embedding an SVG)
};

// ContentEditor Component (inline for simplicity)
type Props = {
  section: string;
  label: string;
};
const ContentEditor: React.FC<Props> = ({ section, label }) => {
  const {
    content,
    setContent,
    loading,
    saving,
    error,
    saveContent,
  } = useWebsiteContent(section);

  // Default state for common fields
  const [editState, setEditState] = useState<any>({
    title: "",
    subtitle: "",
    description: "",
    services: [],
    address: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (content) {
      setEditState(content);
    }
  }, [content]);

  // Simple mappings for which fields to show
  let fields: JSX.Element[] = [];
  if (section === "hero") {
    fields = [
      <Input
        key="title"
        className="mb-2"
        placeholder="Headline"
        value={editState.title || ""}
        onChange={(e) => setEditState({ ...editState, title: e.target.value })}
      />,
      <Textarea
        key="subtitle"
        className="mb-2"
        placeholder="Subtitle"
        value={editState.subtitle || ""}
        onChange={(e) => setEditState({ ...editState, subtitle: e.target.value })}
      />
    ];
  } else if (section === "about") {
    fields = [
      <Textarea
        key="description"
        className="mb-2"
        placeholder="About Us"
        value={editState.description || ""}
        onChange={(e) => setEditState({ ...editState, description: e.target.value })}
      />
    ];
  } else if (section === "services") {
    fields = [
      <Textarea
        key="services"
        className="mb-2"
        placeholder="Services (comma separated)"
        value={Array.isArray(editState.services) ? editState.services.join(", ") : ""}
        onChange={(e) =>
          setEditState({
            ...editState,
            services: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean),
          })
        }
      />
    ];
  } else if (section === "contact") {
    fields = [
      <Input
        key="address"
        className="mb-2"
        placeholder="Address"
        value={editState.address || ""}
        onChange={(e) => setEditState({ ...editState, address: e.target.value })}
      />,
      <Input
        key="email"
        className="mb-2"
        placeholder="Email"
        value={editState.email || ""}
        onChange={(e) => setEditState({ ...editState, email: e.target.value })}
      />,
      <Input
        key="phone"
        className="mb-2"
        placeholder="Phone"
        value={editState.phone || ""}
        onChange={(e) => setEditState({ ...editState, phone: e.target.value })}
      />
    ];
  }

  return (
    <form
      className="p-3 border rounded mb-4 bg-gray-50"
      onSubmit={async (e) => {
        e.preventDefault();
        await saveContent(editState);
      }}
    >
      <div className="font-semibold mb-2">{label}</div>
      {loading ? (
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading...
        </div>
      ) : (
        <>
          {fields}
          <div className="flex gap-2 mt-2">
            <Button
              type="submit"
              disabled={saving}
              className="bg-civora-teal hover:bg-civora-teal/90"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              Save
            </Button>
            {error && (
              <span className="text-xs text-red-600">{error}</span>
            )}
          </div>
        </>
      )}
    </form>
  );
};

export default AdminDashboard;
