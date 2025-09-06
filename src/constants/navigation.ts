
import { ROUTES } from "./routes";

export type NavSubGroup = {
  label: string;
  items: { label: string; href: string }[];
};

export type NavMainItem = {
  label: string;
  href?: string;
  subGroups?: NavSubGroup[];
};

export const NAVIGATION: NavMainItem[] = [
  {
    label: "Home",
    href: ROUTES.home,
  },
  {
    label: "About & Company",
    subGroups: [
      {
        label: "Company Info",
        items: [
          { label: "About Us", href: ROUTES.aboutUs },
          { label: "Leadership", href: ROUTES.leadership },
          { label: "Board of Directors", href: ROUTES.boardOfDirectors },
          { label: "Partners", href: ROUTES.partners },
          { label: "Investors", href: ROUTES.investors },
        ],
      },
      {
        label: "Policies",
        items: [
          { label: "Privacy Policy", href: ROUTES.privacy },
          { label: "Terms & Conditions", href: ROUTES.terms },
          { label: "Accessibility", href: ROUTES.accessibility },
        ],
      },
    ],
  },
  {
    label: "Services & Innovation",
    subGroups: [
      {
        label: "Our Services",
        items: [
          { label: "Services Overview", href: ROUTES.services },
          { label: "AI Solutions", href: ROUTES.aiSolutions },
          { label: "SaaS Development", href: ROUTES.saasDevelopment },
          { label: "Custom Integrations", href: ROUTES.customIntegrations },
        ],
      },
      {
        label: "Innovation Lab",
        items: [
          { label: "Innovation Lab", href: ROUTES.innovationLab },
          { label: "R&D", href: ROUTES.rnd },
          { label: "AI Research", href: ROUTES.aiResearch },
          { label: "Patents", href: ROUTES.patents },
        ],
      },
    ],
  },
  {
    label: "Careers & Projects",
    subGroups: [
      {
        label: "Careers",
        items: [
          { label: "Careers Overview", href: ROUTES.careers },
          { label: "Job Openings", href: ROUTES.jobsOpening },
          { label: "Life at Civora", href: ROUTES.lifeAtCivora },
          { label: "Internships", href: ROUTES.internships },
        ],
      },
      {
        label: "Projects",
        items: [
          { label: "Projects Overview", href: ROUTES.projects },
          { label: "Case Studies", href: ROUTES.caseStudies },
          { label: "Client Success Stories", href: ROUTES.clientSuccessStories },
        ],
      },
    ],
  },
  {
    label: "Support & Compliance",
    subGroups: [
      {
        label: "Contact & Help",
        items: [
          { label: "Contact", href: ROUTES.contact },
          { label: "Sales Inquiry", href: ROUTES.salesInquiry },
          { label: "Help Center", href: ROUTES.help },
        ],
      },
      {
        label: "Compliance",
        items: [
          { label: "ISO Certifications", href: ROUTES.iso },
          { label: "Data Security", href: ROUTES.dataSecurity },
        ],
      },
    ],
  },
];
