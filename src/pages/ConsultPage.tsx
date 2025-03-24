import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useProfile } from '@/contexts/ProfileContext';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Phone, 
  Video, 
  MessageSquare, 
  User,
  ArrowRight,
  Check,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { TooltipProvider } from '@/components/ui/tooltip';

const consultants = [
  {
    id: 'c1',
    name: 'Dr.Anupama R',
    title: 'Dermatologist',
    specialty: 'Acne & Sensitive Skin',
    image: '/placeholder.svg',
    rating: 4.9,
    reviewCount: 128,
    available: true,
    price: 120,
    description: 'Board-certified dermatologist specializing in acne, eczema, and sensitive skin conditions. Over 10 years of experience in both clinical and cosmetic dermatology.'
  },
  {
    id: 'c2',
    name: 'ABHIRAMI P M',
    title: 'Esthetician',
    specialty: 'Anti-aging & Hydration',
    image: '/placeholder.svg',
    rating: 4.8,
    reviewCount: 102,
    available: true,
    price: 80,
    description: 'Licensed esthetician with expertise in anti-aging treatments, hydration protocols, and customized skincare routines. Certified in advanced facial techniques.'
  },
  {
    id: 'c3',
    name: 'Dr. ANJANA SHARMA',
    title: 'Cosmetic Chemist',
    specialty: 'Product Formulation',
    image: '/placeholder.svg',
    rating: 4.7,
    reviewCount: 89,
    available: false,
    price: 100,
    description: 'PhD in Cosmetic Science with specialty in clean beauty formulations. Helps clients understand ingredient interactions and find products that work synergistically.'
  }
];

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM'
];

const ConsultPage = () => {
  const { profile } = useProfile();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);
  const [consultationType, setConsultationType] = useState<string>('video');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [concerns, setConcerns] = useState('');
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState('');
  
  const totalSteps = 4;
  
  const handleNext = () => {
    if (currentStep === 1 && !selectedExpert) {
      toast({
        title: "Please select an expert",
        description: "You must select a skincare expert to continue.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep === 2 && !selectedDate) {
      toast({
        title: "Please select a date",
        description: "You must select a consultation date to continue.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep === 2 && !selectedTime) {
      toast({
        title: "Please select a time",
        description: "You must select a consultation time to continue.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep === 3 && (!name || !email)) {
      toast({
        title: "Missing information",
        description: "Please provide your name and email to continue.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmit = () => {
    const expert = consultants.find(c => c.id === selectedExpert);
    
    toast({
      title: "Consultation Booked!",
      description: `Your ${consultationType} consultation with ${expert?.name} is scheduled for ${selectedDate ? format(selectedDate, 'MMMM do, yyyy') : ''} at ${selectedTime}.`,
    });
    
    setCurrentStep(1);
    setSelectedExpert(null);
    setConsultationType('video');
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    setConcerns('');
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="heading-md">Choose Your Skin Expert</h2>
            <div className="space-y-4">
              {consultants.map(consultant => (
                <div
                  key={consultant.id}
                  className={`p-5 border rounded-xl transition-all duration-300 cursor-pointer ${
                    selectedExpert === consultant.id 
                      ? 'border-primary shadow-md bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedExpert(consultant.id)}
                >
                  <div className="flex items-center">
                    <Avatar className="h-16 w-16 mr-4">
                      <AvatarImage src={consultant.image} alt={consultant.name} />
                      <AvatarFallback>{consultant.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium">{consultant.name}</h3>
                          <p className="text-muted-foreground">{consultant.title}</p>
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
                      
                      <div className="flex justify-between items-center mt-3">
                        <p className="font-medium text-lg">${consultant.price}/session</p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedExpert(consultant.id);
                            handleNext();
                          }}
                        >
                          Select
                        </Button>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{consultant.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="heading-md">Select Consultation Type and Time</h2>
            
            <div>
              <h3 className="text-base font-medium mb-3">Consultation Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  className={`p-4 border rounded-lg cursor-pointer flex flex-col items-center text-center ${
                    consultationType === 'video' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/30'
                  }`}
                  onClick={() => setConsultationType('video')}
                >
                  <Video className="h-6 w-6 mb-2" />
                  <h4 className="font-medium">Video Call</h4>
                  <p className="text-sm text-muted-foreground">Face-to-face virtual consultation</p>
                </div>
                
                <div
                  className={`p-4 border rounded-lg cursor-pointer flex flex-col items-center text-center ${
                    consultationType === 'phone' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/30'
                  }`}
                  onClick={() => setConsultationType('phone')}
                >
                  <Phone className="h-6 w-6 mb-2" />
                  <h4 className="font-medium">Phone Call</h4>
                  <p className="text-sm text-muted-foreground">Audio-only consultation</p>
                </div>
                
                <div
                  className={`p-4 border rounded-lg cursor-pointer flex flex-col items-center text-center ${
                    consultationType === 'chat' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/30'
                  }`}
                  onClick={() => setConsultationType('chat')}
                >
                  <MessageSquare className="h-6 w-6 mb-2" />
                  <h4 className="font-medium">Chat</h4>
                  <p className="text-sm text-muted-foreground">Text-based messaging consultation</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base font-medium mb-3">Select Date</h3>
                <div className="border rounded-lg overflow-hidden">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => 
                      date < new Date() || 
                      date.getDay() === 0 || 
                      date.getDay() === 6
                    }
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-base font-medium mb-3">Select Time</h3>
                {selectedDate ? (
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        className={`py-2 px-4 border rounded-md text-sm ${
                          selectedTime === time 
                            ? 'bg-primary text-white border-primary' 
                            : 'border-border hover:border-primary/30'
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="border border-dashed rounded-lg p-6 text-center">
                    <p className="text-muted-foreground">Please select a date first</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="heading-md">Personal Information</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number (Optional)</label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your phone number"
                />
              </div>
              
              <div>
                <label htmlFor="skinType" className="block text-sm font-medium mb-1">Skin Type</label>
                <Select defaultValue={profile.skinType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select skin type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="dry">Dry</SelectItem>
                    <SelectItem value="oily">Oily</SelectItem>
                    <SelectItem value="combination">Combination</SelectItem>
                    <SelectItem value="sensitive">Sensitive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="concerns" className="block text-sm font-medium mb-1">
                  Skin Concerns & Questions (Optional)
                </label>
                <Textarea
                  id="concerns"
                  value={concerns}
                  onChange={(e) => setConcerns(e.target.value)}
                  placeholder="Please describe your skin concerns and what you'd like to discuss during the consultation..."
                  rows={5}
                />
              </div>
            </div>
          </div>
        );
      
      case 4:
        const expert = consultants.find(c => c.id === selectedExpert);
        
        return (
          <div className="space-y-6">
            <h2 className="heading-md">Review Your Booking</h2>
            
            <div className="bg-accent/30 rounded-xl p-6">
              <h3 className="font-medium text-lg mb-4">Consultation Summary</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-32 text-sm text-muted-foreground">Expert:</div>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={expert?.image} alt={expert?.name} />
                      <AvatarFallback>{expert?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{expert?.name}</div>
                      <div className="text-sm text-muted-foreground">{expert?.title}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-32 text-sm text-muted-foreground">Date & Time:</div>
                  <div>
                    {selectedDate ? format(selectedDate, 'MMMM do, yyyy') : ''} at {selectedTime}
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-32 text-sm text-muted-foreground">Type:</div>
                  <div className="capitalize">
                    {consultationType === 'video' ? (
                      <span className="flex items-center">
                        <Video className="h-4 w-4 mr-1" /> Video Consultation
                      </span>
                    ) : consultationType === 'phone' ? (
                      <span className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" /> Phone Consultation
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" /> Chat Consultation
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-32 text-sm text-muted-foreground">Your Info:</div>
                  <div>
                    <div>{name}</div>
                    <div className="text-sm text-muted-foreground">{email}</div>
                    {phone && <div className="text-sm text-muted-foreground">{phone}</div>}
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-32 text-sm text-muted-foreground">Skin Type:</div>
                  <div className="capitalize">{profile.skinType}</div>
                </div>
                
                {concerns && (
                  <div className="flex">
                    <div className="w-32 text-sm text-muted-foreground">Your Concerns:</div>
                    <div className="text-sm">{concerns}</div>
                  </div>
                )}
                
                <div className="flex pt-2 border-t border-border">
                  <div className="w-32 text-sm text-muted-foreground">Price:</div>
                  <div className="font-semibold">${expert?.price}.00</div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-primary/20 bg-primary/5 rounded-lg">
              <p className="text-sm">
                By confirming this booking, you agree to our <a href="#" className="text-primary hover:underline">Consultation Terms</a> and <a href="#" className="text-primary hover:underline">Cancellation Policy</a>. You can reschedule or cancel up to 24 hours before your appointment.
              </p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <TooltipProvider>
        <Navbar />
      </TooltipProvider>
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="heading-lg mb-2">Book a Consultation</h1>
            <p className="text-muted-foreground">
              Schedule a one-on-one session with our skincare experts for personalized advice.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <div
                    key={index}
                    className={`flex-1 ${index < totalSteps - 1 ? 'relative' : ''}`}
                  >
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center mx-auto z-10 relative ${
                        index + 1 === currentStep
                          ? 'bg-primary text-white'
                          : index + 1 < currentStep
                          ? 'bg-primary/20 text-primary'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {index + 1 < currentStep ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    {index < totalSteps - 1 && (
                      <div
                        className={`absolute top-5 left-0 right-0 h-0.5 -z-0 ${
                          index + 1 < currentStep ? 'bg-primary' : 'bg-muted'
                        }`}
                        style={{ transform: 'translateY(-50%)' }}
                      ></div>
                    )}
                    <div className="text-xs text-center mt-2">
                      {index === 0 && 'Expert'}
                      {index === 1 && 'Schedule'}
                      {index === 2 && 'Details'}
                      {index === 3 && 'Confirm'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                {renderStepContent()}
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                
                {currentStep < totalSteps ? (
                  <Button onClick={handleNext}>
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit}>
                    Confirm Booking
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ConsultPage;
