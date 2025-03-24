
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  searchIngredients, 
  searchProducts, 
  Ingredient, 
  Product 
} from '@/lib/database';
import IngredientCard from '@/components/IngredientCard';
import ProductCard from '@/components/ProductCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProfile } from '@/contexts/ProfileContext';
import { CheckCircle, XCircle, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TooltipProvider } from "@/components/ui/tooltip";

const SearchResultsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  
  const [ingredientResults, setIngredientResults] = useState<Ingredient[]>([]);
  const [productResults, setProductResults] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [currentQuery, setCurrentQuery] = useState(query);
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Filter states
  const [suitableOnly, setSuitableOnly] = useState(false);
  const [safetyLevel, setSafetyLevel] = useState<string>('all');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const { addSearchHistory, profile } = useProfile();
  
  useEffect(() => {
    if (query) {
      const ingredients = searchIngredients(query);
      const products = searchProducts(query);
      
      setIngredientResults(ingredients);
      setProductResults(products);
      setCurrentQuery(query);
      addSearchHistory(query);
      
      // Set initial tab based on results
      if (ingredients.length > 0 && products.length === 0) {
        setActiveTab("ingredients");
      } else if (ingredients.length === 0 && products.length > 0) {
        setActiveTab("products");
      }
    }
  }, [query, addSearchHistory]);
  
  // Apply filters
  useEffect(() => {
    if (!query) return;
    
    let filteredIngredients = searchIngredients(query);
    let filteredProducts = searchProducts(query);
    
    // Filter ingredients by safety level
    if (safetyLevel !== 'all') {
      const minSafety = safetyLevel === 'safe' ? 8 : safetyLevel === 'moderate' ? 5 : 0;
      const maxSafety = safetyLevel === 'safe' ? 10 : safetyLevel === 'moderate' ? 7 : 4;
      
      filteredIngredients = filteredIngredients.filter(
        ingredient => ingredient.safetyScore >= minSafety && ingredient.safetyScore <= maxSafety
      );
    }
    
    // Filter by suitability for user's skin type
    if (suitableOnly) {
      filteredIngredients = filteredIngredients.filter(
        ingredient => ingredient.suitableFor.includes(profile.skinType)
      );
      
      filteredProducts = filteredProducts.filter(
        product => product.suitableFor.includes(profile.skinType)
      );
    }
    
    // Filter products by category
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter(
        product => selectedCategories.includes(product.category)
      );
    }
    
    setIngredientResults(filteredIngredients);
    setProductResults(filteredProducts);
  }, [query, safetyLevel, suitableOnly, selectedCategories, profile.skinType]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentQuery.trim()) {
      window.history.pushState(
        {}, 
        '', 
        `/search?q=${encodeURIComponent(currentQuery.trim())}`
      );
      
      const ingredients = searchIngredients(currentQuery);
      const products = searchProducts(currentQuery);
      
      setIngredientResults(ingredients);
      setProductResults(products);
      addSearchHistory(currentQuery);
    }
  };
  
  // Get unique product categories for filter
  const allCategories = [...new Set(searchProducts('').map(product => product.category))];
  
  return (
    <div className="min-h-screen flex flex-col">
      <TooltipProvider>
        <Navbar />
      </TooltipProvider>
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="heading-lg mb-2">Search Results</h1>
            <p className="text-muted-foreground">
              {ingredientResults.length + productResults.length} results for "{query}"
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters for larger screens */}
            <div className="hidden md:block w-64 shrink-0">
              <div className="sticky top-24 glass p-6 rounded-xl">
                <h2 className="font-semibold text-lg mb-4">Filters</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Suitability</h3>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="suitability"
                        checked={suitableOnly}
                        onCheckedChange={(checked) => setSuitableOnly(checked as boolean)}
                      />
                      <Label htmlFor="suitability" className="text-sm">
                        Suitable for my skin type
                      </Label>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Safety Level</h3>
                    <Select
                      value={safetyLevel}
                      onValueChange={setSafetyLevel}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Safety level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All levels</SelectItem>
                        <SelectItem value="safe">Safe (8-10)</SelectItem>
                        <SelectItem value="moderate">Moderate (5-7)</SelectItem>
                        <SelectItem value="caution">Caution (1-4)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Product Categories</h3>
                    <div className="space-y-2">
                      {allCategories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCategories([...selectedCategories, category]);
                              } else {
                                setSelectedCategories(
                                  selectedCategories.filter(c => c !== category)
                                );
                              }
                            }}
                          />
                          <Label htmlFor={`category-${category}`} className="text-sm capitalize">
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSuitableOnly(false);
                      setSafetyLevel('all');
                      setSelectedCategories([]);
                    }}
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
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Refine your search results.
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="space-y-6 mt-6">
                    <div>
                      <h3 className="text-sm font-medium mb-3">Suitability</h3>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="suitability-mobile"
                          checked={suitableOnly}
                          onCheckedChange={(checked) => setSuitableOnly(checked as boolean)}
                        />
                        <Label htmlFor="suitability-mobile" className="text-sm">
                          Suitable for my skin type
                        </Label>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-3">Safety Level</h3>
                      <Select
                        value={safetyLevel}
                        onValueChange={setSafetyLevel}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Safety level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All levels</SelectItem>
                          <SelectItem value="safe">Safe (8-10)</SelectItem>
                          <SelectItem value="moderate">Moderate (5-7)</SelectItem>
                          <SelectItem value="caution">Caution (1-4)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-3">Product Categories</h3>
                      <div className="space-y-2">
                        {allCategories.map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                              id={`category-mobile-${category}`}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedCategories([...selectedCategories, category]);
                                } else {
                                  setSelectedCategories(
                                    selectedCategories.filter(c => c !== category)
                                  );
                                }
                              }}
                            />
                            <Label htmlFor={`category-mobile-${category}`} className="text-sm capitalize">
                              {category}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setSuitableOnly(false);
                          setSafetyLevel('all');
                          setSelectedCategories([]);
                        }}
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
                <form onSubmit={handleSearch} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={currentQuery}
                    onChange={(e) => setCurrentQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit">Search</Button>
                </form>
              </div>
              
              <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="all">
                    All Results ({ingredientResults.length + productResults.length})
                  </TabsTrigger>
                  <TabsTrigger value="ingredients">
                    Ingredients ({ingredientResults.length})
                  </TabsTrigger>
                  <TabsTrigger value="products">
                    Products ({productResults.length})
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="all">
                  {ingredientResults.length === 0 && productResults.length === 0 ? (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium mb-2">No results found</h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your search terms or filters.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {ingredientResults.length > 0 && (
                        <div>
                          <h2 className="font-semibold text-xl mb-4">Ingredients</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {ingredientResults.slice(0, 4).map(ingredient => (
                              <IngredientCard key={ingredient.id} ingredient={ingredient} />
                            ))}
                          </div>
                          {ingredientResults.length > 4 && (
                            <div className="mt-4 text-center">
                              <Button
                                variant="outline"
                                onClick={() => setActiveTab("ingredients")}
                              >
                                View All {ingredientResults.length} Ingredients
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {productResults.length > 0 && (
                        <div>
                          <h2 className="font-semibold text-xl mb-4">Products</h2>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {productResults.slice(0, 6).map(product => (
                              <ProductCard key={product.id} product={product} />
                            ))}
                          </div>
                          {productResults.length > 6 && (
                            <div className="mt-4 text-center">
                              <Button
                                variant="outline"
                                onClick={() => setActiveTab("products")}
                              >
                                View All {productResults.length} Products
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="ingredients">
                  {ingredientResults.length === 0 ? (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium mb-2">No ingredients found</h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your search terms or filters.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {ingredientResults.map(ingredient => (
                        <IngredientCard key={ingredient.id} ingredient={ingredient} />
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="products">
                  {productResults.length === 0 ? (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium mb-2">No products found</h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your search terms or filters.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {productResults.map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
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

export default SearchResultsPage;
