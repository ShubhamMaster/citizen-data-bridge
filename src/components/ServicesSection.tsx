
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Heart, BarChart3, Settings, Users, Code } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: <Building className="h-8 w-8 text-civora-teal" />,
      title: "Civic Apps",
      description: "Digital solutions for citizen engagement, public services, and government transparency."
    },
    {
      icon: <Heart className="h-8 w-8 text-civora-teal" />,
      title: "Healthcare Tools",
      description: "Innovative healthcare management systems and patient care solutions."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-civora-teal" />,
      title: "Public Dashboards",
      description: "Real-time data visualization and analytics for informed decision making."
    },
    {
      icon: <Settings className="h-8 w-8 text-civora-teal" />,
      title: "White-Label SaaS",
      description: "Customizable software solutions tailored to your organization's needs."
    },
    {
      icon: <Users className="h-8 w-8 text-civora-teal" />,
      title: "Consulting",
      description: "Expert guidance on digital transformation and technology implementation."
    },
    {
      icon: <Code className="h-8 w-8 text-civora-teal" />,
      title: "Innovation Labs",
      description: "Hackathons, pilot projects, and community-driven innovation initiatives."
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-civora-navy mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive technology solutions designed to enhance public services and citizen experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md"
            >
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-xl text-civora-navy">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
