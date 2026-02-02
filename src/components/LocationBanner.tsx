import { MapPin, Loader2 } from 'lucide-react';
import { DIVISIONS } from '@/types/product';
import { cn } from '@/lib/utils';

interface LocationBannerProps {
  detectedDivision: string | null;
  loading: boolean;
  selectedDivision: string;
  onSelectDivision: (division: string) => void;
}

export function LocationBanner({
  detectedDivision,
  loading,
  selectedDivision,
  onSelectDivision,
}: LocationBannerProps) {
  const detectedName = DIVISIONS.find((d) => d.id === detectedDivision)?.name;

  if (loading) {
    return (
      <div className="bg-accent border-b border-border py-3">
        <div className="container mx-auto px-4 flex items-center justify-center gap-2 text-accent-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Detecting your location...</span>
        </div>
      </div>
    );
  }

  if (detectedDivision && selectedDivision === 'all') {
    return (
      <div className="bg-accent border-b border-border py-3">
        <div className="container mx-auto px-4 flex items-center justify-center gap-2 flex-wrap">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm text-accent-foreground">
            We detected you're in <strong>{detectedName}</strong>.
          </span>
          <button
            onClick={() => onSelectDivision(detectedDivision)}
            className="text-sm font-medium text-primary hover:underline"
          >
            Show {detectedName} listings only
          </button>
        </div>
      </div>
    );
  }

  return null;
}
