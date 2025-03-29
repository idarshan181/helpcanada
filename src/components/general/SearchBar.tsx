'use client';

import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/useDebounce';
import { Mic, Search } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Input } from '../ui/input';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  defaultValue?: string;
}

type SpeechRecognition = typeof window.SpeechRecognition;
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, defaultValue = '' }) => {
  const [searchTerm, setSearchTerm] = useState(defaultValue);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, isListening ? 500 : 300);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition
        = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript;
          setSearchTerm(transcript);
          setIsListening(false);
        };

        recognitionRef.current.onerror = () => {
          toast.error('Voice Search Failed', {
            description: 'Error occurred during voice recognition.',
          });
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      onSearch('');
    }
  };

  const handleVoiceSearch = () => {
    if (!recognitionRef.current) {
      toast.warning('Voice Search Not Supported', {
        description: 'Your browser does not support voice recognition.',
        duration: 3000,
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      toast.info('Listening...', {
        description: 'Please speak now.',
        duration: 2000,
      });
    }
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
            className={`h-11 w-11 transition-colors bg-none hover:none focus:none ${
              isListening ? 'text-primary' : 'text-muted-foreground'
            }`}
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
