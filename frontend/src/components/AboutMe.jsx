import React from 'react';  
export default function AboutMe() {
    return (
        <section className="max-w-6xl mx-auto px-20 py-16">
        <div className="relative flex flex-col items-center">
          <h2 className="text-8xl font-bold text-slate-700/30 text-center right-0" style={{ fontFamily: 'Baskervville, serif' }}>About me</h2>
          <h3 className="text-3xl italic text-slate-700 top-12 absolute " style={{ fontFamily: 'Baskervville, serif' }}>About me</h3>
            <div 
                className="absolute text-center mr-9 bg-[#334155]" 
                style={{ 
                width: '133px', 
                height: '7px', 
                top: '90px',
                flexShrink: 0 
                }}
            ></div>        
        </div>
        
        <div className="mt-1 space-y-6 text-slate-700 text-2xl leading-relaxed max-w-4xl" style={{ fontFamily: 'Baskervville, serif' }}>
          <p>
            I'm Nhat Khanh Linh Nguyen, a second-year ICT & Software Engineering student with a passion for full-stack development, AI, machine learning, and data science. Originally from Vietnam, I'm currently studying internationally and embracing every opportunity to expand my technical expertise.
          </p>
          <p>
            I welcome challenges and am driven by curiosity - constantly learning new technologies and methodologies to build better solutions. Whether it's developing individual projects or collaborating with clients, I'm committed to turning ideas into impactful results.
          </p>
        </div>
      </section>

    )
}