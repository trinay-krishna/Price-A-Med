import React,{useEffect, useState} from 'react';

function CartItem({
  id,
  name,
  brand,
  store,
  distance,
  delivery,
  price,
  quantity,
  selected,
  onQuantityChange,
  onCheckboxChange,
  removeItem,
  pharmID,
  medicationID,
  updateTotal
}) {

  const [Quantity, setIsQuantity] = useState(quantity);
  const [ discount, setDiscount ] = useState(20);
  const onIncButton=()=>{
     onQuantityChange(id, true);
     setIsQuantity( Math.min(Quantity + 1, 10));  
  };
  const onDecButton=()=>{
    onQuantityChange(id, false);
    setIsQuantity( Math.max(Quantity - 1, 0));  
 };
  const onButtonClick=()=>{
    removeItem(id);

    fetch(`http://localhost:8080/delCart?userId=${localStorage.getItem('userId')}&medId=${medicationID}&pharmId=${pharmID}`, { method: 'POST' })
    .then(res => console.log(res.status));

  };

  useEffect( ( ) => {
    fetch(`http://localhost:8080/getUserMembership?userId=${localStorage.getItem('userId')}`)
    .then( res => res.text() )
    .then( res => {
      const discount = JSON.parse(res).membership.planDiscount;
      setDiscount(discount);
    } )
  }, [] )

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-md">
      <div className="flex items-center gap-4">
        {/* <input
          type="checkbox"
          checked={true}
          onChange={()=>{onCheckboxChange(id)}}
          className="h-5 w-5 text-indigo-600 border-gray-300 rounded"
        /> */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-600">{brand}</p>
          <p className="text-sm text-gray-500">{store}</p>
          <p className="text-sm text-gray-400">{distance}</p>
          <p className="text-sm text-gray-500">{delivery}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={onDecButton}
            className="px-2 py-1 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300"
          >
            -
          </button>
          <span className="text-lg font-medium">{Quantity}</span>
          <button
            onClick={onIncButton}
            className="px-2 py-1 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300"
          >
            +
          </button>
        </div>
        <p className="text-lg font-medium text-green-600">$ {Quantity*(price - price * discount/100).toFixed(2)}</p>
      </div>
      <button 
      onClick={onButtonClick}
        className={`flex items-center text-sm text-white bg-red-600 hover:bg-red-400 transition-colors duration-300 py-2 px-4 rounded-lg focus:outline-none`}
       >
            <span>Remove From cart</span>
        </button>
      </div>
    </div>
  );
}

export default CartItem;
