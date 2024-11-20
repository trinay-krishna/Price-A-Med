import React, { useState } from 'react';
import Navbar from '../../Components/Header';
import RunningPrescriptions from './RunningPrescriptions';
import OlderPrescriptions from './OlderPrescriptions';
import MembershipDiscounts from './MembershipDiscounts';
import Footer from '../../Components/Footer';


function Prescription() {
  return (
    <div className="min-h-screen bg-[#E9F7EF]">
      <Navbar />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <RunningPrescriptions />
        <OlderPrescriptions />
        <MembershipDiscounts />
      </main>
      <Footer />
    </div>
  );
}

export default Prescription;