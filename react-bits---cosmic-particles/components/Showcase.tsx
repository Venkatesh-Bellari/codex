import React, { useState } from 'react';
import Particles from './Particles';
import Controls from './Controls';

const Showcase: React.FC = () => {
  const [particleCount, setParticleCount] = useState(100);
  const [speed, setSpeed] = useState(0.02);
  const [particleBaseSize, setParticleBaseSize] = useState(15);

  const codeString = `
import Particles from './Particles';

const MyComponent = () => (
  <div className="relative h-64">
    <Particles
      particleCount={${particleCount}}
      speed={${speed.toFixed(3)}}
      particleBaseSize={${particleBaseSize}}
      currencySymbols={['₳']}
      currencyColors={['#61DAFB']}
      backgroundColor="#000000"
    />
  </div>
);
  `;

  return (
    <section className="py-20 px-4 bg-black/20">
      <div className="container mx-auto max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 rounded-lg overflow-hidden border border-white/10">
            <Particles
                particleCount={particleCount}
                particleSpread={10}
                speed={speed}
                particleBaseSize={particleBaseSize}
                sizeRandomness={0.8}
                moveParticlesOnHover={true}
                particleHoverFactor={0.05}
                disableRotation={false}
                currencySymbols={['₳']}
                currencyColors={['#61DAFB']}
                symbolRotationSpeed={0.3}
                backgroundColor="#000000"
                className="showcase-particles"
              />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-4">Simple Integration</h2>
            <p className="text-gray-400 mb-6">
              Drop the <code>Particles</code> component anywhere in your application. Pass props to customize the look and feel. It's that easy.
            </p>
            <div className="bg-[#1e1e1e] rounded-lg p-4 border border-white/10 mb-8">
              <pre>
                <code className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                  {codeString.trim()}
                </code>
              </pre>
            </div>
             <Controls
              count={particleCount}
              setCount={setParticleCount}
              speed={speed}
              setSpeed={setSpeed}
              size={particleBaseSize}
              setSize={setParticleBaseSize}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;