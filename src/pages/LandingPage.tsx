import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Globe, Users, Package, Star, BadgeCheck, TrendingUp, Store } from 'lucide-react';
import SearchBar from '@/components/common/SearchBar';
import { CategoryCard } from '@/components/marketplace/CategoryFilter';
import ProductCard from '@/components/marketplace/ProductCard';
import { mockCategories, mockProducts, mockTestimonials } from '@/services/mockData';

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden">
        <div className="absolute inset-0 bg-mesh pointer-events-none" />

        {/* Decorative blobs */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-brand-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-0 w-64 h-64 bg-violet-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 text-brand-700 px-4 py-2 rounded-full text-sm font-semibold mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              Introducing AI Price Match — Save More, Automatically
              <span className="bg-brand-600 text-white px-2 py-0.5 rounded-full text-xs">New</span>
            </div>

            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-slate-900 leading-[1.05] mb-6 animate-fade-in-up">
              The AI-Powered
              <br />
              <span className="text-gradient">Marketplace</span> for the
              <br />
              Next Generation
            </h1>

            <p className="text-slate-500 text-xl leading-relaxed mb-10 max-w-2xl mx-auto animate-fade-in-up">
              Discover unique products, connect with trusted sellers, and experience smarter shopping powered by AI. Join 2M+ buyers and sellers worldwide.
            </p>

            <div className="max-w-xl mx-auto mb-8 animate-fade-in-up">
              <SearchBar placeholder="Search for anything..." size="lg" />
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up">
              <Link to="/marketplace" className="btn-primary text-base px-8 py-3.5">
                Start Shopping <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/register?role=seller" className="btn-secondary text-base px-8 py-3.5">
                <Store className="w-4 h-4" /> Become a Seller
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap items-center justify-center gap-6 animate-fade-in">
              <div className="flex -space-x-2">
                {['Alex', 'Sam', 'Jordan', 'Taylor', 'Morgan'].map(name => (
                  <img
                    key={name}
                    src={`https://api.dicebear.com/8.x/avataaars/svg?seed=${name}`}
                    alt={name}
                    className="w-8 h-8 rounded-full border-2 border-white bg-slate-100"
                  />
                ))}
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  <span className="font-bold text-slate-800 ml-1">4.9</span>
                </div>
                <p className="text-sm text-slate-500">Trusted by 2M+ users</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="bg-slate-50 border-y border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />, label: 'Buyer Protection', desc: 'Every order guaranteed', bg: 'bg-emerald-50' },
              { icon: <Zap className="w-6 h-6 text-amber-600" />, label: 'AI Recommendations', desc: 'Personalized for you', bg: 'bg-amber-50' },
              { icon: <Globe className="w-6 h-6 text-brand-600" />, label: 'Worldwide Delivery', desc: '150+ countries', bg: 'bg-brand-50' },
              { icon: <BadgeCheck className="w-6 h-6 text-violet-600" />, label: 'Verified Sellers', desc: 'Background checked', bg: 'bg-violet-50' },
            ].map(({ icon, label, desc, bg }) => (
              <div key={label} className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center shrink-0`}>{icon}</div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{label}</p>
                  <p className="text-xs text-slate-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title">Shop by Category</h2>
              <p className="section-subtitle">Thousands of items across every category</p>
            </div>
            <Link to="/marketplace" className="text-brand-600 text-sm font-semibold hover:underline hidden sm:block">
              All Categories →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {mockCategories.map(cat => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-16 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="badge badge-blue mb-2"><Sparkles className="w-3 h-3 mr-1" /> AI Curated</span>
              <h2 className="section-title">Featured Products</h2>
            </div>
            <Link to="/marketplace" className="text-brand-600 text-sm font-semibold hover:underline hidden sm:block">View All →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mockProducts.slice(0, 4).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-brand-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '2M+', label: 'Active Members', icon: '👥' },
              { value: '500K+', label: 'Products Listed', icon: '📦' },
              { value: '$85M+', label: 'Total GMV', icon: '💰' },
              { value: '4.9★', label: 'Avg. Rating', icon: '⭐' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="font-display font-bold text-white text-3xl">{s.value}</div>
                <div className="text-blue-200 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="badge badge-orange mb-2"><TrendingUp className="w-3 h-3 mr-1" /> Hot Right Now</span>
              <h2 className="section-title">Trending Products</h2>
            </div>
            <Link to="/marketplace?sort=trending" className="text-brand-600 text-sm font-semibold hover:underline hidden sm:block">View All →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mockProducts.slice(4, 8).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">Loved by Our Community</h2>
            <p className="section-subtitle">Real reviews from real people</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {mockTestimonials.map(t => (
              <div key={t.id} className="card p-6">
                <div className="flex mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm text-slate-600 italic leading-relaxed mb-4">"{t.body}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-50">
                  <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full bg-slate-100" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-brand-600 to-violet-700">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display font-bold text-4xl text-white mb-4">
            Ready to Join the Future of Commerce?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Create your free account today and start buying or selling in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/register" className="px-8 py-3.5 bg-white text-brand-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
              Create Free Account <ArrowRight className="inline w-4 h-4 ml-1" />
            </Link>
            <Link to="/marketplace" className="px-8 py-3.5 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
