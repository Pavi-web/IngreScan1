
export type SkinType = 'normal' | 'dry' | 'oily' | 'combination' | 'sensitive';

export type Ingredient = {
  id: string;
  name: string;
  description: string;
  safetyScore: number; // 1-10, higher is safer
  suitableFor: SkinType[];
  notSuitableFor: SkinType[];
  commonIn: string[];
  benefitsDescription?: string;
  warningsDescription?: string;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  imageUrl: string;
  ingredientIds: string[];
  price: number;
  rating: number;
  reviewCount: number;
  suitableFor: SkinType[];
};

export type Profile = {
  id: string;
  name: string;
  email: string;
  skinType: SkinType;
  concerns: string[];
  allergies: string[];
  favoriteProducts: string[];
  searchHistory: string[];
};

// Mock data for ingredients
export const ingredients: Ingredient[] = [
  {
    id: "ing1",
    name: "Hyaluronic Acid",
    description: "A powerful humectant that helps retain moisture in the skin.",
    safetyScore: 9,
    suitableFor: ["normal", "dry", "oily", "combination", "sensitive"],
    notSuitableFor: [],
    commonIn: ["serums", "moisturizers", "masks"],
    benefitsDescription: "Provides deep hydration, helps plump the skin, and reduces the appearance of fine lines.",
    warningsDescription: "Generally well-tolerated, but in very dry environments, it might draw moisture from the skin instead of the air."
  },
  {
    id: "ing2",
    name: "Salicylic Acid",
    description: "A beta hydroxy acid (BHA) that exfoliates the skin and clears pores.",
    safetyScore: 7,
    suitableFor: ["oily", "combination"],
    notSuitableFor: ["dry", "sensitive"],
    commonIn: ["cleansers", "toners", "spot treatments"],
    benefitsDescription: "Helps clear acne, reduces inflammation, and prevents future breakouts.",
    warningsDescription: "Can cause dryness, irritation, and increased sun sensitivity. Use with sunscreen."
  },
  {
    id: "ing3",
    name: "Niacinamide",
    description: "A form of vitamin B3 that brightens skin and reduces inflammation.",
    safetyScore: 9,
    suitableFor: ["normal", "dry", "oily", "combination", "sensitive"],
    notSuitableFor: [],
    commonIn: ["serums", "moisturizers", "toners"],
    benefitsDescription: "Regulates oil production, minimizes pores, and improves uneven skin tone.",
    warningsDescription: "High concentrations may cause flushing in some individuals."
  },
  {
    id: "ing4",
    name: "Retinol",
    description: "A vitamin A derivative that promotes cell turnover and collagen production.",
    safetyScore: 6,
    suitableFor: ["normal", "oily", "combination"],
    notSuitableFor: ["sensitive", "dry"],
    commonIn: ["serums", "night creams", "anti-aging products"],
    benefitsDescription: "Reduces fine lines, improves skin texture, and helps with acne.",
    warningsDescription: "Can cause irritation, dryness, and peeling. Increases sun sensitivity. Not safe during pregnancy."
  },
  {
    id: "ing5",
    name: "Vitamin C",
    description: "An antioxidant that brightens skin and protects against environmental damage.",
    safetyScore: 8,
    suitableFor: ["normal", "oily", "combination"],
    notSuitableFor: ["sensitive"],
    commonIn: ["serums", "moisturizers", "masks"],
    benefitsDescription: "Brightens dark spots, stimulates collagen production, and provides antioxidant protection.",
    warningsDescription: "Can oxidize quickly. Some forms may cause irritation in sensitive skin."
  },
  {
    id: "ing6",
    name: "Fragrance (Parfum)",
    description: "A blend of chemicals that give products a distinct scent.",
    safetyScore: 3,
    suitableFor: ["normal"],
    notSuitableFor: ["sensitive", "dry", "combination", "oily"],
    commonIn: ["moisturizers", "cleansers", "masks"],
    benefitsDescription: "Provides a pleasant scent experience.",
    warningsDescription: "Common allergen that can cause irritation, redness, and sensitization."
  },
  {
    id: "ing7",
    name: "Glycerin",
    description: "A humectant that attracts moisture to the skin.",
    safetyScore: 10,
    suitableFor: ["normal", "dry", "oily", "combination", "sensitive"],
    notSuitableFor: [],
    commonIn: ["moisturizers", "cleansers", "serums"],
    benefitsDescription: "Hydrates, strengthens skin barrier, and improves skin texture.",
    warningsDescription: "Generally well-tolerated by all skin types."
  },
  {
    id: "ing8",
    name: "Parabens",
    description: "Preservatives used to prevent bacterial growth in cosmetic products.",
    safetyScore: 4,
    suitableFor: ["normal"],
    notSuitableFor: ["sensitive", "dry", "combination", "oily"],
    commonIn: ["moisturizers", "makeup", "hair products"],
    benefitsDescription: "Extends product shelf life.",
    warningsDescription: "Potential hormone disruption. May cause allergic reactions."
  },
  {
    id: "ing9",
    name: "Sodium Lauryl Sulfate",
    description: "A cleansing agent that creates foam and removes oil and dirt.",
    safetyScore: 4,
    suitableFor: ["oily"],
    notSuitableFor: ["sensitive", "dry", "combination", "normal"],
    commonIn: ["cleansers", "shampoos", "body washes"],
    benefitsDescription: "Creates rich lather and thoroughly cleanses.",
    warningsDescription: "Can strip natural oils, causing dryness and irritation."
  },
  {
    id: "ing10",
    name: "Ceramides",
    description: "Lipids that help form the skin's barrier and retain moisture.",
    safetyScore: 10,
    suitableFor: ["normal", "dry", "oily", "combination", "sensitive"],
    notSuitableFor: [],
    commonIn: ["moisturizers", "serums", "creams"],
    benefitsDescription: "Strengthens skin barrier, prevents moisture loss, and protects against environmental damage.",
    warningsDescription: "Generally well-tolerated by all skin types."
  }
];

// Mock data for products
export const products: Product[] = [
  {
    id: "prod1",
    name: "Hydration Boost Serum",
    brand: "DermaCare",
    category: "Serum",
    description: "A lightweight serum that deeply hydrates and plumps the skin.",
    imageUrl: "/placeholder.svg",
    ingredientIds: ["ing1", "ing3", "ing7", "ing10"],
    price: 48.99,
    rating: 4.7,
    reviewCount: 256,
    suitableFor: ["normal", "dry", "combination", "sensitive"]
  },
  {
    id: "prod2",
    name: "Clear Skin Cleanser",
    brand: "AcneCare",
    category: "Cleanser",
    description: "A gentle foaming cleanser that removes impurities without stripping the skin.",
    imageUrl: "/placeholder.svg",
    ingredientIds: ["ing2", "ing9", "ing7"],
    price: 24.99,
    rating: 4.2,
    reviewCount: 189,
    suitableFor: ["oily", "combination"]
  },
  {
    id: "prod3",
    name: "Advanced Repair Night Cream",
    brand: "AgeLess",
    category: "Moisturizer",
    description: "A rich night cream that repairs and rejuvenates skin while you sleep.",
    imageUrl: "/placeholder.svg",
    ingredientIds: ["ing4", "ing7", "ing10", "ing6"],
    price: 56.99,
    rating: 4.9,
    reviewCount: 310,
    suitableFor: ["normal", "combination"]
  },
  {
    id: "prod4",
    name: "Vitamin C Brightening Serum",
    brand: "GlowUp",
    category: "Serum",
    description: "A potent vitamin C serum that brightens skin and reduces dark spots.",
    imageUrl: "/placeholder.svg",
    ingredientIds: ["ing5", "ing3", "ing7"],
    price: 42.99,
    rating: 4.6,
    reviewCount: 275,
    suitableFor: ["normal", "oily", "combination"]
  },
  {
    id: "prod5",
    name: "Sensitive Skin Moisturizer",
    brand: "GentelCare",
    category: "Moisturizer",
    description: "A fragrance-free moisturizer designed for sensitive skin.",
    imageUrl: "/placeholder.svg",
    ingredientIds: ["ing1", "ing7", "ing10"],
    price: 32.99,
    rating: 4.8,
    reviewCount: 203,
    suitableFor: ["sensitive", "dry", "normal"]
  },
  {
    id: "prod6",
    name: "Oil Control Toner",
    brand: "MattePerfect",
    category: "Toner",
    description: "A balancing toner that controls oil and minimizes pores.",
    imageUrl: "/placeholder.svg",
    ingredientIds: ["ing2", "ing3", "ing9"],
    price: 28.99,
    rating: 4.4,
    reviewCount: 167,
    suitableFor: ["oily", "combination"]
  },
  {
    id: "prod7",
    name: "Rejuvenating Eye Cream",
    brand: "AgeLess",
    category: "Eye Care",
    description: "A targeted eye cream that reduces fine lines and puffiness.",
    imageUrl: "/placeholder.svg",
    ingredientIds: ["ing1", "ing5", "ing6", "ing8"],
    price: 38.99,
    rating: 4.5,
    reviewCount: 198,
    suitableFor: ["normal", "dry"]
  },
  {
    id: "prod8",
    name: "Daily Defense Sunscreen SPF 50",
    brand: "SunShield",
    category: "Sun Protection",
    description: "A lightweight, broad-spectrum sunscreen that protects against UVA and UVB rays.",
    imageUrl: "/placeholder.svg",
    ingredientIds: ["ing7", "ing6", "ing8"],
    price: 26.99,
    rating: 4.3,
    reviewCount: 231,
    suitableFor: ["normal", "combination", "oily"]
  }
];

// Default user profile
export const defaultProfile: Profile = {
  id: "user1",
  name: "Guest User",
  email: "guest@example.com",
  skinType: "normal",
  concerns: ["hydration", "anti-aging"],
  allergies: ["fragrance"],
  favoriteProducts: ["prod1", "prod5"],
  searchHistory: ["hyaluronic acid", "vitamin c", "moisturizer"]
};

// Function to check if an ingredient is suitable for a skin type
export function isIngredientSuitableForSkin(ingredient: Ingredient, skinType: SkinType): boolean {
  return ingredient.suitableFor.includes(skinType) && !ingredient.notSuitableFor.includes(skinType);
}

// Function to check if a product is suitable for a skin type
export function isProductSuitableForSkin(product: Product, skinType: SkinType): boolean {
  return product.suitableFor.includes(skinType);
}

// Function to get ingredient safety level description
export function getIngredientSafetyLevel(safetyScore: number): { level: string; color: string } {
  if (safetyScore >= 8) {
    return { level: "Safe", color: "green" };
  } else if (safetyScore >= 5) {
    return { level: "Moderate", color: "yellow" };
  } else {
    return { level: "Caution", color: "red" };
  }
}

// Function to search ingredients by name
export function searchIngredients(query: string): Ingredient[] {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();
  return ingredients.filter(ingredient => 
    ingredient.name.toLowerCase().includes(lowerQuery) || 
    ingredient.description.toLowerCase().includes(lowerQuery)
  );
}

// Function to search products by name or brand
export function searchProducts(query: string): Product[] {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) || 
    product.brand.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery)
  );
}

// Function to get product ingredients
export function getProductIngredients(productId: string): Ingredient[] {
  const product = products.find(p => p.id === productId);
  if (!product) return [];
  
  return product.ingredientIds.map(id => {
    const ingredient = ingredients.find(i => i.id === id);
    return ingredient!;
  }).filter(Boolean);
}

// Function to check if a product is suitable for a user's profile
export function isProductSuitableForUser(product: Product, profile: Profile): boolean {
  // Check if product is suitable for user's skin type
  if (!isProductSuitableForSkin(product, profile.skinType)) {
    return false;
  }
  
  // Check if any ingredients are in user's allergies
  const productIngredients = getProductIngredients(product.id);
  const hasAllergens = productIngredients.some(ingredient => 
    profile.allergies.includes(ingredient.name.toLowerCase())
  );
  
  return !hasAllergens;
}
