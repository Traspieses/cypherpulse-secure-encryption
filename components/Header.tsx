
import React from 'react';
import { Lock } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="relative w-full py-8 mb-8 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1/2 h-full bg-cyan-500 blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 flex flex-col items-center justify-center relative z-10">
        <div className="bg-slate-900 p-4 rounded-full border border-cyan-500/50 mb-4 animate-pulse shadow-[0_0_20px_rgba(6,182,212,0.5)]">
          <Lock className="w-10 h-10 text-cyan-400" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black font-sci-fi tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500">
          CypherPulse
        </h1>
        <p className="mt-2 text-cyan-400/70 font-medium tracking-[0.2em] uppercase text-sm md:text-base">
          Secure Protocol // AES-GCM Encryption
        </p>
      </div>
    </header>
  );
};

export default Header;
