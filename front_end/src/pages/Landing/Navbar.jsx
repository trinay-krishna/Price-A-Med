import React from 'react';
import { Bell, User, CreditCard, HelpCircle, Crown } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-[1920px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#34A853]">Price a Med</h1>
          <div className="flex items-center space-x-6">
            <button className="flex items-center gap-2 text-gray-600 hover:text-[#34A853]">
              <Crown className="w-5 h-5" />
              <span>Premium</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-[#34A853]">
              <CreditCard className="w-5 h-5" />
              <span>Orders</span>
            </button>
            <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-[#34A853]" />
            <div className="flex items-center gap-2 text-gray-600 hover:text-[#34A853] cursor-pointer">
              <User className="w-6 h-6" />
              <span>Profile</span>
            </div>
            <HelpCircle className="w-6 h-6 text-gray-600 cursor-pointer hover:text-[#34A853]" />
          </div>
        </div>
      </div>
    </nav>
  );
}
