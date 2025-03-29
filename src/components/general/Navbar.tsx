import HelpCanadaLogo from '@/public/logos/logo_canada.png';
import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { ThemeToggle } from './ThemeToggle';

export default async function Navbar() {
  return (
    <nav className="m-0 flex w-full items-center justify-between border-b border-gray-200 px-3 py-5">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-x-2">
          <Image src={HelpCanadaLogo} width={48} height={48} alt="HelpCanadaLogo" className="object-contain" />
          <span className="font-bold text-xl">
            <span>Help</span>
            <span className="text-primary">Canada</span>
          </span>
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-6">
        <Link
          href="/products"
          className="text-muted-foreground hover:text-foreground transition"
        >
          Products
        </Link>
        <Link
          href="/about"
          className="text-muted-foreground hover:text-foreground transition"
        >
          About
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
