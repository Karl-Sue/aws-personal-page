import { Card } from "./ui/card";

interface AboutSectionProps {
  bio: string;
}

export function AboutSection({ bio }: AboutSectionProps) {
  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-serif text-3xl font-bold mb-6 text-gray-900">About Me</h2>
        <Card className="p-6">
          <p className="text-gray-700 leading-relaxed text-lg">{bio}</p>
        </Card>
      </div>
    </section>
  );
}
