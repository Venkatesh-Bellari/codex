import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Showcase from './components/Showcase';
import CTA from './components/CTA';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';

const App: React.FC = () => {
  const [modal, setModal] = useState<'login' | 'signup' | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setModal(null);
  };
  
  const openLogin = () => setModal('login');
  const openSignup = () => setModal('signup');
  const closeModal = () => setModal(null);

  const switchToSignup = () => setModal('signup');
  const switchToLogin = () => setModal('login');

  return (
    <div className="bg-[#0d0d0d] text-white min-h-screen flex flex-col font-sans">
      <Header onLogin={openLogin} onSignup={openSignup} isLoggedIn={isLoggedIn} />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Showcase />
        <CTA />
      </main>
      <Footer />

      {modal === 'login' && (
        <LoginModal
          onClose={closeModal}
          onSwitchToSignup={switchToSignup}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {modal === 'signup' && (
        <SignupModal
          onClose={closeModal}
          onSwitchToLogin={switchToLogin}
        />
      )}
    </div>
  );
};

export default App;
