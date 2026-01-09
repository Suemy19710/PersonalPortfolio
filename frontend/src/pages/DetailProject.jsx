import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

export default function ProjectDetail() {
  const { slug } = useParams(); 
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const BACKEND_URL = 'http://localhost:5000';

    const fetchProject = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/projects`);
        const projects = await res.json();
        const found = projects.find(p => {
          const projectSlug = p.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
          return projectSlug === slug;
        });
        setProject(found || null);
      } catch (err) {
        setError('Failed to load project');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-slate-600">
        Loading project...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-6">
        <h2 className="text-4xl font-bold text-slate-700">Project not found</h2>
        <Link to="/" className="text-blue-600 hover:underline flex items-center gap-2" style={{ fontFamily: 'Baskervville, serif' }}>
          <ArrowLeft size={20} /> Back to Homepage
        </Link>
      </div>
    );
  }

  const { title, projectType, role, projectSector, tools, techStack, context, targetCustomer, goal, effortAndContributions, projectUrl, githubUrl, status } = project;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#DABCBC] to-[#EBE2E2]">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-8 pt-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 transition text-xl" 
          style={{ fontFamily: 'Baskervville, serif' }}
        >
          <ArrowLeft size={15} />
          Homepage
        </Link>
      </div>

      {/* Hero Title */}
      <section className="relative max-w-7xl mx-auto px-8 py-20 text-center">
        <h1
          className="text-6xl md:text-8xl font-bold text-slate-700/30"
          style={{ fontFamily: 'Baskervville, serif' }}
        >
          {title}
        </h1>
        <h2
          className="absolute bottom-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl md:text-5xl italic text-slate-700"
          style={{ fontFamily: 'Baskervville, serif' }}
        >
          {title}
        </h2>
      </section>

      {/* Project Meta */}
      <section className="max-w-6xl mx-auto px-8 mb-16">
        <div className="bg-slate-700/90 text-white rounded-3xl p-8 shadow-xl" style={{ fontFamily: 'Baskervville, serif' }}>
          <div className="grid md:grid-cols-3 gap-6 text-lg" style={{ fontFamily: 'Baskervville, serif' }}>
            <div>
              <strong>Project Type:</strong> {projectType === 'Individual' ? 'Team/Individual' : projectType}
            </div>
            <div>
              <strong>Role:</strong> {role || 'What mainly I did'}
            </div>
            <div>
              <strong>Project Sector:</strong> {projectSector || 'Full-stack Dev / Machine Learning / Data Science'}
            </div>
          </div>
          {(tools?.length > 0 || techStack?.length > 0) && (
            <div className="mt-6 pt-6 border-t border-slate-300">
              <strong>Tools / Tech Stack:</strong>{' '}
              {[...(tools || []), ...(techStack || [])].join(' • ') || 'Not specified'}
            </div>
          )}
        </div>
      </section>

      {/* Section: Context */}
      <SectionWrapper label="Context" align="left">
        <div className="max-w-4xl space-y-8">
          <p className="text-xl md:text-2xl leading-relaxed text-slate-700" style={{ fontFamily: 'Baskervville, serif' }}>
            {context.description}
          </p>
          {context.pictures?.length > 0 && <ImageGallery images={context.pictures} />}
        </div>
      </SectionWrapper>

      {/* Section: Target Customer */}
      <SectionWrapper label="Target Customer" align="right">
        <div className="max-w-4xl ml-auto space-y-8">
          <p className="text-xl md:text-2xl leading-relaxed text-slate-700 text-right" style={{ fontFamily: 'Baskervville, serif' }}>
            {targetCustomer.description}
          </p>
          {targetCustomer.pictures?.length > 0 && <ImageGallery images={targetCustomer.pictures} alignRight />}
        </div>
      </SectionWrapper>

      {/* Section: Goal */}
      <SectionWrapper label="Goal" align="left">
        <div className="max-w-4xl space-y-8">
          <p className="text-xl md:text-2xl leading-relaxed text-slate-700" style={{ fontFamily: 'Baskervville, serif' }}>
            {goal.description}
          </p>
          {goal.pictures?.length > 0 && <ImageGallery images={goal.pictures} />}
        </div>
      </SectionWrapper>

      {/* Section: Effort & Contributions */}
      <SectionWrapper label="Effort & Contributions" align="right">
        <div className="max-w-4xl ml-auto space-y-8">
          <p className="text-xl md:text-2xl leading-relaxed text-slate-700 text-right" style={{ fontFamily: 'Baskervville, serif' }}>
            {effortAndContributions.description}
          </p>
          {effortAndContributions.pictures?.length > 0 && <ImageGallery images={effortAndContributions.pictures} alignRight />}
        </div>
      </SectionWrapper>

      {/* Links */}
      {(projectUrl || githubUrl) && (
        <section className="max-w-6xl mx-auto px-8 py-20 text-center space-y-6">
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {projectUrl && (
              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-slate-800 text-white px-8 py-4 rounded-full text-lg hover:bg-slate-700 transition shadow-lg"
              >
                <ExternalLink size={24} />
                View Live Project
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border-2 border-slate-800 text-slate-800 px-8 py-4 rounded-full text-lg hover:bg-slate-800 hover:text-white transition shadow-lg"
              >
                <Github size={24} />
                View Source Code
              </a>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

// Reusable Section with label (no rotation)
function SectionWrapper({ label, align = 'left', children }) {
  const isRight = align === 'right';
  
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Section Label - positioned at the edge */}
      <div 
        className={`absolute top-8 ${isRight ? 'right-8' : 'left-8'}`}
        style={{ zIndex: 0 }}
      >
        {/* Large background text */}
        <h3 
          className="text-8xl md:text-7xl font-bold text-slate-700/30 whitespace-nowrap select-none" 
          style={{ fontFamily: 'Baskervville, serif' }}
        >
          {label}
        </h3>
        
        {/* Small foreground italic text */}
        <h4 
          className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl md:text-3xl italic text-slate-600 whitespace-nowrap"
          style={{ fontFamily: 'Baskervville, serif' }}
        >
          {label}
        </h4>
        
        {/* Decorative underline */}
        <div className="absolute left-2/3 -translate-x-1/2 bg-slate-500 h-2 w-28 bottom-0 translate-y-3"></div>
      </div>

      {/* Content with proper spacing */}
      <div 
        className="relative px-8 max-w-7xl mx-auto pt-20"
        style={{ zIndex: 10 }}
      >
        {children}
      </div>
    </section>
  );
}

// Image Gallery
function ImageGallery({ images, alignRight }) {
  const BACKEND_URL = 'http://localhost:5000';
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${alignRight ? 'md:ml-auto' : ''} max-w-4xl`}>
      {images.map((img, i) => (
        <img
          key={i}
          src={`${BACKEND_URL}${img.url}`}
          alt={img.caption || `Project image ${i + 1}`}
          className="rounded-xl shadow-lg w-full object-cover hover:scale-105 transition duration-300"
        />
      ))}
    </div>
  );
}