import React from 'react';
import Introduction from '../components/Introduction';
import AboutMe from '../components/AboutMe';  
import Skills from '../components/Skills';   

const Homepage = () => {
    return(
        <div className="min-h-screen bg-gradient-to-r from-[#DABCBC] to-[#EBE2E2]">
            <nav className="pt-8 px-4">
                <div className="max-w-6xl mx-auto">
                <div className="bg-slate-500/60 backdrop-blur-sm rounded-full px-8 py-4 flex justify-center gap-12"
                    style={{ fontFamily: 'Baskervville, serif', fontStyle: 'bold'}}>
                    <a href="#home" className="text-white text-lg hover:text-pink-100 transition">Home</a>
                    <a href="#projects" className="text-white text-lg hover:text-pink-100 transition">Projects</a>
                    <a href="#about" className="text-white text-lg hover:text-pink-100 transition">About me</a>
                </div>
                </div>
            </nav>

            <Introduction />
            <AboutMe /> 
            <Skills />  

        </div>
    )
}
export default Homepage;    