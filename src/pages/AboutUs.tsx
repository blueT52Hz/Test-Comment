// src/pages/AboutUs.tsx
import Header from "@/components/Header";
import { FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function AboutUs() {
  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <div className="prose max-w-none">
          <p>
            We are a passionate group of developers and tech enthusiasts from
            the Proptit Club. Our mission is to share knowledge and inspire
            others in the world of programming and technology.
          </p>
          <h2>Connect with us:</h2>
          <div className="flex space-x-4">
            <a
              href="https://github.com/proptit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={32} />
            </a>
            <a
              href="https://facebook.com/proptit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={32} />
            </a>
            <a
              href="https://linkedin.com/company/proptit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={32} />
            </a>
          </div>
          <h2>About Proptit Club</h2>
          <p>
            Proptit Club is a community of students passionate about programming
            and technology. We organize workshops, hackathons, and create
            content to help our members grow their skills and knowledge.
          </p>
        </div>
      </main>
    </div>
  );
}
