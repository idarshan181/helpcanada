'use client';

import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/useDebounce';
import { Mic, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Input } from '../ui/input';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  defaultValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, defaultValue = '' }) => {
  const [searchTerm, setSearchTerm] = useState(defaultValue);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      onSearch('');
    }
  };

  const handleVoiceSearch = () => {
    toast.warning('Voice Search', {
      description: 'Voice search is not available yet. Please type your search.',
      duration: 3000,
    });
  };

  return (
    <form onSubmit={e => e.preventDefault()} className="w-full">
      <div className="relative flex w-full max-w-3xl mx-auto">
        <Input
          type="text"
          placeholder="Search Canadian products..."
          className="pr-20 h-11 text-base"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="absolute right-0 inset-y-0 flex items-center">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-full aspect-square rounded-none text-muted-foreground hover:text-foreground"
            onClick={handleVoiceSearch}
            aria-label="Search with voice"
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="h-full aspect-square rounded-none rounded-r-md text-muted-foreground hover:text-foreground"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
