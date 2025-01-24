import React, { useEffect, useState } from 'react';
import { MapPin, ShoppingCart, Truck, Star, Calendar } from 'lucide-react';
import { useDrugsContext } from "../../Components/DrugsContext"; 

export default function DrugCard({ drug }) {

  const [ discount, setDiscount ] = useState(1);

  useEffect( ( ) => {
    fetch(`http://localhost:8080/getUserMembership?userId=${localStorage.getItem('userId')}`)
    .then( res => res.text() )
    .then( res => {
      const discount = JSON.parse(res).membership.planDiscount;
      setDiscount(discount);
      console.log("DISCOUNT IS ", discount);
    } )
  }, [] )

  // Calculate discounted price
  const discountedPrice = (drug.price - ( drug.price * (discount/100) )).toFixed(2); // 40% discount applied
  const {allDrugs,toggleAddToCart } = useDrugsContext(); 
  const [isAddedToCart, setIsAddedToCart] = useState(drug.addToCart);

  // Check if the drug is added to the cart
  var buttonText = drug.addToCart ? 'Added to Cart' : 'Add to Cart';
  var buttonColor = drug.addToCart ? 'bg-green-600' : 'bg-blue-600';


  const onButtonClick = () => {
    console.log(drug.med);
    const med = drug.med;
    if ( !isAddedToCart ) {
      fetch('http://localhost:8080/addCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: JSON.parse(localStorage.getItem('user')),
          pharmacy: med.pharmacy, 
          medication: med.medication,
          quantity: 1,
          unitPrice: med.unitPrice,
        }),
      })
    } else {
      fetch(`http://localhost:8080/delCart?userId=${localStorage.getItem('userId')}&medId=${med.medication.id}&pharmId=${med.pharmacy.id}`, { method: 'POST' })
      .then(res => res.text())
      .then(res => console.log(res));
    }
    // toggleAddToCart(drug.medid); 
    setIsAddedToCart(!isAddedToCart);  // Update the local state
  };


  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex gap-6">
        {/* Display drug image */}
        <img
          src={drug.image}
          alt={drug.medname}
          className="w-32 h-32 object-cover rounded-lg"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3
              className={`text-lg font-bold py-1 px-2 rounded-lg ${
                drug.generic
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {drug.medname}
            </h3>
            <div className="flex items-center space-x-2">
              {/* Original Price with strike-through */}
              <span className="text-sm bg-red-100 text-red-800 py-1 px-2 rounded-full line-through">
                ${drug.price.toFixed(2)}
              </span>
              {/* Discounted Price */}
              <span className="text-sm bg-green-100 text-green-800 py-1 px-2 rounded-full">
                ${discountedPrice}
              </span>
            </div>
          </div>

          {/* Display drug description */}
          <p className="text-sm text-gray-700 mb-2">{drug.description}</p>

          <p className="text-sm text-gray-600"><strong>Brand: </strong>{drug.brandname}</p>
          <p className="text-sm text-gray-600"><strong>Category: </strong>{drug.drug_category}</p>
          <p className="text-sm text-gray-600">
            <strong>Strength:</strong> {drug.strength}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Dosage:</strong> {drug.dosage_form}
          </p>
          <div className="flex items-center text-yellow-500 mt-2">
            <Star className="w-4 h-4" />
            <span className="ml-1 text-sm">{drug.rating}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{drug.store_name} ({drug.distance} miles)</span>
        </div>
        <div className="flex items-center space-x-4">
          {drug.home_delivery && (
            <div className="flex items-center text-sm text-green-600">
              <Truck className="w-4 h-4 mr-2" />
              <span>Home Delivery</span>
            </div>
          )}
          {drug.days_supply && (
            <div className="flex items-center text-sm text-blue-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{drug.days_supply} days supply</span>
            </div>
          )}
        </div>
        <button 
        className={`flex items-center text-sm text-white ${isAddedToCart ? 'bg-blue-600': 'bg-green-600'} hover:${isAddedToCart ?'bg-blue-300' : 'bg-green-300'} transition-colors duration-300 py-2 px-4 rounded-lg focus:outline-none`}
        onClick={onButtonClick}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            <span>{isAddedToCart ? 'Added to Cart' : 'Add to Cart'}</span>
        </button>

      </div>
    </div>
  );
}
