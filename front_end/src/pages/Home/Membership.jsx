import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Header';
import MembershipDiscounts from '../Prescription/MembershipDiscounts';
import CurrentPlans from './CurrentPlans';
import Footer from '../../Components/Footer';
import { Heart, Star, Shield } from 'lucide-react';

const memberships = [
  {
    id: 1,
    title: "Health Starter",
    description:
      "Comprehensive health monitoring and personalized recommendations",
    benefits: [
      "Regular health check-ups",
      "Priority appointment booking",
      "Digital health records",
      "Personalized health insights",
      "20% discount on purchases",
    ],
    price: 700, 
    gradient: "from-yellow-400 to-orange-500",
    icon: <Shield className="text-white w-8 h-8" />,
   
  },
  {
    id: 2,
    title: "Wellness Plus",
    description: "Enhanced wellness program with exclusive benefits",
    benefits: [
      "Premium health services",
      "Specialist consultations",
      "Wellness workshops",
      "Fitness tracking",
      "40% discount on purchases",
    ],
    price: 850,
    gradient: "from-green-400 to-blue-400",
    icon: <Star className="text-white w-8 h-8" />,
  },
  {
    id: 3,
    title: "Vital Care",
    description: "Complete healthcare coverage for you and your family",
    benefits: [
      "Family health coverage",
      "Emergency support",
      "Mental health services",
      "Nutrition guidance",
      "60% discount on purchases",
    ],
    price: 1000, 
    gradient: "from-pink-500 to-red-500",
    icon: <Heart className="text-white w-8 h-8" />,
  },
];



function Membership() {

  const [ memberships, setMemberships ] = useState([]);
  const [ userPlan, setUserPlan ] = useState(-1);

  const backend = import.meta.env.VITE_BACKEND;

  useEffect( ( ) => {
    fetch(`${backend}/getMembershipPlans`)
    .then(res => res.text())
    .then( res => {
      const membershipPlans = JSON.parse(res);
      setMemberships(membershipPlans);
      fetch(`${backend}/getUserMembership?userId=${localStorage.getItem('userId')}`)
      .then( res => res.text() )
      .then( res => {
          const membership = JSON.parse(res);
  
          const id = membership.membership.id;
          
          setUserPlan(id);
          setCurrentPlan([ membershipPlans.find( (plan) => plan.membership.id == id ) ])
      } )
      console.log("plans",membershipPlans);
    } )
  }, [] )

  useEffect( () => {

  } )

  const [currentPlan, setCurrentPlan] = useState([]); 

  const handleUpgrade = (newPlan) => {
    setCurrentPlan([newPlan]); 
    console.log(newPlan);
    fetch(`http://${backend}/upgradeUser?userId=${localStorage.getItem('userId')}&membershipId=${newPlan.membership.id}`, { method: 'POST' })
    .then( res => {
      console.log(res.status);
    })


  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <CurrentPlans currentPlan={currentPlan} />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <MembershipDiscounts onUpgrade={handleUpgrade} />
      </main>
      <Footer />
    </div>
  );
}

export default Membership;
