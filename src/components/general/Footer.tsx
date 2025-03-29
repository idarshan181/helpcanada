import Link from 'next/link';

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '#' },
      { label: 'Help Center', href: '#' },
      { label: 'Guides', href: '#' },
      { label: 'API Docs', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Legal', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="mb-0 mt-auto flex flex-row border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <Link href="#" className="text-xl font-bold tracking-tight">
                <span>Help</span>
                <span className="text-primary">Canada</span>
              </Link>
            </div>
            <p className="mb-4 max-w-xs text-sm text-muted-foreground">
              Buy Canadian – Build a solution to support local. Discover and shop products made by Canadian businesses, artisans, and producers amidst global uncertainty.
            </p>
          </div>

          {footerLinks.map((group, idx) => (
            <div key={idx}>
              <h3 className="mb-4 font-medium">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between border-t border-border pt-8 md:flex-row">
          <p className="mb-4 text-sm text-muted-foreground md:mb-0">
            ©
            {' '}
            {new Date().getFullYear()}
            {' '}
            HelpCanada. All rights reserved.
          </p>

          <div className="flex space-x-6">
            {/* Social Icons - Can update these links later */}
            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              <span className="sr-only">Twitter</span>
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675..." />
              </svg>
            </Link>

            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              <span className="sr-only">LinkedIn</span>
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239..." clipRule="evenodd" />
              </svg>
            </Link>

            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              <span className="sr-only">Instagram</span>
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013..." clipRule="evenodd" />
              </svg>
            </Link>

            <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              <span className="sr-only">GitHub</span>
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017..." clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
