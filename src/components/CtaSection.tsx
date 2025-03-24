
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const CtaSection = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email.trim()) {
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail('');
    }
  };
  
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12">
              <h2 className="heading-lg mb-4 text-foreground">
                Your Journey to <span className="text-primary">Healthier Skin</span> Starts Here
              </h2>
              
              <p className="text-muted-foreground mb-8">
                Join thousands of users who have revolutionized their skincare routine with our advanced ingredient analysis technology.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-primary/10 text-primary mr-4">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Create your profile</h3>
                    <p className="text-sm text-muted-foreground">Set your skin type and concerns</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-primary/10 text-primary mr-4">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Analyze your products</h3>
                    <p className="text-sm text-muted-foreground">Check ingredients against your skin needs</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-primary/10 text-primary mr-4">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium">Discover better options</h3>
                    <p className="text-sm text-muted-foreground">Get personalized recommendations</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button
                  onClick={() => navigate('/products')}
                  className="btn-primary"
                  size="lg"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="bg-accent p-8 lg:p-12 flex flex-col justify-center">
              <div>
                <h3 className="heading-sm mb-4">Subscribe to Our Newsletter</h3>
                
                <p className="text-muted-foreground mb-6">
                  Get the latest skincare tips, ingredient insights, and exclusive offers directly to your inbox.
                </p>
                
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full btn-primary">
                    Subscribe
                  </Button>
                </form>
                
                <p className="text-xs text-muted-foreground mt-4">
                  By subscribing, you agree to our <a href="#" className="underline">Privacy Policy</a> and <a href="#" className="underline">Terms of Service</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
