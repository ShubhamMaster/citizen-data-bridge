import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { useLogVisit } from '@/hooks/useLogVisit';
import SessionManager from './components/SessionManager';
import ScrollToTop from './components/ScrollToTop';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import { ThemeProvider } from './contexts/ThemeContext';
import OptimizedLoading from './components/OptimizedLoading';
import ProgressiveLoader from './components/ProgressiveLoader';
import ResetPasswordPage from "./pages/ResetPassword";

// Lazy load components for better performance
const Index = lazy(() => import('./pages/Index'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Services = lazy(() => import('./pages/Services'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));
const Careers = lazy(() => import('./pages/Careers'));
const CareersJobs = lazy(() => import('./pages/CareersJobs'));
const Internships = lazy(() => import('./pages/Internships'));
const Leadership = lazy(() => import('./pages/Leadership'));
const BoardOfDirectors = lazy(() => import('./pages/BoardOfDirectors'));
const Contact = lazy(() => import('./pages/Contact'));
const Partners = lazy(() => import('./pages/Partners'));
const Investors = lazy(() => import('./pages/Investors'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Accessibility = lazy(() => import('./pages/Accessibility'));
const CorporateResponsibility = lazy(() => import('./pages/CorporateResponsibility'));
const CSRESG = lazy(() => import('./pages/CSRESG'));
const Patents = lazy(() => import('./pages/Patents'));
const ISO = lazy(() => import('./pages/ISO'));
const DataSecurity = lazy(() => import('./pages/DataSecurity'));
const InvestmentInquiry = lazy(() => import('./pages/InvestmentInquiry'));
const PartnersInquiry = lazy(() => import('./pages/PartnersInquiry'));
const ProjectInquiryPage = lazy(() => import('./pages/ProjectInquiryPage'));
const SalesInquiry = lazy(() => import('./pages/SalesInquiry'));
const TechnicalConsultation = lazy(() => import('./pages/TechnicalConsultation'));

const CompanyProjects = lazy(() => import('./pages/CompanyProjects'));
const CompanyPartners = lazy(() => import('./pages/CompanyPartners'));
const InnovationLab = lazy(() => import('./pages/InnovationLab'));
const JoinInnovationLab = lazy(() => import('./pages/JoinInnovationLab'));
const Rnd = lazy(() => import('./pages/Rnd'));
const AllEvents = lazy(() => import('./pages/AllEvents'));
const EventRegistration = lazy(() => import('./pages/EventRegistration'));
const SaaSDevelopment = lazy(() => import('./pages/SaaSDevelopment'));
const CloudHosting = lazy(() => import('./pages/CloudHosting'));
const AISolutions = lazy(() => import('./pages/AISolutions'));
const AIResearch = lazy(() => import('./pages/AIResearch'));
const Automation = lazy(() => import('./pages/Automation'));
const CustomIntegrations = lazy(() => import('./pages/CustomIntegrations'));
const CivicOne = lazy(() => import('./pages/CivicOne'));
const HealthBridge = lazy(() => import('./pages/HealthBridge'));
const ImpactTracker = lazy(() => import('./pages/ImpactTracker'));
const LifeAtCivora = lazy(() => import('./pages/LifeAtCivora'));
const ClientSuccessStories = lazy(() => import('./pages/ClientSuccessStories'));
const InternVerification = lazy(() => import('./pages/InternVerification'));
const Help = lazy(() => import('./pages/Help'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Login = lazy(() => import('./pages/Login'));



// Admin pages
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const SuperAdminDashboard = lazy(() => import('./pages/admin/SuperAdminDashboard'));
const UsersManagement = lazy(() => import('./pages/admin/UsersManagement'));
const Sessions = lazy(() => import('./pages/admin/Sessions'));
const Profile = lazy(() => import('./pages/admin/Profile'));
const Settings = lazy(() => import('./pages/admin/Settings'));
const FormSubmissions = lazy(() => import('./pages/admin/FormSubmissions'));
const ContactFormsPage = lazy(() => import('./pages/admin/ContactFormsPage'));
const CallScheduleFormsPage = lazy(() => import('./pages/admin/CallScheduleFormsPage'));
const TechnicalFormsPage = lazy(() => import('./pages/admin/TechnicalFormsPage'));
const SupportFormsPage = lazy(() => import('./pages/admin/SupportFormsPage'));
const SalaryFormsPage = lazy(() => import('./pages/admin/SalaryFormsPage'));
const InvestmentFormsPage = lazy(() => import('./pages/admin/InvestmentFormsPage'));
const PartnersFormsPage = lazy(() => import('./pages/admin/PartnersFormsPage'));
const JoinLabFormsPage = lazy(() => import('./pages/admin/JoinLabFormsPage'));
const JobApplications = lazy(() => import('./pages/admin/JobApplications'));

const Analytics = lazy(() => import('./pages/admin/Analytics'));
const Users = lazy(() => import('./pages/admin/Users'));
const UserProfiles = lazy(() => import('./pages/admin/UserProfiles'));
const Employees = lazy(() => import('./pages/admin/Employees'));
const Interns = lazy(() => import('./pages/admin/Interns'));
const Companies = lazy(() => import('./pages/admin/Companies'));
const CompaniesManagement = lazy(() => import('./pages/admin/CompaniesManagement'));
const Addresses = lazy(() => import('./pages/admin/Addresses'));
const Contacts = lazy(() => import('./pages/admin/Contacts'));
const Documents = lazy(() => import('./pages/admin/Documents'));
const BankDetails = lazy(() => import('./pages/admin/BankDetails'));
const SocialLinks = lazy(() => import('./pages/admin/SocialLinks'));
const APIKeys = lazy(() => import('./pages/admin/APIKeys'));
const AdminLogs = lazy(() => import('./pages/admin/AdminLogs'));
const EmailHistory = lazy(() => import('./pages/admin/EmailHistory'));
const OTPVerifications = lazy(() => import('./pages/admin/OTPVerifications'));
const AddUser = lazy(() => import('./pages/admin/AddUser'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Navigation loading wrapper to show progress during route changes
const NavigationLoadingWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {isNavigating && (
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-primary to-primary/50">
          <div className="h-full bg-primary animate-pulse" />
        </div>
      )}
      {children}
    </>
  );
};

// Enhanced Suspense wrapper with optimized loading
const SuspenseWithOverlay: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Suspense
      fallback={
        <ProgressiveLoader>
          <OptimizedLoading />
        </ProgressiveLoader>
      }
    >
      {children}
    </Suspense>
  );
};

// Site visit logger component
const SiteVisitLogger: React.FC = () => {
  useLogVisit();
  return null;
};

function AppRoutes() {
  return (
    <NavigationLoadingWrapper>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <SuspenseWithOverlay>
            <Index />
          </SuspenseWithOverlay>
        } />
        <Route path="/about" element={
          <SuspenseWithOverlay>
            <AboutUs />
          </SuspenseWithOverlay>
        } />
        <Route path="/services" element={
          <SuspenseWithOverlay>
            <Services />
          </SuspenseWithOverlay>
        } />
        <Route path="/projects" element={
          <SuspenseWithOverlay>
            <Projects />
          </SuspenseWithOverlay>
        } />
        <Route path="/project/:id" element={
          <SuspenseWithOverlay>
            <ProjectDetails />
          </SuspenseWithOverlay>
        } />
        <Route path="/case-studies" element={
          <SuspenseWithOverlay>
            <CaseStudies />
          </SuspenseWithOverlay>
        } />
        <Route path="/case-studies/:id" element={
          <SuspenseWithOverlay>
            <CaseStudyDetail />
          </SuspenseWithOverlay>
        } />
        <Route path="/careers" element={
          <SuspenseWithOverlay>
            <Careers />
          </SuspenseWithOverlay>
        } />
        <Route path="/jobs-opening" element={
          <SuspenseWithOverlay>
            <CareersJobs />
          </SuspenseWithOverlay>
        } />
        <Route path="/internships" element={
          <SuspenseWithOverlay>
            <Internships />
          </SuspenseWithOverlay>
        } />
        <Route path="/leadership" element={
          <SuspenseWithOverlay>
            <Leadership />
          </SuspenseWithOverlay>
        } />
        <Route path="/board-of-directors" element={
          <SuspenseWithOverlay>
            <BoardOfDirectors />
          </SuspenseWithOverlay>
        } />
        <Route path="/contact" element={
          <SuspenseWithOverlay>
            <Contact />
          </SuspenseWithOverlay>
        } />
        <Route path="/partners" element={
          <SuspenseWithOverlay>
            <Partners />
          </SuspenseWithOverlay>
        } />
        <Route path="/investors" element={
          <SuspenseWithOverlay>
            <Investors />
          </SuspenseWithOverlay>
        } />
        <Route path="/privacy" element={
          <SuspenseWithOverlay>
            <Privacy />
          </SuspenseWithOverlay>
        } />
        <Route path="/terms" element={
          <SuspenseWithOverlay>
            <Terms />
          </SuspenseWithOverlay>
        } />
        <Route path="/accessibility" element={
          <SuspenseWithOverlay>
            <Accessibility />
          </SuspenseWithOverlay>
        } />
        <Route path="/corporate-responsibility" element={
          <SuspenseWithOverlay>
            <CorporateResponsibility />
          </SuspenseWithOverlay>
        } />
        <Route path="/csr-esg" element={
          <SuspenseWithOverlay>
            <CSRESG />
          </SuspenseWithOverlay>
        } />
        <Route path="/patents" element={
          <SuspenseWithOverlay>
            <Patents />
          </SuspenseWithOverlay>
        } />
        <Route path="/iso" element={
          <SuspenseWithOverlay>
            <ISO />
          </SuspenseWithOverlay>
        } />
        <Route path="/data-security" element={
          <SuspenseWithOverlay>
            <DataSecurity />
          </SuspenseWithOverlay>
        } />

        {/* Form Pages */}
        <Route path="/investment-inquiry" element={
          <SuspenseWithOverlay>
            <InvestmentInquiry />
          </SuspenseWithOverlay>
        } />
        <Route path="/partners-inquiry" element={
          <SuspenseWithOverlay>
            <PartnersInquiry />
          </SuspenseWithOverlay>
        } />
        <Route path="/project-inquiry" element={
          <SuspenseWithOverlay>
            <ProjectInquiryPage />
          </SuspenseWithOverlay>
        } />
        <Route path="/sales-inquiry" element={
          <SuspenseWithOverlay>
            <SalesInquiry />
          </SuspenseWithOverlay>
        } />
        <Route path="/technical-consultation" element={
          <SuspenseWithOverlay>
            <TechnicalConsultation />
          </SuspenseWithOverlay>
        } />

        {/* Company Pages */}
        <Route path="/company-projects" element={
          <SuspenseWithOverlay>
            <CompanyProjects />
          </SuspenseWithOverlay>
        } />
        <Route path="/company-partners" element={
          <SuspenseWithOverlay>
            <CompanyPartners />
          </SuspenseWithOverlay>
        } />

        {/* Innovation Lab */}
        <Route path="/innovation-lab" element={
          <SuspenseWithOverlay>
            <InnovationLab />
          </SuspenseWithOverlay>
        } />
        <Route path="/join-innovation-lab" element={
          <SuspenseWithOverlay>
            <JoinInnovationLab />
          </SuspenseWithOverlay>
        } />
        <Route path="/research-development" element={
          <SuspenseWithOverlay>
            <Rnd />
          </SuspenseWithOverlay>
        } />

        {/* Events */}
        <Route path="/events" element={
          <SuspenseWithOverlay>
            <AllEvents />
          </SuspenseWithOverlay>
        } />
        <Route path="/events/register" element={
          <SuspenseWithOverlay>
            <EventRegistration />
          </SuspenseWithOverlay>
        } />

        {/* Service Pages */}
        <Route path="/saas-development" element={
          <SuspenseWithOverlay>
            <SaaSDevelopment />
          </SuspenseWithOverlay>
        } />
        <Route path="/cloud-hosting" element={
          <SuspenseWithOverlay>
            <CloudHosting />
          </SuspenseWithOverlay>
        } />
        <Route path="/ai-solutions" element={
          <SuspenseWithOverlay>
            <AISolutions />
          </SuspenseWithOverlay>
        } />
        <Route path="/ai-research" element={
          <SuspenseWithOverlay>
            <AIResearch />
          </SuspenseWithOverlay>
        } />
        <Route path="/automation" element={
          <SuspenseWithOverlay>
            <Automation />
          </SuspenseWithOverlay>
        } />
        <Route path="/custom-integrations" element={
          <SuspenseWithOverlay>
            <CustomIntegrations />
          </SuspenseWithOverlay>
        } />

        {/* Product Pages */}
        <Route path="/civic-one" element={
          <SuspenseWithOverlay>
            <CivicOne />
          </SuspenseWithOverlay>
        } />
        <Route path="/health-bridge" element={
          <SuspenseWithOverlay>
            <HealthBridge />
          </SuspenseWithOverlay>
        } />
        <Route path="/impact-tracker" element={
          <SuspenseWithOverlay>
            <ImpactTracker />
          </SuspenseWithOverlay>
        } />



        {/* Other Pages */}
        <Route path="/life-at-civora" element={
          <SuspenseWithOverlay>
            <LifeAtCivora />
          </SuspenseWithOverlay>
        } />
        <Route path="/client-success-stories" element={
          <SuspenseWithOverlay>
            <ClientSuccessStories />
          </SuspenseWithOverlay>
        } />
        <Route path="/intern-verification" element={
          <SuspenseWithOverlay>
            <InternVerification />
          </SuspenseWithOverlay>
        } />
        <Route path="/help" element={
          <SuspenseWithOverlay>
            <Help />
          </SuspenseWithOverlay>
        } />

        {/* Auth Routes */}
        <Route path="/login" element={
          <SuspenseWithOverlay>
            <Login />
          </SuspenseWithOverlay>
        } />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={
          <AdminProtectedRoute>
            <SuspenseWithOverlay>
              <AdminLayout />
            </SuspenseWithOverlay>
          </AdminProtectedRoute>
        }>
          <Route index element={
            <SuspenseWithOverlay>
              <Dashboard />
            </SuspenseWithOverlay>
          } />
          <Route path="dashboard" element={
            <SuspenseWithOverlay>
              <AdminDashboard />
            </SuspenseWithOverlay>
          } />
          <Route path="super-admin" element={
            <SuspenseWithOverlay>
              <SuperAdminDashboard />
            </SuspenseWithOverlay>
          } />
          <Route path="users-management" element={
            <SuspenseWithOverlay>
              <UsersManagement />
            </SuspenseWithOverlay>
          } />
          <Route path="sessions" element={
            <SuspenseWithOverlay>
              <Sessions />
            </SuspenseWithOverlay>
          } />
          <Route path="profile" element={
            <SuspenseWithOverlay>
              <Profile />
            </SuspenseWithOverlay>
          } />
          <Route path="settings" element={
            <SuspenseWithOverlay>
              <Settings />
            </SuspenseWithOverlay>
          } />
          <Route path="forms" element={
            <SuspenseWithOverlay>
              <FormSubmissions />
            </SuspenseWithOverlay>
          } />
          <Route path="forms/contact" element={
            <SuspenseWithOverlay>
              <ContactFormsPage />
            </SuspenseWithOverlay>
          } />
          <Route path="forms/calls" element={
            <SuspenseWithOverlay>
              <CallScheduleFormsPage />
            </SuspenseWithOverlay>
          } />
          <Route path="forms/technical" element={
            <SuspenseWithOverlay>
              <TechnicalFormsPage />
            </SuspenseWithOverlay>
          } />
          <Route path="forms/support" element={
            <SuspenseWithOverlay>
              <SupportFormsPage />
            </SuspenseWithOverlay>
          } />
          <Route path="forms/salary" element={
            <SuspenseWithOverlay>
              <SalaryFormsPage />
            </SuspenseWithOverlay>
          } />
          <Route path="forms/investment" element={
            <SuspenseWithOverlay>
              <InvestmentFormsPage />
            </SuspenseWithOverlay>
          } />
          <Route path="forms/partners" element={
            <SuspenseWithOverlay>
              <PartnersFormsPage />
            </SuspenseWithOverlay>
          } />
          <Route path="forms/join-lab" element={
            <SuspenseWithOverlay>
              <JoinLabFormsPage />
            </SuspenseWithOverlay>
          } />
          <Route path="job-applications" element={
            <SuspenseWithOverlay>
              <JobApplications />
            </SuspenseWithOverlay>
          } />
          <Route path="analytics" element={
            <SuspenseWithOverlay>
              <Analytics />
            </SuspenseWithOverlay>
          } />
          <Route path="users" element={
            <SuspenseWithOverlay>
              <Users />
            </SuspenseWithOverlay>
          } />
          <Route path="user-profiles" element={
            <SuspenseWithOverlay>
              <UserProfiles />
            </SuspenseWithOverlay>
          } />
          <Route path="employees" element={
            <SuspenseWithOverlay>
              <Employees />
            </SuspenseWithOverlay>
          } />
          <Route path="interns" element={
            <SuspenseWithOverlay>
              <Interns />
            </SuspenseWithOverlay>
          } />
          <Route path="companies" element={
            <SuspenseWithOverlay>
              <Companies />
            </SuspenseWithOverlay>
          } />
          <Route path="companies-management" element={
            <SuspenseWithOverlay>
              <CompaniesManagement />
            </SuspenseWithOverlay>
          } />
          <Route path="addresses" element={
            <SuspenseWithOverlay>
              <Addresses />
            </SuspenseWithOverlay>
          } />
          <Route path="contacts" element={
            <SuspenseWithOverlay>
              <Contacts />
            </SuspenseWithOverlay>
          } />
          <Route path="documents" element={
            <SuspenseWithOverlay>
              <Documents />
            </SuspenseWithOverlay>
          } />
          <Route path="bank-details" element={
            <SuspenseWithOverlay>
              <BankDetails />
            </SuspenseWithOverlay>
          } />
          <Route path="social-links" element={
            <SuspenseWithOverlay>
              <SocialLinks />
            </SuspenseWithOverlay>
          } />
          <Route path="api-keys" element={
            <SuspenseWithOverlay>
              <APIKeys />
            </SuspenseWithOverlay>
          } />
          <Route path="logs" element={
            <SuspenseWithOverlay>
              <AdminLogs />
            </SuspenseWithOverlay>
          } />
          <Route path="email-history" element={
            <SuspenseWithOverlay>
              <EmailHistory />
            </SuspenseWithOverlay>
          } />
          <Route path="otp-verifications" element={
            <SuspenseWithOverlay>
              <OTPVerifications />
            </SuspenseWithOverlay>
          } />
          <Route path="add-user" element={
            <SuspenseWithOverlay>
              <AddUser />
            </SuspenseWithOverlay>
          } />
        </Route>

        <Route path="/reset-password" element={
          <SuspenseWithOverlay>
            <ResetPasswordPage />
          </SuspenseWithOverlay>
        } />


        {/* Catch-all 404 Route */}
        <Route path="*" element={
          <SuspenseWithOverlay>
            <NotFound />
          </SuspenseWithOverlay>
        } />
      </Routes>
    </NavigationLoadingWrapper>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <SiteVisitLogger />
            <ScrollToTop />
            <SessionManager />
            <AppRoutes />
            <Toaster />
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
