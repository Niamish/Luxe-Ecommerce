# 🔧 Troubleshooting Guide

This guide helps you solve common issues you might encounter while using the LUXE Premium E-Commerce Template.

## 🚀 Installation Issues

### Node.js Version Compatibility

**Problem**: Template doesn't work with older Node.js versions

**Solution**:
```bash
# Check your Node.js version
node --version

# Update to Node.js 16+ (recommended: 18 LTS)
# Using nvm (Node Version Manager)
nvm install 18
nvm use 18

# Or download from nodejs.org
```

### npm Install Failures

**Problem**: `npm install` fails with dependency errors

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install

# If still failing, try legacy peer deps
npm install --legacy-peer-deps
```

### Port Already in Use

**Problem**: Development server can't start on port 5173

**Solution**:
```bash
# Find process using the port
lsof -i :5173

# Kill the process (replace PID with actual process ID)
kill -9 PID

# Or use a different port
npm run dev -- --port 3000
```

## 🎨 Styling Issues

### Tailwind CSS Not Working

**Problem**: Tailwind classes not being applied

**Solution**:
1. Check `index.css` includes Tailwind directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

2. Verify `tailwind.config.js` exists and has correct content paths:
```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // ...
}
```

3. Restart development server:
```bash
npm run dev
```

### CSS Not Loading

**Problem**: Styles not appearing or partially loading

**Solution**:
1. Check browser console for CSS load errors
2. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
3. Verify CSS file imports in components
4. Restart development server

### Responsive Design Issues

**Problem**: Layout broken on mobile/tablet

**Solution**:
1. Check viewport meta tag in `index.html`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

2. Verify responsive classes are applied correctly:
```jsx
// Correct
<div className="text-sm sm:text-base lg:text-lg">

// Incorrect (missing responsive prefixes)
<div className="text-sm">
```

## ⚡ Performance Issues

### Slow Loading

**Problem**: Application loads slowly

**Solution**:
1. Check network tab in browser dev tools
2. Optimize images (compress, use WebP format)
3. Implement code splitting:
```jsx
// Lazy load components
import { lazy, Suspense } from 'react';
const ProductPage = lazy(() => import('./pages/ProductPage'));

<Suspense fallback={<div>Loading...</div>}>
  <ProductPage />
</Suspense>
```

### Memory Leaks

**Problem**: Browser becomes slow after using the app

**Solution**:
1. Check for missing cleanup in useEffect:
```jsx
// Correct
useEffect(() => {
  const interval = setInterval(() => {
    // do something
  }, 1000);
  
  return () => clearInterval(interval); // Cleanup
}, []);

// Incorrect (missing cleanup)
useEffect(() => {
  setInterval(() => {
    // do something
  }, 1000);
  // Missing cleanup!
}, []);
```

## 🎭 Animation Issues

### Framer Motion Animations Not Working

**Problem**: Animations don't play or are choppy

**Solution**:
1. Check Framer Motion is installed:
```bash
npm list framer-motion
```

2. Verify import statements:
```jsx
import { motion, AnimatePresence } from 'framer-motion';
```

3. Check for conflicting CSS:
```css
/* Remove conflicting styles */
* {
  transition: none !important; /* This can break Framer Motion */
}
```

### Custom Cursor Not Working

**Problem**: Custom cursor not appearing

**Solution**:
1. Check screen width condition:
```jsx
// Custom cursor only shows on desktop
{window.innerWidth >= 768 && <CustomCursor />}
```

2. Verify CSS cursor is hidden:
```css
body {
  cursor: none; /* This should be present */
}
```

## 🛒 E-Commerce Functionality

### Cart Not Updating

**Problem**: Adding items to cart doesn't work

**Solution**:
1. Check CartContext is properly wrapped:
```jsx
// App.jsx should have CartProvider
<CartProvider>
  <Routes>
    // Your routes
  </Routes>
</CartProvider>
```

2. Verify useCart hook usage:
```jsx
import { useCart } from '../hooks/useCart';

const { addToCart, items } = useCart();
```

### LocalStorage Issues

**Problem**: Cart/wishlist items not persisting

**Solution**:
1. Check browser storage permissions
2. Verify localStorage is available:
```jsx
const isLocalStorageAvailable = () => {
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    return true;
  } catch (e) {
    return false;
  }
};
```

3. Handle storage errors gracefully:
```jsx
try {
  localStorage.setItem('cart', JSON.stringify(cartItems));
} catch (error) {
  console.error('Failed to save cart:', error);
}
```

## 🔄 React Issues

### Component Not Re-rendering

**Problem**: Component doesn't update when state changes

**Solution**:
1. Check state mutation (don't mutate directly):
```jsx
// Correct
setItems([...items, newItem]);

// Incorrect
items.push(newItem);
setItems(items);
```

2. Verify dependencies in useEffect:
```jsx
// Include all dependencies
useEffect(() => {
  fetchData();
}, [userId, productId]); // Don't forget dependencies
```

### Infinite Re-renders

**Problem**: Component keeps re-rendering

**Solution**:
1. Check for object/array creation in render:
```jsx
// Incorrect - creates new object on every render
<Component config={{}} />

// Correct - stable reference
const config = useMemo(() => ({}), []);
<Component config={config} />
```

2. Memoize expensive calculations:
```jsx
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```

## 🌐 Routing Issues

### Pages Not Loading

**Problem**: Navigation doesn't work or shows 404

**Solution**:
1. Check route configuration:
```jsx
// Correct route setup
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<HomePage />} />
    <Route path="shop" element={<ShopPage />} />
  </Route>
</Routes>
```

2. Verify Outlet placement in Layout:
```jsx
// Layout.jsx
return (
  <div>
    <Header />
    <main>
      <Outlet /> {/* This renders page content */}
    </main>
    <Footer />
  </div>
);
```

### Browser Back Button Issues

**Problem**: Back button doesn't work correctly

**Solution**:
1. Use proper navigation methods:
```jsx
// Correct
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/shop');

// Avoid window.location = '/shop'
```

## 🚧 Build Issues

### Build Fails

**Problem**: `npm run build` fails with errors

**Solution**:
1. Check for unused imports:
```bash
# Remove unused imports automatically
npm install --save-dev eslint-plugin-unused-imports
```

2. Fix TypeScript errors (if using):
```bash
# Check for type errors
npx tsc --noEmit
```

3. Check environment variables:
```bash
# Ensure all VITE_ prefixed variables are available
```

### Deployment Issues

**Problem**: Built site doesn't work when deployed

**Solution**:
1. Check base URL in `vite.config.js`:
```javascript
export default defineConfig({
  base: '/your-repo-name/', // For GitHub Pages
  // or
  base: '/', // For most other platforms
});
```

2. Configure routing for SPA:
```
# Netlify: _redirects file
/*    /index.html   200

# Apache: .htaccess file
RewriteEngine On
RewriteRule ^(?!.*\.).*$ /index.html [L]
```

## 🖼️ Image Issues

### Images Not Loading

**Problem**: Images don't display

**Solution**:
1. Check image paths:
```jsx
// Correct for public folder
<img src="/images/product.jpg" alt="Product" />

// Correct for src/assets (with import)
import productImg from '../assets/product.jpg';
<img src={productImg} alt="Product" />
```

2. Verify image files exist in correct location
3. Check image file extensions and case sensitivity

## 📱 Mobile Issues

### Touch Events Not Working

**Problem**: Touch interactions don't work on mobile

**Solution**:
1. Use proper event handlers:
```jsx
// Include both mouse and touch events
<button
  onMouseDown={handleStart}
  onTouchStart={handleStart}
  onMouseUp={handleEnd}
  onTouchEnd={handleEnd}
>
  Button
</button>
```

2. Prevent zoom on double-tap:
```css
button {
  touch-action: manipulation;
}
```

### Viewport Issues

**Problem**: Content doesn't fit mobile screen

**Solution**:
1. Check viewport meta tag:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

2. Use proper responsive units:
```css
/* Use viewport units carefully */
width: 100vw; /* Can cause horizontal scroll */
width: 100%; /* Usually better */
```

## 🔍 Debug Tools

### React Developer Tools

**Problem**: Hard to debug React state

**Solution**:
1. Install React DevTools browser extension
2. Use Components and Profiler tabs
3. Check component props and state

### Browser Console

**Problem**: Errors are hard to track

**Solution**:
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Use Network tab for loading issues
4. Use Elements tab for CSS issues

### Debug Commands

```bash
# Check for outdated packages
npm outdated

# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist

# Check for vulnerabilities
npm audit
npm audit fix
```

## 🆘 Getting Help

If you're still experiencing issues:

1. **Check Error Messages**: Read the full error message carefully
2. **Search Documentation**: Search through all documentation files
3. **Browser Console**: Check for JavaScript errors
4. **Network Tab**: Look for failed HTTP requests
5. **Stack Overflow**: Search for similar issues
6. **GitHub Issues**: Check the template's issue tracker

### Contact Support

If none of the above solutions work:

- **Email**: support@yourtemplate.com
- **Include**: 
  - Detailed error description
  - Error messages/screenshots
  - Steps to reproduce
  - Browser and OS information
  - Node.js and npm versions

## 💡 Prevention Tips

### Best Practices

1. **Keep Dependencies Updated**: Regularly update npm packages
2. **Use Git**: Commit changes frequently
3. **Test Locally**: Always test before deploying
4. **Check Console**: Regularly check for errors
5. **Follow Conventions**: Stick to established patterns

### Code Quality

```javascript
// Use ESLint and Prettier
npm install --save-dev eslint prettier eslint-config-prettier

// Add to package.json scripts
"lint": "eslint src/**/*.{js,jsx}",
"format": "prettier --write src/**/*.{js,jsx,css,md}"
```

Remember: Most issues have simple solutions. Take a step back, read error messages carefully, and don't hesitate to ask for help! 🚀