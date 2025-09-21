import React from 'react';

const CTA: React.FC = () => {
  return (
    <section className="py-20 px-4 text-center">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Ready to Create Your Own Cosmos?
        </h2>
        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
          Start building beautiful, interactive backgrounds for your React applications today. It's free and open-source.
        </p>
        <button className="bg-gradient-to-br from-indigo-500 to-pink-500 text-white font-semibold py-3 px-8 rounded-full transition-transform duration-300 hover:scale-105 shadow-lg text-lg">
          Get Started Now
        </button>
      </div>
    </section>
  );
};

export default CTA;