import React, { useEffect, useState } from 'react';
import { Heart, Star, Shield } from 'lucide-react';

// const memberships = [
//   {
//     id: 1,
//     title: "Health Starter",
//     description:
//       "Comprehensive health monitoring and personalized recommendations",
//     benefits: [
//       "Regular health check-ups",
//       "Priority appointment booking",
//       "Digital health records",
//       "Personalized health insights",
//       "20% discount on purchases",
//     ],
//     price: 700, // Monthly cost in dollars
//     gradient: "from-yellow-400 to-orange-500",
//     icon: <Shield className="text-white w-8 h-8" />,
//   },
//   {
//     id: 2,
//     title: "Wellness Plus",
//     description: "Enhanced wellness program with exclusive benefits",
//     benefits: [
//       "Premium health services",
//       "Specialist consultations",
//       "Wellness workshops",
//       "Fitness tracking",
//       "40% discount on purchases",
//     ],
//     price: 850, // Monthly cost in dollars
//     gradient: "from-green-400 to-blue-400",
//     icon: <Star className="text-white w-8 h-8" />,
//   },
//   {
//     id: 3,
//     title: "Vital Care",
//     description: "Complete healthcare coverage for you and your family",
//     benefits: [
//       "Family health coverage",
//       "Emergency support",
//       "Mental health services",
//       "Nutrition guidance",
//       "60% discount on purchases",
//     ],
//     price: 1000, // Monthly cost in dollars
//     gradient: "from-pink-500 to-red-500",
//     icon: <Heart className="text-white w-8 h-8" />,
//   },
// ];

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

const MembershipDiscounts = ({ onUpgrade }) => {

  const [ memberships, setMemberships ] = useState([]);

  const backend = import.meta.env.VITE_BACKEND;

    useEffect( ( ) => {
      fetch(`${backend}/getMembershipPlans`)
      .then(res => res.text())
      .then( res => {
        const membershipPlans = JSON.parse(res);
  
        console.log(membershipPlans);
        setMemberships(membershipPlans);
      } )
    }, [] );

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">
        Membership Plans
      </h2>
      <div className="flex flex-wrap justify-center gap-10">
        {memberships.map((membership) => (
          <div
            key={membership.membership.id}
            className={`p-4 rounded-lg shadow-lg bg-gradient-to-br ${getGradient(membership.membership.id)} text-white transform transition-transform hover:scale-105 w-[30%]`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">{membership.membership.planName}</h3>
              {getIcon(membership.membership.planIcon)}
            </div>
            <div>
              <div className="text-3xl font-bold mb-4">${membership.membership.pricePerMonth}/M</div>
              <h4 className="text-lg font-medium">Benefits:</h4>
              <ul className="mt-2 space-y-2 text-sm">
                {membership.membershipBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    • {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="mt-4 w-full py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
              onClick={() => onUpgrade(membership)}
            >
              Upgrade
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipDiscounts;
