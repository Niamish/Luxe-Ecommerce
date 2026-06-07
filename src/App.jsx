import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { CursorProvider } from './context/CursorContext';

// Layout & Components
import Layout from './components/layout/layout';
import CustomCursor from './components/common/CustomCursor';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import ShippingPage from './pages/ShippingPage';
import ReturnsPage from './pages/ReturnsPage';
import SizeGuidePage from './pages/SizeGuidePage';

function App() {
  return (
    <HashRouter>
      <ThemeProvider>
        <ProductProvider>
          <CartProvider>
            <WishlistProvider>
              <AuthProvider>
                <CursorProvider>

                  {/* Custom Cursor */}
                  {window.innerWidth >= 768 && <CustomCursor />}

                  {/* Correct Nested Routing Setup */}
                  <Routes>
                    <Route path="/" element={<Layout />}>
                      <Route index element={<HomePage />} />
                      <Route path="shop" element={<ShopPage />} />
                      <Route path="product/:id" element={<ProductPage />} />
                      <Route path="checkout" element={<CheckoutPage />} />
                      <Route path="wishlist" element={<WishlistPage />} />
                      <Route path="about" element={<AboutPage />} />
                      <Route path="contact" element={<ContactPage />} />
                      <Route path="faq" element={<FAQPage />} />
                      <Route path="shipping" element={<ShippingPage />} />
                      <Route path="returns" element={<ReturnsPage />} />
                      <Route path="size-guide" element={<SizeGuidePage />} />
                    </Route>
                  </Routes>

                </CursorProvider>
              </AuthProvider>
            </WishlistProvider>
          </CartProvider>
        </ProductProvider>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;
