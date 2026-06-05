import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCcw,
  BadgeCheck, Users, Package, Star, ChevronRight, Play,
  Zap, TrendingUp, Globe, Store
} from 'lucide-react';
import ProductCard from '@/components/marketplace/ProductCard';
import { CategoryCard } from '@/components/marketplace/CategoryFilter';
import SearchBar from '@/components/common/SearchBar';
import {
  mockProducts, mockCategories, mockTestimonials,
} from '@/services/mockData';

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 bg-mesh pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <div className="animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 text-brand-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Marketplace Platform
            </div>

            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-[1.1] mb-6">
              The AI-Powered{' '}
              <span className="text-gradient">Marketplace</span>{' '}
              for the{' '}
              <span className="relative">
                Next Generation
                <svg className="absolute -bottom-2 left-0 w-full h-2" viewBox="0 0 300 8" fill="none" preserveAspectRatio="none">
                  <path d="M2 6 Q75 2 150 6 Q225 10 298 6" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </h1>

            <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-lg">
              Discover unique products, connect with trusted sellers, and experience smarter shopping powered by AI. Join 2M+ buyers and sellers worldwide.
            </p>

            {/* Search bar */}
            <div className="mb-8">
              <SearchBar
                placeholder="What are you looking for today?"
                size="lg"
                className="max-w-lg"
              />
              <div className="flex items-center gap-2 mt-2.5 ml-1">
                <span className="text-xs text-slate-400">Popular:</span>
                {['Headphones', 'Sneakers', 'Cameras'].map(tag => (
                  <Link
                    key={tag}
                    to={`/marketplace?q=${tag}`}
                    className="text-xs text-brand-600 hover:underline font-medium"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link to="/marketplace" className="btn-primary text-base px-6 py-3">
                Explore Marketplace
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setIsVideoOpen(true)}
                className="btn-secondary text-base px-6 py-3"
              >
                <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 text-brand-600 fill-current ml-0.5" />
                </div>
                Watch Demo
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {[
                { icon: <Users className="w-4 h-4 text-brand-500" />, label: '2M+ Members' },
                { icon: <Package className="w-4 h-4 text-emerald-500" />, label: '500K+ Products' },
                { icon: <Star className="w-4 h-4 text-amber-500 fill-current" />, label: '4.9 Avg Rating' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  {icon}
                  <span className="text-sm font-semibold text-slate-700">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — hero visual */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Main card */}
              <div className="card shadow-2xl overflow-hidden rounded-3xl">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=85"
                  alt="Marketplace dashboard"
                  className="w-full h-80 object-cover"
                />
                <div className="p-6 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-display font-bold text-lg text-slate-900">Today's Top Picks</p>
                      <p className="text-sm text-slate-400">Curated by AI</p>
                    </div>
                    <span className="badge-blue flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" /> AI Selected
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {mockProducts.slice(0, 3).map(p => (
                      <div key={p.id} className="flex-1 rounded-xl overflow-hidden bg-slate-100 aspect-square">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -left-4 card p-3 shadow-lg flex items-center gap-2.5 rounded-2xl">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Sales Up 42%</p>
                  <p className="text-[10px] text-slate-400">This week</p>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 card p-3 shadow-lg flex items-center gap-2.5 rounded-2xl">
                <div className="w-9 h-9 rounded-xl bg-brand-100 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-brand-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">150+ Countries</p>
                  <p className="text-[10px] text-slate-400">Worldwide reach</p>
                </div>
              </div>

              <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 card p-3 shadow-lg rounded-2xl">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-full bg-brand-600 flex items-center justify-center text-white text-xs font-bold">J</div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-800">Just Sold!</p>
                    <p className="text-[9px] text-slate-400">Sony A7 IV</p>
                  </div>
                </div>
                <div className="text-sm font-display font-bold text-brand-600">$1,899</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setIsVideoOpen(false)}>
          <div className="bg-slate-900 rounded-2xl overflow-hidden w-full max-w-3xl aspect-video flex items-center justify-center">
            <p className="text-white text-lg font-display">Demo Video Placeholder</p>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Value Props Strip ────────────────────────────────────────────────────────
function ValuePropsStrip() {
  const props = [
    { icon: <ShieldCheck className="w-5 h-5" />, title: 'Buyer Protection', desc: 'Every purchase guaranteed', color: 'text-emerald-600 bg-emerald-50' },
    { icon: <Truck className="w-5 h-5" />, title: 'Fast Shipping', desc: 'Delivery in 2–5 days', color: 'text-brand-600 bg-brand-50' },
    { icon: <RefreshCcw className="w-5 h-5" />, title: 'Easy Returns', desc: '30-day hassle-free returns', color: 'text-violet-600 bg-violet-50' },
    { icon: <Sparkles className="w-5 h-5" />, title: 'AI Powered', desc: 'Smart recommendations', color: 'text-amber-600 bg-amber-50' },
    { icon: <BadgeCheck className="w-5 h-5" />, title: 'Verified Sellers', desc: 'All sellers background checked', color: 'text-rose-600 bg-rose-50' },
  ];

  return (
    <section className="bg-white border-y border-slate-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {props.map(({ icon, title, desc, color }) => (
            <div key={title} className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                {icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 leading-tight">{title}</p>
                <p className="text-xs text-slate-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Categories Section ───────────────────────────────────────────────────────
function CategoriesSection() {
  return (
    <section className="py-14 bg-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-subtitle">Find exactly what you're looking for</p>
          </div>
          <Link to="/marketplace" className="btn-ghost text-brand-600 hover:text-brand-700 hidden sm:flex">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {mockCategories.map(cat => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section wrapper for product grids ───────────────────────────────────────
interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: typeof mockProducts;
  badge?: { label: string; className: string };
  viewAllHref: string;
}

function ProductSection({ title, subtitle, products, badge, viewAllHref }: ProductSectionProps) {
  return (
    <section className="py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            {badge && (
              <span className={`badge mb-2 ${badge.className}`}>{badge.label}</span>
            )}
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
          <Link to={viewAllHref} className="btn-ghost text-brand-600 hover:text-brand-700 hidden sm:flex shrink-0">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="flex justify-center mt-6 sm:hidden">
          <Link to={viewAllHref} className="btn-secondary">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── AI Features Banner ───────────────────────────────────────────────────────
function AIFeaturesBanner() {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-brand-600" />,
      title: 'AI Price Match',
      desc: 'Our AI scans thousands of listings to ensure you always get the best deal automatically.',
    },
    {
      icon: <Zap className="w-6 h-6 text-violet-600" />,
      title: 'Smart Recommendations',
      desc: 'Machine learning understands your taste and surfaces products you\'ll love before you even search.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: 'Fraud Detection',
      desc: 'Real-time AI monitoring protects every transaction and flags suspicious activity instantly.',
    },
  ];

  return (
    <section className="py-14 bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 relative overflow-hidden">
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <span className="badge bg-brand-500/20 text-brand-300 mb-3">
            <Sparkles className="w-3 h-3 mr-1.5" /> Built with Foundation Models & That
          </span>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-3">
            Smarter Commerce, Powered by AI
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            MarketVerse doesn't just host products — it intelligently connects buyers to what they need and helps sellers grow faster.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-white/20 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                {icon}
              </div>
              <h3 className="font-display font-semibold text-white text-lg mb-2">{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/register" className="btn-primary text-base px-8 py-3.5">
            Get Started for Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section className="py-14 bg-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="section-title">Trusted by Millions Worldwide</h2>
          <p className="section-subtitle">Real stories from our community</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {mockTestimonials.map(t => (
            <div key={t.id} className="card p-6 flex flex-col gap-4">
              {/* Stars */}
              <div className="flex">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              {/* Quote */}
              <p className="text-slate-700 text-sm leading-relaxed flex-1 italic">
                "{t.body}"
              </p>
              {/* Person */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-50">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-9 h-9 rounded-full bg-slate-100"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-800">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
                <BadgeCheck className="w-4 h-4 text-brand-500 ml-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stats Banner ─────────────────────────────────────────────────────────────
function StatsBanner() {
  const stats = [
    { value: '2M+', label: 'Active Members', icon: '👥' },
    { value: '500K+', label: 'Products Listed', icon: '📦' },
    { value: '$85M+', label: 'Total Sales', icon: '💰' },
    { value: '150+', label: 'Countries', icon: '🌍' },
  ];

  return (
    <section className="py-12 bg-brand-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ value, label, icon }) => (
            <div key={label} className="text-center">
              <div className="text-3xl mb-1">{icon}</div>
              <div className="font-display font-bold text-3xl text-white leading-none">{value}</div>
              <div className="text-blue-200 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Nearby Products Section ───────────────────────────────────────────────────
function NearbySection() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title">Trending Products</h2>
            <p className="section-subtitle">What's hot in the community right now</p>
          </div>
          <Link to="/marketplace?sort=trending" className="btn-ghost text-brand-600 hover:text-brand-700 hidden sm:flex shrink-0">
            See All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {mockProducts.slice(4, 8).map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Sell CTA ────────────────────────────────────────────────────────────────
function SellCTASection() {
  return (
    <section className="py-14 bg-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Left */}
            <div className="p-10 lg:p-14">
              <span className="badge badge-blue mb-4">
                <Store className="w-3 h-3 mr-1.5" /> For Sellers
              </span>
              <h2 className="font-display font-bold text-3xl text-slate-900 mb-4 leading-tight">
                Build a Foundation of Intelligence & Trust
              </h2>
              <p className="text-slate-500 mb-6 leading-relaxed">
                Join thousands of sellers who use MarketVerse's AI-powered tools to grow faster, manage inventory smarter, and reach customers worldwide.
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                {[
                  'AI-assisted product listing & pricing',
                  'Real-time analytics & sales insights',
                  'Verified seller badge & trust system',
                  'Global shipping & payment support',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <BadgeCheck className="w-3 h-3 text-emerald-600" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3">
                <Link to="/register?role=seller" className="btn-primary">
                  Start Selling Free <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/learn" className="btn-secondary">
                  Learn More
                </Link>
              </div>
            </div>
            {/* Right — visual */}
            <div className="relative bg-gradient-to-br from-brand-600 to-violet-700 hidden lg:flex items-center justify-center p-10">
              <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                {[
                  { label: 'Monthly Revenue', value: '$12,450', change: '+34%', color: 'bg-white' },
                  { label: 'Total Orders', value: '248', change: '+18%', color: 'bg-white' },
                  { label: 'Active Listings', value: '64', change: '+5', color: 'bg-white' },
                  { label: 'Avg. Rating', value: '4.9 ★', change: 'Excellent', color: 'bg-white' },
                ].map(({ label, value, change, color }) => (
                  <div key={label} className={`${color} rounded-2xl p-4`}>
                    <p className="text-xs text-slate-500 mb-1 font-medium">{label}</p>
                    <p className="font-display font-bold text-slate-900 text-lg leading-none">{value}</p>
                    <p className="text-xs text-emerald-600 font-semibold mt-1">{change}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function MarketplaceHomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ValuePropsStrip />
      <CategoriesSection />
      <ProductSection
        title="Featured Products"
        subtitle="Handpicked by our AI for the best value and quality"
        products={mockProducts.slice(0, 4)}
        badge={{ label: '✨ AI Curated', className: 'badge-blue' }}
        viewAllHref="/marketplace?featured=true"
      />
      <AIFeaturesBanner />
      <ProductSection
        title="New Arrivals"
        subtitle="Fresh listings added in the last 24 hours"
        products={mockProducts.slice(2, 6)}
        badge={{ label: '🆕 Just Listed', className: 'badge-green' }}
        viewAllHref="/marketplace?sort=newest"
      />
      <StatsBanner />
      <NearbySection />
      <TestimonialsSection />
      <SellCTASection />
    </div>
  );
}
