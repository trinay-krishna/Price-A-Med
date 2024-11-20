import React from 'react';
import Navbar from '../../Components/Header';
import Footer from '../../Components/Footer';
const orders = [
  {
    id: "12345",
    date: "2024-11-10",
    price: "₹599.00",
    deliveryTime: "2-3 days",
  },
  {
    id: "67890",
    date: "2024-11-08",
    price: "₹899.50",
    deliveryTime: "3-5 days",
  },
];

const YourOrders = () => {
  return (
      <div className="min-h-screen bg-[#E9F7EF] flex flex-col bg-[#E8F5E9] overflow-y-scroll">
      <Navbar />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <header className="text-center mb-6">
          <div className="flex gap-6 justify-center mt-4">
            <span className="text-lg text-green-600 cursor-pointer px-3 py-2 rounded-md hover:bg-green-200 ">Your Orders</span>
            <span className="text-lg text-green-600 cursor-pointer px-3 py-2 rounded-md hover:bg-green-200">Cancelled Orders</span>
            <span className="text-lg text-green-600 cursor-pointer px-3 py-2 rounded-md hover:bg-green-200">Previous Orders</span>
          </div>
        </header>
      </main>
      

      <div className="max-w-7xl flex flex-wrap gap-6 p-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className=" sm:w-1/2 lg:w-1/3 xl:w-1/4 bg-white rounded-lg shadow-md border border-gray-200 p-6 transition-shadow hover:shadow-xl"
          >
            <div className="flex flex-col gap-4 text-gray-800 text-sm">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Ordered Date:</strong> {order.date}</p>
              <p><strong>Price:</strong> {order.price}</p>
              <p><strong>Delivery Time:</strong> {order.deliveryTime}</p>
            </div>
            <div className="flex gap-4 mt-10">
              <div className="px-4 py-2 text-center rounded-lg font-bold text-gray-700 bg-teal-300 hover:bg-teal-200 cursor-pointer transition-colors">Know More</div>
              <div className="px-4 py-2 text-center rounded-lg font-bold text-gray-700 bg-blue-300 hover:bg-blue-200 cursor-pointer transition-colors">Track Order</div>
              <div className="px-4 py-2 text-center rounded-lg font-bold text-gray-700 bg-red-300 hover:bg-red-200 cursor-pointer transition-colors">Cancel Order</div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default YourOrders;
