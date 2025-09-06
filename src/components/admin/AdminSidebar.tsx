
import React, { memo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  Settings,
  BarChart3,
  Mail,
  Phone,
  Briefcase,
  UserCheck,
  Key,
  Clock,
  Shield,
  MessageSquare,
  DollarSign,
  HandHeart,
  Calendar,
  UserPlus,
} from 'lucide-react';

const AdminSidebar = memo(() => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Optimized form counts with longer cache time
  const { data: formCounts } = useQuery({
    queryKey: ['form-counts'],
    queryFn: async () => {
      const [
        contactRes,
        investmentRes,
        partnersRes,
        technicalRes,
        supportRes,
        salaryRes,
        joinLabRes,
        callScheduleRes
      ] = await Promise.all([
        supabase.from('contact_submissions').select('id', { count: 'exact' }),
        supabase.from('investment_inquiries').select('id', { count: 'exact' }),
        supabase.from('partners_inquiries').select('id', { count: 'exact' }),
        supabase.from('technical_consultations').select('id', { count: 'exact' }),
        supabase.from('support_tickets').select('id', { count: 'exact' }),
        supabase.from('salary_inquiries').select('id', { count: 'exact' }),
        supabase.from('join_lab_forms').select('id', { count: 'exact' }),
        supabase.from('scheduled_calls').select('id', { count: 'exact' })
      ]);

      return {
        contact: contactRes.count || 0,
        investment: investmentRes.count || 0,
        partners: partnersRes.count || 0,
        technical: technicalRes.count || 0,
        support: supportRes.count || 0,
        salary: salaryRes.count || 0,
        joinLab: joinLabRes.count || 0,
        callSchedule: callScheduleRes.count || 0
      };
    },
    refetchInterval: 60000, // Reduced frequency to 60 seconds
    staleTime: 30000, // Cache for 30 seconds
  });

  const sidebarItems = React.useMemo(() => [
    {
      title: "Dashboard",
      items: [
        { title: "Overview", url: "/admin/dashboard", icon: LayoutDashboard },
        { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
        { title: "Super Admin", url: "/admin/super-admin-dashboard", icon: Shield },
      ],
    },
    {
      title: "User Management",
      items: [
        { title: "Users", url: "/admin/users", icon: Users },
        { title: "User Profiles", url: "/admin/user-profiles", icon: UserCheck },
        { title: "Add User", url: "/admin/add-user", icon: UserPlus },
        { title: "Sessions", url: "/admin/sessions", icon: Clock },
      ],
    },
    {
      title: "Company Management",
      items: [
        { title: "Companies", url: "/admin/companies", icon: Building2 },
        { title: "Contacts", url: "/admin/contacts", icon: Phone },
        { title: "Documents", url: "/admin/documents", icon: FileText },
        { title: "Social Links", url: "/admin/social-links", icon: MessageSquare },
      ],
    },
    {
      title: "Forms",
      items: [
        { title: "Contact", url: "/admin/contact-forms", icon: MessageSquare, count: formCounts?.contact },
        { title: "Investment", url: "/admin/investment-forms", icon: DollarSign, count: formCounts?.investment },
        { title: "Partners", url: "/admin/partners-forms", icon: HandHeart, count: formCounts?.partners },
        { title: "Technical", url: "/admin/technical-forms", icon: Settings, count: formCounts?.technical },
        { title: "Support", url: "/admin/support-forms", icon: Shield, count: formCounts?.support },
        { title: "Salary", url: "/admin/salary-forms", icon: DollarSign, count: formCounts?.salary },
        { title: "Join Lab", url: "/admin/join-lab-forms", icon: UserPlus, count: formCounts?.joinLab },
        { title: "Call Schedule", url: "/admin/call-schedule-forms", icon: Calendar, count: formCounts?.callSchedule },
      ],
    },
    {
      title: "HR & Talent",
      items: [
        { title: "Employees", url: "/admin/employees", icon: UserCheck },
        { title: "Interns", url: "/admin/interns", icon: Users },
        { title: "Job Applications", url: "/admin/job-applications", icon: Briefcase },
      ],
    },
    {
      title: "Communication",
      items: [
        { title: "Email History", url: "/admin/email-history", icon: Mail },
        { title: "OTP Verifications", url: "/admin/otp-verifications", icon: Key },
      ],
    },
    {
      title: "System",
      items: [
        { title: "API Keys", url: "/admin/api-keys", icon: Key },
        { title: "Admin Logs", url: "/admin/admin-logs", icon: FileText },
        { title: "Settings", url: "/admin/settings", icon: Settings },
      ],
    },
  ], [formCounts]);

  const isActive = React.useCallback((path: string) => currentPath === path, [currentPath]);

  return (
    <Sidebar className="w-64 border-r bg-gray-50/50" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <img 
            src="/lovable-uploads/dbdd7bff-f52d-46d3-9244-f5e7737d7c95.png" 
            alt="Civora Nexus Logo" 
            className="w-8 h-8" 
          />
          <span className="font-semibold text-lg">Admin Portal</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="overflow-y-auto">
        {sidebarItems.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="text-gray-600">{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <NavLink 
                        to={item.url} 
                        className={({ isActive }) =>
                          isActive
                            ? "flex items-center justify-between gap-2 px-3 py-2 text-sm font-medium bg-gray-200 text-gray-900 rounded-md border border-gray-300"
                            : "flex items-center justify-between gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                        }
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </div>
                        {item.count !== undefined && item.count > 0 && (
                          <span className="bg-gray-500 text-white text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center">
                            {item.count}
                          </span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
});

AdminSidebar.displayName = 'AdminSidebar';

export default AdminSidebar;
