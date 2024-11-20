import React, { useState } from 'react';
import Navbar from '../../Components/Header';
import MembershipDiscounts from '../Prescription/MembershipDiscounts';
import CurrentPlans from './CurrentPlans';
import Footer from '../../Components/Footer';


function Membership() {
  return (
    <div className="min-h-screen bg-[#E9F7EF]">
      <Navbar />
      <CurrentPlans />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <MembershipDiscounts />
      </main>
      <Footer />
    </div>
  );
}

export default Membership;