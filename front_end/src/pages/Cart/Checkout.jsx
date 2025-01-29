// import React, { useState } from 'react';
// import { useNavigate,useLocation } from 'react-router-dom';
// import Navbar from '../../Components/Header';
// import Footer from '../../Components/Footer';
// import { Clock, Truck, CreditCard, Shield, ChevronRight, Crown } from 'lucide-react';

// function getFormattedDateNextDay() {
//   const today = new Date();
//   const nextDay = new Date(today);
//   nextDay.setDate(today.getDate() + 1); // Increment the day by 1

//   const day = nextDay.getDate();
//   const month = nextDay.toLocaleString('default', { month: 'long' }); // Full month name
//   const suffix = getOrdinalSuffix(day);

//   return `${day}${suffix} ${month}`;
// }

// // Helper function to determine the ordinal suffix
// function getOrdinalSuffix(day) {
//   if (day >= 11 && day <= 13) {
//       return "th"; // Special case for 11th, 12th, 13th
//   }
//   switch (day % 10) {
//       case 1: return "st";
//       case 2: return "nd";
//       case 3: return "rd";
//       default: return "th";
//   }
// }


// function Checkout() {

//   const navigate = useNavigate();

//   const location = useLocation();

//   const [selectedTime, setSelectedTime] = useState(2);
//   const [ emailSent, setEmailSent ] = useState(-1);

//   // Destructure the data passed from the Cart
//   const {  total } = location.state || {};
//   const handleCheckout = () => {
//     navigate('/home'); 
//   };

//   const handlePlaceOrder = () => {
//     setEmailSent(0);
//     fetch(`http:///placeOrder?userId=${localStorage.getItem('userId')}&time=${selectedTime}`, {
//       method: 'POST',
//     }).then(res => {
//       if ( res.status == 200 ) {
//         setEmailSent(1);
//         navigate('/home');
//       } else console.log('Order Placement failed!');
//     })

//   };

//   const hadleLearnMore = () => {
//     navigate('/membership'); 
//   };



//   return (
//     <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
//       <Navbar />

//       <main className="container mx-auto px-4 py-8">
//         <div className="max-w-3xl mx-auto">
//           <h1 className="text-3xl font-bold text-gray-800 mb-8">Review and Delivery</h1>
          
//           <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
//               <Clock className="w-5 h-5 mr-2 text-emerald-600" />
//               Choose Delivery Time
//             </h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               {[2,3].map((time) => (
//                 <button
//                   key={time}
//                   onClick={() => setSelectedTime(time)}
//                   className={`p-4 rounded-lg border-2 transition-all ${
//                     selectedTime === time
//                       ? 'border-emerald-500 bg-emerald-50'
//                       : 'border-gray-200 hover:border-emerald-300'
//                   }`}
//                 >
//                   <div className="font-medium">{getFormattedDateNextDay()}</div>
//                   <div className="text-lg text-emerald-700">{time} PM</div>
//                 </button>
//               ))}
//             </div>

//             <div className="space-y-4">
//               <div className="flex justify-between items-center py-3 border-t border-gray-100">
//                 <span className="text-gray-600">Subtotal</span>
//                 <span className="font-medium">${total}</span>
//               </div>
//               <div className="flex justify-between items-center py-3 border-t border-gray-100">
//                 <span className="text-gray-600">Gst </span>
//                 <span className="font-medium">$5.00</span>
//               </div>
//               <div className="flex justify-between items-center py-3 border-t border-gray-100">
//                 <span className="text-gray-800 font-semibold text-lg">Total</span>
//                 <span className="text-gray-800 font-bold text-lg">${(Number(total) + 5).toFixed(2)}</span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-emerald-50 rounded-xl p-6 mb-6">
//             <div className="flex items-start space-x-4">
//               <Crown className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
//               <div>
//                 <h3 className="font-semibold text-gray-800 mb-2">Upgrade to Premium</h3>
//                 <p className="text-gray-600 mb-3">
//                   Know more about membership plans to avail daily discounts and free shipments
//                 </p>
//                 <button onClick={hadleLearnMore} className="text-emerald-600 font-medium flex items-center hover:text-emerald-700 transition">
//                   Learn More <ChevronRight className="w-4 h-4 ml-1" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col space-y-4">
//             <div className="flex justify-between w-full">

//               <button onClick={handleCheckout} className="bg-red-400 text-white px-6 py-4 rounded-lg font-semibold hover:bg-red-600 transition shadow-lg">
//                 Cancel
//               </button>
//               <button onClick={handlePlaceOrder} className="bg-emerald-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition shadow-lg">
//                 Place Order
//               </button>
//             </div>
//             <div className="flex justify-center space-x-8 text-sm text-gray-500">
//               <div className="flex items-center">
//                 <Shield className="w-4 h-4 mr-2" />
//                 Secure Payment
//               </div>
//               <div className="flex items-center">
//                 <CreditCard className="w-4 h-4 mr-2" />
//                 Multiple Payment Options
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default Checkout;
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../Components/Header';
import Footer from '../../Components/Footer';
import { Clock, Truck, CreditCard, Shield, ChevronRight, Crown } from 'lucide-react';

function getFormattedDateNextDay() {
  const today = new Date();
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 1); // Increment the day by 1

  const day = nextDay.getDate();
  const month = nextDay.toLocaleString('default', { month: 'long' }); // Full month name
  const suffix = getOrdinalSuffix(day);

  return `${day}${suffix} ${month}`;
}

// Helper function to determine the ordinal suffix
function getOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) {
    return "th"; // Special case for 11th, 12th, 13th
  }
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTime, setSelectedTime] = useState(2);
  const [emailSent, setEmailSent] = useState(-1);

  const { total } = location.state || {};

  const backend = import.meta.env.VITE_BACKEND;

  const handlePlaceOrder = () => {
    setEmailSent(0); // Show "Placing Order..."
    fetch(`${backend}/placeOrder?userId=${localStorage.getItem('userId')}&time=${selectedTime}`, {
      method: 'POST',
    }).then(res => {
      if (res.status === 200) {
        setEmailSent(1); // Show "Order placed" message
        setTimeout(() => navigate('/home'), 2000); // Navigate after 2 seconds
      } else {
        console.log('Order Placement failed!');
      }
    });
  };

  const handleLearnMore = () => {
    navigate('/membership');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Review and Delivery</h1>
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-emerald-600" />
              Choose Delivery Time
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[2, 3].map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedTime === time
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="font-medium">{getFormattedDateNextDay()}</div>
                  <div className="text-lg text-emerald-700">{time} PM</div>
                </button>
              ))}
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-t border-gray-100">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${total}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-t border-gray-100">
                <span className="text-gray-600">GST</span>
                <span className="font-medium">$5.00</span>
              </div>
              <div className="flex justify-between items-center py-3 border-t border-gray-100">
                <span className="text-gray-800 font-semibold text-lg">Total</span>
                <span className="text-gray-800 font-bold text-lg">${(Number(total) + 5).toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="bg-emerald-50 rounded-xl p-6 mb-6">
            <div className="flex items-start space-x-4">
              <Crown className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Upgrade to Premium</h3>
                <p className="text-gray-600 mb-3">
                  Know more about membership plans to avail daily discounts and free shipments
                </p>
                <button onClick={handleLearnMore} className="text-emerald-600 font-medium flex items-center hover:text-emerald-700 transition">
                  Learn More <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between w-full">
              <button onClick={() => navigate('/home')} className="bg-red-400 text-white px-6 py-4 rounded-lg font-semibold hover:bg-red-600 transition shadow-lg">
                Cancel
              </button>
              <button onClick={handlePlaceOrder} className="bg-emerald-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition shadow-lg">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {emailSent !== -1 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-xl font-semibold text-gray-800">
              {emailSent === 0 ? 'Placing Order...' : 'Order placed, Summary sent to your email'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
