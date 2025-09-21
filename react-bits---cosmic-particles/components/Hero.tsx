
import React from 'react';
import Particles from './Particles';

const WandIcon: React.FC = () => (
 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
    <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L11.8 9.2a1.21 1.21 0 0 0 0 1.72l8.84 8.84a1.21 1.21 0 0 0 1.72 0l1.28-1.28a1.21 1.21 0 0 0 0-1.72zM11 13l-8.3 8.3a1 1 0 0 0 1.4 1.4L13 11m6-6l-3.5 3.5"/>
 </svg>
);

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Particles
          particleCount={200}
          particleSpread={20}
          speed={0.03}
          particleBaseSize={20}
          sizeRandomness={0.5}
          moveParticlesOnHover={true}
          particleHoverFactor={0.1}
          disableRotation={false}
          currencySymbols={['₳', '$', '€', '£', '¥', '₹']}
          currencyColors={['#60A5FA', '#34D399', '#FBBF24', '#F87171', '#A78BFA', '#FFFFFF']}
          symbolRotationSpeed={0.2}
          backgroundColor="#0d0d0d"
        />
      </div>
      <div className="relative z-10 p-8 flex flex-col items-center">
        <button className="flex items-center bg-black/20 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 text-xs text-gray-300 mb-6 hover:border-white/20 transition-colors">
            <WandIcon />
            New Background
        </button>

        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-white leading-tight tracking-tight">
            Mint, send, and redeem
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500">
              NFT Gift Cards on Cardano
            </span>
        </h2>
        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          Transparent, unique, and fraud-proof.
        </p>
        
        <div className="flex space-x-4">
            <button className="bg-gradient-to-br from-indigo-500 to-pink-500 text-white font-semibold py-2.5 px-6 rounded-full transition-transform duration-300 hover:scale-105 shadow-lg">
                Get Started
            </button>
            <button className="bg-white/10 text-white font-semibold py-2.5 px-6 rounded-full transition-colors duration-300 hover:bg-white/20 border border-white/10">
                Learn More
            </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
