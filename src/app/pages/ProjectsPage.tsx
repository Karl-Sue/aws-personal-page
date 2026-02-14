import { ProjectsSection } from "../components/ProjectsSection";

const projects = [
  {
    title: "Game Dev UWA",
    description:
      "community-focused platform built to streamline communication and engagement for the UWA Game Development Club membership.",
    technologies: ["Next.js", "Django", "Sqlite3"],
    link: "",
    github: "https://github.com/codersforcauses/game-dev",
  },
  {
    title: "Project Nexus",
    description:
      "A lightweight collaboration platform for research & project teams",
    technologies: ["Next.js", "TypeScript", ".NET", "Tailwind CSS", "PostgreSQL"],
    link: "",
    github: "https://github.com/ThanhVinhTong/project-nexus",
  },
  {
    title: "Jewelry Builder",
    description:
      "Interactive board for small to medium jewelry businesses to prototype their product to customers",
    technologies: ["Next.js", "TypeScript", "Node.js", "Flask", "Docker"],
    github: "https://github.com/Karl-Sue/Jewelry-Builder",
  },
];

export function ProjectsPage() {
  return (
    <div className="py-12 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="font-serif text-5xl font-bold mb-8 text-gray-900">Projects</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            A showcase of my recent work and open source contributions
          </p>
        </div>
        <ProjectsSection projects={projects} />
      </div>
    </div>
  );
}
