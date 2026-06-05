import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import LandingPage from '@/pages/LandingPage';
import MarketplaceHomePage from '@/pages/MarketplaceHomePage';

// Lazy-loaded pages (to be added as you build them)
import { lazy, Suspense } from 'react';

const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/RegisterPage'));
const ProductDetailsPage = lazy(() => import('@/pages/ProductDetailsPage'));
const CartPage = lazy(() => import('@/pages/CartPage'));
const SellerDashboardPage = lazy(() => import('@/pages/SellerDashboardPage'));
const BuyerDashboardPage = lazy(() => import('@/pages/BuyerDashboardPage'));
const UploadProductPage = lazy(() => import('@/pages/UploadProductPage'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
        <p className="text-sm text-slate-400 font-medium">Loading...</p>
      </div>
    </div>
  );
}

function withSuspense(Component: React.ComponentType) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'marketplace', element: <MarketplaceHomePage /> },
      { path: 'login', element: withSuspense(LoginPage) },
      { path: 'register', element: withSuspense(RegisterPage) },
      { path: 'product/:id', element: withSuspense(ProductDetailsPage) },
      { path: 'cart', element: withSuspense(CartPage) },
      { path: 'seller-dashboard', element: withSuspense(SellerDashboardPage) },
      { path: 'buyer-dashboard', element: withSuspense(BuyerDashboardPage) },
      { path: 'upload-product', element: withSuspense(UploadProductPage) },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
