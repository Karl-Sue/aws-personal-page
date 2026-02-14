import { Briefcase } from "lucide-react";
import { Card } from "./ui/card";

interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  achievements?: string[];
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-serif text-3xl font-bold mb-8 text-gray-900">Experience</h2>
        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <Card key={idx} className="p-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="font-serif text-xl font-bold">{exp.position}</h3>
                    <span className="text-sm text-gray-500">{exp.period}</span>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">{exp.company}</p>
                  <p className="text-gray-700 mb-3">{exp.description}</p>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {exp.achievements.map((achievement, achIdx) => (
                        <li key={achIdx}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
