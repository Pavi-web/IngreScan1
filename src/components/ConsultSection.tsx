
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

const consultants = [
  {
    id: 'D1',
    name: 'Dr. Anupama R',
    title: 'Dermatologist',
    specialty: 'Acne & Sensitive Skin',
    image: '/placeholder.svg',
    rating: 4.9,
    reviewCount: 128,
    available: true
  },
  {
    id: 'c2',
    name: 'ANJANA SHARMA',
    title: 'Esthetician',
    specialty: 'Anti-aging & Hydration',
    image: '/placeholder.svg',
    rating: 4.8,
    reviewCount: 102,
    available: true
  },
  {
    id: 'c3',
    name: 'Dr. Abhirami P M',
    title: 'Cosmetic Chemist',
    specialty: 'Product Formulation',
    image: '/placeholder.svg',
    rating: 4.7,
    reviewCount: 89,
    available: false
  }
];

const ConsultSection = () => {
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const handleBookConsultation = () => {
    if (selectedExpert) {
      toast({
        title: "Consultation Scheduled",
        description: `Your appointment with ${consultants.find(c => c.id === selectedExpert)?.name} has been booked.`,
      });
      navigate('/consult');
    } else {
      toast({
        title: "Please select an expert",
        description: "You must select a skincare expert to book a consultation.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="heading-lg mb-4">
            Expert <span className="text-primary">Consultations</span>
          </h2>
          <p className="body-md text-muted-foreground">
            Connect with our skincare professionals for personalized advice and recommendations
            tailored to your unique skin needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              {consultants.map(consultant => (
                <div
                  key={consultant.id}
                  className={`p-4 border rounded-xl transition-all duration-300 cursor-pointer ${
                    selectedExpert === consultant.id 
                      ? 'border-primary shadow-md bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedExpert(consultant.id)}
                >
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={consultant.image} alt={consultant.name} />
                      <AvatarFallback>{consultant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{consultant.name}</h3>
                          <p className="text-sm text-muted-foreground">{consultant.title}</p>
                        </div>
                        
                        {consultant.available ? (
                          <Badge variant="outline" className="badge-success">Available</Badge>
                        ) : (
                          <Badge variant="outline" className="badge-warning">Limited</Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center mt-2">
                        <div className="text-sm mr-3">
                          <span className="font-medium text-primary">{consultant.rating}</span>
                          <span className="text-muted-foreground"> ({consultant.reviewCount} reviews)</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Specialty:</span> {consultant.specialty}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button
              onClick={handleBookConsultation}
              className="btn-primary w-full"
              disabled={!selectedExpert}
            >
              Book Consultation
            </Button>
          </div>
          
          <div>
            <div className="glass rounded-2xl p-8 space-y-6">
              <h3 className="heading-sm mb-6">Why Consult Our Experts?</h3>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <User className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Personalized Analysis</h4>
                    <p className="text-muted-foreground text-sm">
                      Get an in-depth analysis of your skin type and concerns from certified professionals.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Custom Recommendations</h4>
                    <p className="text-muted-foreground text-sm">
                      Receive tailored product and routine recommendations based on your specific needs.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <Calendar className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Flexible Scheduling</h4>
                    <p className="text-muted-foreground text-sm">
                      Book appointments at your convenience, with virtual consultations available.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-border text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Your first consultation includes a free skin analysis report.
                </p>
                <div className="flex justify-center space-x-6">
                  <div className="text-center">
                    <div className="text-primary font-medium text-lg">30min</div>
                    <div className="text-xs text-muted-foreground">Session Length</div>
                  </div>
                  <div className="text-center">
                    <div className="text-primary font-medium text-lg">$49</div>
                    <div className="text-xs text-muted-foreground">Starting Price</div>
                  </div>
                  <div className="text-center">
                    <div className="text-primary font-medium text-lg">100%</div>
                    <div className="text-xs text-muted-foreground">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultSection;
