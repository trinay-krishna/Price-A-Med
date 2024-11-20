import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Wallet2, Banknote, ChevronUp, ChevronDown, MapPinned, Pill } from 'lucide-react';
import Navbar from '../../Components/Header';
import Footer from '../../Components/Footer';
import { useLocation } from 'react-router-dom';

function Validate() {

  const location = useLocation();
  const [fileName, setFileName] = useState('');
  
  const receivedItems = location.state?.items || [];
  const [items, setItems] = useState(receivedItems);

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [deliveryDetailsVisible, setDeliveryDetailsVisible] = useState(false);  // New state
  const [paymentMethodVisible, setPaymentMethodVisible] = useState(false); // New state
  
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name); // Set the uploaded file name
    }
  };

  const handleCheckout = () => {
    navigate('/checkout', {
      state: {
        total: discountedTotal
      }
    }); 
  };

  const itemsTotal = items.reduce((sum, item) => sum + (item.price * 0.6).toFixed(2) * item.quantity, 0);
  const deliveryCharge = 10;
  const total = itemsTotal + deliveryCharge;
  const discountedTotal = (total*0.90).toFixed(2);

  const updateQuantity = (index, newQty) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], quantity: Math.max(0, newQty) };
    setItems(newItems);
  };

  useEffect(() => {
    // This runs when the component is mounted or items change
    console.log('Items received for validation:', items);
  }, [items]);


  return (<>
    <div className="min-h-[92vh] bg-emerald-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Validate and Checkout */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-emerald-800">Validate and Checkout {items.name}</h2>
                <p className="text-emerald-600 mt-2">Prescription</p>
              </div>
              
              <div className="overflow-x-auto mb-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-emerald-100">
                      <th className="text-left py-4 text-emerald-700">Tablet Name</th>
                      <th className="text-center py-4 text-emerald-700">Days</th>
                      <th className="text-right py-4 text-emerald-700">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index} className="border-b border-emerald-50">
                        <td className="py-4 text-emerald-900">{item.name}</td>
                        <td className="py-4">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                              className="p-1 hover:bg-emerald-50 rounded text-emerald-600"
                            >
                              <ChevronDown size={16} />
                            </button>
                            <span className="w-8 text-center text-emerald-900">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                              className="p-1 hover:bg-emerald-50 rounded text-emerald-600"
                            >
                              <ChevronUp size={16} />
                            </button>
                          </div>
                        </td>
                        <td className="text-right py-4 text-emerald-900">${((item.price * 0.6) * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex flex-col justify-between items-start">
                <label className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer mb-2">
                  Upload Prescription
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
                
                {fileName && (
                  <p className="text-emerald-700 mt-2">Uploaded File: {fileName}</p>
                )}
                
                <button
                  onClick={() => setDeliveryDetailsVisible(true)} // Show delivery section
                  className="w-full bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors mt-4"
                >
                  Checkout
                </button>
              </div>
            </div>

            {/* Delivery Details Section */}
            {deliveryDetailsVisible && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-6 text-emerald-800">Delivery Details</h2>
                <div className="space-y-4">
                  {/* Delivery address form */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-emerald-700 mb-1">Deliver At</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          className="w-full pl-10 pr-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                          placeholder="Enter delivery address"
                        />
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400" size={20} />
                      </div>
                      <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                        <MapPinned size={20} />
                        Locate
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-emerald-700 mb-1">Contact Number</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Enter contact number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-emerald-700 mb-1">Recipient Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Enter recipient name"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => setPaymentMethodVisible(true)} // Show payment method section
                      className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Use This Address
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method Section */}
            {paymentMethodVisible && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-semibold mb-6 text-emerald-800">Payment Method</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => {
                      setPaymentMethod('card');
                      setShowCardDetails(true);
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-colors ${paymentMethod === 'card' ? 'border-emerald-600 bg-emerald-50' : 'border-emerald-200 hover:border-emerald-600'}`}
                  >
                    <CreditCard size={24} className="text-emerald-600" />
                    <span className="text-emerald-600">Card</span>
                  </button>
                  <button
                    onClick={() => {
                      setPaymentMethod('upi');
                      setShowCardDetails(false);
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-colors ${paymentMethod === 'upi' ? 'border-emerald-600 bg-emerald-50' : 'border-emerald-200 hover:border-emerald-600'}`}
                  >
                    <Wallet2 size={24} className="text-emerald-600" />
                    <span className="text-emerald-600">UPI</span>
                  </button>
                  <button
                    onClick={() => {
                      setPaymentMethod('cod');
                      setShowCardDetails(false);
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-colors ${paymentMethod === 'cod' ? 'border-emerald-600 bg-emerald-50' : 'border-emerald-200 hover:border-emerald-600'}`}
                  >
                    <Banknote size={24} className="text-emerald-600" />
                    <span className="text-emerald-600">Cash on Delivery</span>
                  </button>
                  
                </div>

                {paymentMethod === 'card' && showCardDetails && (
                  <div className="mt-6">
                    <input
                      type="text"
                      className="w-full mb-4 px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Card Number"
                    />
                    <div className="flex items-center space-x-4">
                      <input
                        type="text"
                        className="w-1/2 px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Expiry Date"
                      />
                      <input
                        type="text"
                        className="w-1/2 px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="CVV"
                      />
                    </div>
                    
                  </div>
                  
                )}
                <div className="flex justify-end mt-4">

                  <button onClick={handleCheckout} className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                    Proceed
                  </button>

                </div>
              </div>
            </div>
            )}
          </div>
          {/* Right Column - Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-emerald-700">Subtotal</p>
                <p className="text-sm font-semibold text-emerald-900">${itemsTotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-emerald-700">Delivery Charge</p>
                <p className="text-sm font-semibold text-emerald-900">${deliveryCharge.toFixed(2)}</p>
              </div>
              <div className="border-t border-gray-200 my-4"></div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-emerald-700">Total</p>
                <p className="text-sm font-semibold text-emerald-900">${total.toFixed(2)}</p>
              </div>
              <div className="border-t border-gray-200 my-4"></div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-emerald-700">Discounted Total</p>
                <p className="text-lg font-semibold text-red-600">${discountedTotal}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <Footer />
    </>
  );
}

export default Validate;
