
import React from "react";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import { Users, Bot, Workflow, BarChart3, LucideProps } from "lucide-react";

const iconMap: { [key: string]: React.FC<LucideProps> } = {
  'smart-portals': Users,
  'ai-grievance': Bot,
  'automation': Workflow,
  'data-analytics': BarChart3,
};

interface Service {
  iconKey: string;
  title: string;
  description: string;
}

const fallbackServices: Service[] = [
  {
    iconKey: 'smart-portals',
    title: "Smart Citizen Portals",
    description: "Engaging platforms connecting citizens with city services seamlessly and efficiently.",
  },
  {
    iconKey: 'ai-grievance',
    title: "AI Grievance Management",
    description: "Intelligent systems to efficiently track, process and resolve public grievances.",
  },
  {
    iconKey: 'automation',
    title: "e-Governance Automation",
    description: "Streamlining administrative processes for enhanced productivity and transparency.",
  },
  {
    iconKey: 'data-analytics',
    title: "Urban Data Analytics",
    description: "Harnessing data insights to drive informed decisions for sustainable development.",
  },
];

const ServicesSection: React.FC = () => {
  const { content, loading } = useWebsiteContent("services");

  if (loading) {
    return (
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="flex items-center justify-center min-h-[320px]">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  const services: Service[] = 
    content?.services && Array.isArray(content.services) && content.services.length > 0
    ? content.services 
    : fallbackServices;

  return (
    <section id="services" className="section-padding bg-gradient-to-b from-background to-muted/30">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Our Core Services
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            We offer a comprehensive suite of digital solutions designed to enhance governance, 
            improve public services, and empower communities through technology.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => {
            const IconComponent = iconMap[service.iconKey];
            return (
              <div 
                key={idx}
                className="group card-clean-hover p-8 text-center animate-fade-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Icon */}
                {IconComponent && (
                  <div className="relative mb-6 mx-auto w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl group-hover:scale-110 transition-transform duration-300"></div>
                    <IconComponent className="relative w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                  </div>
                )}

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Hover Effect */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-purple/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Ready to Transform Your Community?
            </h3>
            <p className="text-muted-foreground mb-6">
              Let's discuss how our solutions can help your organization achieve its goals.
            </p>
            <button className="btn-primary">
              Schedule a Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
