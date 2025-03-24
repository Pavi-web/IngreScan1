
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight, Sparkles, ShieldAlert, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SearchBar from './SearchBar';

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-accent/50 to-transparent -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4 mr-2" />
            <span>Intelligent Skincare Analysis</span>
          </div>
          
          <h1 className="heading-xl mb-6">
            Decode Your <span className="text-primary">Skincare</span> Ingredients
          </h1>
          
          <p className="body-lg text-muted-foreground mb-8">
            Analyze product ingredients, find what works for your skin type,
            and make informed decisions for healthier skin.
          </p>
          
          <div className="max-w-xl mx-auto mb-10">
            <SearchBar />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              onClick={() => navigate('/consult')}
              className="btn-primary"
              size="lg"
            >
              Book Consultation
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button 
              onClick={() => navigate('/ingredients')}
              variant="outline" 
              className="btn-outline"
              size="lg"
            >
              Explore Ingredients
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="glass p-6 rounded-xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="p-3 rounded-full bg-primary/10 inline-block mb-4">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Analyze Ingredients</h3>
            <p className="text-muted-foreground">
              Search and analyze over 10,000 skincare ingredients to understand what goes on your skin.
            </p>
          </div>
          
          <div className="glass p-6 rounded-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="p-3 rounded-full bg-primary/10 inline-block mb-4">
              <ShieldAlert className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Personalized Safety</h3>
            <p className="text-muted-foreground">
              Get personalized recommendations based on your skin type and specific concerns.
            </p>
          </div>
          
          <div className="glass p-6 rounded-xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="p-3 rounded-full bg-primary/10 inline-block mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Expert Guidance</h3>
            <p className="text-muted-foreground">
              Connect with skincare professionals for personalized consultations and advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
