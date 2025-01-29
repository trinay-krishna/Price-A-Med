import React, { useRef } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { X, Facebook, Mail } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onSignUpClick }) {
  const navigate = useNavigate();

  const userRef = useRef(null);
  const passRef = useRef(null);
  const errorRef = useRef(null);

  const handleLogin = () => {

    const data = {
      userName: userRef.current.value,
      password: passRef.current.value, 
    };

    const backend = import.meta.env.VITE_BACKEND;

    fetch(`http://${backend}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }).then(res => {
      if( res.status == 401 ) {
        errorRef.current.textContent = 'Invalid username or password.';
      } else if ( res.status == 200 ) {
        return res.text();
      }
    }).then(res => {
      const role = ( JSON.parse(res) ).role;
      const { userId, username, email } = JSON.parse(res);
      localStorage.setItem('userId', userId);
      localStorage.setItem('username', username);
      localStorage.setItem('email', email);
      localStorage.setItem('user', res);
      if( role == 'CONSUMER' ) {
        navigate('/home');
      } else {
        navigate('/storeDashboard');
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold text-[#2A6041] mb-6 text-center">
          Welcome to Price A Med
        </h2>
        
        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username or Email
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#4CAF50] focus:border-[#4CAF50]"
              placeholder="Enter your username or email"
              ref={userRef}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#4CAF50] focus:border-[#4CAF50]"
              placeholder="Enter your password"
              ref={passRef}
            />
          </div>

          <p ref={errorRef} className="text-red-500 text-center mt-2"></p>
          
          <button 
          onClick={handleLogin}
          className="w-full bg-[#4CAF50] text-white py-2 rounded-md hover:bg-[#66BB6A] transition-colors text-center font-bold">
            Login
          </button>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <button className="w-full bg-[#1877F2] text-white py-2 rounded-md hover:bg-[#166FE5] transition-colors flex items-center justify-center gap-2">
            <Facebook size={20} />
            Continue with Facebook
          </button>
          
          <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <Mail size={20} />
            Continue with Google
          </button>
          
          <div className="text-center mt-4">
            <a href="#" className="text-[#4CAF50] hover:text-[#66BB6A]">
              Forgot password?
            </a>
          </div>

          {/* Link to switch to the SignUpModal */}
          <p className="text-center text-sm mt-4">
            Don't have an account? 
            <button 
              onClick={onSignUpClick} 
              className="text-[#4CAF50] hover:text-[#66BB6A] font-medium"
            >
              Sign Up
            </button>
          </p>

          <p className="text-sm text-gray-500 text-center mt-6">
            By continuing, you agree to our{' '}
            <a href="#" className="text-[#4CAF50] hover:text-[#66BB6A]">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-[#4CAF50] hover:text-[#66BB6A]">
              Privacy Policy
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
