import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';

import Footer from './components/Footer';
import AIChatWidget from './components/AIChatWidget';
import About from './components/About';
import Contact from './components/Contact';
import Careers from './components/Careers';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsConditions from './components/TermsConditions';

import StaffAugmentationPage from './components/StaffAugmentationPage';
import WhyChooseUsPage from './components/WhyChooseUsPage';
import TechnologiesPage from './components/TechnologiesPage';
import ITStaffAugmentation from './components/ITStaffAugmentation';
import EngagementModels from './components/EngagementModels';
import IndustriesWeServe from './components/IndustriesWeServe';
import WhyChooseAlgroFlix from './components/WhyChooseAlgroFlix';
import ITServices from './components/ITServices';
import LandingPage from './components/LandingPage';
import CookieConsent from './components/CookieConsent';

// Admin components
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import BlogForm from './components/BlogForm';
import CookieConsents from './components/CookieConsents';
import BlogListing from './components/BlogListing';
import BlogDetail from './components/BlogDetail';

// Component to handle section highlighting in header
const SectionHandler: React.FC<{ setActiveSection: (section: string) => void }> = ({ setActiveSection }) => {
  const location = useLocation();

  useEffect(() => {
    // Extract section from URL hash
    const hash = location.hash.replace('#', '');
    if (hash) {
      setActiveSection(hash);
    } else {
      // Default to home if no hash
      setActiveSection('home');
    }
  }, [location, setActiveSection]);

  return null;
};

const AppContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  // Check if current path is an admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Header activeSection={activeSection} setActiveSection={setActiveSection} />}
      <SectionHandler setActiveSection={setActiveSection} />
      
      <main className={isAdminRoute ? '' : 'pt-20'}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />

          <Route path="/staff-augmentation" element={<StaffAugmentationPage />} />
          <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
          <Route path="/technologies" element={<TechnologiesPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/it-staff-augmentation" element={<ITStaffAugmentation />} />
          <Route path="/engagement-models" element={<EngagementModels />} />
          <Route path="/industries-we-serve" element={<IndustriesWeServe />} />
          <Route path="/why-choose-algoflix" element={<WhyChooseAlgroFlix />} />
          <Route path="/it-services" element={<ITServices />} />
          <Route path="/blog" element={<BlogListing />} />
                    <Route path="/blog/:slug" element={<BlogDetail />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/blog/new" element={<BlogForm />} />
          <Route path="/admin/blog/edit/:id" element={<BlogForm />} />
          <Route path="/admin/dashboard/cookie-consents" element={<CookieConsents />} />
        </Routes>
      </main>
      
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <AIChatWidget />}
      {!isAdminRoute && <CookieConsent />}
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <AppContent />
      </div>
    </Router>
  );
}

export default App;