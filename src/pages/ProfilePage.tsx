
import React from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileCard from '@/components/ProfileCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProfile } from '@/contexts/ProfileContext';
import { Tab, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ProfilePage = () => {
  const { profile, addConcern, addAllergy, clearSearchHistory } = useProfile();
  const [newConcern, setNewConcern] = React.useState('');
  const [newAllergy, setNewAllergy] = React.useState('');

  const handleAddConcern = (e: React.FormEvent) => {
    e.preventDefault();
    if (newConcern.trim()) {
      addConcern(newConcern.trim().toLowerCase());
      setNewConcern('');
    }
  };

  const handleAddAllergy = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAllergy.trim()) {
      addAllergy(newAllergy.trim().toLowerCase());
      setNewAllergy('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TooltipProvider>
        <Navbar />
      </TooltipProvider>
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">My Profile</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ProfileCard />
            </div>
            
            <div className="lg:col-span-2">
              <Tabs defaultValue="concerns">
                <TabsList className="w-full grid grid-cols-3 mb-6">
                  <TabsTrigger value="concerns">Skin Concerns</TabsTrigger>
                  <TabsTrigger value="allergies">Allergies</TabsTrigger>
                  <TabsTrigger value="history">Search History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="concerns" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Add Skin Concern</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleAddConcern} className="flex gap-2">
                        <div className="flex-grow">
                          <Label htmlFor="newConcern" className="sr-only">New Concern</Label>
                          <Input
                            id="newConcern"
                            placeholder="e.g., dryness, acne, aging"
                            value={newConcern}
                            onChange={(e) => setNewConcern(e.target.value)}
                          />
                        </div>
                        <Button type="submit">Add</Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="allergies" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Add Allergy</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleAddAllergy} className="flex gap-2">
                        <div className="flex-grow">
                          <Label htmlFor="newAllergy" className="sr-only">New Allergy</Label>
                          <Input
                            id="newAllergy"
                            placeholder="e.g., fragrance, parabens"
                            value={newAllergy}
                            onChange={(e) => setNewAllergy(e.target.value)}
                          />
                        </div>
                        <Button type="submit">Add</Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="history" className="space-y-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle>Recent Searches</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={clearSearchHistory}
                        disabled={profile.searchHistory.length === 0}
                      >
                        Clear History
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {profile.searchHistory.length > 0 ? (
                        <ul className="space-y-1">
                          {profile.searchHistory.map((query, index) => (
                            <li key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                              <span className="text-sm">{query}</span>
                              <span className="text-xs text-muted-foreground">
                                {new Date().toLocaleDateString()}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground">No recent searches</p>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
