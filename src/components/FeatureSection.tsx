
import { useState } from 'react';
import { 
  Check, 
  Scan, 
  Dna, 
  Filter, 
  LineChart, 
  ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const FeatureSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  
  const features = [
    {
      title: "Analyze Product Ingredients",
      description: "Scan product labels or search for ingredients to understand what's in your skincare products.",
      icon: <Scan className="h-6 w-6" />,
      benefits: [
        "Identify potentially harmful ingredients",
        "Understand complex ingredient terminology",
        "Compare ingredients across products"
      ]
    },
    {
      title: "Personalized Recommendations",
      description: "Get tailored recommendations based on your skin type, concerns, and ingredient preferences.",
      icon: <Filter className="h-6 w-6" />,
      benefits: [
        "Products matched to your skin type",
        "Avoid ingredients you're sensitive to",
        "Find alternatives to products with harmful ingredients"
      ]
    },
    {
      title: "Comprehensive Ingredient Database",
      description: "Access our extensive database of skincare ingredients with detailed information and safety ratings.",
      icon: <Dna className="h-6 w-6" />,
      benefits: [
        "Safety ratings for thousands of ingredients",
        "Scientific explanations in simple terms",
        "Regular updates based on the latest research"
      ]
    },
    {
      title: "Track Your Skincare Progress",
      description: "Monitor your skin's response to different products and ingredients over time.",
      icon: <LineChart className="h-6 w-6" />,
      benefits: [
        "Log daily skincare routines",
        "Track skin changes and improvements",
        "Identify patterns between products and skin reactions"
      ]
    }
  ];
  
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-lg mb-4">
            Skincare Made <span className="text-primary">Simple</span>
          </h2>
          <p className="body-md text-muted-foreground">
            Our smart technology analyzes ingredients, provides personalized recommendations,
            and helps you make informed skincare decisions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`cursor-pointer p-6 rounded-xl transition-all duration-300 ${
                    activeTab === index ? 'glass shadow-md' : 'hover:bg-accent/50'
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  <div className="flex items-start">
                    <div className={`p-2 rounded-lg ${
                      activeTab === index ? 'bg-primary text-white' : 'bg-accent text-primary'
                    } mr-4`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{feature.title}</h3>
                      <p className="text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={() => navigate('/ingredients')}
                className="btn-primary"
              >
                Explore Features
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-7">
            <div className="bg-gradient-to-br from-primary/5 to-accent/30 rounded-2xl p-8 shadow-lg">
              <div className="mb-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {features[activeTab].icon}
                  <span className="ml-2">{features[activeTab].title}</span>
                </div>
              </div>
              
              <h3 className="heading-md mb-6">Key Benefits</h3>
              
              <div className="space-y-4">
                {features[activeTab].benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center p-4 glass rounded-lg">
                    <div className="p-1 rounded-full bg-green-100 text-green-600 mr-3 flex-shrink-0">
                      <Check className="h-5 w-5" />
                    </div>
                    <p className="font-medium">{benefit}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-border">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Join thousands of users who have improved their skincare routine
                  </p>
                  <Button
                    onClick={() => navigate('/products')}
                    variant="outline"
                    className="btn-outline"
                  >
                    Browse Products
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
