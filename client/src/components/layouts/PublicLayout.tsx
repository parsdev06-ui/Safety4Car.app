import { ReactNode } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 font-bold text-xl text-primary">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                S4
              </div>
              <span className="hidden sm:inline">Safety4Car</span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/">
              <a className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Home
              </a>
            </Link>
            <Link href="/so-funktionierts">
              <a className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                So funktioniert's
              </a>
            </Link>
            <Link href="/preise">
              <a className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Preise
              </a>
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/booking/package">
              <a>
                <Button variant="default" size="sm">
                  Inspektion buchen
                </Button>
              </a>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="container flex flex-col gap-3 py-4">
              <Link href="/">
                <a className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Home
                </a>
              </Link>
              <Link href="/so-funktionierts">
                <a className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  So funktioniert's
                </a>
              </Link>
              <Link href="/preise">
                <a className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Preise
                </a>
              </Link>
              <Link href="/booking/package">
                <a>
                  <Button variant="default" size="sm" className="w-full">
                    Inspektion buchen
                  </Button>
                </a>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">Safety4Car</h3>
              <p className="text-sm text-muted-foreground">
                Professionelle Fahrzeuginspektionen für Sicherheit und Vertrauen.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Produkt</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/so-funktionierts">
                    <a className="hover:text-primary transition-colors">So funktioniert's</a>
                  </Link>
                </li>
                <li>
                  <Link href="/preise">
                    <a className="hover:text-primary transition-colors">Preise</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Unternehmen</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Über uns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Kontakt
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Rechtliches</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Datenschutz
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Impressum
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Safety4Car. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Twitter
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
