import React from 'react';
import { Eye, MapPin } from 'lucide-react';
import Prescription from './Prescription';

const RunningPrescriptions = ( { prescriptions, closePrescription } ) => {
  return (
    <>
      
      <h2 className="inline text-3xl font-semibold text-[#2A6041]">Your Prescriptions</h2>
      
      <div className="bg-white p-6 rounded-lg border border-[#A9DFBF] shadow-sm">
        <h2 className="text-2xl font-semibold text-[#2C3E50] mb-4">Running</h2>
        
        {/* Card with hover effect */}

        <div className="flex gap-4">
        { prescriptions.map(prescription =>
        ( <div className="bg-white p-4 rounded-lg border border-[#A9DFBF] h-[80%] w-[30%] transform transition-transform hover:scale-105 hover:shadow-lg hover:border-[#1e7b43]">
          <h3 className="text-center text-xl font-medium text-[rgb(44,62,80)] mb-2">{prescription.diseaseName}</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <p className="text-[#2C3E50]">{prescription.startDate}</p>
              <p className="text-[#2C3E50]">End: -----</p>
            </div>           
            <p className="text-[#2C3E50]">Hospital : {prescription.hospitalName}</p>
            <p className="text-[#2C3E50]">Doctor : {prescription.doctorName}</p>
          </div>
          
          <div className="flex space-x-4 justify-between">
            <button className="flex items-center px-4 py-2 bg-[#2ECC71] text-white rounded-md hover:bg-[#27AE60] transition-colors">
              <Eye className="w-4 h-4 mr-2" />
              View
            </button>
            
            <button onClick={() => closePrescription(prescription.id)} className="flex items-center px-4 py-2 bg-[#FF6F61] text-white rounded-md hover:bg-[#FF4C39] transition-colors">
              <Eye className="w-4 h-4 mr-2" />
              Close
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
    </>
  );
};

export default RunningPrescriptions;