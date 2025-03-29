'use client';

import { cn } from '@/lib/utils';
import HelpCanadaLogo from '@/public/logos/logo_canada.png';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonVariants } from '../ui/button';
import ContributionBadge from './ContributionBadge';
import { ThemeToggle } from './ThemeToggle';
import UserDropdown from './UserDropdown';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

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
          href="/"
          className={cn('text-muted-foreground hover:text-foreground transition', {
            'text-foreground': pathname === '/',
          })}
        >
          Products
        </Link>
        <Link
          href="/contributions"
          className={cn('text-muted-foreground hover:text-foreground transition', {
            'text-foreground': pathname === '/contributions',
          })}
        >
          Contributions
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <ContributionBadge />

        <ThemeToggle />

        {session?.user
          ? (
              <UserDropdown
                email={session.user.email as string}
                name={session.user.name as string}
                image={session.user.image as string}
              />
            )
          : (
              <Link
                href="/login"
                className={buttonVariants({ variant: 'outline', size: 'lg' })}
              >
                Login
              </Link>
            )}
      </div>
    </nav>
  );
}
