import { Link } from 'react-router-dom';
import type { Category } from '@/types';

interface CategoryFilterProps {
  categories: Category[];
  activeCategory?: string;
  onSelect?: (slug: string) => void;
  layout?: 'grid' | 'scroll' | 'list';
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onSelect,
  layout = 'scroll',
}: CategoryFilterProps) {
  if (layout === 'grid') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {categories.map(cat => {
          const isActive = activeCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect?.(cat.slug)}
              className={`flex flex-col items-center gap-2 p-3.5 rounded-2xl border transition-all duration-150
                         ${isActive
                           ? 'bg-brand-600 border-brand-600 text-white shadow-md'
                           : 'bg-white border-slate-100 text-slate-700 hover:border-brand-200 hover:bg-brand-50 shadow-card'
                         }`}
            >
              <span className="text-2xl leading-none">{cat.icon}</span>
              <span className={`text-xs font-semibold text-center leading-tight ${isActive ? 'text-white' : 'text-slate-700'}`}>
                {cat.name}
              </span>
              <span className={`text-[10px] ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                {cat.productCount.toLocaleString()}
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  if (layout === 'scroll') {
    return (
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        <button
          onClick={() => onSelect?.('')}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-all
                     ${!activeCategory
                       ? 'bg-brand-600 border-brand-600 text-white'
                       : 'bg-white border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-600'
                     }`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onSelect?.(cat.slug)}
            className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all
                       ${activeCategory === cat.slug
                         ? 'bg-brand-600 border-brand-600 text-white'
                         : 'bg-white border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-600'
                       }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
    );
  }

  // list layout for sidebar
  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={() => onSelect?.('')}
        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                   ${!activeCategory ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'}`}
      >
        <span>All Categories</span>
      </button>
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => onSelect?.(cat.slug)}
          className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                     ${activeCategory === cat.slug ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'}`}
        >
          <span className="flex items-center gap-2.5">
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </span>
          <span className={`text-xs ${activeCategory === cat.slug ? 'text-brand-500' : 'text-slate-400'}`}>
            {cat.productCount.toLocaleString()}
          </span>
        </button>
      ))}
    </div>
  );
}

// Standalone category card for landing-page grid
export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to={`/marketplace?category=${encodeURIComponent(category.name)}`}
      className="group flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-slate-100 
                 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className={`w-14 h-14 rounded-2xl ${category.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-200`}>
        {category.icon}
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-slate-800">{category.name}</p>
        <p className="text-xs text-slate-400 mt-0.5">{category.productCount.toLocaleString()} items</p>
      </div>
    </Link>
  );
}
