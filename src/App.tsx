import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileTabBar } from './components/MobileTabBar';
import { Toast } from './components/Toast';
import { HomePage } from './pages/HomePage';
import { SanctuaryDetailPage } from './pages/SanctuaryDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { AuthPage } from './pages/AuthPage';
import { BookingsPage } from './pages/BookingsPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col font-sans selection:bg-[#B38E5D] selection:text-white pb-16 md:pb-0">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/sanctuaries" element={<HomePage />} />
              <Route path="/sanctuaries/:id" element={<SanctuaryDetailPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/confirmation" element={<ConfirmationPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/account" element={<AuthPage />} />
              <Route path="/bookings" element={<BookingsPage />} />
              <Route path="/wishlist" element={<BookingsPage defaultTab="saved" />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
          <MobileTabBar />
          <Toast />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
