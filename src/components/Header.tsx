import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export function Header({ cartCount, onCartClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-primary/10 transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          {/* Desktop Nav - Left */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="#produtos">Produtos</NavLink>
            <NavLink href="#sobre">Sobre</NavLink>
          </nav>

          {/* Logo - Center */}
          <Link to="/" className="flex items-center gap-2 hover-scale group">
            <img
              src="/logo.png"
              alt="Podscre"
              className="h-12 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_10px_hsl(120_100%_50%/0.6)]"
            />
          </Link>

          {/* Desktop Nav - Right */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="#contato">Contato</NavLink>
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-primary/10 transition-all duration-300"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                  {cartCount}
                </span>
              )}
            </Button>
          </nav>

          {/* Mobile Cart */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden relative hover:bg-primary/10 transition-all duration-300"
            onClick={onCartClick}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-4">
              <MobileNavLink href="#produtos" onClick={() => setIsMenuOpen(false)}>
                Produtos
              </MobileNavLink>
              <MobileNavLink href="#sobre" onClick={() => setIsMenuOpen(false)}>
                Sobre
              </MobileNavLink>
              <MobileNavLink href="#contato" onClick={() => setIsMenuOpen(false)}>
                Contato
              </MobileNavLink>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-primary relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
    >
      {children}
    </a>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="text-lg font-medium text-muted-foreground transition-all duration-300 hover:text-primary hover:translate-x-2 px-2 py-2"
    >
      {children}
    </a>
  );
}
