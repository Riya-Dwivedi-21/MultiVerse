import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, TrendingUp, Clock } from 'lucide-react';

const trendingSearches = ['Wireless Headphones', 'Nike Shoes', 'MacBook Pro', 'Vintage Camera', 'Leather Bag'];
const recentSearches = ['Sony headphones', 'iPhone 15 case', 'Desk lamp'];

interface SearchBarProps {
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  defaultValue?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({
  placeholder = 'Search products, sellers, categories...',
  size = 'md',
  className = '',
  defaultValue = '',
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: 'py-2 pl-9 pr-3 text-sm',
    md: 'py-3 pl-11 pr-4 text-sm',
    lg: 'py-4 pl-14 pr-5 text-base',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5 left-2.5',
    md: 'w-4 h-4 left-3.5',
    lg: 'w-5 h-5 left-4',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/marketplace?q=${encodeURIComponent(query)}`);
      }
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    if (onSearch) {
      onSearch(suggestion);
    } else {
      navigate(`/marketplace?q=${encodeURIComponent(suggestion)}`);
    }
    setIsFocused(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const showDropdown = isFocused && (trendingSearches.length > 0 || recentSearches.length > 0);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className={`absolute top-1/2 -translate-y-1/2 text-slate-400 ${iconSizes[size]}`} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            className={`w-full bg-white border border-slate-200 rounded-2xl text-slate-800
                       placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20
                       focus:border-brand-400 transition-all duration-150 ${sizeClasses[size]}`}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {/* Suggestions dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50 overflow-hidden">
          {recentSearches.length > 0 && !query && (
            <div className="mb-2">
              <div className="flex items-center gap-2 px-4 py-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Recent</span>
              </div>
              {recentSearches.map(s => (
                <button
                  key={s}
                  onClick={() => handleSuggestionClick(s)}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2 px-4 py-1.5 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-brand-500" />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Trending</span>
            </div>
            {trendingSearches
              .filter(s => !query || s.toLowerCase().includes(query.toLowerCase()))
              .map(s => (
                <button
                  key={s}
                  onClick={() => handleSuggestionClick(s)}
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-700 transition-colors flex items-center gap-2"
                >
                  <TrendingUp className="w-3 h-3 text-orange-400" />
                  {s}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
