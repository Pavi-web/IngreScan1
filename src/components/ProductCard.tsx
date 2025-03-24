
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Product, 
  Ingredient, 
  getProductIngredients, 
  isProductSuitableForUser 
} from '@/lib/database';
import { useProfile } from '@/contexts/ProfileContext';
import { 
  Star, 
  Heart, 
  AlertCircle, 
  CheckCircle,
  ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import IngredientCard from './IngredientCard';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { profile, addFavoriteProduct, removeFavoriteProduct } = useProfile();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSuitable, setIsSuitable] = useState(true);

  useEffect(() => {
    setIngredients(getProductIngredients(product.id));
    setIsFavorite(profile.favoriteProducts.includes(product.id));
    setIsSuitable(isProductSuitableForUser(product, profile));
  }, [product, profile]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      removeFavoriteProduct(product.id);
    } else {
      addFavoriteProduct(product.id);
    }
    
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="product-card">
      {!isSuitable && (
        <div className="absolute top-0 right-0 m-2">
          <Badge variant="destructive">
            <AlertCircle className="h-3 w-3 mr-1" />
            Not suitable
          </Badge>
        </div>
      )}
      
      <div className="flex items-start">
        <Link to={`/products/${product.id}`} className="block w-full">
          <div className="relative h-40 w-full bg-accent rounded-md mb-4 overflow-hidden">
            <img 
              src="/beauty.jpg" 
              alt={product.name} 
              className="h-full w-full object-cover"
            />
            <button 
              className={`absolute top-2 right-2 p-2 rounded-full glass ${
                isFavorite ? 'text-red-500' : 'text-muted-foreground'
              }`}
              onClick={toggleFavorite}
            >
              <Heart className="h-5 w-5" fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">{product.brand}</div>
            <h3 className="font-medium line-clamp-1">{product.name}</h3>
            
            <div className="flex items-center">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm">{product.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground ml-2">({product.reviewCount} reviews)</span>
            </div>
            
            <div className="font-semibold">₹{product.price.toFixed(2)}</div>
          </div>
        </Link>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <Sheet>
          <SheetTrigger asChild>
            <button className="w-full flex justify-between items-center text-sm text-primary font-medium">
              <span>View ingredients</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </SheetTrigger>
          <SheetContent className="glass max-w-md">
            <SheetHeader>
              <SheetTitle>{product.name} - Ingredients</SheetTitle>
              <SheetDescription>{ingredients.length} ingredients analyzed</SheetDescription>
            </SheetHeader>
            
            <div className="mt-6">
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  {isSuitable ? (
                    <Badge variant="outline" className="badge-success">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Suitable for your skin type
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="badge-danger">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Not suitable for your skin type
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Analysis based on your {profile.skinType} skin type and concerns.
                </p>
              </div>
              
              <div className="space-y-3">
                {ingredients.map(ingredient => (
                  <IngredientCard 
                    key={ingredient.id} 
                    ingredient={ingredient} 
                    compact
                  />
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-border">
                <Link 
                  to={`/products/${product.id}`} 
                  className="text-primary font-medium hover:underline"
                >
                  View full product details
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default ProductCard;