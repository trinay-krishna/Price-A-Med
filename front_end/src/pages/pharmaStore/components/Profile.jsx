import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'City Pharma Store',
    icon: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926',
    address: '123 Healthcare Avenue, Medical District, City, 12345',
    homeDelivery: true,
    contact: '+1 (555) 123-4567',
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the changes to your backend
    alert('Profile Updated Successfully');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Your Profile</h1>

      <div className="max-w-2xl bg-white rounded-xl shadow-sm p-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={profile.icon}
                alt="Store Icon"
                className="w-24 h-24 rounded-lg object-cover"
              />
              {isEditing && (
                <button className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white rounded-lg">
                  Change
                </button>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                disabled={!isEditing}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Store Address
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                disabled={!isEditing}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
              />
              {isEditing && (
                <button className="px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50">
                  <MapPin size={20} />
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Home Delivery
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => isEditing && setProfile({ ...profile, homeDelivery: true })}
                disabled={!isEditing}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  profile.homeDelivery
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                } disabled:opacity-50`}
              >
                Yes
              </button>
              <button
                onClick={() => isEditing && setProfile({ ...profile, homeDelivery: false })}
                disabled={!isEditing}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  !profile.homeDelivery
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                } disabled:opacity-50`}
              >
                No
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact
            </label>
            <input
              type="text"
              value={profile.contact}
              onChange={(e) => setProfile({ ...profile, contact: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-50"
            />
          </div>

          <button
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            {isEditing ? 'Save Changes' : 'Update Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}