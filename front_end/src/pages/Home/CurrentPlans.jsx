import React from 'react';
import { Heart, Star, Shield } from 'lucide-react';

function getGradient(id) {
  const gradients = [
    "from-yellow-400 to-orange-500",
    "from-green-400 to-blue-400",
    "from-pink-500 to-red-500"
  ];

  if (id === 1) {
    return gradients[0];
  } else if (id === 2) {
    return gradients[1];
  } else if (id === 3) {
    return gradients[2];
  } else {
    return "Invalid id"; // Handle invalid IDs gracefully
  }
}

function getIcon(iconName) {
  if ( iconName == 'Shield' )
    return <Shield className="text-white w-8 h-8" />;

  if ( iconName == 'Star' ) 
    return <Star className="text-white w-8 h-8" />;

  if ( iconName == 'Heart' )
    return <Heart className="text-white w-8 h-8" />;
}  

const CurrentPlans = ({ currentPlan }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-[#A9DFBF] shadow-sm">
      <h2 className="text-2xl font-semibold text-[#2C3E50] mb-8">
        Current Plan
      </h2>
      <div className="flex flex-wrap gap-8 justify-left">
        {currentPlan.map((plan) => (
          <div
            key={plan.membership.id}
            className={`p-4 rounded-lg border border-[#A9DFBF] transform transition-transform hover:scale-105 w-[30%] bg-gradient-to-br ${getGradient(plan.membership.id)}`}
          >
            {/* Flex container for the title and icon */}
            <div className="flex items-center mb-2">
              <h3 className="text-left text-xl font-semibold text-white mr-4">
                {plan.membership.planName} {/* Title */}
              </h3>
              <div className="ml-auto">
                {getIcon(plan.membership.planIcon)}  {/* Icon at the far right */}
              </div>
            </div>
            <p className="text-white">{plan.membership.planDesc}</p>
            <h4 className="font-medium text-white mt-4">Benefits:</h4>
            <ul className="space-y-2 mt-2">
              {plan.membershipBenefits.map((benefit, index) => (
                <li key={index} className="text-white text-sm">
                  • {benefit}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentPlans;
