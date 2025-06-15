
import React from "react";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import { Users, BotMessageSquare, Workflow, BarChart3, LucideProps } from "lucide-react";

// Map icon keys to actual components for dynamic rendering
const iconMap: { [key: string]: React.FC<LucideProps> } = {
  'smart-portals': Users,
  'ai-grievance': BotMessageSquare,
  'automation': Workflow,
  'data-analytics': BarChart3,
};

// Define a type for our service objects for better type safety
interface Service {
  iconKey: string;
  title: string;
  description: string;
}

// Provide a professional fallback service list if none is fetched from the backend
const fallbackServices: Service[] = [
    {
      iconKey: 'smart-portals',
      title: "Smart Citizen Portals",
      description: "Engaging platforms connecting citizens with city services seamlessly.",
    },
    {
      iconKey: 'ai-grievance',
      title: "AI Grievance Management",
      description: "Intelligent systems to efficiently track and resolve public grievances.",
    },
    {
      iconKey: 'automation',
      title: "e-Governance Automation",
      description: "Streamlining administrative processes for enhanced productivity and transparency.",
    },
    {
      iconKey: 'data-analytics',
      title: "Urban Data Analytics",
      description: "Harnessing data to drive informed decisions for sustainable urban development.",
    },
];

const ServicesSection: React.FC = () => {
  const { content, loading } = useWebsiteContent("services");

  if (loading) {
    return (
      <section className="min-h-[320px] flex items-center justify-center bg-gray-50">
        <div className="animate-spin h-8 w-8 border-4 border-civora-teal rounded-full border-t-transparent" />
      </section>
    );
  }

  // Use services from content if available and valid, otherwise use the fallback
  const services: Service[] = 
    content?.services && Array.isArray(content.services) && content.services.length > 0
    ? content.services 
    : fallbackServices;

  return (
    <section className="px-4 py-20 md:py-28 bg-gray-50/70">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-civora-navy">
          Our Core Services
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-16 max-w-3xl mx-auto">
          We offer a suite of digital solutions designed to enhance governance, improve public services, and empower communities.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => {
            const IconComponent = iconMap[service.iconKey];
            return (
              <div 
                key={idx}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-transparent hover:border-civora-teal/30 flex flex-col items-center"
              >
                {IconComponent && (
                  <div className="bg-civora-teal/10 p-4 rounded-full mb-6 ring-8 ring-civora-teal/5">
                    <IconComponent className="w-8 h-8 text-civora-teal" strokeWidth={1.5} />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-civora-navy mb-3">{service.title}</h3>
                <p className="text-gray-500 text-base leading-relaxed flex-grow">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
