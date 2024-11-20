import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import CartItem from './CartItem';
import Navbar from '../../Components/Header';
import Footer from '../../Components/Footer';
import MembershipDiscounts from '../Prescription/MembershipDiscounts';
import { useDrugsContext } from "../../Components/DrugsContext";


function CartMed() {
  const { allDrugs, setAllDrugs, toggleAddToCart } = useDrugsContext();
  const navigate = useNavigate();
  const cartItems = allDrugs.filter((drug) => drug.addToCart);
  const [items, setItems] = useState(
    cartItems.map((drug) => ({
      id: drug.medid,
      name: `${drug.medname} - ${drug.strength}`,
      brand: drug.brandname,
      store: drug.store_name,
      distance: `${drug.distance} miles away`,
      delivery: drug.home_delivery ? "Home Delivery" : "In-store Pickup",
      price: drug.price,
      quantity: 0,
      selected: false
    }))
  );
  const calculateTotalAmount = (items) => {
    return items.reduce((sum, item) => {
      return sum + (item.selected ? (item.price * 0.6).toFixed(2) * item.quantity : 0);
    }, 0);
  };
  const [total, setTotal] = useState(calculateTotalAmount(items));

  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    toggleAddToCart(id);
  };

  const updateTotal = () => {
    const val = calculateTotalAmount(items);
    setTotal(val);
  }

  const handleQuantityChange = useCallback((id, increment) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: increment ? Math.min(item.quantity + 1, 10) : Math.max(item.quantity - 1, 0) }
          : item
      )
    );
    updateTotal();
  }, []);

  const handleCheckboxChange = useCallback(id => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
    updateTotal();
  }, []);

  useEffect(() => {
    updateTotal();
  }, [items]);

  const handlevalidate = () => {
    const selectedItems = items.filter(item => item.selected);

    // Transform selected items to match the format
    const transformedItems = selectedItems.map((item) => ({
      name: item.name,
      quantity: item.quantity, // Default quantity from the selected items
      price: item.price
    }));
    console.log(transformedItems);
    // Navigate and pass the transformed items as state
    navigate('/validate', { state: { items: transformedItems } });

  };

  return (
    <div className="bg-[#E8F5E9]">
      <Navbar />
      <div className='container mx-auto px-4 py-8 space-y-8 min-h-screen bg-[#E8F5E9] '>
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl p-6 b-5">

          <div className="flex items-center justify-between mb-6 ">
            <div className="flex items-center gap-2 ">
              <ShoppingCart className="w-6 h-6 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>
            </div>
            <div className="flex gap-3">



              <button
                onClick={handlevalidate}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Validate
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {items.map(item => (
              <CartItem
                key={item.id}
                {...item}
                onQuantityChange={handleQuantityChange}
                onCheckboxChange={handleCheckboxChange}
                removeItem={removeItem}
                updateTotal={updateTotal}
              />
            ))}
          </div>

          <div className="flex justify-between mt-6 text-lg font-semibold">
            <p className="text-gray-800">Total Amount:</p>
            <p className="text-red-600">$ {total.toFixed(2)}</p>
          </div>

        </div>
        <MembershipDiscounts />
      </div>

      <Footer />
    </div>

  );
}

export default CartMed;
