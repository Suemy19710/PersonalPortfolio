import React from 'react';
import Introduction from '../components/Introduction';
import AboutMe from '../components/AboutMe';  
import Skills from '../components/Skills';
import ProjectsAndTestimonials from '../components/Projects&Testimonial';   
import Contact from '../components/Contact';

const Homepage = () => {
    return(
        <div className="min-h-screen bg-gradient-to-r from-[#DABCBC] to-[#EBE2E2]">
            <nav className="pt-8 px-4">
                <div className="max-w-6xl mx-auto">
                <div className="bg-slate-700 backdrop-blur-sm rounded-full px-8 py-4 flex justify-center gap-12"
                    style={{ fontFamily: 'Baskervville, serif', fontStyle: 'bold'}}>
                    <a href="/" className="text-white text-lg hover:text-pink-100 transition">Home</a>
                    <a href="#projects" className="text-white text-lg hover:text-pink-100 transition">Projects</a>
                    <a href="#aboutme" className="text-white text-lg hover:text-pink-100 transition">About me</a>
                </div>
                </div>
            </nav>

            <Introduction />
            <div id="aboutme">
                <AboutMe /> 
            </div>
            <Skills />  
            <div id="projects">
                <ProjectsAndTestimonials />
            </div>
            <Contact/>
        </div>
    )
}
export default Homepage;    