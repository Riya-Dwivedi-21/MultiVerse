import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, ShoppingCart, Heart, Bell, Menu, X,
  ChevronDown, Sparkles, User, LogOut, LayoutDashboard,
  Package, Store,
} from 'lucide-react';

interface NavbarProps {
  cartCount?: number;
  wishlistCount?: number;
  notificationCount?: number;
  isAuthenticated?: boolean;
  userName?: string;
  userAvatar?: string;
  userRole?: 'buyer' | 'seller' | 'admin';
}

const categories = [
  'Electronics', 'Fashion', 'Home & Garden', 'Sports',
  'Books & Media', 'Collectibles', 'Health & Beauty', 'Vehicles',
];

export default function Navbar({
  cartCount = 0,
  wishlistCount = 0,
  notificationCount = 0,
  isAuthenticated = false,
  userName = '',
  userAvatar,
  userRole = 'buyer',
}: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const dashboardPath = userRole === 'seller' ? '/seller-dashboard' : '/buyer-dashboard';

  return (
    <header className="sticky top-0 z-50 bg-white shadow-nav">
      {/* Top announcement bar */}
      <div className="bg-brand-600 text-white text-center text-xs py-1.5 px-4 font-medium tracking-wide">
        <Sparkles className="inline w-3 h-3 mr-1.5" />
        AI-Powered Recommendations Now Live — Try it Free
        <Sparkles className="inline w-3 h-3 ml-1.5" />
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-600 to-violet-600 flex items-center justify-center shadow-sm">
              <span className="text-white text-sm font-bold font-display">M</span>
            </div>
            <span className="font-display font-bold text-xl text-slate-900 hidden sm:block">
              Market<span className="text-brand-600">Verse</span>
            </span>
          </Link>

          {/* Categories dropdown */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setIsCategoryOpen(v => !v)}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-brand-600 transition-colors py-2"
            >
              All Categories
              <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
            </button>
            {isCategoryOpen && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                {categories.map(cat => (
                  <Link
                    key={cat}
                    to={`/marketplace?category=${encodeURIComponent(cat)}`}
                    onClick={() => setIsCategoryOpen(false)}
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products, sellers, categories..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl 
                           focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 
                           focus:bg-white transition-all"
              />
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-1 ml-auto">
            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-brand-600 transition-colors hidden sm:flex">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-brand-600 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-brand-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Notifications */}
            {isAuthenticated && (
              <button className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-brand-600 transition-colors hidden sm:flex">
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>
            )}

            {/* Auth / Profile */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(v => !v)}
                  className="flex items-center gap-2 ml-1 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  {userAvatar ? (
                    <img src={userAvatar} alt={userName} className="w-7 h-7 rounded-full object-cover" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-slate-700 hidden lg:block">{userName.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden lg:block" />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-sm font-semibold text-slate-900">{userName}</p>
                      <p className="text-xs text-slate-500 capitalize">{userRole} Account</p>
                    </div>
                    <Link to={dashboardPath} onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-600 transition-colors">
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <Link to="/orders" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-600 transition-colors">
                      <Package className="w-4 h-4" /> My Orders
                    </Link>
                    {userRole === 'seller' && (
                      <Link to="/seller-dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-brand-600 transition-colors">
                        <Store className="w-4 h-4" /> Seller Hub
                      </Link>
                    )}
                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-1">
                <Link to="/login" className="btn-ghost text-sm hidden sm:flex">Sign In</Link>
                <Link to="/register" className="btn-primary text-sm">Get Started</Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(v => !v)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors lg:hidden ml-1"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="pb-3 md:hidden">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 focus:bg-white transition-all"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-4">
          <nav className="flex flex-col gap-1">
            {categories.map(cat => (
              <Link
                key={cat}
                to={`/marketplace?category=${encodeURIComponent(cat)}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-600 rounded-lg transition-colors"
              >
                {cat}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
                <Link to="/login" className="btn-secondary flex-1" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                <Link to="/register" className="btn-primary flex-1" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
