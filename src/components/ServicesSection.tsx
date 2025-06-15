
import React from "react";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";

const ServicesSection: React.FC = () => {
  const { content, loading } = useWebsiteContent("services");

  if (loading) {
    return (
      <section className="min-h-[220px] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-civora-teal rounded-full border-t-transparent" />
      </section>
    );
  }

  // Parse comma-separated, or array from backend
  const services: string[] =
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
    <section className="px-4 py-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-6 text-civora-navy">Our Services</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {services.length === 0 ? (
          <p className="text-gray-500">No services available yet.</p>
        ) : (
          services.map((service, idx) => (
            <div
              key={service + idx}
              className="bg-white shadow rounded-lg p-4 min-w-[220px] border border-civora-teal/10"
            >
              <span className="block text-civora-teal font-medium">{service}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
