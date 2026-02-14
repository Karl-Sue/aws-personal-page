import { Mail, MapPin, Phone, Linkedin, Github } from "lucide-react";

interface ProfileHeaderProps {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedIn?: string;
  github?: string;
  imageUrl: string;
}

export function ProfileHeader({
  name,
  title,
  location,
  email,
  phone,
  linkedIn,
  github,
  imageUrl,
}: ProfileHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <img
              src={imageUrl}
              alt={name}
              className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white"></div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="font-serif text-4xl font-bold mb-2">{name}</h1>
            <p className="text-xl text-gray-700 font-light mb-4">{title}</p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${email}`} className="hover:text-blue-600">
                  {email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{phone}</span>
              </div>
            </div>

            <div className="flex gap-3 mt-4 justify-center md:justify-start">
              {linkedIn && (
                <a
                  href={linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              )}
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
