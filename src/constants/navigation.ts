
export type NavItem = {
  label: string;
  href?: string;
  children?: NavItem[];
};

export const NAVIGATION: NavItem[] = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "About",
    children: [
      { label: "About Us", href: "/about-us" },
      { label: "Leadership", href: "/about-us/leadership" },
      { label: "Board of Directors", href: "/about-us/board-of-directors" },
      { label: "Partners", href: "/about-us/partners" },
      { label: "Investors", href: "/about-us/investors" }
    ]
  },
  {
    label: "Services",
    children: [
      { label: "Services", href: "/services" },
      { label: "AI Solutions", href: "/services/ai-solutions" },
      { label: "SaaS Development", href: "/services/saas-development" },
      { label: "Cloud Hosting", href: "/services/cloud-hosting" },
      { label: "Automation", href: "/services/automation" },
      { label: "Custom Integrations", href: "/services/custom-integrations" }
    ]
  },
  {
    label: "Projects",
    children: [
      { label: "Projects", href: "/projects" },
      { label: "Case Studies", href: "/projects/case-studies" },
      { label: "Client Success Stories", href: "/projects/client-success-stories" }
    ]
  },
  {
    label: "Innovation Lab",
    children: [
      { label: "Innovation Lab", href: "/innovation-lab" },
      { label: "R&D", href: "/innovation-lab/rnd" },
      { label: "AI Research", href: "/innovation-lab/ai-research" },
      { label: "Patents", href: "/innovation-lab/patents" }
    ]
  },
  {
    label: "Careers",
    children: [
      { label: "Careers", href: "/careers" },
      { label: "Job Openings", href: "/careers/jobs" },
      { label: "Life at Civora", href: "/careers/life" },
      { label: "Internships", href: "/careers/internships" }
    ]
  },
  {
    label: "Legal & Compliance",
    children: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "GDPR / CCPA", href: "/compliance/gdpr" },
      { label: "ISO Certifications", href: "/compliance/iso" },
      { label: "Data Security", href: "/compliance/security" },
      { label: "Accessibility", href: "/compliance/accessibility" }
    ]
  },
  {
    label: "Contact & Support",
    children: [
      { label: "Contact", href: "/contact" },
      { label: "Sales Inquiry", href: "/contact/sales" },
      { label: "Help Center", href: "/support/help-center" },
      { label: "Technical Support", href: "/support/technical-support" }
    ]
  }
];
