import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, BadgeCheck, Flame, Sparkles, MapPin } from 'lucide-react';
import type { ProductCardData } from '@/types';

interface ProductCardProps {
  product: ProductCardData;
  onToggleWishlist?: (id: string) => void;
  onAddToCart?: (id: string) => void;
}

function formatPrice(price: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price);
}

function conditionLabel(c: string) {
  const map: Record<string, { label: string; cls: string }> = {
    new: { label: 'New', cls: 'badge-green' },
    'like-new': { label: 'Like New', cls: 'badge-blue' },
    good: { label: 'Good', cls: 'badge-blue' },
    fair: { label: 'Fair', cls: 'bg-amber-50 text-amber-700 badge' },
    poor: { label: 'Poor', cls: 'bg-rose-50 text-rose-700 badge' },
  };
  return map[c] ?? { label: c, cls: 'badge-blue' };
}

export default function ProductCard({ product, onToggleWishlist, onAddToCart }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(product.isLiked);
  const [addedToCart, setAddedToCart] = useState(false);
  const condition = conditionLabel(product.condition);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(v => !v);
    onToggleWishlist?.(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setAddedToCart(true);
    onAddToCart?.(product.id);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="card-hover overflow-hidden flex flex-col h-full">
        {/* Image */}
        <div className="relative overflow-hidden bg-slate-100 aspect-[4/3]">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
            {product.isFeatured && (
              <span className="badge bg-brand-600 text-white text-[10px]">
                <Sparkles className="w-2.5 h-2.5 mr-1" /> Featured
              </span>
            )}
            {product.isTrending && (
              <span className="badge bg-orange-500 text-white text-[10px]">
                <Flame className="w-2.5 h-2.5 mr-1" /> Trending
              </span>
            )}
            {product.isNew && (
              <span className="badge bg-emerald-500 text-white text-[10px]">New</span>
            )}
            {discount && (
              <span className="badge bg-rose-500 text-white text-[10px]">-{discount}%</span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center
                       shadow-sm transition-all duration-200
                       ${isLiked
                         ? 'bg-rose-500 text-white scale-110'
                         : 'bg-white/90 text-slate-500 hover:bg-white hover:text-rose-500 opacity-0 group-hover:opacity-100'
                       }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>

          {/* Quick add */}
          <div className="absolute bottom-0 left-0 right-0 p-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
            <button
              onClick={handleAddToCart}
              className={`w-full py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all
                         ${addedToCart
                           ? 'bg-emerald-500 text-white'
                           : 'bg-brand-600 hover:bg-brand-700 text-white'
                         }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              {addedToCart ? 'Added to Cart!' : 'Quick Add'}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-3.5 flex flex-col flex-1">
          {/* Category & condition */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wide">
              {product.category}
            </span>
            <span className={`${condition.cls} text-[10px] ml-auto`}>{condition.label}</span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2 mb-2 group-hover:text-brand-600 transition-colors font-sans">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map(i => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i <= Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                />
              ))}
            </div>
            <span className="text-xs text-slate-500">
              {product.rating.toFixed(1)} ({product.reviewCount})
            </span>
          </div>

          {/* Seller */}
          <div className="flex items-center gap-1.5 mb-3">
            {product.seller.avatar ? (
              <img
                src={product.seller.avatar}
                alt={product.seller.name}
                className="w-5 h-5 rounded-full"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 text-[9px] font-bold">
                {product.seller.name.charAt(0)}
              </div>
            )}
            <span className="text-xs text-slate-500 truncate flex-1">{product.seller.name}</span>
            {product.seller.isVerified && (
              <BadgeCheck className="w-3.5 h-3.5 text-brand-500 shrink-0" />
            )}
          </div>

          {/* Location */}
          {product.location && (
            <div className="flex items-center gap-1 mb-3 text-xs text-slate-400">
              <MapPin className="w-3 h-3" />
              <span>{product.location}</span>
            </div>
          )}

          {/* Price — pushed to bottom */}
          <div className="flex items-baseline gap-2 mt-auto pt-2 border-t border-slate-50">
            <span className="font-display font-bold text-lg text-slate-900">
              {formatPrice(product.price, product.currency)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(product.originalPrice, product.currency)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
