
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  products, 
  ingredients, 
  Ingredient, 
  getProductIngredients, 
  isProductSuitableForUser 
} from '@/lib/database';
import { useProfile } from '@/contexts/ProfileContext';
import { 
  Star, 
  Heart, 
  ArrowLeft, 
  ShoppingBag,
  AlertTriangle,
  CheckCircle,
  Info,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import IngredientCard from '@/components/IngredientCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { TooltipProvider } from '@/components/ui/tooltip';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { profile, addFavoriteProduct, removeFavoriteProduct } = useProfile();
  const [productIngredients, setProductIngredients] = useState<Ingredient[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllIngredients, setShowAllIngredients] = useState(false);
  
  const product = products.find(p => p.id === id);
  
  useEffect(() => {
    if (product) {
      setProductIngredients(getProductIngredients(product.id));
      setIsFavorite(profile.favoriteProducts.includes(product.id));
    }
  }, [product, profile.favoriteProducts]);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4 text-center py-12">
            <h1 className="heading-lg mb-6">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const isSuitableForUser = isProductSuitableForUser(product, profile);
  
  const safeIngredients = productIngredients.filter(ing => ing.safetyScore >= 8);
  const moderateIngredients = productIngredients.filter(ing => ing.safetyScore >= 5 && ing.safetyScore < 8);
  const cautionIngredients = productIngredients.filter(ing => ing.safetyScore < 5);
  
  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteProduct(product.id);
      toast({
        title: "Removed from favorites",
        description: `${product.name} has been removed from your favorites.`,
      });
    } else {
      addFavoriteProduct(product.id);
      toast({
        title: "Added to favorites",
        description: `${product.name} has been added to your favorites.`,
      });
    }
    
    setIsFavorite(!isFavorite);
  };
  
  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const displayedIngredients = showAllIngredients 
    ? productIngredients 
    : productIngredients.slice(0, 3);
  
  return (
    <div className="min-h-screen flex flex-col">
      <TooltipProvider>
        <Navbar />
      </TooltipProvider>
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link 
              to="/products" 
              className="inline-flex items-center text-primary hover:underline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div>
              <div className="relative bg-accent rounded-xl overflow-hidden h-[400px]">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="h-full w-full object-cover"
                />
                <button 
                  className={`absolute top-4 right-4 p-3 rounded-full glass ${
                    isFavorite ? 'text-red-500' : 'text-muted-foreground'
                  }`}
                  onClick={toggleFavorite}
                >
                  <Heart className="h-6 w-6" fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
            
            <div>
              <div className="mb-2 text-muted-foreground">{product.brand}</div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center text-yellow-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star 
                      key={index} 
                      className="h-5 w-5" 
                      fill={index < Math.floor(product.rating) ? 'currentColor' : 'none'} 
                    />
                  ))}
                  <span className="ml-2 text-foreground">{product.rating}</span>
                </div>
                <span className="text-muted-foreground ml-2">({product.reviewCount} reviews)</span>
              </div>
              
              <div className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</div>
              
              <p className="text-muted-foreground mb-6">{product.description}</p>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Suitable for:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.suitableFor.map(type => (
                    <Badge key={type} className="capitalize">
                      {type} skin
                    </Badge>
                  ))}
                </div>
              </div>
              
              {isSuitableForUser ? (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
                    <div>
                      <h4 className="font-medium text-green-700">Suitable for your skin</h4>
                      <p className="text-sm text-green-600">This product is compatible with your {profile.skinType} skin type.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 mr-2" />
                    <div>
                      <h4 className="font-medium text-red-700">Not recommended</h4>
                      <p className="text-sm text-red-600">This product may not be suitable for your {profile.skinType} skin type.</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex space-x-4 mb-4">
                <Button className="flex-1" onClick={handleAddToCart}>
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  className={isFavorite ? 'border-red-200 text-red-500' : ''}
                  onClick={toggleFavorite}
                >
                  <Heart 
                    className="mr-2 h-5 w-5" 
                    fill={isFavorite ? 'currentColor' : 'none'} 
                  />
                  {isFavorite ? 'Saved' : 'Save'}
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="ingredients" className="mt-12">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ingredients">Ingredients Analysis</TabsTrigger>
              <TabsTrigger value="details">Product Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ingredients" className="mt-6">
              <div className="glass p-8 rounded-xl">
                <h2 className="text-2xl font-semibold mb-6">Ingredients Analysis</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                    <div className="flex items-center mb-3">
                      <ShieldCheck className="h-5 w-5 text-green-600 mr-2" />
                      <h3 className="font-medium">Safe Ingredients</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {safeIngredients.length} ingredients with high safety scores (8-10)
                    </p>
                    <div className="text-sm">
                      {safeIngredients.slice(0, 3).map((ing, idx) => (
                        <Link 
                          key={ing.id} 
                          to={`/ingredients/${ing.id}`}
                          className="block hover:text-primary"
                        >
                          {ing.name}{idx < Math.min(safeIngredients.length, 3) - 1 ? ', ' : ''}
                        </Link>
                      ))}
                      {safeIngredients.length > 3 && (
                        <Link to={`/ingredients/${safeIngredients[3].id}`} className="text-primary hover:underline">
                          +{safeIngredients.length - 3} more
                        </Link>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                    <div className="flex items-center mb-3">
                      <Info className="h-5 w-5 text-yellow-600 mr-2" />
                      <h3 className="font-medium">Moderate Ingredients</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {moderateIngredients.length} ingredients with moderate safety scores (5-7)
                    </p>
                    <div className="text-sm">
                      {moderateIngredients.slice(0, 3).map((ing, idx) => (
                        <Link 
                          key={ing.id} 
                          to={`/ingredients/${ing.id}`}
                          className="block hover:text-primary"
                        >
                          {ing.name}{idx < Math.min(moderateIngredients.length, 3) - 1 ? ', ' : ''}
                        </Link>
                      ))}
                      {moderateIngredients.length > 3 && (
                        <Link to={`/ingredients/${moderateIngredients[3].id}`} className="text-primary hover:underline">
                          +{moderateIngredients.length - 3} more
                        </Link>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                    <div className="flex items-center mb-3">
                      <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                      <h3 className="font-medium">Caution Ingredients</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {cautionIngredients.length} ingredients with low safety scores (1-4)
                    </p>
                    <div className="text-sm">
                      {cautionIngredients.slice(0, 3).map((ing, idx) => (
                        <Link 
                          key={ing.id} 
                          to={`/ingredients/${ing.id}`}
                          className="block hover:text-primary"
                        >
                          {ing.name}{idx < Math.min(cautionIngredients.length, 3) - 1 ? ', ' : ''}
                        </Link>
                      ))}
                      {cautionIngredients.length > 3 && (
                        <Link to={`/ingredients/${cautionIngredients[3].id}`} className="text-primary hover:underline">
                          +{cautionIngredients.length - 3} more
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Detailed Ingredients</h3>
                  <div className="space-y-4">
                    {displayedIngredients.map(ingredient => (
                      <IngredientCard 
                        key={ingredient.id} 
                        ingredient={ingredient} 
                        compact 
                      />
                    ))}
                  </div>
                  
                  {productIngredients.length > 3 && (
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setShowAllIngredients(!showAllIngredients)}
                    >
                      {showAllIngredients ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-2" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-2" />
                          Show All {productIngredients.length} Ingredients
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="mt-6">
              <div className="glass p-8 rounded-xl">
                <h2 className="text-2xl font-semibold mb-6">Product Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Description</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{product.description}</p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-2">
                        <AccordionTrigger>How to Use</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">
                            Apply to clean, dry skin. Gently massage in circular motions until fully absorbed. 
                            Use morning and/or evening as needed. Always follow with sunscreen during daytime use.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-3">
                        <AccordionTrigger>Benefits</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            <li>Deeply hydrates and nourishes the skin</li>
                            <li>Improves skin texture and appearance</li>
                            <li>Helps maintain skin barrier function</li>
                            <li>Suitable for {product.suitableFor.join(', ')} skin types</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-4">
                        <AccordionTrigger>Product Specifications</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 text-muted-foreground">
                            <div className="flex justify-between">
                              <span>Brand:</span>
                              <span className="font-medium">{product.brand}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Category:</span>
                              <span className="font-medium">{product.category}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Size:</span>
                              <span className="font-medium">50ml</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Made in:</span>
                              <span className="font-medium">USA</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Shelf life:</span>
                              <span className="font-medium">12 months after opening</span>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Key Ingredients</h3>
                    
                    <div className="space-y-4">
                      {productIngredients.slice(0, 5).map((ingredient) => (
                        <div key={ingredient.id} className="flex items-start">
                          <div className="p-1 rounded-full bg-primary/10 text-primary mr-3 flex-shrink-0 mt-1">
                            <CheckCircle className="h-4 w-4" />
                          </div>
                          <div>
                            <Link 
                              to={`/ingredients/${ingredient.id}`}
                              className="font-medium hover:text-primary"
                            >
                              {ingredient.name}
                            </Link>
                            <p className="text-sm text-muted-foreground">{ingredient.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-border">
                      <h3 className="text-xl font-semibold mb-4">Skin Compatibility</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span>Normal Skin</span>
                          <Badge 
                            variant={product.suitableFor.includes('normal') ? 'default' : 'outline'} 
                            className={!product.suitableFor.includes('normal') ? 'text-muted-foreground' : ''}
                          >
                            {product.suitableFor.includes('normal') ? 'Suitable' : 'Not ideal'}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span>Dry Skin</span>
                          <Badge 
                            variant={product.suitableFor.includes('dry') ? 'default' : 'outline'} 
                            className={!product.suitableFor.includes('dry') ? 'text-muted-foreground' : ''}
                          >
                            {product.suitableFor.includes('dry') ? 'Suitable' : 'Not ideal'}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span>Oily Skin</span>
                          <Badge 
                            variant={product.suitableFor.includes('oily') ? 'default' : 'outline'} 
                            className={!product.suitableFor.includes('oily') ? 'text-muted-foreground' : ''}
                          >
                            {product.suitableFor.includes('oily') ? 'Suitable' : 'Not ideal'}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span>Combination Skin</span>
                          <Badge 
                            variant={product.suitableFor.includes('combination') ? 'default' : 'outline'} 
                            className={!product.suitableFor.includes('combination') ? 'text-muted-foreground' : ''}
                          >
                            {product.suitableFor.includes('combination') ? 'Suitable' : 'Not ideal'}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span>Sensitive Skin</span>
                          <Badge 
                            variant={product.suitableFor.includes('sensitive') ? 'default' : 'outline'} 
                            className={!product.suitableFor.includes('sensitive') ? 'text-muted-foreground' : ''}
                          >
                            {product.suitableFor.includes('sensitive') ? 'Suitable' : 'Not ideal'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="glass p-8 rounded-xl">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Customer Reviews</h2>
                  <Button>Write a Review</Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="col-span-1">
                    <div className="text-center">
                      <div className="text-5xl font-bold mb-2">{product.rating}</div>
                      <div className="flex items-center justify-center text-yellow-500 mb-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star 
                            key={index} 
                            className="h-5 w-5" 
                            fill={index < Math.floor(product.rating) ? 'currentColor' : 'none'} 
                          />
                        ))}
                      </div>
                      <div className="text-muted-foreground">{product.reviewCount} reviews</div>
                    </div>
                    
                    <div className="mt-6 space-y-2">
                      <div className="flex items-center">
                        <span className="text-sm w-8">5★</span>
                        <div className="flex-1 h-2 bg-muted rounded-full mx-2">
                          <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                        <span className="text-sm w-8 text-right">70%</span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="text-sm w-8">4★</span>
                        <div className="flex-1 h-2 bg-muted rounded-full mx-2">
                          <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                        <span className="text-sm w-8 text-right">20%</span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="text-sm w-8">3★</span>
                        <div className="flex-1 h-2 bg-muted rounded-full mx-2">
                          <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '5%' }}></div>
                        </div>
                        <span className="text-sm w-8 text-right">5%</span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="text-sm w-8">2★</span>
                        <div className="flex-1 h-2 bg-muted rounded-full mx-2">
                          <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '3%' }}></div>
                        </div>
                        <span className="text-sm w-8 text-right">3%</span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="text-sm w-8">1★</span>
                        <div className="flex-1 h-2 bg-muted rounded-full mx-2">
                          <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '2%' }}></div>
                        </div>
                        <span className="text-sm w-8 text-right">2%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <div className="space-y-6">
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">Jane Doe</div>
                              <div className="text-xs text-muted-foreground">Verified Purchase</div>
                            </div>
                          </div>
                          <div className="flex text-yellow-500">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <Star 
                                key={index} 
                                className="h-4 w-4" 
                                fill="currentColor" 
                              />
                            ))}
                          </div>
                        </div>
                        <h3 className="font-medium mb-2">Amazing results in just a week!</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          I've been using this product for just over a week and I can already see a significant difference in my skin's texture and hydration. It absorbs quickly and doesn't leave any greasy residue.
                        </p>
                        <div className="text-xs text-muted-foreground">Posted 2 weeks ago</div>
                      </div>
                      
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarFallback>TS</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">Tom Smith</div>
                              <div className="text-xs text-muted-foreground">Verified Purchase</div>
                            </div>
                          </div>
                          <div className="flex text-yellow-500">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <Star 
                                key={index} 
                                className="h-4 w-4" 
                                fill={index < 4 ? 'currentColor' : 'none'} 
                              />
                            ))}
                          </div>
                        </div>
                        <h3 className="font-medium mb-2">Good, but a bit pricey</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          This product works great for my combination skin. It provides good hydration without making my T-zone oily. My only complaint is that it's a bit expensive for the amount you get.
                        </p>
                        <div className="text-xs text-muted-foreground">Posted 1 month ago</div>
                      </div>
                      
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarFallback>AJ</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">Alex Johnson</div>
                              <div className="text-xs text-muted-foreground">Verified Purchase</div>
                            </div>
                          </div>
                          <div className="flex text-yellow-500">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <Star 
                                key={index} 
                                className="h-4 w-4" 
                                fill={index < 5 ? 'currentColor' : 'none'} 
                              />
                            ))}
                          </div>
                        </div>
                        <h3 className="font-medium mb-2">Holy grail product!</h3>
                        <p className="text-muted-foreground text-sm mb-2">
                          I've tried dozens of products for my sensitive skin, and this is the only one that doesn't cause irritation while still providing amazing benefits. My redness has reduced significantly, and my skin barrier feels stronger.
                        </p>
                        <div className="text-xs text-muted-foreground">Posted 3 months ago</div>
                      </div>
                      
                      <Button variant="outline" className="w-full">Load More Reviews</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
