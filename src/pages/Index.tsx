
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeatureSection from '@/components/FeatureSection';
import ProductSection from '@/components/ProductSection';
import ConsultSection from '@/components/ConsultSection';
import CtaSection from '@/components/CtaSection';

const Index = () => {
  // Apply a global page transition animation when component mounts
  useEffect(() => {
    // Set page to visible with a fade-in effect
    document.body.classList.add('animate-fade-in');
    
    return () => {
      document.body.classList.remove('animate-fade-in');
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeatureSection />
        <ProductSection />
        <ConsultSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
