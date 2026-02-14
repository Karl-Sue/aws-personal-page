import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

interface Skill {
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

interface SkillsSectionProps {
  skillCategories: SkillCategory[];
}

export function SkillsSection({ skillCategories }: SkillsSectionProps) {
  const getLevelColor = (level?: string) => {
    switch (level) {
      case "Expert":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "Advanced":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Intermediate":
        return "bg-green-100 text-green-800 border-green-300";
      case "Beginner":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-serif text-3xl font-bold mb-8 text-gray-900">
          Skills & Technologies
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, idx) => (
            <Card key={idx} className="p-6">
              <h3 className="font-serif text-xl font-semibold mb-3 text-gray-900">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIdx) => (
                  <Badge
                    key={skillIdx}
                    variant="outline"
                    className={getLevelColor(skill.level)}
                  >
                    {skill.name}
                    {skill.level && (
                      <span className="ml-1 text-xs opacity-75">
                        ({skill.level})
                      </span>
                    )}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
