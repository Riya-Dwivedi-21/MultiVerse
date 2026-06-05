import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package, Heart, ShoppingBag, Star, ChevronRight,
  Clock, CheckCircle, Truck, XCircle, BarChart2,
  MapPin, RefreshCcw, MessageCircle, Bell
} from 'lucide-react';
import { DashboardCardGrid } from '@/components/common/DashboardCard';
import ProductCard from '@/components/marketplace/ProductCard';
import { mockProducts } from '@/services/mockData';
import type { DashboardStat } from '@/types';

const stats: DashboardStat[] = [
  { label: 'Total Orders', value: 14, change: 3, changeType: 'increase', icon: '📦', color: 'blue' },
  { label: 'Pending Orders', value: 2, change: 0, changeType: 'neutral', icon: '⏳', color: 'amber' },
  { label: 'Wishlist Items', value: 8, change: 2, changeType: 'increase', icon: '❤️', color: 'rose' },
  { label: 'Total Spent', value: '$2,340', change: 12, changeType: 'increase', icon: '💳', color: 'purple' },
];

const recentOrders = [
  {
    id: '#ORD-1241',
    product: { title: 'Auranto Max Wireless Studio Headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80' },
    seller: 'TechStore Pro',
    amount: 349,
    status: 'delivered',
    date: '2024-12-01',
    estimatedDelivery: 'Dec 3',
  },
  {
    id: '#ORD-1238',
    product: { title: 'Nike Air Max 2024 Running Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80' },
    seller: 'SneakerVault',
    amount: 129,
    status: 'shipped',
    date: '2024-11-30',
    estimatedDelivery: 'Dec 5',
  },
  {
    id: '#ORD-1235',
    product: { title: 'MacBook Pro 14" M3', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&q=80' },
    seller: 'AppleReseller',
    amount: 1799,
    status: 'processing',
    date: '2024-11-29',
    estimatedDelivery: 'Dec 7',
  },
  {
    id: '#ORD-1230',
    product: { title: 'Dyson V15 Detect Vacuum', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&q=80' },
    seller: 'HomeElite',
    amount: 549,
    status: 'pending',
    date: '2024-11-28',
    estimatedDelivery: 'Dec 8',
  },
];

const statusConfig = {
  delivered: { label: 'Delivered', icon: <CheckCircle className="w-3.5 h-3.5" />, cls: 'bg-emerald-50 text-emerald-700' },
  shipped:   { label: 'Shipped',   icon: <Truck className="w-3.5 h-3.5" />,        cls: 'bg-brand-50 text-brand-700' },
  processing:{ label: 'Processing',icon: <RefreshCcw className="w-3.5 h-3.5" />,   cls: 'bg-amber-50 text-amber-700' },
  pending:   { label: 'Pending',   icon: <Clock className="w-3.5 h-3.5" />,        cls: 'bg-slate-100 text-slate-600' },
  cancelled: { label: 'Cancelled', icon: <XCircle className="w-3.5 h-3.5" />,      cls: 'bg-rose-50 text-rose-700' },
};

type Tab = 'overview' | 'orders' | 'wishlist' | 'recommendations';

export default function BuyerDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  return (
    <div className="bg-surface-secondary min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-violet-500 flex items-center justify-center text-white font-bold font-display text-lg">
                A
              </div>
              <div>
                <h1 className="font-display font-bold text-2xl text-slate-900">Welcome back, Alex!</h1>
                <p className="text-slate-500 text-sm mt-0.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> San Francisco, CA
                  <span className="text-slate-300">•</span>
                  Member since June 2023
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="btn-ghost relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
              </button>
              <Link to="/marketplace" className="btn-primary">
                <ShoppingBag className="w-4 h-4" /> Shop Now
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-5 overflow-x-auto scrollbar-hide">
            {(['overview', 'orders', 'wishlist', 'recommendations'] as Tab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors shrink-0
                           ${activeTab === tab ? 'bg-brand-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Overview ── */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-8">
            <DashboardCardGrid stats={stats} />

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Orders */}
              <div className="lg:col-span-2 card overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-slate-100">
                  <h3 className="font-display font-semibold text-slate-900">Recent Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-sm text-brand-600 font-semibold hover:underline">
                    View All
                  </button>
                </div>
                <div className="divide-y divide-slate-50">
                  {recentOrders.slice(0, 3).map(order => {
                    const status = statusConfig[order.status as keyof typeof statusConfig];
                    return (
                      <div key={order.id} className="flex items-center gap-4 p-4 hover:bg-slate-50/40 transition-colors">
                        <img
                          src={order.product.image}
                          alt={order.product.title}
                          className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-800 truncate">{order.product.title}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{order.seller} • {order.date}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-bold text-slate-900">${order.amount}</p>
                          <span className={`badge gap-1 mt-1 ${status.cls}`}>
                            {status.icon} {status.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick stats sidebar */}
              <div className="flex flex-col gap-4">
                {/* Active order tracker */}
                <div className="card p-5">
                  <h3 className="font-display font-semibold text-slate-900 text-sm mb-4">Active Delivery</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={recentOrders[1].product.image}
                      alt="product"
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{recentOrders[1].product.title}</p>
                      <p className="text-xs text-slate-400">Est. {recentOrders[1].estimatedDelivery}</p>
                    </div>
                  </div>
                  {/* Progress steps */}
                  <div className="flex items-center gap-1">
                    {['Ordered', 'Packed', 'Shipped', 'Delivered'].map((step, i) => (
                      <div key={step} className="flex items-center flex-1 last:flex-none">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0
                                        ${i <= 2 ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                          {i <= 2 ? '✓' : i + 1}
                        </div>
                        {i < 3 && (
                          <div className={`flex-1 h-0.5 mx-0.5 ${i < 2 ? 'bg-brand-600' : 'bg-slate-100'}`} />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1.5">
                    {['Ordered', 'Packed', 'Shipped', 'Delivery'].map(step => (
                      <span key={step} className="text-[9px] text-slate-400 text-center" style={{ width: '25%' }}>{step}</span>
                    ))}
                  </div>
                </div>

                {/* Quick links */}
                <div className="card p-5">
                  <h3 className="font-display font-semibold text-slate-900 text-sm mb-3">Quick Actions</h3>
                  <div className="flex flex-col gap-1">
                    {[
                      { icon: <Package className="w-4 h-4 text-brand-500" />, label: 'Track Orders', href: '#' },
                      { icon: <Heart className="w-4 h-4 text-rose-500" />, label: 'My Wishlist', href: '#' },
                      { icon: <MessageCircle className="w-4 h-4 text-violet-500" />, label: 'Messages', href: '#' },
                      { icon: <Star className="w-4 h-4 text-amber-500" />, label: 'Write a Review', href: '#' },
                      { icon: <RefreshCcw className="w-4 h-4 text-slate-500" />, label: 'Returns & Refunds', href: '#' },
                    ].map(({ icon, label, href }) => (
                      <Link
                        key={label}
                        to={href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                      >
                        {icon}
                        <span className="text-sm text-slate-700 group-hover:text-slate-900 font-medium">{label}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-300 ml-auto group-hover:text-slate-500 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <div className="flex items-end justify-between mb-5">
                <div>
                  <h2 className="font-display font-bold text-xl text-slate-900">Recommended for You</h2>
                  <p className="text-slate-500 text-sm mt-0.5">Based on your browsing & purchase history</p>
                </div>
                <button onClick={() => setActiveTab('recommendations')} className="text-sm text-brand-600 font-semibold hover:underline">
                  See More
                </button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {mockProducts.slice(0, 4).map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Orders ── */}
        {activeTab === 'orders' && (
          <div className="flex flex-col gap-4">
            {/* Filter bar */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {['All Orders', 'Pending', 'Shipped', 'Delivered', 'Cancelled'].map(f => (
                <button
                  key={f}
                  className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-colors
                             ${f === 'All Orders'
                               ? 'bg-brand-600 border-brand-600 text-white'
                               : 'bg-white border-slate-200 text-slate-600 hover:border-brand-300'}`}
                >
                  {f}
                </button>
              ))}
            </div>

            {recentOrders.map(order => {
              const status = statusConfig[order.status as keyof typeof statusConfig];
              return (
                <div key={order.id} className="card p-5">
                  <div className="flex items-start gap-4 flex-wrap">
                    <img
                      src={order.product.image}
                      alt={order.product.title}
                      className="w-20 h-20 rounded-2xl object-cover bg-slate-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <p className="font-semibold text-slate-800">{order.product.title}</p>
                          <p className="text-sm text-slate-500 mt-0.5">Sold by {order.seller}</p>
                          <p className="text-xs text-slate-400 mt-0.5">Order {order.id} • {order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-display font-bold text-xl text-slate-900">${order.amount}</p>
                          <span className={`badge gap-1 mt-1 ${status.cls}`}>
                            {status.icon} {status.label}
                          </span>
                        </div>
                      </div>
                      {order.status === 'shipped' && (
                        <p className="text-sm text-brand-600 font-medium mt-2 flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5" />
                          Estimated delivery: {order.estimatedDelivery}
                        </p>
                      )}
                      <div className="flex gap-2 mt-4 flex-wrap">
                        {order.status === 'delivered' && (
                          <button className="btn-secondary text-xs py-1.5 px-3 gap-1.5">
                            <Star className="w-3 h-3" /> Write Review
                          </button>
                        )}
                        <button className="btn-ghost text-xs py-1.5 px-3 gap-1.5">
                          <RefreshCcw className="w-3 h-3" /> Return
                        </button>
                        <button className="btn-ghost text-xs py-1.5 px-3 gap-1.5">
                          <MessageCircle className="w-3 h-3" /> Contact Seller
                        </button>
                        <button className="btn-ghost text-xs py-1.5 px-3 gap-1.5 text-brand-600">
                          <Package className="w-3 h-3" /> Track Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Wishlist ── */}
        {activeTab === 'wishlist' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-xl text-slate-900">
                My Wishlist <span className="text-slate-400 font-normal text-lg ml-1">(8)</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {mockProducts.map(p => (
                <ProductCard key={p.id} product={{ ...p, isLiked: true }} />
              ))}
            </div>
          </div>
        )}

        {/* ── Recommendations ── */}
        {activeTab === 'recommendations' && (
          <div>
            <div className="mb-6">
              <h2 className="font-display font-bold text-xl text-slate-900">Recommended for You</h2>
              <p className="text-slate-500 text-sm mt-1">Personalized picks based on your activity</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {mockProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
