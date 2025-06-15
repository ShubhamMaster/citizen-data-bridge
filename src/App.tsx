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
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/about-us/leadership" element={<Leadership />} />
            <Route path="/about-us/board-of-directors" element={<BoardOfDirectors />} />
            <Route path="/about-us/partners" element={<Partners />} />
            <Route path="/about-us/investors" element={<Investors />} />
            <Route path="/about-us/csr-esg" element={<CSRESG />} />
            <Route path="/about-us/csr-esg/sustainability" element={<Sustainability />} />
            <Route path="/about-us/csr-esg/corporate-responsibility" element={<CorporateResponsibility />} />
            <Route path="/about-us/csr-esg/social-impact" element={<SocialImpact />} />
            {/* Services section */}
            <Route path="/services" element={<Services />} />
            <Route path="/services/ai-solutions" element={<AISolutions />} />
            <Route path="/services/saas-development" element={<SaaSDevelopment />} />
            <Route path="/services/cloud-hosting" element={<CloudHosting />} />
            <Route path="/services/automation" element={<Automation />} />
            <Route path="/services/custom-integrations" element={<CustomIntegrations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/innovation-lab" element={<InnovationLab />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/case-studies" element={<CaseStudies />} />
            <Route path="/projects/client-success-stories" element={<ClientSuccessStories />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
