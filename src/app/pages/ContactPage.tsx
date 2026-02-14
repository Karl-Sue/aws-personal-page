import { Card } from "../components/ui/card";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";

const contactInfo = {
  email: "tuankhanh17032003@gmail.com",
  phone: "+61478038909",
  location: "Perth, WA",
  linkedIn: "https://www.linkedin.com/in/tuan-khanh-hoang-1a8a9b275/",
  github: "https://github.com/Karl-Sue",
};

export function ContactPage() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-5xl font-bold mb-6 text-gray-900">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-700 mb-12 leading-relaxed">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg text-gray-900 mb-1">Email</h3>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg text-gray-900 mb-1">Phone</h3>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-gray-600 hover:text-gray-900"
                >
                  {contactInfo.phone}
                </a>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg text-gray-900 mb-1">Location</h3>
                <p className="text-gray-600">{contactInfo.location}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Linkedin className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg text-gray-900 mb-1">LinkedIn</h3>
                <a
                  href={contactInfo.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  View Profile
                </a>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-8">
          <h2 className="font-serif text-3xl font-bold mb-8 text-gray-900">
            Contact Information
          </h2>
          <div className="flex justify-center gap-4">
            <a
              href={contactInfo.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
            <a
              href={contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
