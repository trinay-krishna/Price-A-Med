import { X, Facebook, Mail, User, Lock, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function SignUpModal({ isOpen, onClose, onLoginClick }) {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/home'); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full relative animate-in fade-in-0 zoom-in-95">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-bold text-[#2A6041] mb-6 text-center">
          Create Your Account
        </h2>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-[#4CAF50] focus:border-[#4CAF50]"
                placeholder="Choose a username"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Role</label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-[#4CAF50] focus:border-[#4CAF50]"
              >
                <option value="consumer">Consumer</option>
                <option value="store-agent">Store Agent</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-[#4CAF50] focus:border-[#4CAF50]"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="password"
                className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-[#4CAF50] focus:border-[#4CAF50]"
                placeholder="Create a password"
              />
            </div>
          </div>

          <button
            type="submit"
            onClick={handleSignUp}
            className="w-full bg-[#4CAF50] text-white py-2 rounded-md hover:bg-[#66BB6A] transition-colors text-center font-bold"
          >
            Sign Up
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
            <p className="text-sm">
              Already have an account? 
              <button 
                onClick={onLoginClick} 
                className="text-[#4CAF50] hover:text-[#66BB6A] font-medium"
              >
                Log In
              </button>
            </p>
          </div>
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

export default SignUpModal;
