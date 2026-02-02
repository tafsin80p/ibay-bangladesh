import { MapPin, Clock, Star } from 'lucide-react';
import { Product } from '@/types/product';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const conditionColors: Record<string, string> = {
  new: 'bg-success text-success-foreground',
  'like-new': 'bg-primary text-primary-foreground',
  good: 'bg-warning text-warning-foreground',
  fair: 'bg-muted text-muted-foreground',
};

const conditionLabels: Record<string, string> = {
  new: 'New',
  'like-new': 'Like New',
  good: 'Good',
  fair: 'Fair',
};

export function ProductCard({ product, onClick }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <article
      onClick={onClick}
      className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer border border-border hover:border-primary/20 animate-fade-in"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.isFeatured && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary text-primary-foreground gap-1">
              <Star className="h-3 w-3 fill-current" />
              Featured
            </Badge>
          </div>
        )}
        <Badge
          className={cn(
            'absolute top-3 right-3',
            conditionColors[product.condition]
          )}
        >
          {conditionLabels[product.condition]}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        <p className="text-xl font-bold text-primary mb-3">{formattedPrice}</p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            <span className="truncate max-w-[120px]">{product.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{formatDistanceToNow(product.postedAt, { addSuffix: true })}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
