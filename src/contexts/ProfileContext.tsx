
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Profile, SkinType, defaultProfile } from '@/lib/database';

interface ProfileContextType {
  profile: Profile;
  updateProfile: (updatedProfile: Partial<Profile>) => void;
  updateSkinType: (skinType: SkinType) => void;
  addConcern: (concern: string) => void;
  removeConcern: (concern: string) => void;
  addAllergy: (allergy: string) => void;
  removeAllergy: (allergy: string) => void;
  addFavoriteProduct: (productId: string) => void;
  removeFavoriteProduct: (productId: string) => void;
  addSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile>(defaultProfile);

  const updateProfile = (updatedProfile: Partial<Profile>) => {
    setProfile(prev => ({ ...prev, ...updatedProfile }));
  };

  const updateSkinType = (skinType: SkinType) => {
    setProfile(prev => ({ ...prev, skinType }));
  };

  const addConcern = (concern: string) => {
    if (!profile.concerns.includes(concern)) {
      setProfile(prev => ({
        ...prev,
        concerns: [...prev.concerns, concern]
      }));
    }
  };

  const removeConcern = (concern: string) => {
    setProfile(prev => ({
      ...prev,
      concerns: prev.concerns.filter(c => c !== concern)
    }));
  };

  const addAllergy = (allergy: string) => {
    if (!profile.allergies.includes(allergy)) {
      setProfile(prev => ({
        ...prev,
        allergies: [...prev.allergies, allergy]
      }));
    }
  };

  const removeAllergy = (allergy: string) => {
    setProfile(prev => ({
      ...prev,
      allergies: prev.allergies.filter(a => a !== allergy)
    }));
  };

  const addFavoriteProduct = (productId: string) => {
    if (!profile.favoriteProducts.includes(productId)) {
      setProfile(prev => ({
        ...prev,
        favoriteProducts: [...prev.favoriteProducts, productId]
      }));
    }
  };

  const removeFavoriteProduct = (productId: string) => {
    setProfile(prev => ({
      ...prev,
      favoriteProducts: prev.favoriteProducts.filter(id => id !== productId)
    }));
  };

  const addSearchHistory = (query: string) => {
    // Add to beginning of array and limit to 10 items
    const updatedHistory = [query, ...profile.searchHistory.filter(q => q !== query)].slice(0, 10);
    setProfile(prev => ({
      ...prev,
      searchHistory: updatedHistory
    }));
  };

  const clearSearchHistory = () => {
    setProfile(prev => ({
      ...prev,
      searchHistory: []
    }));
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        updateSkinType,
        addConcern,
        removeConcern,
        addAllergy,
        removeAllergy,
        addFavoriteProduct,
        removeFavoriteProduct,
        addSearchHistory,
        clearSearchHistory
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
