import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, User, Mail, Lock, Store, ShoppingBag, Check } from 'lucide-react';

type Role = 'buyer' | 'seller';

export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState<Role>((searchParams.get('role') as Role) || 'buyer');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setIsLoading(false);
    navigate(role === 'seller' ? '/seller-dashboard' : '/marketplace');
  };

  const passwordStrength = (pw: string) => {
    if (pw.length === 0) return 0;
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };

  const strength = passwordStrength(form.password);
  const strengthColors = ['bg-slate-200', 'bg-rose-400', 'bg-amber-400', 'bg-emerald-400', 'bg-emerald-500'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

  return (
    <div className="min-h-screen bg-surface-secondary flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-700 via-brand-600 to-brand-700 relative overflow-hidden flex-col items-center justify-center p-16">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
            <span className="font-display font-bold text-3xl text-white">M</span>
          </div>
          <h2 className="font-display font-bold text-4xl text-white mb-4">Join MarketVerse</h2>
          <p className="text-blue-100 text-lg leading-relaxed mb-10">
            {role === 'seller'
              ? 'Start selling to millions of buyers worldwide with AI-powered tools.'
              : 'Discover amazing products and connect with trusted sellers globally.'}
          </p>
          <div className="flex flex-col gap-3">
            {(role === 'seller'
              ? ['AI-assisted listing & pricing', 'Real-time sales analytics', 'Global reach — 150+ countries', 'Secure instant payouts']
              : ['AI-powered recommendations', 'Buyer protection guarantee', 'Easy returns & refunds', 'Exclusive member deals']
            ).map(item => (
              <div key={item} className="flex items-center gap-3 text-left">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-blue-100 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-violet-600 flex items-center justify-center">
              <span className="text-white font-bold font-display">M</span>
            </div>
            <span className="font-display font-bold text-xl text-slate-900">Market<span className="text-brand-600">Verse</span></span>
          </div>

          <div className="card p-8">
            <div className="mb-6">
              <h1 className="font-display font-bold text-2xl text-slate-900 mb-1">Create Account</h1>
              <p className="text-slate-500 text-sm">Join 2M+ members on MarketVerse — it's free.</p>
            </div>

            {/* Role selector */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {(['buyer', 'seller'] as Role[]).map(r => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all
                             ${role === r ? 'border-brand-500 bg-brand-50' : 'border-slate-200 bg-white hover:border-brand-200'}`}
                >
                  {r === 'buyer'
                    ? <ShoppingBag className={`w-6 h-6 ${role === r ? 'text-brand-600' : 'text-slate-400'}`} />
                    : <Store className={`w-6 h-6 ${role === r ? 'text-brand-600' : 'text-slate-400'}`} />
                  }
                  <div>
                    <p className={`text-sm font-semibold ${role === r ? 'text-brand-700' : 'text-slate-700'}`}>
                      {r === 'buyer' ? 'I\'m a Buyer' : 'I\'m a Seller'}
                    </p>
                    <p className={`text-[10px] ${role === r ? 'text-brand-500' : 'text-slate-400'}`}>
                      {r === 'buyer' ? 'Shop & discover' : 'List & sell'}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your full name" required className="input-base pl-10" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required className="input-base pl-10" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Min. 8 characters"
                    required
                    minLength={8}
                    className="input-base pl-10 pr-10"
                  />
                  <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className={`flex-1 h-1 rounded-full transition-colors ${i <= strength ? strengthColors[strength] : 'bg-slate-100'}`} />
                      ))}
                    </div>
                    <p className={`text-xs font-medium ${['', 'text-rose-500', 'text-amber-500', 'text-emerald-500', 'text-emerald-600'][strength]}`}>
                      {strengthLabels[strength]}
                    </p>
                  </div>
                )}
              </div>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 shrink-0"
                />
                <span className="text-sm text-slate-600 leading-snug">
                  I agree to the{' '}
                  <Link to="/terms" className="text-brand-600 hover:underline font-medium">Terms of Service</Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-brand-600 hover:underline font-medium">Privacy Policy</Link>
                </span>
              </label>

              <button
                type="submit"
                disabled={isLoading || !agreed}
                className="btn-primary w-full justify-center py-3 text-base mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Create Account <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-brand-600 font-semibold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
