
import React from 'react';
import { Badge } from "@/components/ui/badge";

const IndustriesSection = () => {
  const industries = [
    {
      title: "Government & Public Sector",
      description: "Digital transformation solutions for local, state, and central government bodies.",
      tags: ["E-Governance", "Citizen Services", "Public Administration"]
    },
    {
      title: "Healthcare Organizations",
      description: "Comprehensive healthcare management systems and patient care solutions.",
      tags: ["Hospital Management", "Patient Care", "Health Analytics"]
    },
    {
      title: "NGOs & Non-Profits",
      description: "Technology solutions to amplify social impact and community outreach.",
      tags: ["Community Engagement", "Impact Tracking", "Donor Management"]
    },
    {
      title: "Smart Villages",
      description: "Rural development through technology and digital literacy programs.",
      tags: ["Rural Tech", "Digital Literacy", "Agricultural Solutions"]
    },
    {
      title: "Smart Cities",
      description: "Urban planning and management solutions for sustainable city development.",
      tags: ["Urban Planning", "IoT Solutions", "Traffic Management"]
    }
  ];

  return (
    <section id="industries" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-civora-navy mb-4">Industries We Serve</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Delivering specialized solutions across diverse sectors to drive meaningful change
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {industries.map((industry, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-xl p-8 hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-2xl font-semibold text-civora-navy mb-4">
                {industry.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {industry.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {industry.tags.map((tag, tagIndex) => (
                  <Badge 
                    key={tagIndex} 
                    variant="secondary" 
                    className="bg-civora-teal/10 text-civora-teal hover:bg-civora-teal/20"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
