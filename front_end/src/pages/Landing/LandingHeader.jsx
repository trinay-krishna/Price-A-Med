
import React from 'react';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingHeader({ onLoginClick, scrollToSupport, scrollToBenefits, scrollToFAQ }) {
    const navigate = useNavigate();
  return (
    <header className="bg-[#2A6041] text-white py-4 px-6 flex items-center justify-between">
      <a href="/" className="text-2xl font-bold hover:text-[#A5D6A7] transition-colors">
        Price A Med
      </a>
      
      <nav className="flex items-center gap-6">
        <a className="flex items-center gap-2 hover:text-[#A5D6A7] transition-colors" onClick={() =>navigate('/home')}>
          <span>Home</span>
        </a>
        <a className="flex items-center gap-2 hover:text-[#A5D6A7] transition-colors" onClick={() => scrollToBenefits()}>
          <span>Your Benefits</span>
        </a>
        <a className="flex items-center gap-2 hover:text-[#A5D6A7] transition-colors" onClick={() => scrollToSupport()}>
          <span>Support</span>
        </a>

        <button
          onClick={onLoginClick}  
          className="bg-[#4CAF50] hover:bg-[#66BB6A] text-white px-6 py-2 rounded-md flex items-center gap-2 transition-colors"
        >
          <LogIn size={20} />
          <span>Login</span>
        </button>
      </nav>
    </header>
  );
}