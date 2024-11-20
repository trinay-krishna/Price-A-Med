import React from 'react';

function MembershipCard({ title, price, features, icon, color }) {
  const iconClasses = {
    star: 'text-yellow-400',
    shield: 'text-teal-400',
    clock: 'text-red-400',
  };

  return (
    <div className="w-80 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className={`flex items-center justify-between mb-4 ${iconClasses[icon]}`}>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <div className="text-2xl font-bold text-gray-800">{price}</div>
      </div>
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
            <span className="text-green-500">✔</span>
            {feature}
          </li>
        ))}
      </ul>
      <button
        className={`w-full px-4 py-2 rounded-lg font-semibold text-white ${color === 'indigo' ? 'bg-indigo-600 hover:bg-indigo-700' : color === 'teal' ? 'bg-teal-600 hover:bg-teal-700' : 'bg-red-600 hover:bg-red-700'}`}
      >
        Choose Plan
      </button>
    </div>
  );
}

export default MembershipCard;
