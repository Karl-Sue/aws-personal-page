import { ProfileHeader } from "../components/ProfileHeader";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";

const profileData = {
  name: "Karl Hoang",
  title: "Junior Software Engineer | Aspiring DevOps Engineer | AWS Certified Developer – Associate",
  location: "Perth, WA",
  email: "tuankhanh17032003@gmail.com",
  phone: "+61478038909",
  linkedIn: "https://www.linkedin.com/in/tuan-khanh-hoang-1a8a9b275/",
  github: "https://github.com/Karl-Sue",
  imageUrl: "/profile.jpg",
  bio: `I am a Software Engineering student at UWA with a strong interest in cloud computing and DevOps. 
        I enjoy building cloud-native and backend applications, have hands-on experience with AWS (Lambda, DynamoDB, IAM, CloudWatch, CI/CD), and am an AWS Certified Developer – Associate. 
        My current focus is on Golang and Python, backend development, automation, and cloud-native system design. 
        I am seeking junior software engineering or DevOps-focused roles to grow my expertise and contribute to real-world production systems.`,
};

const skillCategories = [
  {
    category: "Frontend Development",
    skills: [
      { name: "React", level: "Beginner" as const },
      { name: "TypeScript", level: "Intermediate" as const },
      { name: "Next.js", level: "Intermediate" as const },
      { name: "Tailwind CSS", level: "Beginner" as const },
    ],
  },
  {
    category: "Backend Development",
    skills: [
      { name: "Node.js", level: "Beginner" as const },
      { name: "Python", level: "Intermediate" as const },
      { name: "Golang", level: "Beginner" as const },
      { name: "C#", level: "Beginner" as const },
      { name: "Golang", level: "Beginner" as const },
      { name: "PostgreSQL", level: "Beginner" as const },
      { name: "MongoDB", level: "Beginner" as const },
      { name: "MySQL", level: "Intermediate" as const },
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: [
      { name: "AWS", level: "Beginner" as const },
      { name: "Docker", level: "Intermediate" as const },
      { name: "Kubernetes", level: "Beginner" as const },
      { name: "CI/CD", level: "Beginner" as const },
    ],
  },
  {
    category: "Tools & Methodologies",
    skills: [
      { name: "Git", level: "Intermediate" as const },
      { name: "Agile/Scrum", level: "Beginner" as const },
      { name: "Testing (Jest/Cypress)", level: "Intermediate" as const },
      { name: "Figma", level: "Intermediate" as const },
    ],
  },
];

export function AboutPage() {
  return (
    <div>
      <ProfileHeader {...profileData} />
      <AboutSection bio={profileData.bio} />
      <SkillsSection skillCategories={skillCategories} />
    </div>
  );
}
