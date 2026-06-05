import type { ProductCardData, Category, Review, User } from '@/types';

// ─── Mock Users ───────────────────────────────────────────────────────────────

export const mockCurrentUser: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Alex',
  role: 'buyer',
  joinedAt: '2023-06-15',
  isVerified: true,
  totalPurchases: 14,
  location: 'San Francisco, CA',
};

// ─── Mock Categories ──────────────────────────────────────────────────────────

export const mockCategories: Category[] = [
  { id: 'c1', name: 'Electronics', slug: 'electronics', icon: '💻', color: 'bg-blue-50 text-blue-600', productCount: 2840 },
  { id: 'c2', name: 'Fashion', slug: 'fashion', icon: '👗', color: 'bg-pink-50 text-pink-600', productCount: 5120 },
  { id: 'c3', name: 'Home & Garden', slug: 'home-garden', icon: '🏡', color: 'bg-emerald-50 text-emerald-600', productCount: 3210 },
  { id: 'c4', name: 'Sports', slug: 'sports', icon: '⚽', color: 'bg-orange-50 text-orange-600', productCount: 1890 },
  { id: 'c5', name: 'Books & Media', slug: 'books-media', icon: '📚', color: 'bg-violet-50 text-violet-600', productCount: 4500 },
  { id: 'c6', name: 'Collectibles', slug: 'collectibles', icon: '🎮', color: 'bg-amber-50 text-amber-600', productCount: 980 },
  { id: 'c7', name: 'Health & Beauty', slug: 'health-beauty', icon: '✨', color: 'bg-rose-50 text-rose-600', productCount: 2100 },
  { id: 'c8', name: 'Vehicles', slug: 'vehicles', icon: '🚗', color: 'bg-slate-50 text-slate-600', productCount: 430 },
];

// ─── Mock Products ────────────────────────────────────────────────────────────

export const mockProducts: ProductCardData[] = [
  {
    id: 'p1',
    title: 'Auranto Max Wireless Studio Headphones',
    price: 349.00,
    originalPrice: 499.00,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    category: 'Electronics',
    seller: { name: 'TechStore Pro', avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=TechPro', rating: 4.9, isVerified: true },
    rating: 4.8,
    reviewCount: 234,
    isLiked: false,
    isFeatured: true,
    condition: 'new',
    location: 'New York, NY',
  },
  {
    id: 'p2',
    title: 'Nike Air Max 2024 Running Shoes',
    price: 129.99,
    originalPrice: 179.99,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    category: 'Sports',
    seller: { name: 'SneakerVault', avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Sneaker', rating: 4.7, isVerified: true },
    rating: 4.6,
    reviewCount: 89,
    isLiked: true,
    isTrending: true,
    condition: 'new',
    location: 'Los Angeles, CA',
  },
  {
    id: 'p3',
    title: 'Sony Alpha A7 IV Mirrorless Camera',
    price: 1899.00,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80',
    category: 'Electronics',
    seller: { name: 'CameraWorld', avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Camera', rating: 4.8, isVerified: true },
    rating: 4.9,
    reviewCount: 156,
    isLiked: false,
    condition: 'like-new',
    location: 'Chicago, IL',
  },
  {
    id: 'p4',
    title: 'Handcrafted Leather Messenger Bag',
    price: 89.00,
    originalPrice: 120.00,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&q=80',
    category: 'Fashion',
    seller: { name: 'ArtisanCraft', avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Artisan', rating: 4.6, isVerified: false },
    rating: 4.5,
    reviewCount: 42,
    isLiked: false,
    isNew: true,
    condition: 'new',
    location: 'Austin, TX',
  },
  {
    id: 'p5',
    title: 'MacBook Pro 14" M3 Pro Chip',
    price: 1799.00,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80',
    category: 'Electronics',
    seller: { name: 'AppleReseller', avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Apple', rating: 4.9, isVerified: true },
    rating: 4.9,
    reviewCount: 312,
    isLiked: true,
    isFeatured: true,
    condition: 'like-new',
    location: 'Seattle, WA',
  },
  {
    id: 'p6',
    title: 'Vintage Mechanical Keyboard — Cherry MX Blue',
    price: 165.00,
    originalPrice: 220.00,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&q=80',
    category: 'Electronics',
    seller: { name: 'KeyboardNerd', avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Keys', rating: 4.7, isVerified: true },
    rating: 4.7,
    reviewCount: 78,
    isLiked: false,
    isTrending: true,
    condition: 'good',
    location: 'Portland, OR',
  },
  {
    id: 'p7',
    title: 'Boho Style Rattan Floor Lamp',
    price: 75.00,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    category: 'Home & Garden',
    seller: { name: 'BohoHome', avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Boho', rating: 4.4, isVerified: false },
    rating: 4.3,
    reviewCount: 29,
    isLiked: false,
    isNew: true,
    condition: 'new',
    location: 'Denver, CO',
  },
  {
    id: 'p8',
    title: 'Dyson V15 Detect Cordless Vacuum',
    price: 549.00,
    originalPrice: 649.00,
    currency: 'USD',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    category: 'Home & Garden',
    seller: { name: 'HomeElite', avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Home', rating: 4.8, isVerified: true },
    rating: 4.8,
    reviewCount: 198,
    isLiked: false,
    condition: 'new',
    location: 'Boston, MA',
  },
];

export const mockFeaturedProducts = mockProducts.filter(p => p.isFeatured);
export const mockTrendingProducts = mockProducts.filter(p => p.isTrending);
export const mockNewArrivals = mockProducts.filter(p => p.isNew);

// ─── Mock Reviews ──────────────────────────────────────────────────────────────

export const mockReviews: Review[] = [
  {
    id: 'r1',
    reviewer: { id: 'u2', name: 'Sarah M.', isVerified: true },
    product: { id: 'p1', title: 'Auranto Max Wireless Studio Headphones' },
    rating: 5,
    title: 'Absolutely incredible sound quality',
    body: 'These headphones completely blew me away. The noise cancellation is second to none and the battery life easily lasts my entire work day. Highly recommend.',
    helpful: 34,
    verified: true,
    createdAt: '2024-11-20',
  },
  {
    id: 'r2',
    reviewer: { id: 'u3', name: 'Marcus T.', isVerified: true },
    product: { id: 'p1', title: 'Auranto Max Wireless Studio Headphones' },
    rating: 4,
    title: 'Great value for the price',
    body: 'Solid build quality and excellent sound. Only minor complaint is the ear cups get a little warm after extended use but overall very satisfied.',
    helpful: 19,
    verified: true,
    createdAt: '2024-11-15',
  },
];

// ─── Hero Banners ─────────────────────────────────────────────────────────────

export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  ctaHref: string;
  image: string;
  badge?: string;
  accentColor: string;
}

export const mockHeroBanners: HeroBanner[] = [
  {
    id: 'h1',
    title: 'The AI-Powered Marketplace for the Next Generation',
    subtitle: 'Discover unique products, connect with trusted sellers, and experience smarter shopping powered by AI.',
    cta: 'Shop Now',
    ctaHref: '/marketplace',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    badge: 'New Feature: AI Price Match',
    accentColor: 'brand',
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  body: string;
  rating: number;
}

export const mockTestimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Emily Chen',
    role: 'Verified Buyer',
    avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Emily',
    body: 'MarketVerse has completely changed how I shop online. The AI recommendations are eerily accurate and I always find exactly what I need at the best price.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'James Okafor',
    role: 'Power Seller',
    avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=James',
    body: 'Since switching to MarketVerse I\'ve tripled my monthly sales. The seller analytics tools and AI-assisted pricing have been game-changers for my business.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Sofia Reyes',
    role: 'Verified Buyer',
    avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Sofia',
    body: 'Love the community vibe here. Every seller I\'ve dealt with has been super responsive and the buyer protection makes me feel completely safe.',
    rating: 5,
  },
];
