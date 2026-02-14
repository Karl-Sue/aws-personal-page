import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { AboutPage } from "./pages/AboutPage";
import { ExperiencePage } from "./pages/ExperiencePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { BlogPage } from "./pages/BlogPage";
import { PostDetailPage } from "./pages/PostDetailPage";
import { EducationPage } from "./pages/EducationPage";
import { ContactPage } from "./pages/ContactPage";
import { useEffect } from "react";

function AppContent() {
  const navigate = useNavigate();

  useEffect(() => {
    // Handle redirect from 404.html
    const redirect = sessionStorage.getItem('redirect');
    if (redirect) {
      sessionStorage.removeItem('redirect');
      // Give React Router time to initialize, then navigate
      setTimeout(() => {
        navigate(redirect, { replace: true });
      }, 0);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:postId" element={<PostDetailPage />} />
        <Route path="/education" element={<EducationPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-auto">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2026 Karl Hoang. Available for new opportunities.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}