
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ingredients, Ingredient, SkinType } from '@/lib/database';
import IngredientCard from '@/components/IngredientCard';
import { useProfile } from '@/contexts/ProfileContext';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  SlidersHorizontal,
  AlertTriangle,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";

const IngredientsPage = () => {
  const { profile } = useProfile();
  const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Filter states
  const [selectedSkinTypes, setSelectedSkinTypes] = useState<SkinType[]>([]);
  const [safetyFilter, setSafetyFilter] = useState<string>('all');
  const [suitableOnly, setSuitableOnly] = useState(false);
  const [sortBy, setSortBy] = useState<string>('name');
  
  const skinTypesList: SkinType[] = ['normal', 'dry', 'oily', 'combination', 'sensitive'];
  
  // Apply filters
  useEffect(() => {
    let filtered = [...ingredients];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(ingredient => 
        ingredient.name.toLowerCase().includes(query) || 
        ingredient.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by skin type
    if (selectedSkinTypes.length > 0) {
      filtered = filtered.filter(ingredient => 
        selectedSkinTypes.some(skinType => ingredient.suitableFor.includes(skinType))
      );
    }
    
    // Filter by safety score
    if (safetyFilter !== 'all') {
      const minSafety = safetyFilter === 'high' ? 8 : safetyFilter === 'medium' ? 5 : 0;
      const maxSafety = safetyFilter === 'high' ? 10 : safetyFilter === 'medium' ? 7 : 4;
      
      filtered = filtered.filter(
        ingredient => ingredient.safetyScore >= minSafety && ingredient.safetyScore <= maxSafety
      );
    }
    
    // Filter by suitability for user's skin type
    if (suitableOnly) {
      filtered = filtered.filter(ingredient => 
        ingredient.suitableFor.includes(profile.skinType)
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'safety-high') {
        return b.safetyScore - a.safetyScore;
      } else {
        return a.safetyScore - b.safetyScore;
      }
    });
    
    setFilteredIngredients(filtered);
  }, [searchQuery, selectedSkinTypes, safetyFilter, suitableOnly, sortBy, profile.skinType]);
  
  const clearFilters = () => {
    setSelectedSkinTypes([]);
    setSafetyFilter('all');
    setSuitableOnly(false);
    setSortBy('name');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <TooltipProvider>
        <Navbar />
        
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h1 className="heading-lg mb-2">Ingredient Database</h1>
              <p className="text-muted-foreground">
                Browse and search our comprehensive ingredient database to learn about skincare components.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Filters for larger screens */}
              <div className="hidden md:block w-64 shrink-0">
                <div className="sticky top-24 glass p-6 rounded-xl">
                  <h2 className="font-semibold text-lg mb-4">Filters</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Skin Type</h3>
                      <div className="space-y-2">
                        {skinTypesList.map(skinType => (
                          <div key={skinType} className="flex items-center space-x-2">
                            <Checkbox
                              id={`skintype-${skinType}`}
                              checked={selectedSkinTypes.includes(skinType)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedSkinTypes([...selectedSkinTypes, skinType]);
                                } else {
                                  setSelectedSkinTypes(
                                    selectedSkinTypes.filter(type => type !== skinType)
                                  );
                                }
                              }}
                            />
                            <Label htmlFor={`skintype-${skinType}`} className="text-sm capitalize">
                              {skinType}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-3">Safety Score</h3>
                      <Select
                        value={safetyFilter}
                        onValueChange={setSafetyFilter}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Safety score" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Scores</SelectItem>
                          <SelectItem value="high">High (8-10)</SelectItem>
                          <SelectItem value="medium">Medium (5-7)</SelectItem>
                          <SelectItem value="low">Low (1-4)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-3">Suitability</h3>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="suitable-for-me"
                          checked={suitableOnly}
                          onCheckedChange={(checked) => setSuitableOnly(checked as boolean)}
                        />
                        <Label htmlFor="suitable-for-me" className="text-sm">
                          Suitable for my skin type
                        </Label>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-3">Sort By</h3>
                      <Select
                        value={sortBy}
                        onValueChange={setSortBy}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="name">Name (A-Z)</SelectItem>
                          <SelectItem value="safety-high">Safety (Highest First)</SelectItem>
                          <SelectItem value="safety-low">Safety (Lowest First)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={clearFilters}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Mobile filter button */}
              <div className="md:hidden mb-4">
                <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[80vh]">
                    <SheetHeader>
                      <SheetTitle>Ingredient Filters</SheetTitle>
                      <SheetDescription>
                        Refine your ingredient search.
                      </SheetDescription>
                    </SheetHeader>
                    
                    <div className="space-y-6 mt-6">
                      <div>
                        <h3 className="text-sm font-medium mb-3">Skin Type</h3>
                        <div className="space-y-2">
                          {skinTypesList.map(skinType => (
                            <div key={skinType} className="flex items-center space-x-2">
                              <Checkbox
                                id={`skintype-mobile-${skinType}`}
                                checked={selectedSkinTypes.includes(skinType)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedSkinTypes([...selectedSkinTypes, skinType]);
                                  } else {
                                    setSelectedSkinTypes(
                                      selectedSkinTypes.filter(type => type !== skinType)
                                    );
                                  }
                                }}
                              />
                              <Label htmlFor={`skintype-mobile-${skinType}`} className="text-sm capitalize">
                                {skinType}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-3">Safety Score</h3>
                        <Select
                          value={safetyFilter}
                          onValueChange={setSafetyFilter}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Safety score" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Scores</SelectItem>
                            <SelectItem value="high">High (8-10)</SelectItem>
                            <SelectItem value="medium">Medium (5-7)</SelectItem>
                            <SelectItem value="low">Low (1-4)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-3">Suitability</h3>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="suitable-for-me-mobile"
                            checked={suitableOnly}
                            onCheckedChange={(checked) => setSuitableOnly(checked as boolean)}
                          />
                          <Label htmlFor="suitable-for-me-mobile" className="text-sm">
                            Suitable for my skin type
                          </Label>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-3">Sort By</h3>
                        <Select
                          value={sortBy}
                          onValueChange={setSortBy}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Sort by" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="name">Name (A-Z)</SelectItem>
                            <SelectItem value="safety-high">Safety (Highest First)</SelectItem>
                            <SelectItem value="safety-low">Safety (Lowest First)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex space-x-4">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={clearFilters}
                        >
                          Clear All
                        </Button>
                        <Button
                          className="flex-1"
                          onClick={() => setFilterOpen(false)}
                        >
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              
              <div className="flex-1">
                <div className="mb-6">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search ingredients..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>
                
                <div className="mb-6 flex flex-wrap justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Showing {filteredIngredients.length} of {ingredients.length} ingredients
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-green-50 p-2 rounded-lg text-sm">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>Suitable for your {profile.skinType} skin</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 bg-red-50 p-2 rounded-lg text-sm">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <span>Not recommended</span>
                    </div>
                  </div>
                </div>
                
                {filteredIngredients.length === 0 ? (
                  <div className="text-center py-12 bg-accent/30 rounded-xl">
                    <h3 className="text-lg font-medium mb-2">No ingredients found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search terms or filters.
                    </p>
                    <Button variant="outline" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredIngredients.map(ingredient => (
                      <IngredientCard key={ingredient.id} ingredient={ingredient} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </TooltipProvider>
      
      <Footer />
    </div>
  );
};

export default IngredientsPage;
