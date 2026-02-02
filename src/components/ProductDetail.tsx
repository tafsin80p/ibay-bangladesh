import { MapPin, Clock, User, MessageCircle, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, CATEGORIES } from '@/types/product';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

interface ProductDetailProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
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

export function ProductDetail({ product, open, onClose }: ProductDetailProps) {
  const [currentImage, setCurrentImage] = useState(0);

  if (!product) return null;

  const formattedPrice = new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 0,
  }).format(product.price);

  const category = CATEGORIES.find((c) => c.id === product.category);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Gallery */}
          <div className="relative bg-secondary aspect-square md:aspect-auto md:min-h-[400px]">
            <img
              src={product.images[currentImage]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-card transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCurrentImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-card transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all',
                    idx === currentImage ? 'bg-primary w-4' : 'bg-card/60'
                  )}
                />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="p-6">
            <DialogHeader className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="gap-1">
                  {category?.icon} {category?.label}
                </Badge>
                <Badge className={conditionColors[product.condition]}>
                  {conditionLabels[product.condition]}
                </Badge>
              </div>
              <DialogTitle className="text-xl font-bold text-foreground">
                {product.title}
              </DialogTitle>
            </DialogHeader>

            <p className="text-3xl font-bold text-primary mb-6">{formattedPrice}</p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{product.location}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <span>Posted {formatDistanceToNow(product.postedAt, { addSuffix: true })}</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-foreground mb-2">Description</h4>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Seller Info */}
            <div className="bg-secondary rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{product.sellerName}</p>
                  <p className="text-sm text-muted-foreground">Seller</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button className="flex-1 gap-2" size="lg">
                <MessageCircle className="h-5 w-5" />
                Message
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Phone className="h-5 w-5" />
                Call
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
