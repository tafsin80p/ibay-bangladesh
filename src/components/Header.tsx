import { useState } from 'react';
import { Search, MapPin, Plus, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DIVISIONS } from '@/types/product';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDivision: string;
  onDivisionChange: (division: string) => void;
  onAddPost: () => void;
}

export function Header({
  searchQuery,
  onSearchChange,
  selectedDivision,
  onDivisionChange,
  onAddPost,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg"></span>
            </div>
            <span className="font-bold text-xl text-foreground">iBuySell</span>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center gap-3 flex-1 max-w-2xl mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search iPhone, MacBook, iPad..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-secondary border-0 focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
            <Select value={selectedDivision} onValueChange={onDivisionChange}>
              <SelectTrigger className="w-[180px] bg-secondary border-0">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                <SelectValue placeholder="All Bangladesh" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bangladesh</SelectItem>
                {DIVISIONS.map((div) => (
                  <SelectItem key={div.id} value={div.id}>
                    {div.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button onClick={onAddPost} className="gap-2">
              <Plus className="h-4 w-4" />
              Sell Item
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search Apple products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-secondary border-0"
              />
            </div>
            <Select value={selectedDivision} onValueChange={onDivisionChange}>
              <SelectTrigger className="w-full bg-secondary border-0">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                <SelectValue placeholder="All Bangladesh" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bangladesh</SelectItem>
                {DIVISIONS.map((div) => (
                  <SelectItem key={div.id} value={div.id}>
                    {div.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={onAddPost} className="w-full gap-2">
              <Plus className="h-4 w-4" />
              Sell Item
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
