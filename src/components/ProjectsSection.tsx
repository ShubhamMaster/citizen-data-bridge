
import React from "react";

type Project = {
  name: string;
  description: string;
  link: string;
};

const projects: Project[] = [
  {
    name: "Smart Village Platform",
    description: "Empowering rural communities with digital solutions for education, health, and governance.",
    link: "/projects/smart-village",
  },
  {
    name: "CivicOne Portal",
    description: "A unified portal bringing together city services for citizens and administrators.",
    link: "/projects/civicone",
  },
  {
    name: "HealthBridge",
    description: "Seamless health information exchange and patient engagement system.",
    link: "/projects/healthbridge",
  },
  {
    name: "Urban Data Insight",
    description: "Data analytics platform for smarter urban planning and traffic management.",
    link: "/projects/urban-data",
  },
  {
    name: "NGO Impact Tracker",
    description: "A suite for NGOs to measure, showcase, and increase their social impact.",
    link: "/projects/impact-tracker",
  },
];

const ProjectsSection = () => (
  <section id="projects" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-civora-navy mb-4">Our Projects</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore key technology initiatives and platforms delivered by Civora Nexus
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project) => (
          <a
            href={project.link}
            key={project.name}
            className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-200 flex flex-col group border border-civora-teal/10 hover:border-civora-teal"
          >
            <h3 className="text-2xl font-semibold text-civora-teal mb-3 group-hover:underline">
              {project.name}
            </h3>
            <p className="text-gray-600">{project.description}</p>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
