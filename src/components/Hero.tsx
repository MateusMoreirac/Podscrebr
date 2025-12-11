import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import skaterImage from "@/assets/skater-footer.png";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Skater Background */}
      <div className="absolute inset-0">
        <img
          src={skaterImage}
          alt=""
          className="w-full h-full object-cover object-center opacity-50"
        />
      </div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/50" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Crown icon with glow */}
          <div className="animate-fade-up mb-2" style={{ animationDelay: '0.1s' }}>
            <Crown className="w-16 h-16 md:w-20 md:h-20 text-primary neon-text drop-shadow-[0_0_20px_hsl(120_100%_50%/0.6)]" />
          </div>

          {/* Logo text with street font */}
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="font-brand text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] tracking-wider neon-text uppercase text-center break-all sm:break-normal">
              Podscre
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mb-8 mt-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            Estilo de rua autêntico para quem vive o rolê
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Button variant="neon" size="xl" asChild>
              <a href="#produtos">Ver Produtos</a>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="#sobre">Conhecer a Marca</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator - positioned at the very bottom of section */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
