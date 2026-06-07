# 🚀 Deployment Guide

This guide covers how to deploy your LUXE Premium E-Commerce Template to various hosting platforms.

## 🏗️ Build Process

Before deploying, you need to create a production build:

```bash
# Build for production
npm run build

# Preview the build locally (optional)
npm run preview
```

This creates a `dist/` folder with optimized files ready for deployment.

## 🌐 Deployment Platforms

### 1. Vercel (Recommended)

Vercel offers excellent performance and zero-config deployment for React apps.

#### Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Build your project
npm run build

# Deploy
vercel

# For production deployment
vercel --prod
```

#### Deploy via GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Deploy!

#### Custom Domain

1. Go to your project dashboard on Vercel
2. Click "Domains"
3. Add your custom domain
4. Update your DNS settings as instructed

### 2. Netlify

Netlify provides easy deployment with continuous integration.

#### Deploy via Drag & Drop

1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist` folder to the deploy area

#### Deploy via Git

1. Push code to GitHub/GitLab/Bitbucket
2. Go to Netlify dashboard
3. Click "New site from Git"
4. Connect your repository
5. Configure build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
6. Deploy!

#### Netlify Configuration

Create `netlify.toml` in your root directory:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### 3. GitHub Pages

Deploy your site directly from GitHub.

#### Setup

1. Install gh-pages package:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/your-repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // Replace with your repo name
})
```

4. Deploy:
```bash
npm run deploy
```

### 4. Firebase Hosting

Google Firebase provides fast and secure web hosting.

#### Setup

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login and initialize:
```bash
firebase login
firebase init hosting
```

3. Configure `firebase.json`:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

4. Deploy:
```bash
npm run build
firebase deploy
```

### 5. AWS S3 + CloudFront

For enterprise-level deployments with AWS.

#### Setup S3 Bucket

1. Create an S3 bucket
2. Enable static website hosting
3. Set bucket policy for public read access

#### Deploy to S3

```bash
# Install AWS CLI
npm install -g @aws-sdk/client-s3

# Build project
npm run build

# Sync to S3 (replace with your bucket name)
aws s3 sync dist/ s3://your-bucket-name --delete
```

#### CloudFront Configuration

1. Create CloudFront distribution
2. Set origin to your S3 bucket
3. Configure error pages for SPA routing
4. Set up SSL certificate

### 6. Docker Deployment

For containerized deployments.

#### Create Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Create nginx.conf

```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }
    }
}
```

#### Build and Run

```bash
# Build Docker image
docker build -t luxe-ecommerce .

# Run container
docker run -p 8080:80 luxe-ecommerce
```

## ⚙️ Environment Configuration

### Environment Variables

Create `.env.production` for production-specific variables:

```env
VITE_API_URL=https://your-api-url.com
VITE_PAYMENT_KEY=your-payment-key
VITE_ANALYTICS_ID=your-analytics-id
```

### Build Optimization

#### Vite Configuration

Update `vite.config.js` for production optimizations:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 5173,
  },
})
```

## 🔧 Performance Optimization

### Image Optimization

1. Compress images before deployment
2. Use modern formats (WebP, AVIF)
3. Implement lazy loading
4. Use responsive images

### Code Splitting

```jsx
// Lazy load components
import { lazy, Suspense } from 'react';

const ProductPage = lazy(() => import('./pages/ProductPage'));

// Use with Suspense
<Suspense fallback={<div>Loading...</div>}>
  <ProductPage />
</Suspense>
```

### Caching Strategy

Configure caching headers in your hosting platform:

```
# Cache static assets
Cache-Control: public, max-age=31536000

# Cache HTML with revalidation
Cache-Control: public, max-age=0, must-revalidate
```

## 🛡️ Security Headers

### CSP (Content Security Policy)

Add security headers to your deployment:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

## 🌍 CDN and Global Distribution

### Using a CDN

1. **Cloudflare**: Add your domain to Cloudflare for automatic CDN
2. **AWS CloudFront**: Configure distribution for S3 deployments
3. **Vercel/Netlify**: Built-in global CDN

### Performance Monitoring

Set up monitoring tools:

1. **Google Analytics**: Track user behavior
2. **Google PageSpeed Insights**: Monitor performance
3. **Lighthouse**: Automated auditing
4. **Sentry**: Error tracking

## 📊 Analytics and Tracking

### Google Analytics 4

Add to your `index.html`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID}}
        vercel-project-id: ${{ secrets.PROJECT_ID}}
        vercel-args: '--prod'
```

## 🧪 Pre-Deployment Checklist

Before deploying to production:

- [ ] All environment variables configured
- [ ] Images optimized and compressed
- [ ] Remove console.log statements
- [ ] Test build locally (`npm run build && npm run preview`)
- [ ] Check responsive design on all devices
- [ ] Test all navigation and interactions
- [ ] Verify SEO meta tags
- [ ] Set up error tracking
- [ ] Configure analytics
- [ ] Test performance with Lighthouse
- [ ] Set up monitoring and alerts

## 🔗 Custom Domain Setup

### DNS Configuration

For custom domains, update your DNS:

```
Type: CNAME
Name: www
Value: your-deployment-url.vercel.app

Type: A (or ALIAS)
Name: @
Value: your-server-ip or alias-target
```

### SSL Certificate

Most platforms provide automatic SSL:
- Vercel: Automatic SSL
- Netlify: Automatic SSL
- CloudFlare: Free SSL
- Firebase: Free SSL

## 🆘 Troubleshooting Deployment

### Common Issues

1. **Build Errors**: Check package.json and dependencies
2. **Routing Issues**: Configure redirects for SPA
3. **Environment Variables**: Ensure all required env vars are set
4. **Asset Loading**: Check base URL configuration
5. **Performance**: Optimize bundle size and images

### Debug Commands

```bash
# Check build output
npm run build

# Analyze bundle size
npx vite-bundle-analyzer dist

# Test production build locally
npm run preview
```

## 📞 Support

Need help with deployment?

1. Check platform-specific documentation
2. Review error logs and build output
3. Test locally first
4. Contact support at support@yourtemplate.com

Happy deploying! 🚀