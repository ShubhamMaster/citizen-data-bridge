
import React from "react";
import { usePartners } from "@/hooks/usePartners";
import { Skeleton } from "@/components/ui/skeleton";

const PartnersSection = () => {
  const { data: partners, isLoading, error } = usePartners();

  if (isLoading) {
    return (
      <section className="py-16 bg-primary/5" id="partners">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-10">
            Our Partners
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="w-24 h-24 rounded-full mb-2" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Don't render the section if no partners or error
  if (error || !partners || partners.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-primary/5" id="partners">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-primary mb-10">
          Our Partners
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {partners.map((partner) => (
            <div key={partner.id} className="flex flex-col items-center">
              <img
                src={partner.image_url || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=160&q=80"}
                alt={partner.name}
                className="w-24 h-24 object-cover rounded-full shadow-md border-2 border-accent/30 mb-2"
                loading="lazy"
              />
              <span className="text-sm font-semibold text-primary">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
