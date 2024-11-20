import React from 'react';
import { Heart, Star, Shield } from 'lucide-react';

const memberships = [
  {
    id: 1,
    title: 'Vital Care',
    description: 'Complete healthcare coverage for you and your family',
    benefits: [
      'Family health coverage',
      'Emergency support',
      'Mental health services',
      'Nutrition guidance',
    ],
    price: 1000, // Monthly cost in dollars
    gradient: 'from-pink-500 to-red-500',
    icon: <Heart className="text-white w-8 h-8" />,
  },
  {
    id: 2,
    title: 'Wellness Plus',
    description: 'Enhanced wellness program with exclusive benefits',
    benefits: [
      'Premium health services',
      'Specialist consultations',
      'Wellness workshops',
      'Fitness tracking',
    ],
    price: 850, // Monthly cost in dollars
    gradient: 'from-green-400 to-blue-400',
    icon: <Star className="text-white w-8 h-8" />,
  },
  {
    id: 3,
    title: 'Health Starter',
    description: 'Comprehensive health monitoring and personalized recommendations',
    benefits: [
      'Regular health check-ups',
      'Priority appointment booking',
      'Digital health records',
      'Personalized health insights',
    ],
    price: 700, // Monthly cost in dollars
    gradient: 'from-yellow-400 to-orange-500',
    icon: <Shield className="text-white w-8 h-8" />,
  },
];

const MembershipDiscounts = () => {
  // Sort memberships based on the price in descending order
  const sortedMemberships = memberships.sort((a, b) => b.price - a.price);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">Membership Plans</h2>
      <div className="flex justify-center gap-10">
        {sortedMemberships.map((membership) => (
          <div
            key={membership.id}
            className={`p-4 rounded-lg shadow-lg bg-gradient-to-br ${membership.gradient} text-white transform transition-transform hover:scale-105 w-[30%]`}
          >
            {/* First Line: Plan Name and Icon */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">{membership.title}</h3>
              {membership.icon}
            </div>

            {/* Second Line: Price and Benefits */}
            <div>
              <div className="text-3xl font-bold mb-4">${membership.price}/M</div>
              <h4 className="text-lg font-medium">Benefits:</h4>
              <ul className="mt-2 space-y-2 text-sm">
                {membership.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    • {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipDiscounts;
