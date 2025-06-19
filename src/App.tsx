
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import InnovationLab from "./pages/InnovationLab";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import ProjectsPage from "./pages/Projects";
import SmartVillage from "./pages/SmartVillage";
import CivicOne from "./pages/CivicOne";
import HealthBridge from "./pages/HealthBridge";
import UrbanData from "./pages/UrbanData";
import ImpactTracker from "./pages/ImpactTracker";
import CaseStudies from "./pages/CaseStudies";
import ClientSuccessStories from "./pages/ClientSuccessStories";
import LifeAtCivora from "./pages/LifeAtCivora";
import Internships from "./pages/Internships";
import { useLogVisit } from "@/hooks/useLogVisit";
import Leadership from "./pages/Leadership";
import BoardOfDirectors from "./pages/BoardOfDirectors";
import Partners from "./pages/Partners";
import Investors from "./pages/Investors";
import CSRESG from "./pages/CSRESG";
import Sustainability from "./pages/Sustainability";
import CorporateResponsibility from "./pages/CorporateResponsibility";
import SocialImpact from "./pages/SocialImpact";
import AISolutions from "./pages/AISolutions";
import SaaSDevelopment from "./pages/SaaSDevelopment";
import CloudHosting from "./pages/CloudHosting";
import Automation from "./pages/Automation";
import CustomIntegrations from "./pages/CustomIntegrations";
import Rnd from "./pages/Rnd";
import AIResearch from "./pages/AIResearch";
import Patents from "./pages/Patents";
import CareersJobs from "./pages/CareersJobs";
import GDPRCCPA from "./pages/GDPRCCPA";
import ISO from "./pages/ISO";
import DataSecurity from "./pages/DataSecurity";
import Accessibility from "./pages/Accessibility";
import SalesInquiry from "./pages/SalesInquiry";
import HelpCenter from "./pages/HelpCenter";
import TechnicalSupport from "./pages/TechnicalSupport";

const queryClient = new QueryClient();

// This component safely calls useLogVisit inside Router context
function LogVisitEffect() {
  useLogVisit();
  return null;
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LogVisitEffect />
          <Routes>
            <Route path="/" element={<Index />} />
            {/* About section */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/about-us/leadership" element={<Leadership />} />
            <Route path="/leadership" element={<Leadership />} />
            <Route path="/about-us/board-of-directors" element={<BoardOfDirectors />} />
            <Route path="/about-us/partners" element={<Partners />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/about-us/investors" element={<Investors />} />
            <Route path="/investors" element={<Investors />} />
            <Route path="/about-us/csr-esg" element={<CSRESG />} />
            <Route path="/about-us/csr-esg/sustainability" element={<Sustainability />} />
            <Route path="/about-us/csr-esg/corporate-responsibility" element={<CorporateResponsibility />} />
            <Route path="/about-us/csr-esg/social-impact" element={<SocialImpact />} />
            {/* Services section */}
            <Route path="/services" element={<Services />} />
            <Route path="/services/ai-solutions" element={<AISolutions />} />
            <Route path="/ai-solutions" element={<AISolutions />} />
            <Route path="/services/saas-development" element={<SaaSDevelopment />} />
            <Route path="/saas-development" element={<SaaSDevelopment />} />
            <Route path="/services/cloud-hosting" element={<CloudHosting />} />
            <Route path="/cloud-hosting" element={<CloudHosting />} />
            <Route path="/services/automation" element={<Automation />} />
            <Route path="/automation" element={<Automation />} />
            <Route path="/services/custom-integrations" element={<CustomIntegrations />} />
            <Route path="/custom-integrations" element={<CustomIntegrations />} />
            {/* Contact & Support */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/contact/sales" element={<SalesInquiry />} />
            <Route path="/sales-inquiry" element={<SalesInquiry />} />
            <Route path="/support/help-center" element={<HelpCenter />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/support/technical-support" element={<TechnicalSupport />} />
            <Route path="/technical-support" element={<TechnicalSupport />} />
            {/* Careers */}
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/jobs" element={<CareersJobs />} />
            <Route path="/careers/life" element={<LifeAtCivora />} />
            <Route path="/careers/internships" element={<Internships />} />
            {/* Innovation */}
            <Route path="/innovation-lab" element={<InnovationLab />} />
            <Route path="/innovation-lab/rnd" element={<Rnd />} />
            <Route path="/innovation-lab/ai-research" element={<AIResearch />} />
            <Route path="/innovation-lab/patents" element={<Patents />} />
            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* Legal */}
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/accessibility" element={<Accessibility />} />
            {/* Projects */}
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/projects/client-success-stories" element={<ClientSuccessStories />} />
            <Route path="/client-success-stories" element={<ClientSuccessStories />} />
            {/* Legacy project routes */}
            <Route path="/projects/smart-village" element={<SmartVillage />} />
            <Route path="/projects/civic-one" element={<CivicOne />} />
            <Route path="/projects/health-bridge" element={<HealthBridge />} />
            <Route path="/projects/urban-data" element={<UrbanData />} />
            <Route path="/projects/impact-tracker" element={<ImpactTracker />} />
            {/* Legal & Compliance additional subpages */}
            <Route path="/compliance/gdpr" element={<GDPRCCPA />} />
            <Route path="/gdpr" element={<GDPRCCPA />} />
            <Route path="/compliance/ccpa" element={<GDPRCCPA />} />
            <Route path="/compliance/iso" element={<ISO />} />
            <Route path="/iso" element={<ISO />} />
            <Route path="/compliance/security" element={<DataSecurity />} />
            <Route path="/data-security" element={<DataSecurity />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
