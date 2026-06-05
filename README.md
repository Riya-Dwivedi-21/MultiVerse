# MarketVerse — AI-Powered Community Marketplace

A full-stack-ready, production-quality React 19 + TypeScript + Tailwind CSS marketplace frontend built from the Stitch UI prototype.

---

## 🚀 Quick Start

```bash
# 1. Navigate to the project
cd marketverse

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

---

## 📦 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 19 | UI framework |
| TypeScript | 5.3 | Type safety |
| Tailwind CSS | 3.4 | Utility-first styling |
| React Router DOM | 6.22 | Client-side routing |
| Vite | 5.1 | Build tool & dev server |
| Lucide React | 0.363 | Icon library |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Rating.tsx          # RatingDisplay, RatingInput, RatingBreakdown
│   │   ├── SearchBar.tsx       # Search with suggestions dropdown
│   │   └── DashboardCard.tsx   # Stat cards with trend indicators
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky top nav with mega menu
│   │   └── Footer.tsx          # Full footer with CTA band
│   └── marketplace/
│       ├── ProductCard.tsx     # Animated product card with hover effects
│       ├── CategoryFilter.tsx  # Grid / scroll / list filter layouts
│       └── ProductGallery.tsx  # Zoomable image gallery with thumbnails
│
├── pages/
│   ├── LandingPage.tsx         # Public marketing homepage
│   ├── MarketplaceHomePage.tsx # Authenticated marketplace feed
│   ├── LoginPage.tsx           # Split-panel login
│   ├── RegisterPage.tsx        # Role-select registration
│   ├── ProductDetailsPage.tsx  # Full product detail with tabs
│   ├── CartPage.tsx            # Cart with coupon & order summary
│   ├── SellerDashboardPage.tsx # Revenue, orders, listings, analytics
│   ├── BuyerDashboardPage.tsx  # Orders, wishlist, recommendations
│   └── UploadProductPage.tsx   # 4-step product listing wizard
│
├── layouts/
│   └── MainLayout.tsx          # Wraps Navbar + Outlet + Footer
│
├── services/
│   └── mockData.ts             # All demo data (products, categories, users…)
│
├── types/
│   └── index.ts                # All TypeScript interfaces
│
├── routes/
│   └── index.tsx               # React Router v6 config with lazy loading
│
├── App.tsx                     # Root component
├── main.tsx                    # Entry point
└── index.css                   # Tailwind + custom utility classes
```

---

## 🗺️ Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | LandingPage | Public marketing homepage |
| `/marketplace` | MarketplaceHomePage | Main product browsing feed |
| `/login` | LoginPage | Sign-in with social options |
| `/register` | RegisterPage | Buyer/Seller onboarding |
| `/product/:id` | ProductDetailsPage | Full product view with reviews |
| `/cart` | CartPage | Cart management & checkout |
| `/seller-dashboard` | SellerDashboardPage | Seller analytics & order management |
| `/buyer-dashboard` | BuyerDashboardPage | Buyer orders & recommendations |
| `/upload-product` | UploadProductPage | 4-step product listing wizard |

---

## 🎨 Design System

### Colors
- **Brand**: `brand-600` (#2563eb) — primary CTA, links, highlights
- **Surface**: `surface-secondary` (#f8fafc) — page backgrounds
- **Dark**: `slate-900` — headings, hero text

### Typography
- **Display**: Syne (headings, logos, bold titles)
- **Body**: Plus Jakarta Sans (all body text)
- **Mono**: JetBrains Mono (code snippets)

### Component Classes (in `index.css`)
```css
.btn-primary      /* Blue filled CTA button */
.btn-secondary    /* White bordered button */
.btn-ghost        /* Transparent hover button */
.card             /* White rounded card with subtle shadow */
.card-hover       /* Card with lift on hover */
.badge            /* Pill label */
.input-base       /* Form input base style */
.section-title    /* Large section heading */
```

---

## 🔧 Customization

### Swap Mock Data for Real API
Replace the imports in any page:
```tsx
// Before
import { mockProducts } from '@/services/mockData';

// After — hook into your API
import { useProducts } from '@/hooks/useProducts';
const { products } = useProducts();
```

### Add Authentication Context
Create `src/context/AuthContext.tsx` and wrap `<App />` in `main.tsx`.

### Connect a Backend
Add an `api.ts` service using `fetch` or `axios`, then replace mock data service calls.

---

## 📦 Build for Production

```bash
npm run build        # Outputs to /dist
npm run preview      # Preview the production build locally
```

---

## 🔜 Next Pages to Build (Page 2 onward)

Based on the Stitch prototype:
- `ShoppingCartPage` — full checkout flow
- `WishlistPage` — saved items grid
- `SellerStorePage` — public seller profile
- `SearchResultsPage` — filtered product grid
- `OrderTrackingPage` — live order status

---

## 📝 Notes

- All pages use **lazy loading** via `React.lazy` for optimal performance
- Images use **Unsplash** for demo; swap with your CDN in production
- Avatars use **DiceBear** API; replace with your user profile system
- The `window.storage` API in `routes/index.tsx` is browser `localStorage`-free; state is in-memory

---

Built with ❤️ using MarketVerse design system.
