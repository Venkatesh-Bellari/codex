import React, { useState } from 'react';
import Modal from './Modal';

interface SignupModalProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ onClose, onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { username?: string; email?: string; password?: string } = {};
    if (!username) {
      newErrors.username = 'Username is required';
    }
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log('Signing up with:', { username, email, password });
      // Simulate successful signup and close
      onClose();
    }
  };

  return (
    <Modal onClose={onClose} title="Create Account">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="signup-username" className="block text-sm font-medium text-gray-400 mb-2">Username</label>
          <input
            id="signup-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
             aria-describedby="username-error"
          />
          {errors.username && <p id="username-error" className="text-red-400 text-xs mt-1">{errors.username}</p>}
        </div>
        <div>
          <label htmlFor="signup-email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-describedby="email-error"
          />
          {errors.email && <p id="email-error" className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="signup-password" className="block text-sm font-medium text-gray-400 mb-2">Password</label>
          <input
            id="signup-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/20 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-describedby="password-error"
          />
          {errors.password && <p id="password-error" className="text-red-400 text-xs mt-1">{errors.password}</p>}
        </div>
        <button type="submit" className="w-full bg-gradient-to-br from-indigo-500 to-pink-500 text-white font-semibold py-2.5 px-6 rounded-full transition-transform duration-300 hover:scale-105">
          Sign Up
        </button>
      </form>
      <p className="text-center text-sm text-gray-400 mt-6">
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="font-medium text-indigo-400 hover:underline">Login</button>
      </p>
    </Modal>
  );
};

export default SignupModal;