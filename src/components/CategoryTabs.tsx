import { cn } from '@/lib/utils';
import { CATEGORIES, ProductCategory } from '@/types/product';
import { Layers } from 'lucide-react';

interface CategoryTabsProps {
  selectedCategory: ProductCategory | 'all';
  onCategoryChange: (category: ProductCategory | 'all') => void;
}

export function CategoryTabs({ selectedCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <div className="bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
          <button
            onClick={() => onCategoryChange('all')}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap',
              selectedCategory === 'all'
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-secondary text-secondary-foreground hover:bg-accent'
            )}
          >
            <Layers className="h-4 w-4" />
            All Products
          </button>
          {CATEGORIES.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap',
                  selectedCategory === cat.id
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-secondary text-secondary-foreground hover:bg-accent'
                )}
              >
                <IconComponent className="h-4 w-4" />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
