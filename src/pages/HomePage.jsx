import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll, useInView, useAnimation } from 'framer-motion';
import { useCursor } from '../hooks/useCursor';

// --- ICON IMPORTS ---
import { ArrowRight, Play, Heart, Eye, ShoppingCart, Star, X, Sparkles, Zap, Award, ChevronDown, Check, Plus, Minus, MousePointer2, Headphones, Keyboard, Camera, Monitor, Gamepad2, Watch, ArrowUpRight } from 'lucide-react';


// Import proper hooks
import { useTheme } from '../hooks/useTheme';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/product/ProductCard';


// --- ANIMATED BACKGROUND ---
const PremiumBackground = () => {
  const { t, theme } = useTheme();
  // Properly formatted SVG data URI with theme-aware colors
  const gridPattern = theme === 'dark' 
    ? "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E"
    : "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(0,0,0,0.02)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E";

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ 
        backgroundColor: t.bg,
        backgroundImage: theme === 'light' ? t.gradientBg : 'none'
      }} />
      
      {/* Gradient Orbs */}
      <motion.div
        className={`absolute top-1/4 -left-48 w-96 h-96 rounded-full blur-[128px] ${
          theme === 'dark' ? 'bg-purple-600/20' : 'bg-gradient-to-br from-indigo-400/10 to-purple-400/10'
        }`}
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`absolute bottom-1/4 -right-48 w-96 h-96 rounded-full blur-[128px] ${
          theme === 'dark' ? 'bg-pink-600/20' : 'bg-gradient-to-br from-pink-400/10 to-orange-400/10'
        }`}
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-50"
        style={{ backgroundImage: `url("${gridPattern}")` }}
      />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              theme === 'dark' ? 'bg-white/20' : 'bg-gray-900/10'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

// --- PREMIUM BUTTON ---
const PremiumButton = ({ children, variant = "primary", size = "lg", className = "", icon: Icon, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { theme, t } = useTheme();
  
  const variants = {
    primary: theme === 'dark' 
      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
      : "bg-gradient-to-r from-violet-700 to-purple-700 text-white shadow-xl shadow-purple-500/20",
    secondary: theme === 'dark'
      ? "bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10"
      : "bg-white/40 backdrop-blur-xl border border-white/60 text-gray-900 hover:bg-white/60 shadow-lg",
    ghost: theme === 'dark'
      ? "bg-transparent text-white hover:bg-white/5"
      : "bg-transparent text-gray-900 hover:bg-gray-900/5",
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm",
    md: "px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base",
    lg: "px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg",
  };

  return (
    <motion.button
      className={`relative overflow-hidden rounded-2xl font-medium transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10 }}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {Icon && <Icon className="w-5 h-5" />}
        {children}
      </span>
      
      {variant === "primary" && (
        <>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-600 to-orange-500"
            initial={{ x: "100%" }}
            animate={{ x: isHovered ? 0 : "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-0 opacity-0"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={isHovered ? {
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                } : {}}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
              />
            ))}
          </motion.div>
        </>
      )}
    </motion.button>
  );
};

// --- PREMIUM PRODUCT DATA ---
const premiumProducts = [
  {
    id: 1,
    name: "AirPods Max Pro",
    price: 549,
    originalPrice: 699,
    image: "🎧",
    description: "Immersive spatial audio with dynamic head tracking",
    features: ["Active Noise Cancellation", "Spatial Audio", "24hr Battery Life"],
    category: "audio",
    badge: "New",
    rating: 4.9,
    reviews: 2341
  },
  {
    id: 2,
    name: "Magic Keyboard Ultra",
    price: 299,
    originalPrice: 399,
    image: "⌨️",
    description: "Wireless mechanical keyboard with customizable RGB",
    features: ["Mechanical Switches", "RGB Backlight", "USB-C"],
    category: "accessories",
    badge: "Best Seller",
    rating: 4.8,
    reviews: 1892
  },
  {
    id: 3,
    name: "Magic Mouse Ultra",
    price: 89,
    originalPrice: 129,
    image: "🖱️",
    description: "Precision tracking with gesture control",
    features: ["Multi-Touch Surface", "Rechargeable", "Bluetooth 5.0"],
    category: "accessories",
    rating: 4.7,
    reviews: 1234
  },
  {
    id: 4,
    name: "Studio Display Pro",
    price: 1299,
    originalPrice: 1599,
    image: "🖥️",
    description: "5K Retina display with ProMotion technology",
    features: ["5K Resolution", "120Hz ProMotion", "Thunderbolt 4"],
    category: "displays",
    badge: "Premium",
    rating: 5.0,
    reviews: 892
  },
  {
    id: 5,
    name: "HomePod Elite",
    price: 399,
    originalPrice: 499,
    image: "🔊",
    description: "Room-filling sound with intelligent assistant",
    features: ["360° Audio", "Siri Integration", "HomeKit Hub"],
    category: "audio",
    rating: 4.6,
    reviews: 1567
  }
];

// --- HERO SECTION ---
const HeroSection = () => {
  const navigate = useNavigate();
  const { theme, t } = useTheme();
  const [activeProduct, setActiveProduct] = useState(0);
  const products = premiumProducts.slice(0, 3);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProduct((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [products.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 sm:left-20 w-48 sm:w-72 h-48 sm:h-72 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-pink-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl mb-8"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.6)',
                borderColor: theme === 'dark' ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255, 255, 255, 0.8)',
                borderWidth: '1px',
                borderStyle: 'solid',
                boxShadow: theme === 'light' ? '0 8px 32px rgba(124, 58, 237, 0.12)' : 'none'
              }}
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm animate-pulse-subtle" style={{ color: theme === 'dark' ? t.accentLight : t.accent }}>Introducing LUXE Premium Collection</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-8xl font-bold mb-6 sm:mb-8 leading-tight">
              <motion.span
                className="block" style={{ color: t.text }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Redefine
              </motion.span>
              <motion.span
                className="block gradient-aurora bg-clip-text text-transparent animate-glow-pulse"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Excellence
              </motion.span>
            </h1>

            <motion.p
              className="text-base sm:text-lg lg:text-xl mb-8 sm:mb-10 leading-relaxed max-w-lg glass-premium p-4 rounded-2xl"
              style={{ color: t.textMuted }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Experience the pinnacle of design and technology with our meticulously crafted premium accessories.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <PremiumButton onClick={() => navigate('/shop')} icon={ArrowRight} size="md">
                Explore Collection
              </PremiumButton>
              <PremiumButton variant="secondary" icon={Play} size="md">
                Watch Story
              </PremiumButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4 sm:gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {[
                { value: "50K+", label: "Happy Customers" },
                { value: "4.9★", label: "Average Rating" },
                { value: "2hr", label: "Fast Delivery" }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="text-center sm:text-left"
                >
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold" style={{ color: t.text }}>{stat.value}</div>
                  <div className="text-xs sm:text-sm" style={{ color: t.textMuted }}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Product Showcase */}
          <motion.div
            className="relative h-[400px] sm:h-[500px] lg:h-[600px] mt-12 lg:mt-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-[3rem] blur-3xl" />
            
            <motion.div className="relative h-full rounded-2xl sm:rounded-[3rem] backdrop-blur-xl p-6 sm:p-8 lg:p-12 overflow-hidden" style={{ 
              backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.4)',
              borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)',
              borderWidth: '1px',
              borderStyle: 'solid',
              boxShadow: theme === 'light' ? t.glassMorphism : 'none'
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct}
                  initial={{ opacity: 0, y: 100, rotateX: -20 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -100, rotateX: 20 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full flex flex-col"
                >
                  {/* Product Badge */}
                  {products[activeProduct].badge && (
                    <motion.div
                      className="absolute top-8 right-8 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      {products[activeProduct].badge}
                    </motion.div>
                  )}

                  {/* 3D Product */}
                  <div className="flex-1 flex items-center justify-center">
                    <motion.div
                      className="text-[120px] sm:text-[160px] lg:text-[200px] select-none"
                      animate={{
                        y: [0, -20, 0],
                        rotateZ: [0, 5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      whileHover={{ scale: 1.1, rotateZ: 10 }}
                    >
                      {products[activeProduct].image}
                    </motion.div>
                  </div>

                  {/* Product Info */}
                  <div className="relative z-10">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2" style={{ color: t.text }}>
                      {products[activeProduct].name}
                    </h3>
                    <p className="text-sm sm:text-base mb-4" style={{ color: t.textMuted }}>
                      {products[activeProduct].description}
                    </p>
                    
                    {/* Price and CTA */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-2xl sm:text-3xl lg:text-4xl font-bold" style={{ color: t.text }}>
                          ${products[activeProduct].price}
                        </span>
                        {products[activeProduct].originalPrice && (
                          <span className="text-lg sm:text-xl line-through ml-3" style={{ color: t.textMuted, opacity: 0.6 }}>
                            ${products[activeProduct].originalPrice}
                          </span>
                        )}
                      </div>
                      <PremiumButton size="sm" onClick={() => navigate(`/product/${products[activeProduct].id}`)}>
                        View Details
                      </PremiumButton>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress Indicators */}
              <div className="absolute bottom-8 left-8 flex gap-2">
                {products.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveProduct(i)}
                    className="relative h-1 overflow-hidden rounded-full bg-white/20 transition-all duration-300"
                    style={{ width: i === activeProduct ? '48px' : '24px' }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400"
                      initial={{ x: '-100%' }}
                      animate={{ x: i === activeProduct ? 0 : '-100%' }}
                      transition={{ duration: i === activeProduct ? 5 : 0 }}
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-400">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
      </motion.div>
    </section>
  );
};

// --- FEATURED PRODUCTS GRID ---
const FeaturedProductsGrid = () => {
  const { theme, t } = useTheme();

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 mb-4 sm:mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.1 }}
          >
            <Award className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
            <span className="text-xs sm:text-sm" style={{ color: theme === 'dark' ? t.accentLight : t.accent }}>Featured Products</span>
          </motion.span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6" style={{ color: t.text }}>
            Crafted for
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Perfection
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl max-w-2xl mx-auto px-4" style={{ color: t.textMuted }}>
            Each product is meticulously designed to deliver an unparalleled experience
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {premiumProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- CATEGORIES SHOWCASE ---
const CategoriesShowcase = () => {
  const { theme, t } = useTheme();
  const categories = [
    {
      id: 'audio',
      name: 'Audio',
      icon: Headphones,
      description: 'Premium sound experience',
      image: '🎧',
      gradient: 'from-purple-600 to-pink-600',
      products: 12
    },
    {
      id: 'keyboards',
      name: 'Keyboards',
      icon: Keyboard,
      description: 'Mechanical perfection',
      image: '⌨️',
      gradient: 'from-purple-600 to-violet-600',
      products: 8
    },
    {
      id: 'mice',
      name: 'Mice',
      icon: MousePointer2,
      description: 'Precision control',
      image: '🖱️',
      gradient: 'from-green-600 to-emerald-600',
      products: 10
    },
    {
      id: 'displays',
      name: 'Displays',
      icon: Monitor,
      description: 'Visual excellence',
      image: '🖥️',
      gradient: 'from-orange-600 to-red-600',
      products: 6
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/3 via-transparent to-pink-500/3" />
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6" style={{ color: t.text }}>
            Shop by Category
          </h2>
          <p className="text-base sm:text-lg lg:text-xl" style={{ color: t.textMuted }}>
            Find exactly what you're looking for
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Category Selector */}
          <div className="space-y-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                className={`w-full p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border transition-all duration-300 text-left`}
                style={{
                  backgroundColor: selectedCategory.id === category.id 
                    ? (theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(107,51,208,0.1)')
                    : (theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'),
                  borderColor: selectedCategory.id === category.id
                    ? (theme === 'dark' ? 'rgba(255,255,255,0.2)' : t.accent)
                    : (theme === 'dark' ? 'rgba(255,255,255,0.1)' : t.border),
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}
                onClick={() => setSelectedCategory(category)}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`p-2 sm:p-2.5 lg:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r ${category.gradient} bg-opacity-20`}>
                      <category.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" style={{ color: theme === 'dark' ? 'white' : t.accent }} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg lg:text-xl font-semibold" style={{ color: t.text }}>{category.name}</h3>
                      <p className="text-xs sm:text-sm" style={{ color: t.textMuted }}>{category.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold" style={{ color: t.text }}>{category.products}</span>
                    <p className="text-xs sm:text-sm" style={{ color: t.textMuted }}>Products</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Category Preview */}
          <motion.div
            key={selectedCategory.id}
            className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl sm:rounded-3xl backdrop-blur-xl p-6 sm:p-8 lg:p-12 overflow-hidden mt-6 lg:mt-0"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.95)',
              borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : t.border,
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${selectedCategory.gradient} opacity-5`} />
            
            <div className="relative h-full flex flex-col items-center justify-center text-center">
              <motion.div
                className="text-[120px] sm:text-[160px] lg:text-[200px] mb-4 sm:mb-6 lg:mb-8"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {selectedCategory.image}
              </motion.div>
              
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4" style={{ color: t.text }}>{selectedCategory.name}</h3>
              <p className="text-sm sm:text-base mb-4 sm:mb-6 lg:mb-8 max-w-sm" style={{ color: t.textMuted }}>{selectedCategory.description}</p>
              
              <PremiumButton icon={ArrowRight} size="md">
                Explore {selectedCategory.name}
              </PremiumButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- TESTIMONIALS ---
const TestimonialsSection = () => {
  const { theme, t } = useTheme();
  const testimonials = [
    {
      id: 1,
      name: "Alex Chen",
      role: "Creative Director",
      avatar: "👨‍🎨",
      comment: "The attention to detail is extraordinary. Every product feels like it was crafted specifically for professionals who demand the best.",
      rating: 5,
      product: "Magic Keyboard Ultra"
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Software Engineer",
      avatar: "👩‍💻",
      comment: "I've tried countless peripherals, but LUXE products are in a league of their own. The build quality is unmatched.",
      rating: 5,
      product: "Magic Mouse Ultra"
    },
    {
      id: 3,
      name: "Michael Park",
      role: "Content Creator",
      avatar: "📸",
      comment: "My audience is always asking about my setup. LUXE products not only look incredible but perform flawlessly.",
      rating: 5,
      product: "Studio Display Pro"
    }
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/3 to-transparent" />
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6" style={{ color: t.text }}>
            Loved by Professionals
          </h2>
          <p className="text-base sm:text-lg lg:text-xl" style={{ color: t.textMuted }}>
            Join thousands who've elevated their workspace
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              className="backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12"
              style={{
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.7)',
                borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.9)',
                borderWidth: '1px',
                borderStyle: 'solid',
                boxShadow: theme === 'light' ? '0 20px 80px rgba(0, 0, 0, 0.08)' : 'none'
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                {/* Avatar */}
                <motion.div
                  className="text-6xl sm:text-7xl lg:text-8xl mb-4 sm:mb-6 lg:mb-8"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  {testimonials[activeTestimonial].avatar}
                </motion.div>

                {/* Quote */}
                <blockquote className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-light mb-6 sm:mb-8 leading-relaxed px-4" style={{ color: t.text }}>
                  "{testimonials[activeTestimonial].comment}"
                </blockquote>

                {/* Rating */}
                <div className="flex gap-1 mb-4 sm:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                    >
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Author */}
                <div className="mb-4">
                  <div className="text-lg sm:text-xl font-semibold" style={{ color: t.text }}>
                    {testimonials[activeTestimonial].name}
                  </div>
                  <div className="text-sm sm:text-base" style={{ color: t.textMuted }}>
                    {testimonials[activeTestimonial].role}
                  </div>
                </div>

                {/* Product */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full" style={{
                  backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                  borderWidth: '1px',
                  borderStyle: 'solid'
                }}>
                  <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: t.accent }} />
                  <span className="text-xs sm:text-sm" style={{ color: t.textMuted }}>
                    Purchased: {testimonials[activeTestimonial].product}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeTestimonial
                    ? 'w-8 bg-gradient-to-r from-purple-400 to-pink-400'
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- CTA SECTION ---
const CTASection = () => {
  const { theme, t } = useTheme();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  // SVG background pattern
  const ctaGridPattern = theme === 'dark' 
    ? "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E"
    : "data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(255,255,255,0.2)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E";

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="relative rounded-[3rem] overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Background */}
          <div className={`absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 ${theme === 'light' ? 'opacity-50' : 'opacity-60'}`} />
          
          {/* Grid Pattern */}
          <div
            className="absolute inset-0"
            style={{ backgroundImage: `url("${ctaGridPattern}")` }}
          />

          {/* Floating Elements */}
          <motion.div
            className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full blur-2xl"
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-32 h-32 bg-white/20 rounded-full blur-3xl"
            animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
          />

          {/* Content */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 xl:p-24 text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <Sparkles className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 sm:mb-6 lg:mb-8 text-white/80" />
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6">
              Join the Elite Circle
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto px-4">
              Get exclusive access to new releases, special offers, and receive 20% off your first premium order
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto px-4">
              <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl backdrop-blur-xl outline-none transition-all text-base lg:text-lg"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.9)',
                    borderColor: theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.5)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    color: theme === 'dark' ? 'white' : t.text
                  }}
                  required
                />
                <PremiumButton
                  type="submit"
                  className="sm:absolute sm:right-2 sm:top-1/2 sm:-translate-y-1/2 flex-shrink-0"
                  variant="primary"
                  size="sm"
                >
                  {isSubscribed ? (
                    <>
                      <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                      Success
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </PremiumButton>
              </div>
            </form>

            <p className="text-xs sm:text-sm text-white/60 mt-4 sm:mt-6">
              No spam, unsubscribe anytime. Read our Privacy Policy.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- MAIN COMPONENT ---
const HomePage = () => {
  const { theme, t } = useTheme();
  const { products: fetchedProducts, isLoading } = useProducts();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after a brief delay
    setTimeout(() => setShowContent(true), 100);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: t.bg }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-12 h-12" style={{ color: t.accent }} />
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <PremiumBackground />
      
      <AnimatePresence>
        {showContent && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HeroSection />
            <FeaturedProductsGrid />
            <CategoriesShowcase />
            <TestimonialsSection />
            <CTASection />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
};

export default HomePage;