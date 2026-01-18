import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useCart } from '../../hooks/useCart';
// import { useWishlist } from '../../hooks/useWishlist';
import { ShoppingCart, Heart, User, Menu, Search } from 'lucide-react';

const Header = () => {
  const { theme, toggleTheme, t } = useTheme();
  const { cartCount, openCart } = useCart();
  
  // Placeholder data - this would come from your custom hooks
  // const { wishlist } = useWishlist();
  const wishlist = [1, 2]; // Example

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Style for active navigation links
  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? t.accent : t.textMuted,
    fontWeight: isActive ? '500' : '400',
    position: 'relative',
  });

  return (
    <header
      className="sticky top-0 z-[100] glass-premium"
      style={{ 
        backgroundColor: theme === 'dark' ? `${t.bg}ee` : `${t.surface}ee`,
        borderBottom: `1px solid ${t.border}`,
        boxShadow: theme === 'light' ? '0 8px 32px rgba(0, 0, 0, 0.06)' : 'none'
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-bold transition-transform transform hover:scale-105 relative z-[110]"
          >
            <span 
              className="inline-block font-bold"
              style={{ color: t.accent }}>
              LUXE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-8 text-lg">
            <NavLink to="/" style={navLinkStyle}>Home</NavLink>
            <NavLink to="/shop" style={navLinkStyle}>Shop</NavLink>
            <NavLink to="/about" style={navLinkStyle}>About</NavLink>
            <NavLink to="/contact" style={navLinkStyle}>Contact</NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl transform hover:scale-110 active:scale-95 transition-all duration-300"
              style={{ backgroundColor: t.surface, boxShadow: t.shadowOutSmall }}
            >
              <span className="text-lg animate-pulse-subtle">{theme === 'dark' ? '☀️' : '🌙'}</span>
            </button>

            {/* In a real app, this would open a search modal. State managed by a UI context. */}
            <button className="hidden md:block p-3 rounded-xl" style={{ backgroundColor: t.surface, boxShadow: t.shadowOutSmall }}>
              <Search className="w-5 h-5" style={{ color: t.textMuted }} />
            </button>
            
            <Link to="/wishlist" className="relative hidden sm:block p-3 rounded-xl" style={{ backgroundColor: t.surface, boxShadow: t.shadowOutSmall }}>
              <Heart className="w-5 h-5" style={{ color: t.textMuted }}/>
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse" style={{backgroundColor: t.danger}}>
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button onClick={openCart} className="relative p-3 rounded-xl transform hover:scale-110 active:scale-95 transition-all duration-300" style={{ backgroundColor: t.surface, boxShadow: t.shadowOutSmall }}>
              <ShoppingCart className="w-5 h-5" style={{ color: t.textMuted }} />
              {cartCount > 0 && (
                 <span className="absolute -top-1 -right-1 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce" style={{backgroundColor: t.accent}}>
                    {cartCount}
                  </span>
              )}
            </button>
            
            <button className="hidden sm:block p-3 rounded-xl" style={{ backgroundColor: t.surface, boxShadow: t.shadowOutSmall }}>
              <User className="w-5 h-5" style={{ color: t.textMuted }} />
            </button>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-3 rounded-xl" style={{ backgroundColor: t.surface, boxShadow: t.shadowOutSmall }}>
              <Menu className="w-5 h-5" style={{ color: t.textMuted }} />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu would be extracted to its own component */}
      {mobileMenuOpen && (
        <div className="lg:hidden p-4 animate-fade-in-up" style={{ backgroundColor: t.surface }}>
          <nav className="flex flex-col gap-4">
            <NavLink to="/" style={navLinkStyle} onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
            <NavLink to="/shop" style={navLinkStyle} onClick={() => setMobileMenuOpen(false)}>Shop</NavLink>
            <NavLink to="/about" style={navLinkStyle} onClick={() => setMobileMenuOpen(false)}>About</NavLink>
            <NavLink to="/contact" style={navLinkStyle} onClick={() => setMobileMenuOpen(false)}>Contact</NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;