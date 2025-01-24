import React from 'react';
import { Heart, Stethoscope } from 'lucide-react';
import Card from './Card';

const conditions = ['Hypertension', 'Asthma', 'Type 2 Diabetes'];

const ConditionsCard = () => {
  return (
    <Card title="Health Conditions" icon={Heart} iconColor="text-rose-500">
      <ul className="space-y-3">
        {conditions.map((condition, index) => (
          <li key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <Stethoscope size={18} className="text-gray-600" />
            <span>{condition}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ConditionsCard;
