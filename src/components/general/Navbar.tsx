import { ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { ThemeToggle } from './ThemeToggle';

export default async function Navbar() {
  return (
    <nav className="m-0 flex w-full items-center justify-between border-b border-gray-200 px-3 py-5">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <ImageIcon className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Logo</span>
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-6">
        <Link
          href="/features"
          className="text-muted-foreground hover:text-foreground transition"
        >
          Features
        </Link>
        <Link
          href="/pricing"
          className="text-muted-foreground hover:text-foreground transition"
        >
          Pricing
        </Link>
        <Link
          href="/contact-us"
          className="text-muted-foreground hover:text-foreground transition"
        >
          Contact Us
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <ThemeToggle />

        <Link
          href="/login"
          className={buttonVariants({ variant: 'outline', size: 'lg' })}
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
