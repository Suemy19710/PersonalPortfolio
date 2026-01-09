import React from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';

export default function ContactSection() {
  const contactInfo = {
    email: "n.nguyennhatkhanhlinh@student.fontys.nl",
    github: "https://github.com/Suemy19710", 
    linkedin: "https://www.linkedin.com/in/linh-nguyen-nhat-khanh-377666357/" 
  };

  return (
    <div>
      {/* Contact Section */}
      <section className="relative py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Title */}
            <div className="relative">
              <h2 
                className="text-5xl md:text-6xl font-bold text-slate-700 mb-4"
                 style={{ fontFamily: 'Baskervville, serif' }}
              >
                Lets
              </h2>
              <h3 
                className="text-6xl md:text-8xl italic text-slate-700/40"
                 style={{ fontFamily: 'Baskervville, serif' }}
              >
                Get in touch!
              </h3>
            </div>

            {/* Right: Contact Info */}
            <div className="space-y-6">
              {/* Email */}
              <ContactItem 
                icon={<Mail size={24} />}
                label="Email"
                value={contactInfo.email}
                href={`mailto:${contactInfo.email}`}
              />

                {/* GitHub */}
              <ContactItem 
                icon={<Github size={24} />}
                label="GitHub"
                value="View my repositories"
                href={contactInfo.github}
                external
              />

              {/* LinkedIn */}
              <ContactItem 
                icon={<Linkedin size={24} />}
                label="LinkedIn"
                value="Connect with me"
                href={contactInfo.linkedin}
                external
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-700 text-white py-6 mt-20">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-sm">
            © 2025 | All right reserved by Linh Nguyen
          </p>
        </div>
      </footer>
    </div>
  );
}

// Contact Item Component
function ContactItem({ icon, label, value, href, external }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group"
    >
      {/* Icon */}
      <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-white group-hover:bg-slate-800 transition-colors">
        {icon}
      </div>

      {/* Text */}
      <div className="flex-1">
        <p className="text-sm text-slate-500 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
          {label}
        </p>
        <p className="text-lg text-slate-700 font-medium" style={{ fontFamily: 'Georgia, serif' }}>
          {value}
        </p>
      </div>

      {/* Arrow indicator for external links */}
      {external && (
        <div className="text-slate-400 group-hover:text-slate-600 transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 15L15 5M15 5H8M15 5V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </a>
  );
}