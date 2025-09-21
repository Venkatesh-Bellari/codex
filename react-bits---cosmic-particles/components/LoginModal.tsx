import React, { useState } from 'react';
import Modal from './Modal';

interface LoginModalProps {
  onClose: () => void;
  onSwitchToSignup: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onSwitchToSignup, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Logging in with:', { email, password });
      // Simulate successful login
      onLoginSuccess();
    }
  };

  return (
    <Modal onClose={onClose} title="Login">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="login-email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-describedby="email-error"
          />
          {errors.email && <p id="email-error" className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="login-password" className="block text-sm font-medium text-gray-400 mb-2">Password</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-describedby="password-error"
          />
          {errors.password && <p id="password-error" className="text-red-400 text-xs mt-1">{errors.password}</p>}
        </div>
        <button type="submit" className="w-full bg-gradient-to-br from-indigo-500 to-pink-500 text-white font-semibold py-2.5 px-6 rounded-full transition-transform duration-300 hover:scale-105">
          Login
        </button>
      </form>
      <p className="text-center text-sm text-gray-400 mt-6">
        Don't have an account?{' '}
        <button onClick={onSwitchToSignup} className="font-medium text-indigo-400 hover:underline">Sign up</button>
      </p>
    </Modal>
  );
};

export default LoginModal;