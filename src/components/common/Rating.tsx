import { useState } from 'react';
import { Star } from 'lucide-react';

interface RatingDisplayProps {
  value: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
}

interface RatingInputProps {
  value: number;
  onChange: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-6 h-6',
};

const textSizeMap = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export function RatingDisplay({ value, count, size = 'md', showCount = true, className = '' }: RatingDisplayProps) {
  const starSize = sizeMap[size];
  const textSize = textSizeMap[size];

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map(i => {
          const filled = i <= Math.floor(value);
          const partial = !filled && i === Math.ceil(value) && value % 1 !== 0;
          return (
            <span key={i} className="relative">
              <Star className={`${starSize} text-slate-200`} />
              {(filled || partial) && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: partial ? `${(value % 1) * 100}%` : '100%' }}
                >
                  <Star className={`${starSize} fill-amber-400 text-amber-400`} />
                </span>
              )}
            </span>
          );
        })}
      </div>
      <span className={`font-semibold text-slate-700 ${textSize}`}>{value.toFixed(1)}</span>
      {showCount && count !== undefined && (
        <span className={`text-slate-400 ${textSize}`}>({count.toLocaleString()})</span>
      )}
    </div>
  );
}

export function RatingInput({ value, onChange, size = 'md' }: RatingInputProps) {
  const [hovered, setHovered] = useState(0);
  const starSize = sizeMap[size];
  const display = hovered || value;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <button
          key={i}
          type="button"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(i)}
          className="transition-transform hover:scale-110 active:scale-95"
        >
          <Star
            className={`${starSize} transition-colors ${
              i <= display
                ? 'fill-amber-400 text-amber-400'
                : 'text-slate-300 hover:text-amber-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

interface RatingBreakdownProps {
  distribution: Record<number, number>;
  total: number;
  average: number;
}

export function RatingBreakdown({ distribution, total, average }: RatingBreakdownProps) {
  return (
    <div className="flex gap-6 items-center">
      {/* Big number */}
      <div className="text-center shrink-0">
        <div className="font-display font-bold text-5xl text-slate-900 leading-none">{average.toFixed(1)}</div>
        <div className="flex justify-center mt-2 mb-1">
          {[1, 2, 3, 4, 5].map(i => (
            <Star key={i} className={`w-4 h-4 ${i <= Math.round(average) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
          ))}
        </div>
        <div className="text-xs text-slate-500">{total.toLocaleString()} reviews</div>
      </div>

      {/* Bars */}
      <div className="flex-1 flex flex-col gap-1.5">
        {[5, 4, 3, 2, 1].map(star => {
          const count = distribution[star] ?? 0;
          const pct = total > 0 ? (count / total) * 100 : 0;
          return (
            <div key={star} className="flex items-center gap-2">
              <span className="text-xs text-slate-500 w-4 shrink-0">{star}</span>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-xs text-slate-400 w-8 text-right shrink-0">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RatingDisplay;
