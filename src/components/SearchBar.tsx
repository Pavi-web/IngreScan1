
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { 
  searchIngredients, 
  searchProducts, 
  Ingredient, 
  Product 
} from '@/lib/database';
import { useProfile } from '@/contexts/ProfileContext';

type SearchResult = {
  type: 'ingredient' | 'product';
  id: string;
  name: string;
  description: string;
};

const SearchBar = () => {
  const { addSearchHistory, profile } = useProfile();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setRecentSearches(profile.searchHistory);
  }, [profile.searchHistory]);

  useEffect(() => {
    if (query.length >= 2) {
      // Search for ingredients
      const ingredientResults = searchIngredients(query).map((ingredient: Ingredient): SearchResult => ({
        type: 'ingredient',
        id: ingredient.id,
        name: ingredient.name,
        description: ingredient.description,
      }));

      // Search for products
      const productResults = searchProducts(query).map((product: Product): SearchResult => ({
        type: 'product',
        id: product.id,
        name: product.name,
        description: product.description,
      }));

      // Combine results, limit to 6 total
      setResults([...ingredientResults, ...productResults].slice(0, 6));
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      addSearchHistory(query.trim());
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setShowResults(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleResultClick = (result: SearchResult) => {
    addSearchHistory(result.name);
    if (result.type === 'ingredient') {
      navigate(`/ingredients/${result.id}`);
    } else {
      navigate(`/products/${result.id}`);
    }
    setShowResults(false);
    setQuery('');
  };

  const handleRecentSearchClick = (search: string) => {
    setQuery(search);
    navigate(`/search?q=${encodeURIComponent(search)}`);
    setShowResults(false);
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          className="w-full pl-10 pr-10 py-3 bg-secondary/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/20 transition-all"
          placeholder="Search ingredients, products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (query.length >= 2 || recentSearches.length > 0) {
              setShowResults(true);
            }
          }}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        {query && (
          <button
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setQuery('')}
          >
            <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          </button>
        )}
      </div>

      {showResults && (
        <div className="absolute z-10 mt-2 w-full glass border border-border rounded-xl shadow-lg max-h-[70vh] overflow-auto animate-fade-in">
          {results.length > 0 ? (
            <div>
              <div className="py-2 px-4 text-sm font-medium text-muted-foreground">Search Results</div>
              <ul className="divide-y divide-border">
                {results.map((result) => (
                  <li 
                    key={`${result.type}-${result.id}`}
                    className="search-result-item cursor-pointer"
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="flex items-start">
                      <div className="flex-grow">
                        <div className="font-medium">{result.name}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">{result.description}</div>
                        <div className="text-xs text-primary mt-1 capitalize">{result.type}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="p-3 border-t border-border">
                <button
                  className="w-full text-center text-sm text-primary hover:underline"
                  onClick={handleSearch}
                >
                  See all results for "{query}"
                </button>
              </div>
            </div>
          ) : recentSearches.length > 0 ? (
            <div>
              <div className="py-2 px-4 text-sm font-medium text-muted-foreground">Recent Searches</div>
              <ul className="divide-y divide-border">
                {recentSearches.slice(0, 5).map((search, index) => (
                  <li 
                    key={index}
                    className="search-result-item cursor-pointer"
                    onClick={() => handleRecentSearchClick(search)}
                  >
                    <div className="flex items-center">
                      <Search className="h-4 w-4 text-muted-foreground mr-2" />
                      <span>{search}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
