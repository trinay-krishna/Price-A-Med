import React from 'react';
import Navbar from '../../Components/Header';
import Footer from '../../Components/Footer';

const Support = () => {
  // Define functions for each action
  const openContactPopup = () => {
    alert('Contact us at support@example.com or call 123-456-7890');
  };

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/path-to-pdf/return-refund-policy.pdf';
    link.download = 'Return and Refund Policy.pdf';
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#E9F7EF]">
      <Navbar />
      <h1 className="text-center text-2xl font-semibold my-4 text-[#333]">Support</h1>
      <div className="grid grid-cols-2 gap-5 w-full max-w-screen-xl px-4 mb-8 justify-items-center mx-auto">
      
      {/* First Column */}
        <div className="flex w-full flex-col gap-4 w-1/2">
          <div className="bg-[#5c87a4] text-white p-6 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:transform hover:translate-y-1 transition" onClick={() => window.location.href = '/orders'}>
            <div className="text-lg font-bold">Your Orders</div>
            <div className="w-16 h-16">
              <img src="https://res.cloudinary.com/dnw6exszc/image/upload/v1731316411/ordersss_qe8ht4.jpg" alt="Orders" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
          <div className="bg-[#b086b6] text-white p-6 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:transform hover:translate-y-1 transition" onClick={openContactPopup}>
            <div className="text-lg font-bold">Talk with our Team</div>
            <div className="w-16 h-16">
              <img src="https://res.cloudinary.com/dnw6exszc/image/upload/v1731315778/talk_amkk27.jpg" alt="Contact Team" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
          <div className="bg-[#5c8a8a] text-white p-6 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:transform hover:translate-y-1 transition">
            <div className="text-lg font-bold">Edit your Smart Notification setting</div>
            <div className="w-16 h-16">
              <img src="https://res.cloudinary.com/dnw6exszc/image/upload/v1731315924/notif_bbehwm.jpg" alt="Notification Settings" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
          <div className="bg-[#e68a4a] text-white p-6 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:transform hover:translate-y-1 transition" onClick={() => window.location.href = '/faqs'}>
            <div className="text-lg font-bold">FAQ's</div>
            <div className="w-16 h-16">
              <img src="https://res.cloudinary.com/dnw6exszc/image/upload/v1731316488/faqq_jxtcpj.png" alt="FAQs" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
          <div className="bg-[#c29f74] text-white p-6 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:transform hover:translate-y-1 transition">
            <div className="text-lg font-bold">Prescription Renewal Ideas</div>
            <div className="w-16 h-16">
              <img src="https://res.cloudinary.com/dnw6exszc/image/upload/v1731315603/pres._iiemoj.png" alt="Prescription Renewal" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
        </div>

        {/* Second Column */}
        <div className="flex w-full flex-col gap-4 w-1/2">
          <div className="bg-[#628ea3] text-white p-6 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:transform hover:translate-y-1 transition" onClick={() => window.location.href = '/prescription'}>
            <div className="text-lg font-bold">Know your Prescriptions</div>
            <div className="w-16 h-16">
              <img src="https://res.cloudinary.com/dnw6exszc/image/upload/v1731316106/prcs_zifcpl.jpg" alt="Prescriptions" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
          <div className="bg-[#678a6b] text-white p-6 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:transform hover:translate-y-1 transition" onClick={() => window.location.href = '/membership'}>
            <div className="text-lg font-bold">Membership Plans</div>
            <div className="w-16 h-16">
              <img src="https://res.cloudinary.com/dnw6exszc/image/upload/v1731316153/members_cxmtnl.jpg" alt="Membership Plans" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
          <div className="bg-[#d88480] text-white p-6 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:transform hover:translate-y-1 transition">
            <div className="text-lg font-bold">Your Medical Subscriptions</div>
            <div className="w-16 h-16">
              <img src="https://res.cloudinary.com/dnw6exszc/image/upload/v1731316206/subscr_xatihf.jpg" alt="Medical Subscriptions" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
          <div className="bg-[#9c7b9e] text-white p-6 rounded-lg shadow-md flex items-center justify-between cursor-pointer hover:transform hover:translate-y-1 transition" onClick={downloadPDF}>
            <div className="text-lg font-bold">Return and Refund Policy</div>
            <div className="w-16 h-16">
              <img src="https://res.cloudinary.com/dnw6exszc/image/upload/v1731316246/refund_bdrb1c.jpg" alt="Return and Refund" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Support;