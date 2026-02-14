import { ExperienceSection } from "../components/ExperienceSection";

const experiences = [
  {
    company: "Coder for Causes",
    position: "Junior Full Stack Developer",
    period: "Nov 2025 - Feb 2026",
    description:
      `Designed and developed a full-stack web application for the University of Western Australia 
      Game Development Club, collaborating within a cross-functional development team to deliver 
      a functional and user-focused solution.`,
    achievements: [
      "Designed and implemented the frontend using Figma, translating user requirements into intuitive UI components",
      "Architected and developed the backend and database layer using the Django framework",
      "Collaborated closely with frontend and backend developers to ensure seamless system integration",
      "Identified, debugged, and resolved application issues to meet functional and user experience requirements",
    ],
  },
  {
    company: "Volunteer Software Engineer",
    position: "Full Stack Developer",
    period: "Aug 2025 - Nov 2025",
    description:
      "Developed an internal system enabling employees to access and utilise company research resources.",
    achievements: [
      "Database and Frontend Design: Assisted in designing database schemas with ASP.NET (C#) and setting up the frontend with Next.js",
      "System Security & Data Integrity: Contributed to improving system security while ensuring data structure accuracy and integrity",
      "Bug Identification and Resolution: Helped identify existing bugs and implemented effective solutions to improve reliability",
      `System Design Participation: Collaborated in defining architecture and system-level design decisions`,
    ],
  }
];

export function ExperiencePage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="font-serif text-5xl font-bold mb-8 text-gray-900">Experience</h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            A comprehensive overview of my professional journey
          </p>
        </div>
        <ExperienceSection experiences={experiences} />
      </div>
    </div>
  );
}
