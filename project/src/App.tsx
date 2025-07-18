import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'sonner';
import StickyHeader from './components/StickyHeader';
import HeroSection from './components/HeroSection';
import ContactForm from './components/ContactForm';
import ServicePackages from './components/ServicePackages';
import ProcessVisualization from './components/ProcessVisualization';
import ResultsShowcase from './components/ResultsShowcase';
import WhatsAppLeadCapture from './components/WhatsAppLeadCapture';
import PremiumFooter from './components/PremiumFooter';
import PerformanceOptimizer, { usePerformanceMonitoring } from './components/PerformanceOptimizer';
import { abTestManager, trackPerformance, initHeatMapping } from './utils/analytics';
import './index.css';

function App() {
  usePerformanceMonitoring();

  useEffect(() => {
    // Initialize analytics and tracking
    trackPerformance();
    initHeatMapping();

    // Track page view
    abTestManager.trackEvent('page_view', {
      page: 'landing_page',
      timestamp: Date.now(),
      user_agent: navigator.userAgent
    });
  }, []);

  const handleCTAClick = () => {
    abTestManager.trackEvent('cta_click', {
      location: 'header',
      timestamp: Date.now()
    });
    
    // Open free audit link
    window.open('https://topmate.io/karthikeyathallapally/1629984', '_blank');
  };

  const handleServiceClick = (service: string) => {
    abTestManager.trackEvent('service_click', {
      service: service,
      timestamp: Date.now()
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <PerformanceOptimizer />
      <StickyHeader onCTAClick={handleCTAClick} />
      
      <main>
        <HeroSection onCTAClick={handleCTAClick} />
        <ContactForm />
        <ServicePackages onServiceClick={handleServiceClick} />
        <ProcessVisualization />
        <ResultsShowcase />
        <WhatsAppLeadCapture />
      </main>
      
      <PremiumFooter />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;