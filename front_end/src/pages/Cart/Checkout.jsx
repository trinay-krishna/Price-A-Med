import React, { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import Navbar from '../../Components/Header';
import Footer from '../../Components/Footer';
import { Clock, Truck, CreditCard, Shield, ChevronRight, Crown } from 'lucide-react';

function Checkout() {

  const navigate = useNavigate();

  const location = useLocation();

  // Destructure the data passed from the Cart
  const {  total } = location.state || {};
  const handleCheckout = () => {
    navigate('/home'); 
  };

  const handlePlaceOrder = () => {
    navigate('/home'); 
  };

  const hadleLearnMore = () => {
    navigate('/membership'); 
  };

  const [selectedTime, setSelectedTime] = useState('2 PM');

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
              {['2 PM', '3 PM'].map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedTime === time
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="font-medium">12th January</div>
                  <div className="text-lg text-emerald-700">{time}</div>
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-t border-gray-100">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${total}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-t border-gray-100">
                <span className="text-gray-600">Gst </span>
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
                <button onClick={hadleLearnMore} className="text-emerald-600 font-medium flex items-center hover:text-emerald-700 transition">
                  Learn More <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex justify-between w-full">

              <button onClick={handleCheckout} className="bg-red-400 text-white px-6 py-4 rounded-lg font-semibold hover:bg-red-600 transition shadow-lg">
                Cancel
              </button>
              <button onClick={handlePlaceOrder} className="bg-emerald-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition shadow-lg">
                Place Order
              </button>
            </div>
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Secure Payment
              </div>
              <div className="flex items-center">
                <CreditCard className="w-4 h-4 mr-2" />
                Multiple Payment Options
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Checkout;
