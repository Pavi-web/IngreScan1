
import { useState } from 'react';
import { 
  Ingredient, 
  SkinType, 
  getIngredientSafetyLevel 
} from '@/lib/database';
import { useProfile } from '@/contexts/ProfileContext';
import { 
  Info, 
  AlertCircle, 
  CheckCircle, 
  Shield, 
  X 
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';

interface IngredientCardProps {
  ingredient: Ingredient;
  compact?: boolean;
}

const IngredientCard = ({ ingredient, compact = false }: IngredientCardProps) => {
  const { profile } = useProfile();
  const [showDialog, setShowDialog] = useState(false);
  
  const safetyInfo = getIngredientSafetyLevel(ingredient.safetyScore);
  const isSuitableForUser = ingredient.suitableFor.includes(profile.skinType);
  
  const getSafetyBadge = () => {
    if (safetyInfo.level === "Safe") {
      return <Badge variant="outline" className="badge-success">Safe</Badge>;
    } else if (safetyInfo.level === "Moderate") {
      return <Badge variant="outline" className="badge-warning">Moderate</Badge>;
    } else {
      return <Badge variant="outline" className="badge-danger">Caution</Badge>;
    }
  };

  if (compact) {
    return (
      <div 
        className={`p-4 rounded-lg border ${
          isSuitableForUser ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
        }`}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{ingredient.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">{ingredient.description}</p>
          </div>
          <div className="flex-shrink-0 ml-2">
            {getSafetyBadge()}
          </div>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <div className="text-xs">
            {isSuitableForUser ? (
              <span className="text-green-600 flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" /> Suitable
              </span>
            ) : (
              <span className="text-red-600 flex items-center">
                <X className="h-3 w-3 mr-1" /> Not recommended
              </span>
            )}
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-xs text-primary hover:underline">Details</button>
            </DialogTrigger>
            <DialogContent className="glass max-w-md">
              <DialogHeader>
                <DialogTitle>{ingredient.name}</DialogTitle>
                <DialogDescription>
                  {ingredient.description}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Safety Score</span>
                  <div className="flex items-center">
                    <span className="text-sm mr-2">{ingredient.safetyScore}/10</span>
                    {getSafetyBadge()}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Benefits</h4>
                  <p className="text-sm text-muted-foreground">{ingredient.benefitsDescription || "No specific benefits listed."}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Warnings</h4>
                  <p className="text-sm text-muted-foreground">{ingredient.warningsDescription || "No specific warnings listed."}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Suitable for skin types</h4>
                  <div className="flex flex-wrap gap-1">
                    {ingredient.suitableFor.map(type => (
                      <Badge key={type} variant="secondary" className="capitalize">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {ingredient.notSuitableFor.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-1">Not recommended for</h4>
                    <div className="flex flex-wrap gap-1">
                      {ingredient.notSuitableFor.map(type => (
                        <Badge key={type} variant="outline" className="border-red-200 text-red-500 capitalize">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Commonly found in</h4>
                  <div className="flex flex-wrap gap-1">
                    {ingredient.commonIn.map(item => (
                      <Badge key={item} variant="outline" className="capitalize">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }
  
  return (
    <div className="ingredient-card">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium">{ingredient.name}</h3>
        {getSafetyBadge()}
      </div>
      <p className="mt-2 text-muted-foreground">{ingredient.description}</p>
      
      <div className="mt-4 flex items-center">
        <Shield className="h-5 w-5 mr-2 text-muted-foreground" />
        <div className="text-sm">
          <span className="font-medium">Safety Score: </span>
          <span>{ingredient.safetyScore}/10</span>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="text-sm mb-2">
          <span className="font-medium">Suitable for: </span>
          <div className="flex flex-wrap gap-1 mt-1">
            {ingredient.suitableFor.map(type => (
              <Badge key={type} variant="secondary" className="capitalize">
                {type}
              </Badge>
            ))}
          </div>
        </div>
        
        {ingredient.notSuitableFor.length > 0 && (
          <div className="text-sm mb-2">
            <span className="font-medium">Not recommended for: </span>
            <div className="flex flex-wrap gap-1 mt-1">
              {ingredient.notSuitableFor.map(type => (
                <Badge key={type} variant="outline" className="border-red-200 text-red-500 capitalize">
                  {type}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <p className="text-sm">
          <span className="font-medium">Your skin type: </span>
          {isSuitableForUser ? (
            <span className="text-green-600 font-medium">Suitable for {profile.skinType} skin</span>
          ) : (
            <span className="text-red-600 font-medium">Not recommended for {profile.skinType} skin</span>
          )}
        </p>
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-primary text-sm font-medium hover:underline flex items-center">
              <Info className="h-4 w-4 mr-1" />
              View detailed information
            </button>
          </DialogTrigger>
          <DialogContent className="glass max-w-md">
            <DialogHeader>
              <DialogTitle>{ingredient.name}</DialogTitle>
              <DialogDescription>
                {ingredient.description}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Safety Score</span>
                <div className="flex items-center">
                  <span className="text-sm mr-2">{ingredient.safetyScore}/10</span>
                  {getSafetyBadge()}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Benefits</h4>
                <p className="text-sm text-muted-foreground">{ingredient.benefitsDescription || "No specific benefits listed."}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Warnings</h4>
                <p className="text-sm text-muted-foreground">{ingredient.warningsDescription || "No specific warnings listed."}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Suitable for skin types</h4>
                <div className="flex flex-wrap gap-1">
                  {ingredient.suitableFor.map(type => (
                    <Badge key={type} variant="secondary" className="capitalize">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {ingredient.notSuitableFor.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Not recommended for</h4>
                  <div className="flex flex-wrap gap-1">
                    {ingredient.notSuitableFor.map(type => (
                      <Badge key={type} variant="outline" className="border-red-200 text-red-500 capitalize">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h4 className="text-sm font-medium mb-1">Commonly found in</h4>
                <div className="flex flex-wrap gap-1">
                  {ingredient.commonIn.map(item => (
                    <Badge key={item} variant="outline" className="capitalize">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default IngredientCard;
