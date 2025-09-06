export const ROUTES = {
  // Public Routes
  home: "/",
  about: "/about",
  aboutUs: "/about", // Redirect from /about-us to /about
  services: "/services",
  
  // AI & Solutions
  aiSolutions: "/ai-solutions",
   
  aiResearch: "/ai-research",
  
  // SaaS Services
  saasDevelopment: "/saas-development",
  
  saasProject: "/saas-project", // Redirect to saas-development
  
  // Other Services
  automation: "/automation",
  cloudHosting: "/cloud-hosting",
  customIntegrations: "/custom-integrations",
  
  // Projects & Case Studies
  projects: "/projects",
  projectDetails: "/projects/:id",
  caseStudies: "/case-studies",
  caseStudyDetail: "/case-studies/:id",
  clientSuccessStories: "/client-success-stories",
  
  // Company Information
  leadership: "/leadership",
  boardOfDirectors: "/board-of-directors",
  partners: "/partners",
  investors: "/investors",
  
  // Innovation & Research
  innovationLab: "/innovation-lab",
  joinInnovationLab: "/join-innovation-lab",
  joinLab: "/join-lab", // Alternative route
  rnd: "/rnd",
  patents: "/patents",
  
  // Products
  civicOne: "/civicone",
  healthBridge: "/healthbridge",
  
  // Events
  allEvents: "/all-events",
  eventRegistration: "/event-registration/:eventId",
  
  // Careers
  careers: "/careers",
  jobsOpening: "/jobs-opening",
  lifeAtCivora: "/life-at-civora",
  internships: "/internships",
  internVerification: "/intern-verification",
  
  // Contact & Support
  contact: "/contact",
  salesInquiry: "/sales-inquiry",
  help: "/help",
  
  // Inquiries
  investmentInquiry: "/investment-inquiry",
  partnersInquiry: "/partners-inquiry",
  projectInquiry: "/project-inquiry",
  
  // Corporate
  corporateResponsibility: "/corporate-responsibility",
  csrEsg: "/csr-esg",
  impactTracker: "/impact-tracker",
  
  // Legal & Compliance
  privacy: "/privacy",
  terms: "/terms",
  accessibility: "/accessibility",
  dataSecurity: "/data-security",
  iso: "/iso",
  
  // Authentication
  login: "/login",
  auth: "/login", // Redirect from /auth to /login
  
  // Admin Routes
  admin: "/admin",
  adminDashboard: "/admin/dashboard",
  adminAnalytics: "/admin/analytics",
  
  // Admin - User Management
  adminUsers: "/admin/users",
  adminUsersManagement: "/admin/users-management",
  adminUserProfiles: "/admin/user-profiles",
  adminSessions: "/admin/sessions",
  adminLogs: "/admin/admin-logs",
  adminOtpVerifications: "/admin/otp-verifications",
  
  // Admin - Company Management
  adminCompanies: "/admin/companies",
  adminContacts: "/admin/contacts",
  adminAddresses: "/admin/addresses",
  adminDocuments: "/admin/documents",
  adminBankDetails: "/admin/bank-details",
  adminSocialLinks: "/admin/social-links",
  
  // Admin - HR & Talent
  adminEmployees: "/admin/employees",
  adminInterns: "/admin/interns",
  adminJobApplications: "/admin/job-applications",
  
  // Admin - Forms & Inquiries
  adminContactForms: "/admin/contact-forms",
  
  adminInvestmentForms: "/admin/investment-forms",
  adminPartnersForms: "/admin/partners-forms",
  adminCallScheduleForms: "/admin/call-schedule-forms",
  adminJoinLabForms: "/admin/join-lab-forms",
  adminSupportForms: "/admin/support-forms",
  adminTechnicalForms: "/admin/technical-forms",
  adminFormSubmissions: "/admin/form-submissions",
  
  // Admin - Projects & Partners
  adminCompanyProjects: "/admin/company-projects",
  adminCompanyPartners: "/admin/company-partners",
  
  // Admin - System
  adminApiKeys: "/admin/api-keys",
  
  // 404
  notFound: "*"
};

// Helper function to get route with parameters
export const getRouteWithParams = (route: string, params: Record<string, string>) => {
  let finalRoute = route;
  Object.entries(params).forEach(([key, value]) => {
    finalRoute = finalRoute.replace(`:${key}`, value);
  });
  return finalRoute;
};

// Route redirects mapping
export const ROUTE_REDIRECTS = {
  "/about-us": "/about",
  "/auth": "/login",
  "/saas-project": "/saas-development",
  "/join-lab": "/join-innovation-lab"
};
