import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShoppingCart, Heart, Share2, BadgeCheck, Star, Truck,
  Shield, RefreshCcw, MessageCircle, ChevronRight, Minus, Plus,
  MapPin, Package
} from 'lucide-react';
import ProductGallery from '@/components/marketplace/ProductGallery';
import { RatingDisplay, RatingBreakdown } from '@/components/common/Rating';
import ProductCard from '@/components/marketplace/ProductCard';
import { mockProducts, mockReviews } from '@/services/mockData';
import type { ProductImage } from '@/types';

const demoImages: ProductImage[] = [
  { id: 'i1', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=85', alt: 'Headphones front', isPrimary: true },
  { id: 'i2', url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=85', alt: 'Headphones side', isPrimary: false },
  { id: 'i3', url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=85', alt: 'Headphones detail', isPrimary: false },
  { id: 'i4', url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=85', alt: 'Headphones lifestyle', isPrimary: false },
];

const ratingDistribution: Record<number, number> = { 5: 180, 4: 38, 3: 12, 2: 3, 1: 1 };

export default function ProductDetailsPage() {
  const { id } = useParams();
  const product = mockProducts.find(p => p.id === id) ?? mockProducts[0];

  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(product.isLiked);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="bg-surface-secondary min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-slate-500">
            <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/marketplace" className="hover:text-brand-600 transition-colors">Marketplace</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to={`/marketplace?category=${product.category}`} className="hover:text-brand-600 transition-colors">{product.category}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-800 font-medium truncate max-w-[200px]">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          {/* Gallery */}
          <ProductGallery images={demoImages} title={product.title} />

          {/* Details */}
          <div className="flex flex-col gap-5">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-blue">{product.category}</span>
                {discount && <span className="badge bg-rose-100 text-rose-700">-{discount}% OFF</span>}
              </div>
              <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 leading-tight mb-3">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 flex-wrap">
                <RatingDisplay value={product.rating} count={product.reviewCount} size="md" />
                <span className="text-slate-300">|</span>
                <span className="text-sm text-slate-500 flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5" /> 142 sold
                </span>
                {product.location && (
                  <>
                    <span className="text-slate-300">|</span>
                    <span className="text-sm text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {product.location}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 py-4 border-y border-slate-100">
              <span className="font-display font-bold text-4xl text-slate-900">
                ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-slate-400 line-through">
                  ${product.originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              )}
              {discount && (
                <span className="text-lg font-semibold text-emerald-600">Save {discount}%</span>
              )}
            </div>

            {/* Seller card */}
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
              {product.seller.avatar ? (
                <img src={product.seller.avatar} alt={product.seller.name} className="w-11 h-11 rounded-full" />
              ) : (
                <div className="w-11 h-11 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold">
                  {product.seller.name.charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="font-semibold text-slate-800 text-sm truncate">{product.seller.name}</p>
                  {product.seller.isVerified && <BadgeCheck className="w-4 h-4 text-brand-500 shrink-0" />}
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs text-slate-500">{product.seller.rating} seller rating</span>
                </div>
              </div>
              <Link to={`/seller/${product.seller.name}`} className="btn-ghost text-xs shrink-0">
                Visit Store
              </Link>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold text-slate-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-slate-500">12 in stock</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 btn-primary py-3.5 text-base justify-center ${addedToCart ? 'bg-emerald-600 hover:bg-emerald-700' : ''}`}
              >
                <ShoppingCart className="w-5 h-5" />
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <button
                onClick={() => setIsLiked(v => !v)}
                className={`btn-secondary px-4 py-3.5 ${isLiked ? 'text-rose-500 border-rose-200 bg-rose-50' : ''}`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button className="btn-secondary px-4 py-3.5">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <Link to="/checkout" className="btn-secondary w-full justify-center py-3.5 text-base">
              Buy Now
            </Link>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <Shield className="w-4 h-4 text-emerald-600" />, label: 'Buyer Protection', color: 'bg-emerald-50' },
                { icon: <Truck className="w-4 h-4 text-brand-600" />, label: 'Fast Delivery', color: 'bg-brand-50' },
                { icon: <RefreshCcw className="w-4 h-4 text-violet-600" />, label: 'Easy Returns', color: 'bg-violet-50' },
              ].map(({ icon, label, color }) => (
                <div key={label} className={`${color} rounded-2xl p-3 flex flex-col items-center gap-1.5 text-center`}>
                  {icon}
                  <span className="text-xs font-semibold text-slate-700 leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="card overflow-hidden mb-8">
          <div className="flex border-b border-slate-100 overflow-x-auto scrollbar-hide">
            {(['description', 'specs', 'reviews'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-semibold capitalize shrink-0 border-b-2 transition-colors
                           ${activeTab === tab
                             ? 'border-brand-500 text-brand-600'
                             : 'border-transparent text-slate-500 hover:text-slate-800'
                           }`}
              >
                {tab === 'reviews' ? `Reviews (${product.reviewCount})` : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div className="prose prose-sm max-w-none text-slate-600 leading-relaxed">
                <p>
                  Experience studio-quality sound anywhere with the {product.title}. Engineered with precision drivers and advanced noise cancellation technology, these headphones deliver crisp highs, warm mids, and deep bass that audiophiles demand.
                </p>
                <p className="mt-4">
                  The ergonomic over-ear design with premium memory foam ear cushions provides all-day comfort, while the durable aluminum frame ensures lasting build quality. With up to 40 hours of playback and quick-charge capability, you'll never miss a beat.
                </p>
                <ul className="mt-4 flex flex-col gap-1.5 list-none pl-0">
                  {['40-hour battery life with quick charge', 'Active Noise Cancellation (ANC)', '30mm precision audio drivers', 'Bluetooth 5.3 with multipoint pairing', 'Foldable design with carry case'].map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <div className="w-4 h-4 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-600" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { label: 'Brand', value: 'Auranto' },
                  { label: 'Model', value: 'Max Studio Pro' },
                  { label: 'Connectivity', value: 'Bluetooth 5.3 / 3.5mm' },
                  { label: 'Battery Life', value: '40 hours ANC / 60 hours off' },
                  { label: 'Quick Charge', value: '10 min → 3 hours' },
                  { label: 'Driver Size', value: '40mm Precision' },
                  { label: 'Frequency Range', value: '20Hz – 20kHz' },
                  { label: 'Weight', value: '254g' },
                  { label: 'Colors', value: 'Midnight Black, Ivory White' },
                  { label: 'In the Box', value: 'Headphones, USB-C cable, 3.5mm cable, carry case' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-3 p-3 bg-slate-50 rounded-xl">
                    <span className="text-sm text-slate-500 w-32 shrink-0 font-medium">{label}</span>
                    <span className="text-sm text-slate-800">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="mb-8">
                  <RatingBreakdown
                    distribution={ratingDistribution}
                    total={product.reviewCount}
                    average={product.rating}
                  />
                </div>
                <div className="flex flex-col gap-5">
                  {mockReviews.map(review => (
                    <div key={review.id} className="pb-5 border-b border-slate-100 last:border-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 text-sm font-bold">
                            {review.reviewer.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-semibold text-slate-800">{review.reviewer.name}</span>
                              {review.verified && <BadgeCheck className="w-3.5 h-3.5 text-brand-500" />}
                            </div>
                            <span className="text-xs text-slate-400">{review.createdAt}</span>
                          </div>
                        </div>
                        <RatingDisplay value={review.rating} showCount={false} size="sm" />
                      </div>
                      {review.title && (
                        <p className="font-semibold text-slate-800 text-sm mb-1">{review.title}</p>
                      )}
                      <p className="text-slate-600 text-sm leading-relaxed">{review.body}</p>
                      <button className="mt-2 text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors">
                        <MessageCircle className="w-3 h-3" /> Helpful ({review.helpful})
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        <div>
          <h2 className="section-title mb-6">You Might Also Like</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mockProducts.filter(p => p.id !== product.id).slice(0, 4).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
