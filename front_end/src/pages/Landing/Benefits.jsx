import React, { forwardRef } from 'react';
import { Clock, Filter, Truck, Shield } from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: 'Instant Approvals',
    description: 'Get instant, doctor-approved validation for your medicine cart to ensure accurate treatment choices',
  },
  {
    icon: Filter,
    title: 'Smart Filters',
    description: 'Easily find the right medicines with customizable filters by type, price, and alternate options tailored to your needs',
  },
  {
    icon: Truck,
    title: 'Continuous Supply',
    description: 'Ensure uninterrupted access to essential medicines for long-term care with options for reliable, ongoing delivery from trusted pharmacies',
  },
  {
    icon: Shield,
    title: 'Secure & Safe',
    description: 'Protecting your health information and ensuring a safe, trusted experience with top-notch data security.',
  },
];

const Benefits = forwardRef( ( props,  ref  ) => {
  return (
    <section className="py-16 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#2A6041] text-center mb-12" ref={ref}>
          Your Benefits
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-[#A5D6A7] rounded-full flex items-center justify-center mb-4">
                <benefit.icon size={24} className="text-[#2A6041]" />
              </div>
              <h3 className="text-xl font-semibold text-[#2A6041] mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
})

export default Benefits;