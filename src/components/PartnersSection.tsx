
import React from "react";

const partners = [
  {
    name: "CityHealth",
    img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=160&q=80",
  },
  {
    name: "CivicOne",
    img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=160&q=80",
  },
  {
    name: "GlobalReach",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=160&q=80",
  },
  {
    name: "OpenGov",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=160&q=80",
  },
];

const PartnersSection = () => (
  <section className="py-16 bg-civora-navy/5" id="partners">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-civora-navy mb-10">
        Our Partners
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {partners.map((partner) => (
          <div key={partner.name} className="flex flex-col items-center">
            <img
              src={partner.img}
              alt={partner.name}
              className="w-24 h-24 object-cover rounded-full shadow-md border-2 border-civora-teal/30 mb-2"
              loading="lazy"
            />
            <span className="text-sm font-semibold text-civora-navy">{partner.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PartnersSection;

