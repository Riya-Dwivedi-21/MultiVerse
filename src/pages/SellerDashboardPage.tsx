import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp, Package, Star, DollarSign, Plus,
  BarChart2, Eye, Edit, Trash2, MoreVertical,
  CheckCircle, Clock, XCircle, Truck
} from 'lucide-react';
import { DashboardCardGrid } from '@/components/common/DashboardCard';
import { mockProducts } from '@/services/mockData';
import type { DashboardStat } from '@/types';

const stats: DashboardStat[] = [
  { label: 'Total Revenue', value: '$12,450', change: 34, changeType: 'increase', icon: '💰', color: 'green' },
  { label: 'Total Orders', value: 248, change: 18, changeType: 'increase', icon: '📦', color: 'blue' },
  { label: 'Active Listings', value: 64, change: 5, changeType: 'increase', icon: '🏷️', color: 'purple' },
  { label: 'Avg. Rating', value: '4.9', change: 0, changeType: 'neutral', icon: '⭐', color: 'amber' },
];

const recentOrders = [
  { id: '#ORD-1241', product: 'Sony A7 IV Camera', buyer: 'Emma Wilson', amount: 1899, status: 'delivered', date: '2024-12-01' },
  { id: '#ORD-1240', product: 'Auranto Max Headphones', buyer: 'Liam Torres', amount: 349, status: 'shipped', date: '2024-11-30' },
  { id: '#ORD-1239', product: 'MacBook Pro 14"', buyer: 'Olivia Chen', amount: 1799, status: 'processing', date: '2024-11-29' },
  { id: '#ORD-1238', product: 'Nike Air Max', buyer: 'Noah Kim', amount: 129, status: 'pending', date: '2024-11-28' },
  { id: '#ORD-1237', product: 'Leather Bag', buyer: 'Sophia Patel', amount: 89, status: 'cancelled', date: '2024-11-27' },
];

const statusConfig = {
  delivered: { label: 'Delivered', icon: <CheckCircle className="w-3.5 h-3.5" />, cls: 'bg-emerald-50 text-emerald-700' },
  shipped: { label: 'Shipped', icon: <Truck className="w-3.5 h-3.5" />, cls: 'bg-brand-50 text-brand-700' },
  processing: { label: 'Processing', icon: <BarChart2 className="w-3.5 h-3.5" />, cls: 'bg-amber-50 text-amber-700' },
  pending: { label: 'Pending', icon: <Clock className="w-3.5 h-3.5" />, cls: 'bg-slate-100 text-slate-600' },
  cancelled: { label: 'Cancelled', icon: <XCircle className="w-3.5 h-3.5" />, cls: 'bg-rose-50 text-rose-700' },
};

type Tab = 'overview' | 'orders' | 'listings' | 'analytics';

export default function SellerDashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  return (
    <div className="bg-surface-secondary min-h-screen">
      {/* Dashboard header */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="font-display font-bold text-2xl text-slate-900">Seller Dashboard</h1>
              <p className="text-slate-500 text-sm mt-0.5">Performance Summary • Last 30 days</p>
            </div>
            <div className="flex gap-3">
              <Link to="/upload-product" className="btn-primary">
                <Plus className="w-4 h-4" /> Add Product
              </Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-5 overflow-x-auto scrollbar-hide">
            {(['overview', 'orders', 'listings', 'analytics'] as Tab[]).map(tab => (
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
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-8">
            {/* Stats */}
            <DashboardCardGrid stats={stats} />

            {/* Revenue + Top Products */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Revenue chart placeholder */}
              <div className="lg:col-span-2 card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-semibold text-slate-900">Revenue Overview</h3>
                  <select className="input-base w-auto py-1.5 text-xs">
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>This year</option>
                  </select>
                </div>
                {/* Simple bar chart */}
                <div className="flex items-end justify-between gap-2 h-48">
                  {[65, 45, 80, 55, 90, 70, 85, 40, 75, 60, 95, 88].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full bg-brand-100 rounded-t-lg hover:bg-brand-500 transition-colors cursor-pointer group relative"
                        style={{ height: `${h}%` }}
                      >
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          ${(h * 150).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                    <span key={m} className="text-[10px] text-slate-400 flex-1 text-center">{m}</span>
                  ))}
                </div>
              </div>

              {/* Top products */}
              <div className="card p-6">
                <h3 className="font-display font-semibold text-slate-900 mb-4">Top Products</h3>
                <div className="flex flex-col gap-3">
                  {mockProducts.slice(0, 4).map((p, i) => (
                    <div key={p.id} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-400 w-4 shrink-0">#{i + 1}</span>
                      <img src={p.image} alt={p.title} className="w-10 h-10 rounded-xl object-cover bg-slate-100 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800 truncate">{p.title}</p>
                        <p className="text-xs text-slate-400">${p.price}</p>
                      </div>
                      <span className="text-xs font-semibold text-emerald-600 shrink-0">
                        {[32, 28, 19, 14][i]} sold
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent orders */}
            <div className="card overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h3 className="font-display font-semibold text-slate-900">Recent Orders</h3>
                <button onClick={() => setActiveTab('orders')} className="text-sm text-brand-600 font-semibold hover:underline">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      {['Order ID', 'Product', 'Buyer', 'Amount', 'Status', 'Date', ''].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {recentOrders.map(order => {
                      const status = statusConfig[order.status as keyof typeof statusConfig];
                      return (
                        <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-4 py-3.5 text-sm font-semibold text-brand-600">{order.id}</td>
                          <td className="px-4 py-3.5 text-sm text-slate-700 max-w-[160px] truncate">{order.product}</td>
                          <td className="px-4 py-3.5 text-sm text-slate-600">{order.buyer}</td>
                          <td className="px-4 py-3.5 text-sm font-bold text-slate-900">${order.amount.toLocaleString()}</td>
                          <td className="px-4 py-3.5">
                            <span className={`badge gap-1 ${status.cls}`}>
                              {status.icon} {status.label}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-sm text-slate-400">{order.date}</td>
                          <td className="px-4 py-3.5">
                            <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'listings' && (
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="font-display font-semibold text-slate-900">Your Listings ({mockProducts.length})</h3>
              <Link to="/upload-product" className="btn-primary text-sm">
                <Plus className="w-4 h-4" /> Add New
              </Link>
            </div>
            <div className="divide-y divide-slate-50">
              {mockProducts.map(p => (
                <div key={p.id} className="flex items-center gap-4 p-4 hover:bg-slate-50/50 transition-colors">
                  <img src={p.image} alt={p.title} className="w-14 h-14 rounded-xl object-cover bg-slate-100 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-sm truncate">{p.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{p.category}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-slate-900">${p.price}</p>
                    <p className="text-xs text-slate-400">{p.reviewCount} reviews</p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className={`w-2.5 h-2.5 rounded-sm ${i <= Math.round(p.rating) ? 'bg-amber-400' : 'bg-slate-100'}`} />
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="card overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-display font-semibold text-slate-900">All Orders</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {['Order ID', 'Product', 'Buyer', 'Amount', 'Status', 'Date'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentOrders.map(order => {
                    const status = statusConfig[order.status as keyof typeof statusConfig];
                    return (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 py-3.5 text-sm font-semibold text-brand-600">{order.id}</td>
                        <td className="px-4 py-3.5 text-sm text-slate-700">{order.product}</td>
                        <td className="px-4 py-3.5 text-sm text-slate-600">{order.buyer}</td>
                        <td className="px-4 py-3.5 text-sm font-bold text-slate-900">${order.amount.toLocaleString()}</td>
                        <td className="px-4 py-3.5">
                          <span className={`badge gap-1 ${status.cls}`}>{status.icon} {status.label}</span>
                        </td>
                        <td className="px-4 py-3.5 text-sm text-slate-400">{order.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="card p-10 text-center">
            <BarChart2 className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <h3 className="font-display font-bold text-xl text-slate-800 mb-2">Advanced Analytics</h3>
            <p className="text-slate-500">Detailed analytics dashboard coming soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
