
import React from "react";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import { Card } from "@/components/ui/card";

const Services: React.FC = () => {
  const { content, loading } = useWebsiteContent("services");

  let services: string[] =
    Array.isArray(content?.services)
      ? content.services
      : typeof content?.services === "string"
      ? content.services.split(",").map((s: string) => s.trim()).filter(Boolean)
      : [
          "Smart Citizen Portals",
          "AI-powered Public Grievance Management",
          "e-Governance Automation",
          "Urban Data Analytics",
        ];

  return (
    <section className="min-h-[70vh] bg-gray-50 text-civora-navy py-16 px-4 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-civora-teal text-center">
        Our Services
      </h1>
      <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl">
        Explore how Civora Nexus empowers organizations and communities with innovation and technology in the civic and healthcare domain.
      </p>
      {loading && (
        <div className="animate-spin h-10 w-10 border-4 border-civora-teal rounded-full border-t-transparent mb-12" />
      )}
      <div className="w-full max-w-5xl grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.length === 0 && !loading ? (
          <div className="col-span-full text-center text-gray-500">No services available at this time.</div>
        ) : (
          services.map((service, idx) => (
            <Card key={service + idx} className="bg-white shadow-md border-civora-teal/10 transition-transform hover:scale-105 min-h-[120px] flex items-center justify-center text-civora-navy text-lg py-8 px-4 font-semibold">
              {service}
            </Card>
          ))
        )}
      </div>
    </section>
  );
};
export default Services;
