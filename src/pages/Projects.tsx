
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SaveHereSection from "@/components/SaveHereSection";
import { Link } from "react-router-dom";

const projects = [
  {
    name: "Case Studies",
    path: "/projects/case-studies",
    description: "Deep dives into our most impactful projects and what made them successful."
  },
  {
    name: "Client Success Stories",
    path: "/projects/client-success-stories",
    description: "Real-world outcomes from clients who've used Civora Nexus solutions."
  }
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-civora-navy mb-6">Projects</h1>
        <p className="text-lg text-gray-700 mb-10">
          Explore our case studies and client stories showcasing the impact of Civora Nexus.
        </p>
        <ul className="space-y-7">
          {projects.map((proj) => (
            <li key={proj.path}>
              <Link to={proj.path} className="block bg-gray-50 border border-civora-teal/10 hover:border-civora-teal rounded-xl px-6 py-6 transition-shadow shadow-sm hover:shadow-lg group">
                <h2 className="text-2xl text-civora-teal font-bold mb-2 group-hover:underline">{proj.name}</h2>
                <p className="text-gray-600">{proj.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SaveHereSection />
      <Footer />
    </div>
  );
}
