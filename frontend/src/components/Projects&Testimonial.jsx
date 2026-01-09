import React, { useState, useEffect } from 'react';
import { ExternalLink, User } from 'lucide-react';

export default function ProjectsAndTestimonials() {
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const BACKEND_URL = 'http://localhost:5000';
    
    // Fetch projects
    fetch(`${BACKEND_URL}/api/projects`)
      .then(res => res.json())
      .then(data => setProjects(data.slice(0, 3))) // Show first 3 projects
      .catch(err => console.error('Failed to load projects:', err));

    // Fetch testimonials
    fetch(`${BACKEND_URL}/api/testimonials`)
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(err => console.error('Failed to load testimonials:', err));
  }, []);

  return (
    <div className="mt-20 mb-20">
      {/* Projects Section */}
      <ProjectsSection projects={projects} />
      
      {/* Testimonials Section */}
      <TestimonialsSection testimonials={testimonials} />
    </div>
  );
}

// Projects Section Component
function ProjectsSection({ projects }) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      {/* Section Title - Rotated on the right */}
        <div className="relative mb-16">
          <h2 className="text-8xl font-bold text-slate-700/30 -rotate-90 origin-top-right absolute right-20 top-40" style={{ fontFamily: 'Baskervville, serif' }}>Projects</h2>
        </div>  
        <div className="relative mt-24">
          <h3 className="text-3xl italic text-slate-700 right-20 mb-8 " style={{ fontFamily: 'Baskervville, serif' }}>Projects</h3>
            <div 
                className="absolute text-center ml-4 bg-[#334155]" 
                style={{ 
                width: '100px', 
                height: '7px', 
                top: '35px',
                flexShrink: 0 
                }}
            ></div>        

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-8 pr-32">
        <div className="grid grid-cols-1 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

// Individual Project Card
function ProjectCard({ project }) {
  const BACKEND_URL = 'http://localhost:5000';
  const projectSlug = project.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  
  return (
    <div className="grid md:grid-cols-2 gap-8 bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      {/* Left: Image */}
      <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 p-8">
        {project.coverImage ? (
          <img 
            src={`${BACKEND_URL}${project.coverImage}`} 
            alt={project.title}
            className="w-full h-full object-contain rounded-lg"
          />
        ) : (
          <div className="flex items-center justify-center h-64 text-slate-400">
            <span className="text-lg" style={{ fontFamily: 'Baskervville, serif' }}>
              {project.title}
            </span>
          </div>
        )}
      </div>

      {/* Right: Project Info */}
      <div className="bg-slate-800 text-white p-8 flex flex-col justify-between">
        <div>
          <h3 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: 'Baskervville, serif' }}
          >
            {project.title}
          </h3>
          <p className="text-slate-300 mb-6 leading-relaxed">
            {project.context?.description?.substring(0, 150) || 'Project description...'}...
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.projectType && (
              <span className="px-3 py-1 bg-slate-700 rounded-full text-sm">
                {project.projectType}
              </span>
            )}
            {project.tools?.slice(0, 3).map((tool, i) => (
              <span key={i} className="px-3 py-1 bg-slate-700 rounded-full text-sm">
                {tool}
              </span>
            ))}
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[...(project.tools || []), ...(project.techStack || [])]
              .slice(0, 4)
              .map((tech, i) => (
                <span key={i} className="px-4 py-2 border border-slate-600 rounded-full text-sm">
                  {tech}
                </span>
              ))}
          </div>
        </div>

        {/* View Project Link */}
        <a
          href={`/projects/${projectSlug}`}
          className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition mt-4"
        >
          <ExternalLink size={20} />
          <span>View Project</span>
        </a>
      </div>
    </div>
  );
}

// Testimonials Section Component
function TestimonialsSection({ testimonials }) {
  // Mock testimonials if none provided
  const mockTestimonials = [
    {
      name: "John Doe",
      role: "Founder",
      company: "YoiCoin",
      content: "Dipi weli come! I am really impressed. Clean UI, very good at what he does. I would recommend Sugar and he was perfect for the future for technical consulting."
    },
    {
      name: "John Doe",
      role: "Founder",
      company: "AuCoin",
      content: "Read guy. Highly recommended for any COOKS E4 flash news development job! HLL skills are top-notch and he will be delivering quality work."
    },
    {
      name: "John Doe",
      role: "Freelancer",
      company: "",
      content: "Sugar was extremely easy and pleasant to work with and he is very caring about the project being a success and has gone the extra mile to help finish my MERN stack application without any issues."
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : mockTestimonials;

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 
          className="text-7xl md:text-8xl font-bold text-slate-400/20 mb-4"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Testimonials
        </h2>
        <h3 
          className="text-3xl md:text-4xl italic text-slate-700 -mt-16"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Testimonials
        </h3>
        <p className="text-lg text-slate-600 mt-8 max-w-2xl mx-auto" style={{ fontFamily: 'Georgia, serif' }}>
          Nice things people, teachers, teammates said about me.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {displayTestimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Individual Testimonial Card
function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-slate-800 text-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">

      {/* Quote */}
      <p className="text-slate-300 text-center mb-8 leading-relaxed min-h-[120px]">
        "{testimonial.content}"
      </p>

      {/* Author Info */}
      <div className="text-center border-t border-slate-700 pt-6">
        <p className="font-bold text-lg mb-1" style={{ fontFamily: 'Georgia, serif' }}>
          {testimonial.name}
        </p>
        <p className="text-slate-400 text-sm">
          {testimonial.role} {testimonial.company && `• ${testimonial.company}`}
        </p>
      </div>
    </div>
  );
}