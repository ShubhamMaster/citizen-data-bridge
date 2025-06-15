import React from "react";
import { Link } from "react-router-dom";

// Duplicate project list from ProjectsSection for consistency.
// You should keep these in sync or use a single source of truth in the future.
const projects = [
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

const ProjectsPage = () => (
  <div className="max-w-5xl mx-auto px-4 pt-16 pb-24">
    <div className="text-center mb-14">
      <h1 className="text-4xl font-bold text-civora-navy mb-4">All Projects</h1>
      <p className="text-lg text-gray-600">
        Discover technology initiatives from Civora Nexus. Click a project to learn more!
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project) => (
        <Link
          to={project.link}
          key={project.name}
          className="block bg-gray-50 rounded-xl p-6 border border-civora-teal/10 hover:border-civora-teal hover:shadow-xl group transition duration-200"
        >
          <h2 className="text-2xl font-semibold text-civora-teal mb-2 group-hover:underline">
            {project.name}
          </h2>
          <p className="text-gray-600">{project.description}</p>
        </Link>
      ))}
    </div>
  </div>
);

export default ProjectsPage;
