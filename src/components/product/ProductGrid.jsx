import React from 'react';
import ProductCard from './ProductCard';
import ProductListItem from './ProductListItem';
import SkeletonLoader from '../ui/SkeletonLoader';
import { Search } from 'lucide-react';
import NeuCard from '../ui/NeuCard';
import { useTheme } from '../../hooks/useTheme';

/**
 * Renders a grid or list of products or skeleton loaders.
 * @param {object} props - Component props.
 * @param {Array<object>} props.products - The array of product objects to display.
 * @param {boolean} [props.isLoading=false] - If true, displays skeleton loaders.
 * @param {string} [props.viewMode='grid'] - The view mode, either 'grid' or 'list'.
 */
const ProductGrid = ({ products, isLoading = false, viewMode = 'grid' }) => {
    const {t} = useTheme();

  if (isLoading) {
    return (
      <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" : "space-y-4"}>
        {[...Array(6)].map((_, i) => (
          <NeuCard key={i} className="overflow-hidden" t={t}>
            <SkeletonLoader className={viewMode === 'grid' ? "aspect-[4/3]" : "h-32"} />
            <div className="p-6">
              <SkeletonLoader className="h-6 mb-2" />
              <SkeletonLoader className="h-4 w-3/4 mb-3" />
              <SkeletonLoader className="h-4 w-1/2" />
            </div>
          </NeuCard>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <NeuCard className="inline-flex p-8 mb-6" t={t}>
          <Search className="w-16 h-16" style={{ color: t.textMuted }} />
        </NeuCard>
        <h3 className="text-2xl font-semibold mb-2" style={{ color: t.text }}>
          No Products Found
        </h3>
        <p style={{ color: t.textMuted }}>
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <ProductListItem key={product.id} product={product} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;