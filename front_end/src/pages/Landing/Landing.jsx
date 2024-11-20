import React, { useRef, useState } from 'react';
import Carousel from './Carousel';
import Benefits from './Benefits';
import Support from './Support';
import FAQ from './FAQ';
import Footer from '../../Components/Footer';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import './tailwind.css'
import LandingHeader from './LandingHeader';

export default function Landing2() {
  const benefitsRef = useRef(null);
  const supportRef = useRef(null);
  const faqRef = useRef(null);

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);  

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  const openSignUpModal = () => setIsSignUpOpen(true);
  const closeSignUpModal = () => setIsSignUpOpen(false);

  const toggleToSignUp = () => {
    closeLoginModal();
    openSignUpModal();
  };

  const toggleToLogin = () => {
    closeSignUpModal();
    openLoginModal();
  };

  function scrollToBenefits() {
    benefitsRef.current.scrollIntoView();
  }

  function scrollToSupport() {
    supportRef.current.scrollIntoView();
  }

  function scrollToFAQ() {
    faqRef.current.scrollIntoView();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* <Header onLoginClick={openLoginModal} /> */}
      <LandingHeader onLoginClick={openLoginModal} scrollToBenefits = {scrollToBenefits} scrollToSupport = {scrollToSupport} scrollToFAQ = {scrollToFAQ}/>
      

      <LoginModal
        isOpen={isLoginOpen}
        onClose={closeLoginModal}
        onSignUpClick={toggleToSignUp}
      />
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={closeSignUpModal}
        onLoginClick={toggleToLogin} 
      />

      <Carousel />
      <Benefits ref = {benefitsRef}/>
      <Support ref = {supportRef}/>
      <FAQ ref = {faqRef}/>

      <Footer />
    </div>
  );
}
