import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { CategoryTabs } from '@/components/CategoryTabs';
import { ProductGrid } from '@/components/ProductGrid';
import { ProductDetail } from '@/components/ProductDetail';
import { AddPostModal } from '@/components/AddPostModal';
import { LocationBanner } from '@/components/LocationBanner';
import { useLocation } from '@/hooks/useLocation';
import { mockProducts } from '@/data/mockProducts';
import { Product, ProductCategory, DIVISIONS } from '@/types/product';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAddPost, setShowAddPost] = useState(false);
  
  const { division: detectedDivision, loading: locationLoading } = useLocation();

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      // Search filter
      const matchesSearch = 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Division filter
      const matchesDivision = 
        selectedDivision === 'all' || product.division === selectedDivision;

      // Category filter
      const matchesCategory = 
        selectedCategory === 'all' || product.category === selectedCategory;

      return matchesSearch && matchesDivision && matchesCategory;
    });
  }, [searchQuery, selectedDivision, selectedCategory]);

  const selectedDivisionName = DIVISIONS.find((d) => d.id === selectedDivision)?.name;

  return (
    <div className="min-h-screen bg-background">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDivision={selectedDivision}
        onDivisionChange={setSelectedDivision}
        onAddPost={() => setShowAddPost(true)}
      />

      <LocationBanner
        detectedDivision={detectedDivision}
        loading={locationLoading}
        selectedDivision={selectedDivision}
        onSelectDivision={setSelectedDivision}
      />

      <CategoryTabs
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <main className="container mx-auto px-4 py-6">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {selectedCategory === 'all' ? 'All Apple Products' : 
                selectedCategory === 'iphone' ? 'iPhones' :
                selectedCategory === 'ipad' ? 'iPads' :
                selectedCategory === 'macbook' ? 'MacBooks' :
                selectedCategory === 'watch' ? 'Apple Watches' :
                selectedCategory === 'airpods' ? 'AirPods' : 'Accessories'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {filteredProducts.length} listings
              {selectedDivision !== 'all' && ` in ${selectedDivisionName}`}
            </p>
          </div>
        </div>

        <ProductGrid
          products={filteredProducts}
          onProductClick={setSelectedProduct}
        />
      </main>

      <ProductDetail
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <AddPostModal
        open={showAddPost}
        onClose={() => setShowAddPost(false)}
      />

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm"></span>
            </div>
            <span className="font-bold text-lg text-foreground">iBuySell</span>
          </div>
          <p className="text-muted-foreground text-sm">
            The #1 marketplace for Apple products in Bangladesh
          </p>
          <p className="text-muted-foreground text-xs mt-2">
            © 2025 iBuySell. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
