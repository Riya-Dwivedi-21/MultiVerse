import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone, Sparkles } from 'lucide-react';

const footerLinks = {
  Marketplace: [
    { label: 'Browse All', href: '/marketplace' },
    { label: 'Electronics', href: '/marketplace?category=Electronics' },
    { label: 'Fashion', href: '/marketplace?category=Fashion' },
    { label: 'Home & Garden', href: '/marketplace?category=Home+%26+Garden' },
    { label: 'Trending Now', href: '/marketplace?sort=trending' },
  ],
  Sellers: [
    { label: 'Start Selling', href: '/register?role=seller' },
    { label: 'Seller Dashboard', href: '/seller-dashboard' },
    { label: 'Upload Product', href: '/upload-product' },
    { label: 'Pricing Plans', href: '/pricing' },
    { label: 'Seller Academy', href: '/learn' },
  ],
  Support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Buyer Protection', href: '/buyer-protection' },
    { label: 'Returns & Refunds', href: '/returns' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Community Forum', href: '/forum' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Blog', href: '/blog' },
    { label: 'Partnerships', href: '/partners' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      {/* CTA band */}
      <div className="bg-gradient-to-r from-brand-700 to-violet-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-2xl text-white mb-1">
              Ready to Join the Future of Commerce?
            </h3>
            <p className="text-blue-200 text-sm">
              Join 2M+ buyers and sellers on the world's smartest marketplace.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link to="/register" className="px-6 py-3 bg-white text-brand-700 font-semibold text-sm rounded-xl hover:bg-blue-50 transition-colors">
              Create Free Account
            </Link>
            <Link to="/marketplace" className="px-6 py-3 bg-white/10 text-white font-semibold text-sm rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
              Browse Products
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center">
                <span className="text-white font-bold font-display text-base">M</span>
              </div>
              <span className="font-display font-bold text-xl text-white">
                Market<span className="text-brand-400">Verse</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-5 max-w-xs">
              The AI-powered community marketplace connecting buyers and sellers worldwide. Shop smarter, sell faster.
            </p>
            <div className="flex items-center gap-2 mb-3 text-sm">
              <Mail className="w-4 h-4 text-brand-400" />
              <span>hello@marketverse.com</span>
            </div>
            <div className="flex items-center gap-2 mb-3 text-sm">
              <Phone className="w-4 h-4 text-brand-400" />
              <span>+1 (888) 123-4567</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-brand-400" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center gap-3 mt-6">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-600 hover:text-white transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-white text-sm mb-4">{title}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-slate-400 hover:text-brand-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} MarketVerse Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Sparkles className="w-3 h-3 text-brand-500" />
            Powered by AI • Trusted by millions
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-slate-300 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
