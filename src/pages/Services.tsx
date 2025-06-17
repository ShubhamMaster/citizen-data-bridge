import React from "react";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SaveHereSection from "@/components/SaveHereSection";

type ServiceType = {
  title: string;
  description: string;
};

function transformServiceContent(content: any): ServiceType[] {
  if (Array.isArray(content?.services) && content.services.every((s: any) => s.title && s.description)) {
    return content.services;
  }
  if (typeof content?.services === "string") {
    return content.services.split(",").map((s: string) => ({
      title: s.trim(),
      description: "",
    })).filter(s => !!s.title);
  }
  return [
    {
      title: "Smart Citizen Portals",
      description:
        "Empowering governments and municipalities with intuitive digital platforms for citizen engagement, service delivery, and public information management. Seamlessly integrate e-services, feedback mechanisms, and community features customized for civic needs.",
    },
    {
      title: "AI-powered Public Grievance Management",
      description:
        "Leverage AI-driven tools to automate, track, and resolve public grievances efficiently. Civora Nexus provides real-time analytics, categorization, and intelligent escalation workflows to improve transparency and response times.",
    },
    {
      title: "e-Governance Automation",
      description:
        "Modernize government processes with workflow automation, digital approvals, and integrated record-keeping. Enhance governance efficiency and data security with Civora’s scalable automation suite.",
    },
    {
      title: "Urban Data Analytics",
      description:
        "Turn urban data into actionable insights! Our solution aggregates city data for policy-makers and businesses, offering interactive dashboards, pattern discovery, and predictive analytics for better urban planning.",
    },
    {
      title: "Healthcare Information Systems",
      description:
        "Advanced digital systems for clinics, hospitals, and public health programs—from secure patient records to appointment scheduling, telemedicine, and analytics. Designed for healthcare organizations moving towards digital transformation.",
    },
  ];
}

const Services: React.FC = () => {
  const { content, loading } = useWebsiteContent("services");
  const services: ServiceType[] = transformServiceContent(content);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <section className="flex-1 min-h-[70vh] bg-gray-50 text-civora-navy py-16 px-4 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-civora-teal text-center">
          Our Services
        </h1>
        <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl">
          Discover how Civora Nexus empowers organizations and communities with cutting-edge solutions in civic and healthcare domains.
        </p>
        {loading && (
          <div className="animate-spin h-10 w-10 border-4 border-civora-teal rounded-full border-t-transparent mb-12" />
        )}
        <div className="w-full max-w-6xl grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.length === 0 && !loading ? (
            <div className="col-span-full text-center text-gray-500">
              No services available at this time.
            </div>
          ) : (
            services.map((service, idx) => (
              <Card
                key={service.title + idx}
                className="bg-white border border-civora-teal/20 shadow-lg hover:shadow-xl hover:-translate-y-1 hover:border-civora-teal/50 transition-all duration-200 ease-in-out rounded-2xl overflow-hidden flex flex-col"
              >
                <CardHeader className="pb-2 px-6 pt-6">
                  <CardTitle className="text-civora-teal text-xl font-bold text-center">
                    {service.title}
                  </CardTitle>
                  {service.description && (
                    <CardDescription className="text-gray-600 text-base text-center mt-2">
                      {service.description}
                    </CardDescription>
                  )}
                </CardHeader>
                {/* Add separator and more visual cues if needed */}
                <CardContent className="mt-auto pb-6 pt-2 px-6 flex flex-col items-center">
                  {/* Potential space for action buttons, icons etc in future */}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>
      <SaveHereSection />
      <Footer />
    </div>
  );
};

export default Services;
