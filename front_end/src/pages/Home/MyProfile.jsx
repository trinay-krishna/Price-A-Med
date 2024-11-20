import React, { useState } from 'react';
import Navbar from '../../Components/Header';
import Footer from '../../Components/Footer';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Bell,
  FileText,
  Clock,
  Camera,
  ChevronRight,
  CreditCard,
} from 'lucide-react';

function UserAvatar() {
  const [avatar, setAvatar] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setAvatar(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center overflow-hidden">
        {avatar ? (
          <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <User className="w-12 h-12 text-white" />
        )}
        <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-emerald-500 p-2 rounded-full text-white hover:bg-emerald-600 transition-colors cursor-pointer">
          <Camera size={16} />
        </label>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}


function FormField({ label, icon: Icon, type, value, onChange, error, required = false, rows, placeholder }) {
  const inputClasses = `w-full px-4 py-2 border ${error ? 'border-red-300' : 'border-emerald-200'} rounded-lg focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-emerald-500'
    } focus:border-transparent`;

  return (
    <div className="relative">
      <label className="flex items-center text-sm font-medium text-emerald-700 mb-1">
        <Icon className="w-4 h-4 mr-2" />
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className={inputClasses}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClasses}
          placeholder={placeholder}
        />
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

function PrescriptionCard({ icon: Icon, title, count }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
      <div className="flex items-center">
        <Icon className="w-5 h-5 text-emerald-600 mr-3" />
        <div>
          <p className="font-medium text-emerald-900">{title}</p>
          <p className="text-sm text-emerald-600">{count}</p>
        </div>
      </div>
      <button
        onClick={() => navigate('/prescription')}
        className="flex items-center text-green-600 hover:text-red-400"
      >
        Show
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
}

function PaymentMethods() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-xl font-semibold text-emerald-900 mb-6">Your Cards</h3>
      <div className="grid grid-cols-3 gap-4">
        <img src="https://res.cloudinary.com/dzymyjltu/image/upload/v1731560579/c1_j1nc4s.jpg" alt="Card 1" className="aspect-[3/2] rounded-xl cursor-pointer hover:shadow-lg transition-shadow" />
        <img src="https://res.cloudinary.com/dzymyjltu/image/upload/v1731560579/c2_sb6o1s.jpg" alt="Card 2" className="aspect-[3/2] rounded-xl cursor-pointer hover:shadow-lg transition-shadow" />
        <div>
          <label htmlFor="file-upload" className="aspect-[3/2] bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl p-4 flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
            <CreditCard className="w-8 h-8 text-white" />
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                // Handle the uploaded file here
                console.log("File selected:", e.target.files[0]);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

function MyProfile() {

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 973 456 7890',
    dob: '1990-06-12',
    address: '123 Maple Street Springfield, IL 62704 USA',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!userInfo.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!userInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!userInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!userInfo.dob) {
      newErrors.dob = 'Date of birth is required';
    }

    if (!userInfo.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', userInfo);
      // Handle form submission
    }
  };

  const handleFieldChange = (field, value) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8">
              <div className="flex justify-between items-start mb-8">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold text-emerald-900">Personal Information</h2>
                  <p className="text-emerald-600">Update your personal details here</p>
                </div>
                <UserAvatar />
              </div>

              <div className="space-y-6">
                <FormField
                  label="Name"
                  icon={User}
                  type="text"
                  value={userInfo.name}
                  onChange={(value) => handleFieldChange('name', value)}
                  error={errors.name}
                  required
                  placeholder="Enter your name"
                />

                <FormField
                  label="Email"
                  icon={Mail}
                  type="email"
                  value={userInfo.email}
                  onChange={(value) => handleFieldChange('email', value)}
                  error={errors.email}
                  required
                  placeholder="Enter your email"
                />

                <FormField
                  label="Ph. No."
                  icon={Phone}
                  type="tel"
                  value={userInfo.phone}
                  onChange={(value) => handleFieldChange('phone', value)}
                  error={errors.phone}
                  required
                  placeholder="Enter your mobile number"
                />

                <FormField
                  label="DOB"
                  icon={Calendar}
                  type="date"
                  value={userInfo.dob}
                  onChange={(value) => handleFieldChange('dob', value)}
                  error={errors.dob}
                  required
                />

                <FormField
                  label="Address"
                  icon={MapPin}
                  type="textarea"
                  value={userInfo.address}
                  onChange={(value) => handleFieldChange('address', value)}
                  error={errors.address}
                  required
                  rows={3}
                  placeholder="Enter your address"
                />
              </div>

              <div className="mt-8">
                <button type="submit" className="w-full py-2 px-4 text-white bg-emerald-600 rounded-lg hover:bg-red-400 transition-colors">
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-emerald-900 mb-6">Your Prescriptions</h3>
              <div className="space-y-4">
                <PrescriptionCard
                  icon={Bell}
                  title="Running Prescriptions"
                  count="1 pending"
                />
                <PrescriptionCard
                  icon={FileText}
                  title="Older Prescriptions"
                  count="2 viewed"
                />

              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-emerald-900 mb-6">Your Membership Plans</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 text-emerald-600 mr-3" />
                    <div>
                      <p className="font-medium text-emerald-900">Health Starter</p>
                      <p className="text-sm text-emerald-600">Current membership plan</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/membership')}
                    className="flex items-center text-emerald-600 hover:text-red-400"
                  >
                    Show
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>


            <PaymentMethods />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MyProfile;
