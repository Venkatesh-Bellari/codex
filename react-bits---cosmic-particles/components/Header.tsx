import React from 'react';

const ReactLogo: React.FC = () => (
  <svg width="24" height="24" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-white transition-all duration-700 ease-out group-hover:rotate-[360deg] group-hover:scale-125">
    <text x="0" y="1" dominantBaseline="central" textAnchor="middle" fontSize="10" fontFamily="sans-serif" fontWeight="bold" fill="currentColor">₳</text>
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

interface HeaderProps {
  onLogin: () => void;
  onSignup: () => void;
  isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ onLogin, onSignup, isLoggedIn }) => {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-30 w-[95%] max-w-6xl">
      <div className="container mx-auto">
        <div className="flex items-center justify-between bg-[#101018] border border-white/10 rounded-full py-4 px-10 text-lg">
          <a href="#" className="flex items-center font-semibold text-white group">
            <ReactLogo />
            React Bits
          </a>
          <nav className="flex items-center space-x-8 text-base">
            <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-200">Home</a>
            <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-200">About</a>
            <button className="text-gray-300 hover:text-pink-400 transition-colors duration-200">Wallet</button>
            {isLoggedIn ? (
              <div className="flex items-center space-x-3 bg-white/5 border border-white/10 rounded-full py-2 px-4 text-sm">
                <span className="font-mono text-gray-400">0xAbC...123</span>
                <span className="w-px h-4 bg-white/20"></span>
                <span className="font-semibold text-white">1,234.56 ₳</span>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button onClick={onLogin} className="text-gray-300 hover:text-pink-400 transition-colors duration-200">Login</button>
                <button onClick={onSignup} className="bg-gradient-to-br from-indigo-500 to-pink-500 text-white font-semibold py-2 px-5 rounded-full transition-transform duration-300 hover:scale-105">
                  Sign Up
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;