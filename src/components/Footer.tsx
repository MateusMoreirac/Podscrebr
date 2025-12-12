import { Crown, Instagram, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

import skaterImage from "@/assets/skater-footer.png";

export function Footer() {
  return (
    <footer id="contato" className="relative bg-card border-t border-border overflow-hidden">
      {/* Skater Background */}
      <div className="absolute inset-0 opacity-20">
        <img
          src={skaterImage}
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo.png"
                alt="Podscre"
                className="h-20 w-auto object-contain"
              />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Streetwear autêntico para quem vive o rolê.
              Qualidade, estilo e atitude em cada peça.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-xl text-foreground mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-primary" />
              Links Rápidos
            </h3>
            <nav className="flex flex-col gap-2">
              <FooterLink href="#produtos">Produtos</FooterLink>
              <FooterLink href="#sobre">Sobre</FooterLink>
              <FooterLink href="#contato">Contato</FooterLink>

            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-xl text-foreground mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-primary" />
              Contato
            </h3>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="hover:border-primary hover:bg-primary/10 transition-all duration-300" asChild>
                <a href="https://www.instagram.com/podscrebr/?hl=pt-br" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="hover:border-primary hover:bg-primary/10 transition-all duration-300" asChild>
                <a href="https://api.whatsapp.com/send?phone=5584981735466&text=Oi%2C%20vim%20do%20site%20e%20gostaria%20de%20tirar%20algumas%20d%C3%BAvidas.." target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/50 mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Podscre. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
    >
      {children}
    </a>
  );
}
