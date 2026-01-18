# 🎨 Customization Guide

This guide will help you customize the LUXE Premium E-Commerce Template to match your brand and requirements.

## 🎨 Brand Colors

### Primary Color Scheme

The template uses a purple-to-pink gradient as the primary color scheme. You can customize this in `tailwind.config.js`:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f4ff',
          100: '#f1e8ff',
          500: '#8b5cf6', // Main purple
          600: '#7c3aed',
          700: '#6d28d9',
        },
        accent: {
          500: '#ec4899', // Main pink
          600: '#db2777',
        },
        // Add your brand colors
        brand: {
          primary: '#your-color-here',
          secondary: '#your-color-here',
          accent: '#your-color-here',
        }
      }
    }
  }
}
```

### Background Colors

The main background is set to `#030014`. To change it:

1. Update `src/index.css`:
```css
body {
  background-color: #your-background-color;
}
```

2. Update the `PremiumBackground` component in `src/pages/HomePage.jsx`:
```jsx
<div className="absolute inset-0 bg-[#your-background-color]" />
```

## 🖼️ Images and Assets

### Product Images

Replace the emoji placeholders with real product images:

1. Add your images to the `public/images/products/` folder
2. Update the product data in `src/pages/HomePage.jsx`:

```jsx
const premiumProducts = [
  {
    id: 1,
    name: "Your Product Name",
    price: 299,
    image: "/images/products/your-product-1.jpg", // Replace emoji
    description: "Your product description",
    // ... other properties
  }
];
```

### Logo

Replace the current logo:

1. Add your logo to `public/images/logo.png`
2. Update the header component in `src/components/layout/header.jsx`:

```jsx
<img src="/images/logo.png" alt="Your Brand" className="h-8" />
```

## 📝 Content Customization

### Homepage Hero Section

Update the hero content in `src/pages/HomePage.jsx`:

```jsx
// Find the HeroSection component and update:
<h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-8xl font-bold mb-6 sm:mb-8 leading-tight">
  <span className="block text-white">
    Your Main
  </span>
  <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
    Headline
  </span>
</h1>

<p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 sm:mb-10 leading-relaxed max-w-lg">
  Your compelling description that explains your value proposition.
</p>
```

### Navigation Menu

Customize the navigation in `src/components/layout/header.jsx`:

```jsx
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  // Add or remove menu items
];
```

### Footer Content

Update footer information in `src/components/layout/footer.jsx`:

```jsx
// Update company information
const companyInfo = {
  name: "Your Company Name",
  description: "Your company description",
  email: "contact@yourcompany.com",
  phone: "+1 (555) 123-4567",
  address: "Your Address"
};
```

## 🎭 Animations and Effects

### Framer Motion Animations

Customize animation settings in components:

```jsx
// Example: Modify hover animations
<motion.div
  whileHover={{ scale: 1.05, y: -5 }} // Customize these values
  transition={{ duration: 0.3 }}
>
  Your content
</motion.div>

// Example: Modify entrance animations
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }} // Adjust timing
>
  Your content
</motion.div>
```

### Custom Cursor

Customize the cursor in `src/components/common/CustomCursor.jsx`:

```jsx
// Change cursor size and colors
<motion.div
  className="w-6 h-6 bg-purple-400" // Adjust size and color
  style={{
    borderRadius: '50%',
    // Add more custom styles
  }}
/>
```

## 🔤 Typography

### Font Families

Add custom fonts:

1. Add font files to `public/fonts/` or use Google Fonts
2. Update `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'custom': ['Your Font Name', 'sans-serif'],
        'heading': ['Your Heading Font', 'serif'],
      }
    }
  }
}
```

3. Use in components:
```jsx
<h1 className="font-heading text-6xl">Your Heading</h1>
<p className="font-custom">Your content</p>
```

### Font Sizes

Customize typography scales in `src/index.css`:

```css
.text-display {
  @apply text-5xl font-bold; /* Customize as needed */
}

.text-heading-1 {
  @apply text-4xl font-semibold;
}

/* Add more custom text classes */
.text-brand-large {
  @apply text-7xl font-black tracking-tight;
}
```

## 🛍️ Product Data

### Product Structure

Update the product data structure to match your needs:

```jsx
const productTemplate = {
  id: 1,
  name: "Product Name",
  price: 299,
  originalPrice: 399, // Optional
  image: "/images/product.jpg",
  images: ["/img1.jpg", "/img2.jpg"], // Multiple images
  description: "Product description",
  category: "category-name",
  features: ["Feature 1", "Feature 2"],
  specifications: {
    weight: "2.5kg",
    dimensions: "30x20x10cm",
    // Add more specs
  },
  rating: 4.8,
  reviews: 156,
  inStock: true,
  badge: "New", // Optional
};
```

### Categories

Customize product categories in `src/pages/HomePage.jsx`:

```jsx
const categories = [
  {
    id: 'your-category',
    name: 'Your Category',
    icon: YourIcon, // Import from lucide-react
    description: 'Category description',
    image: '🔥', // Or use actual image
    gradient: 'from-blue-600 to-cyan-600',
    products: 15
  }
];
```

## 🎨 Styling Customization

### Custom CSS Classes

Add custom styles in `src/App.css`:

```css
/* Custom button style */
.btn-custom {
  @apply px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105;
}

/* Custom card style */
.card-custom {
  @apply bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6;
}

/* Custom gradient text */
.text-gradient-custom {
  @apply bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent;
}
```

### Responsive Design

Customize breakpoints in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      // Add custom breakpoints
      'mobile': '320px',
      'tablet': '768px',
      'desktop': '1024px',
    }
  }
}
```

## 🔧 Component Customization

### Custom Components

Create new components in `src/components/`:

```jsx
// src/components/ui/CustomButton.jsx
import React from 'react';
import { motion } from 'framer-motion';

const CustomButton = ({ children, variant = 'primary', ...props }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-your-color to-your-color-2',
    secondary: 'bg-transparent border-2 border-your-color',
  };

  return (
    <motion.button
      className={`px-6 py-3 rounded-lg font-medium ${variants[variant]}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default CustomButton;
```

### Modify Existing Components

Example: Customize the PremiumButton:

```jsx
// In src/pages/HomePage.jsx, find PremiumButton and modify:
const variants = {
  primary: "bg-gradient-to-r from-your-primary to-your-secondary text-white shadow-lg",
  secondary: "bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10",
  // Add your custom variants
  custom: "bg-your-custom-gradient text-white shadow-xl",
};
```

## 🎯 Layout Customization

### Grid Layouts

Customize grid layouts:

```jsx
// Change product grid columns
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {/* Your products */}
</div>

// Create custom grid
<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
  {/* Responsive grid */}
</div>
```

### Section Spacing

Adjust section spacing:

```jsx
// Change padding/margins
<section className="py-24 lg:py-32 xl:py-40 px-4 lg:px-8">
  {/* Customize spacing for different screen sizes */}
</section>
```

## 🛡️ Advanced Customization

### Context Customization

Modify contexts to add custom functionality:

```jsx
// src/context/CustomContext.jsx
import React, { createContext, useContext, useState } from 'react';

const CustomContext = createContext();

export const CustomProvider = ({ children }) => {
  const [customState, setCustomState] = useState({
    // Your custom state
  });

  const value = {
    customState,
    setCustomState,
    // Your custom functions
  };

  return (
    <CustomContext.Provider value={value}>
      {children}
    </CustomContext.Provider>
  );
};

export const useCustom = () => {
  const context = useContext(CustomContext);
  if (!context) {
    throw new Error('useCustom must be used within a CustomProvider');
  }
  return context;
};
```

### Custom Hooks

Create custom hooks for specific functionality:

```jsx
// src/hooks/useCustomHook.js
import { useState, useEffect } from 'react';

export const useCustomHook = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const customFunction = async () => {
    setLoading(true);
    // Your custom logic
    setLoading(false);
  };

  return { data, loading, customFunction };
};
```

## 📱 Mobile Customization

### Mobile-Specific Styles

```jsx
// Use responsive classes
<div className="text-sm sm:text-base lg:text-lg">
  Responsive text
</div>

// Hide/show on different screens
<div className="hidden md:block">Desktop only</div>
<div className="block md:hidden">Mobile only</div>

// Mobile-first approach
<div className="p-4 sm:p-6 lg:p-8">
  Responsive padding
</div>
```

## 🔄 Testing Your Customizations

1. Start the development server: `npm run dev`
2. Test on different screen sizes using browser dev tools
3. Check all interactive elements work correctly
4. Verify animations and transitions
5. Test navigation and functionality

## 📝 Documentation

Remember to document your customizations:

1. Update this file with your changes
2. Comment your code for future reference
3. Keep track of custom components and styles
4. Document any new features or functionality

## 🆘 Need Help?

If you need assistance with customization:

1. Check the [Troubleshooting Guide](./TROUBLESHOOTING.md)
2. Review the code comments
3. Contact support at support@yourtemplate.com

Happy customizing! 🎨