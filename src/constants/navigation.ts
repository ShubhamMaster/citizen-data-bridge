
export type NavItem = {
  label: string;
  href?: string;
  children?: NavItem[];
};

export const NAVIGATION: NavItem[] = [
  {
    label: "About",
    children: [
      { label: "Company Profile", href: "/about/company-profile" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Board of Directors", href: "/about/board" },
      { label: "Partners", href: "/about/partners" },
      { label: "Investors", href: "/about/investors" },
      {
        label: "Careers",
        children: [
          { label: "Job Openings", href: "/careers/jobs" },
          { label: "Life at Civora", href: "/careers/life" },
          { label: "Internships", href: "/careers/internships" },
        ],
      },
      {
        label: "CSR & ESG",
        children: [
          { label: "Sustainability", href: "/csr/sustainability" },
          { label: "Corporate Responsibility", href: "/csr/corporate-responsibility" },
          { label: "Social Impact", href: "/csr/social-impact" },
        ],
      },
    ],
  },
  {
    label: "Services",
    children: [
      { label: "AI Solutions", href: "/services/ai-solutions" },
      { label: "SaaS Development", href: "/services/saas-development" },
      { label: "Cloud Hosting", href: "/services/cloud-hosting" },
      { label: "Automation", href: "/services/automation" },
      { label: "Custom Integrations", href: "/services/custom-integrations" },
      {
        label: "Innovation Lab",
        children: [
          { label: "R&D", href: "/innovation/rnd" },
          { label: "AI Research", href: "/innovation/ai-research" },
          { label: "Patents", href: "/innovation/patents" },
        ],
      },
    ]
  },
  {
    label: "Projects",
    children: [
      { label: "Case Studies", href: "/projects/case-studies" },
      { label: "Client Success Stories", href: "/projects/success-stories" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Blog", href: "/resources/blog" },
      { label: "Webinars", href: "/resources/webinars" },
      { label: "Whitepapers", href: "/resources/whitepapers" },
      { label: "Documentation", href: "/resources/documentation" },
      { label: "Developer Portal", href: "/resources/developer-portal" },
    ],
  },
  {
    label: "Legal & Compliance",
    children: [
      { label: "Terms of Service", href: "/compliance/terms" },
      { label: "Privacy Policy", href: "/compliance/privacy" },
      { label: "GDPR / CCPA", href: "/compliance/gdpr" },
      { label: "ISO Certifications", href: "/compliance/iso" },
      { label: "Data Security", href: "/compliance/security" },
      { label: "Accessibility", href: "/compliance/accessibility" },
    ],
  },
  {
    label: "Contact & Support",
    children: [
      { label: "Contact Us", href: "/contact" },
      { label: "Sales Inquiry", href: "/contact/sales" },
      { label: "Help Center", href: "/support/help-center" },
      { label: "Technical Support", href: "/support/technical" },
      { label: "Customer Support", href: "/contact/support" },
      {
        label: "Media",
        children: [
          { label: "Newsroom", href: "/media/newsroom" },
          { label: "Awards", href: "/media/awards" },
          { label: "Media Kit", href: "/media/media-kit" },
          { label: "Events", href: "/media/events" },
        ],
      },
    ],
  },
];
