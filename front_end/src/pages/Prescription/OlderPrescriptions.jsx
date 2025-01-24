import React from 'react';
import { Eye, MapPin } from 'lucide-react';


const OlderPrescriptions = ( { prescriptions } ) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-[#A9DFBF] shadow-sm">
      <h2 className="text-2xl font-semibold text-[#2C3E50] mb-4">Older</h2>
      <div className="flex gap-4">
        {prescriptions.map((prescription) => (
          <div 
            key={prescription.id} 
            className="bg-white p-4 rounded-lg border border-[#A9DFBF] transform transition-transform hover:scale-105 hover:shadow-lg hover:border-[#1e7b43] h-[90%] w-[25%]"
          >
            <h3 className="text-center text-xl font-medium text-[#2C3E50] mb-2">{prescription.diseaseName}</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <p className="text-[#2C3E50]">Start: {prescription.startDate}</p>
                <p className="text-[#2C3E50]">End: {prescription.endDate}</p>
              </div>   
              <p className="text-[#2C3E50]">Hospital : {prescription.hospitalName}</p>
              <p className="text-[#2C3E50]">Doctor : {prescription.doctorName}</p>
            </div>
            <div className="flex space-x-3 justify-between">
              <button className="flex items-center px-4 py-2 bg-[#2ECC71] text-white rounded-md hover:bg-[#27AE60] transition-colors">
                <Eye className="w-4 h-4 mr-2" />
                View
              </button>
              <button className="flex items-center px-4 py-2 bg-[#5DADE2] text-white rounded-md hover:bg-[#608BC1] transition-colors">
              <MapPin className="w-4 h-4 mr-2" />
              Locate
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OlderPrescriptions;