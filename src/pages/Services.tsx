
import React from "react";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import { Card } from "@/components/ui/card";

type ServiceType = {
  title: string;
  description: string;
  // Optionally, add icon or image here in the future
};

function transformServiceContent(content: any): ServiceType[] {
  // If the backend has a new structure (array of objects)
  if (Array.isArray(content?.services) && content.services.every((s: any) => s.title && s.description)) {
    return content.services;
  }

  // If backend is still comma-separated string, provide title only
  if (typeof content?.services === "string") {
    return content.services.split(",").map((s: string) => ({
      title: s.trim(),
      description: "",
    })).filter(s => !!s.title);
  }

  // Fallback: hardcoded detailed services
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
    <section className="min-h-[70vh] bg-gray-50 text-civora-navy py-16 px-4 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-civora-teal text-center">
        Our Services
      </h1>
      <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl">
        Discover how Civora Nexus empowers organizations and communities with cutting-edge solutions in civic and healthcare domains.
      </p>
      {loading && (
        <div className="animate-spin h-10 w-10 border-4 border-civora-teal rounded-full border-t-transparent mb-12" />
      )}
      <div className="w-full max-w-5xl grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {services.length === 0 && !loading ? (
          <div className="col-span-full text-center text-gray-500">
            No services available at this time.
          </div>
        ) : (
          services.map((service, idx) => (
            <Card
              key={service.title + idx}
              className="bg-white shadow-md border-civora-teal/10 hover:shadow-lg transition-transform hover:scale-105 min-h-[220px] flex flex-col items-center justify-center text-civora-navy text-lg py-8 px-5 font-semibold"
            >
              <div className="w-full flex flex-col items-center gap-2">
                <div className="text-civora-teal text-2xl font-bold mb-2 text-center">
                  {service.title}
                </div>
                <div className="text-gray-700 font-normal text-base text-center leading-relaxed">
                  {service.description || (
                    <span className="text-gray-400 italic">No description provided yet.</span>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </section>
  );
};

export default Services;

