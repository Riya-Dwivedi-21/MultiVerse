import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Shield, Tag, ChevronRight } from 'lucide-react';
import { mockProducts } from '@/services/mockData';
import type { CartItem } from '@/types';

const initialCart: CartItem[] = [
  { id: 'ci1', product: mockProducts[0], quantity: 1, addedAt: new Date().toISOString() },
  { id: 'ci2', product: mockProducts[1], quantity: 2, addedAt: new Date().toISOString() },
];

export default function CartPage() {
  const [items, setItems] = useState(initialCart);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const updateQty = (id: string, delta: number) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal - discount + shipping;

  return (
    <div className="bg-surface-secondary min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <h1 className="font-display font-bold text-3xl text-slate-900">Shopping Cart</h1>
          <span className="badge badge-blue ml-2">{items.length} items</span>
        </div>

        {items.length === 0 ? (
          <div className="card p-16 text-center">
            <ShoppingBag className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <h2 className="font-display font-bold text-2xl text-slate-800 mb-2">Your cart is empty</h2>
            <p className="text-slate-500 mb-6">Looks like you haven't added anything yet.</p>
            <Link to="/marketplace" className="btn-primary inline-flex">
              Start Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items list */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {items.map(item => (
                <div key={item.id} className="card p-5 flex gap-4">
                  <Link to={`/product/${item.product.id}`} className="shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-24 h-24 rounded-xl object-cover bg-slate-100"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="font-semibold text-slate-800 text-sm leading-snug hover:text-brand-600 transition-colors line-clamp-2">
                          {item.product.title}
                        </h3>
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="shrink-0 p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 mb-3">{item.product.seller.name}</p>
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                        <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center text-sm font-semibold text-slate-800">{item.quantity}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-display font-bold text-lg text-slate-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-xs text-slate-400">${item.product.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Coupon */}
              <div className="card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-brand-600" />
                  <span className="font-semibold text-slate-800 text-sm">Promo Code</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={e => setCoupon(e.target.value.toUpperCase())}
                    placeholder="Enter coupon code"
                    className="input-base flex-1"
                  />
                  <button
                    onClick={() => { if (coupon === 'SAVE10') setCouponApplied(true); }}
                    className="btn-primary shrink-0"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-xs text-emerald-600 font-semibold mt-2">✓ Coupon applied — 10% off!</p>
                )}
                <p className="text-xs text-slate-400 mt-1">Try "SAVE10" for 10% off</p>
              </div>
            </div>

            {/* Order summary */}
            <div className="flex flex-col gap-4">
              <div className="card p-6 sticky top-24">
                <h2 className="font-display font-bold text-lg text-slate-900 mb-5">Order Summary</h2>
                <div className="flex flex-col gap-3 text-sm mb-5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                    <span className="font-semibold text-slate-800">${subtotal.toFixed(2)}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount (SAVE10)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-500">Shipping</span>
                    <span className={shipping === 0 ? 'text-emerald-600 font-semibold' : 'font-semibold text-slate-800'}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="border-t border-slate-100 pt-3 flex justify-between">
                    <span className="font-bold text-slate-900">Total</span>
                    <span className="font-display font-bold text-xl text-slate-900">${total.toFixed(2)}</span>
                  </div>
                </div>

                {shipping > 0 && (
                  <p className="text-xs text-slate-500 bg-slate-50 rounded-xl p-3 mb-4">
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}

                <Link to="/checkout" className="btn-primary w-full justify-center py-3.5 text-base mb-3">
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/marketplace" className="btn-ghost w-full justify-center text-slate-600">
                  Continue Shopping
                </Link>

                {/* Trust */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Shield className="w-3.5 h-3.5 text-emerald-500" />
                    Buyer Protection on every order
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <ChevronRight className="w-3.5 h-3.5 text-brand-500" />
                    Secure checkout with SSL encryption
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
