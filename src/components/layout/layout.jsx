import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Notifications from '../common/Notifications';
import QuickView from '../product/QuickView';
import CartSidebar from '../cart/CartSidebar';
// import SearchModal from '../common/SearchModal';
import { useTheme } from '../../hooks/useTheme';
import { useCart } from '../../hooks/useCart';
import { ProductContext } from '../../context/ProductContext';

/**
 * The main layout component for the application.
 * It wraps every page and includes the Header, Footer, and global UI elements
 * like modals and notifications. The <Outlet /> component from react-router-dom
 * renders the specific page component for the current route.
 */
const Layout = () => {
  const { t } = useTheme();
  const { quickViewProduct, closeQuickView } = useContext(ProductContext);
  const { isCartOpen } = useCart();

  // In a real app, the state for these modals would come from a UI context
  // const { isSearchOpen } = useUI();

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ backgroundColor: t.bg, color: t.text }}
    >
      <Header />

      <main className="flex-grow">
        <Outlet /> {/* This is where your page components will be rendered */}
      </main>

      <Footer />

      {/* Global components that overlay the page content */}
      <Notifications />
      {isCartOpen && <CartSidebar />}
      {/* {isSearchOpen && <SearchModal />} */}
      {quickViewProduct && <QuickView product={quickViewProduct} onClose={closeQuickView} />}
    </div>
  );
};

export default Layout;