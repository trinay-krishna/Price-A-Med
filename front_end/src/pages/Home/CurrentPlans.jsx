import React from 'react';
import { Eye, MapPin } from 'lucide-react';


const memberships = [
  {
    id: 1,
    title: 'Health Status',
    description: 'Comprehensive health monitoring and personalized recommendations',
    benefits: [
      'Regular health check-ups',
      'Priority appointment booking',
      'Digital health records',
      'Personalized health insights',
    ],
  },
];

const CurrentPlans = () => {
  return (
    <div className="bg-white p-6 rounded-lg border border-[#A9DFBF] shadow-sm">
      <h2 className="text-2xl font-semibold text-[#2C3E50] mb-8">Current Plans</h2>
      {/* Flexbox container for the cards */}
      <div className=" flex-wrap gap-8 justify-center">
        {memberships.map((membership) => (
          <div
            key={membership.id}
            className="bg-white p-4 rounded-lg border border-[#A9DFBF] transform transition-transform hover:scale-105 hover:shadow-xl hover:shadow-[0_0_15px_4px_rgba(255,215,0,0.8)] hover:border-[#1e7b43] w-[100%] sm:w-[48%] md:w-[30%] lg:w-[26%]"
          >
            <h3 className="text-center text-xl font-medium text-[#2C3E50] mb-2">
              {membership.title}
            </h3>
            <div className="space-y-2 mb-4">
              <p className="text-[#2C3E50]">{membership.description}</p>
              <div className="space-y-2">
                <h4 className="font-medium text-[#2C3E50]">Benefits</h4>
                <ul className="space-y-2">
                  {membership.benefits.map((benefit, index) => (
                    <li key={index} className="text-[#2C3E50] text-sm">
                      • {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex space-x-3 justify-between">
              <button className="w-full py-2 bg-[#2ECC71] text-white rounded-md hover:bg-[#27AE60] transition-colors">
                Upgrade
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentPlans;
