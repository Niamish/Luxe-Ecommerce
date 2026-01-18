import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

const Footer = () => {
  const { theme, t } = useTheme();

  const footerLinks = {
    quickLinks: [
      { name: 'Shop', path: '/shop' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Wishlist', path: '/wishlist' },
    ],
    customerService: [
      { name: 'FAQ', path: '/faq' },
      { name: 'Shipping', path: '/shipping' },
      { name: 'Returns', path: '/returns' },
      { name: 'Size Guide', path: '/size-guide' },
    ],
  };

  return (
    <footer
      className="pt-12 sm:pt-20 pb-8"
      style={{
        backgroundColor: t.bg,
        color: t.text,
        borderTop: `1px solid ${t.border}`,
        boxShadow: theme === 'light' ? '0 -20px 80px rgba(0, 0, 0, 0.06)' : 'none'
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 sm:mb-12">
          {/* Logo and Social */}
          <div className="text-center sm:text-left">
            <h3
              className="text-3xl font-bold mb-4"
              style={{ color: t.accent }}
            >
              LUXE
            </h3>
            <p className="mb-4 opacity-80 text-sm">
              Premium tech accessories for the modern lifestyle.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 opacity-80 text-sm">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:opacity-100 transition-opacity">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service Links */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 opacity-80 text-sm">
               {footerLinks.customerService.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:opacity-100 transition-opacity">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="mb-4 opacity-80 text-sm">
              Subscribe for exclusive offers
            </p>
            <div className="flex gap-2 max-w-xs mx-auto sm:mx-0">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-lg backdrop-blur-xl outline-none text-sm"
                style={{ 
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)',
                  color: theme === 'dark' ? '#e4e4e7' : t.text,
                  backdropFilter: theme === 'light' ? 'blur(10px)' : 'none',
                  border: theme === 'light' ? '1px solid rgba(255,255,255,0.6)' : 'none'
                }}
              />
              <button
                className="px-4 py-2 rounded-lg font-medium text-sm"
                style={{ backgroundColor: t.accent }}
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div
          className="pt-8 border-t text-center opacity-60 text-sm"
          style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : t.border }}
        >
          <p>&copy; {new Date().getFullYear()} LUXE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;