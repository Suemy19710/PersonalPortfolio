import React from 'react';
import profile from '../assets/picture_profile.png';    

export default function Introduction() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-16">
      <div className="relative">
        {/* Background Text - Name */}
        <p className="text-center ml-10 text-slate-600 text-2xl mb-1 mf-8" style={{ fontFamily: 'Baskervville, serif', fontStyle: 'italic' }}>
            Hello, I'm
        </p>
        <div className="text-center mb-8">
          <h1 className="text-9xl font-bold text-slate-600/80 mb-4" style={{ fontFamily: 'Baskervville, serif' }}>
            Linh Nguyen
          </h1>
        </div>

        {/* Profile Image Container with surrounding content */}
        <div className="flex justify-center  items-center relative -mt-24 mb-8">
          <div className="flex items-center gap-15 max-w-6xl w-full">
             {/* Left Side Content */}
            <div className="flex-1 text-left gap-15 flex flex-col  justify-between h-80">
              <p 
                className="text-slate-600  text-3xl mb-4"
                style={{ fontFamily: 'Baskervville, serif', fontStyle: 'italic' }}
              >
                Full-stack Developer Student<br />
                AI, Machine learning, data
              </p>
              <button 
                className="text-slate-700 text-2xl mr-4 hover:text-slate-900 transition self-start mb-8"
                style={{ fontFamily: 'Baskervville, serif', fontStyle: 'italic' }}
              >
                MyResume →
              </button>
            </div>
            {/* Center - Profile Image */}
            <div className="relative flex-shrink-0">
              {/* SVG Shape Background */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="550" 
                height="575" 
                viewBox="0 0 686 417" 
                fill="none"
                className="absolute top-0 left-1/2 -translate-x-1/2 z-0"
                preserveAspectRatio="xMidYMid meet"
              >
                <path 
                  d="M686 417H0.12427C0.12427 338.193 -16.7593 0 343.062 0C686 0 686 338.193 686 417Z" 
                  fill="#405879" 
                  fillOpacity="0.5"
                />
              </svg>
              
              {/* Profile Image - positioned in front of SVG */}
              <div className="relative z-10 w-96 h-98">
                <img 
                  src={profile}
                  alt="Linh Nguyen" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            {/* Right Side Content */}
            <div className="flex-1 text-right space-y-8 flex flex-col justify-between h-40">
              {/* Social Handle */}
              <div 
                className="text-slate-600 text-2xl ml-8"
                style={{ fontFamily: 'Baskervville, serif', fontStyle: 'italic' }}
              >
                @Fortys
              </div>
              
              {/* Location Badge */}
              <div className="inline-block mt-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="text-left">
                    <p className="text-slate-700 font-medium" style={{ fontFamily: 'Baskervville, serif' }}>
                      Eindhoven, The Netherlands
                    </p>
                    <p className="text-green-600 flex items-center gap-1" style={{ fontFamily: 'Baskervville, serif' }}>
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      Available for new projects
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}