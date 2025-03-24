
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  ingredients, 
  products, 
  Product, 
  isIngredientSuitableForSkin, 
  getIngredientSafetyLevel 
} from '@/lib/database';
import { useProfile } from '@/contexts/ProfileContext';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  X, 
  ArrowLeft 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';

const IngredientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { profile } = useProfile();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  const ingredient = ingredients.find(ing => ing.id === id);
  
  useEffect(() => {
    if (ingredient) {
      // Find products that contain this ingredient
      const related = products.filter(product => 
        product.ingredientIds.includes(ingredient.id)
      );
      setRelatedProducts(related);
    }
  }, [ingredient]);
  
  if (!ingredient) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4 text-center py-12">
            <h1 className="heading-lg mb-6">Ingredient Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The ingredient you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/ingredients">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Ingredients
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const safetyInfo = getIngredientSafetyLevel(ingredient.safetyScore);
  const isSuitableForUser = isIngredientSuitableForSkin(ingredient, profile.skinType);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link 
              to="/ingredients" 
              className="inline-flex items-center text-primary hover:underline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Ingredients
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="glass p-8 rounded-xl">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{ingredient.name}</h1>
                    <p className="text-muted-foreground text-lg">{ingredient.description}</p>
                  </div>
                  
                  <div className="md:text-right">
                    <div className="mb-2">
                      {isSuitableForUser ? (
                        <Badge variant="outline" className="badge-success px-3 py-1 text-base">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Suitable for your skin
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="badge-danger px-3 py-1 text-base">
                          <X className="h-4 w-4 mr-2" />
                          Not recommended
                        </Badge>
                      )}
                    </div>
                    
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary">
                      <Shield className="h-4 w-4 mr-2" />
                      <span>Safety Score: {ingredient.safetyScore}/10</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Benefits</h2>
                  <p className="mb-6">{ingredient.benefitsDescription || "No specific benefits listed."}</p>
                  
                  <h2 className="text-xl font-semibold mb-4">Warnings & Side Effects</h2>
                  <p className="mb-6">{ingredient.warningsDescription || "No specific warnings listed."}</p>
                  
                  <h2 className="text-xl font-semibold mb-4">Suitable For</h2>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {ingredient.suitableFor.map(type => (
                      <Badge key={type} className="capitalize px-3 py-1">
                        {type} skin
                      </Badge>
                    ))}
                  </div>
                  
                  {ingredient.notSuitableFor.length > 0 && (
                    <>
                      <h2 className="text-xl font-semibold mb-4">Not Recommended For</h2>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {ingredient.notSuitableFor.map(type => (
                          <Badge key={type} variant="outline" className="border-red-200 text-red-500 capitalize px-3 py-1">
                            {type} skin
                          </Badge>
                        ))}
                      </div>
                    </>
                  )}
                  
                  <h2 className="text-xl font-semibold mb-4">Commonly Found In</h2>
                  <div className="flex flex-wrap gap-2">
                    {ingredient.commonIn.map(item => (
                      <Badge key={item} variant="secondary" className="capitalize px-3 py-1">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="glass p-6 rounded-xl mb-6">
                <h2 className="text-xl font-semibold mb-4">Safety Analysis</h2>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Safety Score</span>
                      <span className="font-bold">{ingredient.safetyScore}/10</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          safetyInfo.level === "Safe" 
                            ? "bg-green-500" 
                            : safetyInfo.level === "Moderate" 
                            ? "bg-yellow-500" 
                            : "bg-red-500"
                        }`}
                        style={{ width: `${ingredient.safetyScore * 10}%` }}
                      ></div>
                    </div>
                    <div className="text-xs mt-1 text-right text-muted-foreground">
                      {safetyInfo.level} - {safetyInfo.color === "green" ? "Low risk" : safetyInfo.color === "yellow" ? "Medium risk" : "High risk"}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <h3 className="text-sm font-medium mb-2">Compatibility with Your Skin</h3>
                    
                    {isSuitableForUser ? (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
                          <div>
                            <h4 className="font-medium text-green-700">Suitable for {profile.skinType} skin</h4>
                            <p className="text-sm text-green-600">This ingredient is likely to be beneficial for your skin type.</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 mr-2" />
                          <div>
                            <h4 className="font-medium text-red-700">Not recommended for {profile.skinType} skin</h4>
                            <p className="text-sm text-red-600">This ingredient may not be suitable for your skin type and could cause irritation.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {relatedProducts.length > 0 && (
                <div className="glass p-6 rounded-xl">
                  <h2 className="text-xl font-semibold mb-4">Products with this Ingredient</h2>
                  <div className="space-y-3">
                    {relatedProducts.slice(0, 3).map(product => (
                      <Link 
                        key={product.id} 
                        to={`/products/${product.id}`}
                        className="block p-3 border border-border rounded-lg hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="h-12 w-12 bg-accent rounded-md mr-3 overflow-hidden">
                            <img 
                              src={product.imageUrl} 
                              alt={product.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">{product.brand}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                    
                    {relatedProducts.length > 3 && (
                      <Button variant="outline" asChild className="w-full">
                        <Link to="/products">
                          View All {relatedProducts.length} Products
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default IngredientDetailPage;
