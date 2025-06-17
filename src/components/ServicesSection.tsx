
import React from "react";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import { Users, Bot, Workflow, BarChart3, LucideProps, ArrowRight } from "lucide-react";

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
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex items-center justify-center min-h-[320px]">
            <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
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
    <section id="services" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-6 py-3 mb-6 font-medium">
            Our Core Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Transforming Communities Through Technology
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            We offer a comprehensive suite of digital solutions designed to enhance governance, 
            improve public services, and empower communities through cutting-edge technology.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, idx) => {
            const IconComponent = iconMap[service.iconKey];
            return (
              <div 
                key={idx}
                className="group bg-white border border-gray-100 rounded-2xl p-8 text-center animate-fade-in hover:shadow-glow hover:border-accent/20 transition-all duration-300"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Icon */}
                {IconComponent && (
                  <div className="relative mb-8 mx-auto w-20 h-20 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-blue-500/10 to-purple-500/10 rounded-2xl group-hover:scale-110 transition-transform duration-300"></div>
                    <IconComponent className="relative w-10 h-10 text-accent group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                  </div>
                )}

                {/* Content */}
                <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Hover Effect */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-1 bg-gradient-to-r from-accent to-blue-500 mx-auto rounded-full"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-2xl p-10 max-w-3xl mx-auto border border-gray-100">
            <h3 className="text-3xl font-bold text-primary mb-4">
              Ready to Transform Your Community?
            </h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Let's discuss how our innovative solutions can help your organization achieve its digital transformation goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary flex items-center gap-3 justify-center">
                Schedule a Consultation
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="btn-secondary justify-center">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
