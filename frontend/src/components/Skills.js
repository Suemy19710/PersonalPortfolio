import React from 'react';  
export default function Skills(){
    return(
        <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="relative mb-16">
          <h2 className="text-8xl font-bold text-slate-700/30 -rotate-90 origin-top-left absolute -left-20 top-40" style={{ fontFamily: 'Baskervville, serif' }}>Skills</h2>
        </div>  
        <div className="relative mt-24">
          <h3 className="text-3xl italic text-slate-700 mb-8 " style={{ fontFamily: 'Baskervville, serif' }}>Skills</h3>
            <div 
                className="absolute text-center ml-4 bg-[#405879]" 
                style={{ 
                width: '100px', 
                height: '7px', 
                top: '35px',
                flexShrink: 0 
                }}
            ></div>        
          <p className="text-slate-600 mb-8 text-2xl" style={{ fontFamily: 'Baskervville, serif' }}>The skills, tools, technologies I'm learning and working with projects:</p>
          
          <div className="bg-slate-600/80 backdrop-blur-sm rounded-3xl p-12">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-around items-center flex-wrap gap-8 mb-10">
                {/* JavaScript */}
                <div className="text-center">
                    <div className="w-20 h-20 bg-yellow-400 rounded-lg flex items-center justify-center mb-3 mx-auto">
                    <span className="text-black text-3xl font-bold">JS</span>
                    </div>
                    <p className="text-white">Javascript</p>
                </div>
                
                {/* MongoDB */}
                <div className="text-center">
                    <div className="w-20 h-20 flex items-center justify-center mb-3 mx-auto">
                    <div className="text-green-500 text-5xl">🍃</div>
                    </div>
                    <p className="text-white">MongoDB</p>
                </div>
                
                {/* React */}
                <div className="text-center">
                    <div className="w-20 h-20 flex items-center justify-center mb-3 mx-auto">
                    <div className="text-cyan-400 text-5xl">⚛️</div>
                    </div>
                    <p className="text-white">React</p>
                </div>
                
                {/* Git */}
                <div className="text-center">
                    <div className="w-20 h-20 flex items-center justify-center mb-3 mx-auto">
                    <div className="text-orange-500 text-5xl">◆</div>
                    </div>
                    <p className="text-white">Git</p>
                </div>
                
                {/* Node.js */}
                <div className="text-center">
                    <div className="w-20 h-20 flex items-center justify-center mb-3 mx-auto">
                    <div className="text-green-400 text-5xl">⬡</div>
                    </div>
                    <p className="text-white">Node.js</p>
                </div>

                
                </div>
                      <div className="flex justify-around items-center flex-wrap gap-8">
                {/* JavaScript */}
                <div className="text-center">
                    <div className="w-20 h-20 bg-yellow-400 rounded-lg flex items-center justify-center mb-3 mx-auto">
                    <span className="text-black text-3xl font-bold">JS</span>
                    </div>
                    <p className="text-white">Javascript</p>
                </div>
                
                {/* MongoDB */}
                <div className="text-center">
                    <div className="w-20 h-20 flex items-center justify-center mb-3 mx-auto">
                    <div className="text-green-500 text-5xl">🍃</div>
                    </div>
                    <p className="text-white">MongoDB</p>
                </div>
                
                {/* React */}
                <div className="text-center">
                    <div className="w-20 h-20 flex items-center justify-center mb-3 mx-auto">
                    <div className="text-cyan-400 text-5xl">⚛️</div>
                    </div>
                    <p className="text-white">React</p>
                </div>
                
                {/* Git */}
                <div className="text-center">
                    <div className="w-20 h-20 flex items-center justify-center mb-3 mx-auto">
                    <div className="text-orange-500 text-5xl">◆</div>
                    </div>
                    <p className="text-white">Git</p>
                </div>
                
                {/* Node.js */}
                <div className="text-center">
                    <div className="w-20 h-20 flex items-center justify-center mb-3 mx-auto">
                    <div className="text-green-400 text-5xl">⬡</div>
                    </div>
                    <p className="text-white">Node.js</p>
                </div>

                
                </div>
            </div>
          </div>
        </div>
      </section>
    )
} 