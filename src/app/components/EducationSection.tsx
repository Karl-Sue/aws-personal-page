import { GraduationCap } from "lucide-react";
import { Card } from "./ui/card";

interface Education {
  school: string;
  degree: string;
  field: string;
  period: string;
  description?: string;
}

interface EducationSectionProps {
  education: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-serif text-3xl font-bold mb-8 text-gray-900">
          Education
        </h2>
        <div className="space-y-4">
          {education.map((edu, idx) => (
            <Card key={idx} className="p-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="font-serif text-xl font-bold">{edu.degree}</h3>
                    <span className="text-sm text-gray-500">{edu.period}</span>
                  </div>
                  <p className="text-lg text-gray-700">{edu.school}</p>
                  {edu.description && (
                    <p className="text-gray-600">{edu.description}</p>
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
