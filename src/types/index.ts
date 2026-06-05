// ─── User & Auth ────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'buyer' | 'seller' | 'admin';
  joinedAt: string;
  rating?: number;
  totalSales?: number;
  totalPurchases?: number;
  bio?: string;
  location?: string;
  isVerified: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ─── Product ─────────────────────────────────────────────────────────────────

export type ProductCondition = 'new' | 'like-new' | 'good' | 'fair' | 'poor';
export type ProductStatus = 'active' | 'sold' | 'draft' | 'pending';

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  images: ProductImage[];
  category: Category;
  subcategory?: string;
  seller: Pick<User, 'id' | 'name' | 'avatar' | 'rating' | 'isVerified'>;
  condition: ProductCondition;
  status: ProductStatus;
  tags: string[];
  rating: number;
  reviewCount: number;
  viewCount: number;
  likeCount: number;
  isLiked?: boolean;
  inCart?: boolean;
  location?: string;
  shippingOptions: ShippingOption[];
  aiScore?: number;
  isFeatured?: boolean;
  isNew?: boolean;
  isTrending?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCardData {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  category: string;
  seller: {
    name: string;
    avatar?: string;
    rating: number;
    isVerified: boolean;
  };
  rating: number;
  reviewCount: number;
  isLiked: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  isTrending?: boolean;
  condition: ProductCondition;
  location?: string;
}

// ─── Category ────────────────────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  productCount: number;
  subcategories?: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

// ─── Cart & Orders ───────────────────────────────────────────────────────────

export interface CartItem {
  id: string;
  product: ProductCardData;
  quantity: number;
  addedAt: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface Order {
  id: string;
  buyer: Pick<User, 'id' | 'name' | 'avatar'>;
  seller: Pick<User, 'id' | 'name' | 'avatar'>;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

// ─── Reviews ─────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  reviewer: Pick<User, 'id' | 'name' | 'avatar' | 'isVerified'>;
  product: Pick<Product, 'id' | 'title'>;
  rating: number;
  title?: string;
  body: string;
  images?: string[];
  helpful: number;
  verified: boolean;
  createdAt: string;
}

// ─── Shipping ─────────────────────────────────────────────────────────────────

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estimatedDays: number;
  carrier?: string;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export interface DashboardStat {
  label: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: string;
  color: string;
}

export interface SellerDashboard {
  totalRevenue: number;
  totalOrders: number;
  activeListings: number;
  avgRating: number;
  recentOrders: Order[];
  topProducts: ProductCardData[];
  stats: DashboardStat[];
  salesData: SalesDataPoint[];
}

export interface BuyerDashboard {
  totalOrders: number;
  pendingOrders: number;
  wishlistCount: number;
  totalSpent: number;
  recentOrders: Order[];
  recommendations: ProductCardData[];
  stats: DashboardStat[];
}

export interface SalesDataPoint {
  date: string;
  revenue: number;
  orders: number;
}

// ─── Navigation & UI ─────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: number;
  children?: NavItem[];
}

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface FilterOption {
  id: string;
  label: string;
  value: string;
  count?: number;
}

export interface SortOption {
  label: string;
  value: string;
}

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

// ─── Search ───────────────────────────────────────────────────────────────────

export interface SearchFilters {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: ProductCondition[];
  rating?: number;
  location?: string;
  sortBy?: string;
  page?: number;
}

export interface SearchResult {
  products: ProductCardData[];
  total: number;
  filters: {
    categories: FilterOption[];
    conditions: FilterOption[];
    priceRanges: FilterOption[];
  };
  pagination: PaginationMeta;
}

// ─── Notifications ───────────────────────────────────────────────────────────

export interface Notification {
  id: string;
  type: 'order' | 'message' | 'review' | 'offer' | 'system';
  title: string;
  body: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

// ─── API Response ─────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}
