# 🚀 Setup Guide

This guide will help you get the LUXE Premium E-Commerce Template up and running on your local machine.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 16.0 or higher)
- **npm** (usually comes with Node.js)
- **Git** (for cloning the repository)

### Check Your Installation

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Git version
git --version
```

## 📥 Installation

### Step 1: Clone the Repository

```bash
# Clone the repository (replace with your actual repo URL)
git clone https://github.com/yourusername/luxe-ecommerce-template.git

# Navigate to the project directory
cd luxe-ecommerce-template
```

### Step 2: Install Dependencies

```bash
# Install all required dependencies
npm install
```

This will install all the packages listed in `package.json`:

- React 18
- React DOM
- React Router DOM
- Framer Motion
- Tailwind CSS
- Vite
- Lucide React
- And more...

### Step 3: Start Development Server

```bash
# Start the development server
npm run dev
```

The development server will start at `http://localhost:5173`

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the development server with hot reload |
| `npm run build` | Builds the app for production |
| `npm run preview` | Preview the production build locally |
| `npm test` | Runs the test suite |

## 🔧 Environment Setup

### VS Code Extensions (Recommended)

For the best development experience, install these VS Code extensions:

1. **ES7+ React/Redux/React-Native snippets**
2. **Tailwind CSS IntelliSense**
3. **Prettier - Code formatter**
4. **Auto Rename Tag**
5. **Bracket Pair Colorizer**

### Tailwind CSS IntelliSense Setup

Add this to your VS Code settings (`settings.json`):

```json
{
  "tailwindCSS.includeLanguages": {
    "javascript": "javascript",
    "html": "HTML"
  },
  "tailwindCSS.experimental.classRegex": [
    "tw`([^`]*)",
    "tw=\"([^\"]*)",
    "tw={\"([^\"}]*)",
    "tw\\.\\w+`([^`]*)",
    "tw\\(.*?\\)`([^`]*)"
  ]
}
```

## 🎨 Project Structure

Here's what you'll find in the project:

```
luxe-ecommerce/
├── public/                 # Static assets
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── components/         # React components
│   │   ├── common/        # Shared components
│   │   │   ├── CustomCursor.jsx
│   │   │   └── Notifications.jsx
│   │   ├── layout/        # Layout components
│   │   │   ├── header.jsx
│   │   │   ├── footer.jsx
│   │   │   └── layout.jsx
│   │   └── ui/            # UI components
│   ├── context/           # React Context
│   │   ├── CartContext.jsx
│   │   ├── ThemeContext.jsx
│   │   ├── ProductContext.jsx
│   │   ├── WishlistContext.jsx
│   │   ├── AuthContext.jsx
│   │   └── CursorContext.jsx
│   ├── hooks/             # Custom hooks
│   │   ├── useCart.js
│   │   ├── useTheme.js
│   │   ├── useProducts.js
│   │   ├── useWishlist.js
│   │   ├── useAuth.js
│   │   └── useCursor.js
│   ├── pages/             # Page components
│   │   ├── HomePage.jsx
│   │   ├── ShopPage.jsx
│   │   ├── ProductPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── WishlistPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── FAQPage.jsx
│   │   ├── ShippingPage.jsx
│   │   └── ReturnsPage.jsx
│   ├── App.css           # Global styles
│   ├── App.jsx           # Main App component
│   ├── index.css         # Tailwind imports
│   └── main.jsx          # React entry point
├── docs/                 # Documentation
├── tailwind.config.js    # Tailwind configuration
├── vite.config.js        # Vite configuration
├── package.json          # Dependencies and scripts
└── README.md             # Project overview
```

## 🎛️ Configuration Files

### Tailwind Configuration (`tailwind.config.js`)

The Tailwind config is pre-configured with:
- Custom color palette
- Extended spacing
- Custom fonts
- Responsive breakpoints

### Vite Configuration (`vite.config.js`)

Check if you have a `vite.config.js` file in your root directory. If not, create one:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
```

## 🛠️ Development Tips

### Hot Reload

The development server supports hot module replacement (HMR), so your changes will be reflected immediately without refreshing the page.

### Component Development

- Each component is in its own file
- Use the existing component structure as a template
- Follow the naming conventions (PascalCase for components)

### Styling

- Use Tailwind classes for styling
- Custom CSS can be added to `App.css` or component-specific CSS files
- Responsive design is built-in with Tailwind's breakpoint system

## 🐛 Common Issues

### Port Already in Use

If port 5173 is already in use:

```bash
# Kill the process using the port
npx kill-port 5173

# Or specify a different port
npm run dev -- --port 3000
```

### Node Modules Issues

If you encounter dependency issues:

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Tailwind CSS Not Working

Ensure your `index.css` includes Tailwind directives:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## ✅ Verify Installation

After setup, verify everything is working:

1. ✅ Development server starts without errors
2. ✅ Homepage loads with proper styling
3. ✅ Navigation works between pages
4. ✅ Animations and interactions work smoothly
5. ✅ Responsive design works on different screen sizes

## 🎉 Next Steps

Once your setup is complete:

1. Read the [Customization Guide](./CUSTOMIZATION.md)
2. Explore the [Features Documentation](./FEATURES.md)
3. Check out the [Deployment Guide](./DEPLOYMENT.md)

## 🆘 Getting Help

If you encounter any issues during setup:

1. Check the [Troubleshooting Guide](./TROUBLESHOOTING.md)
2. Review the error messages carefully
3. Contact support at support@yourtemplate.com

Happy coding! 🚀