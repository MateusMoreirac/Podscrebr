import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import heroBgMobile from "@/assets/hero-bg-mobile.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Skater Background */}
      <div className="absolute inset-0">
        <picture>
          {/* Se você tiver uma versão mobile específica, descomente e adicione aqui:
           <source media="(max-width: 768px)" srcSet={heroBgMobile} /> 
           */}
          <source media="(max-width: 768px)" srcSet={heroBgMobile} />
          <img
            src={heroBg}
            alt=""
            className="w-full h-full object-cover object-center opacity-50"
          />
        </picture>
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
          {/* Logo image */}
          <div className="animate-fade-up w-full flex justify-center mb-6" style={{ animationDelay: '0.2s' }}>
            <h1 className="sr-only">Podscre</h1>
            <img
              src="/logo.png"
              alt="Podscre"
              className="w-[85vw] max-w-[65rem] h-auto object-contain drop-shadow-[0_0_20px_hsl(120_100%_50%/0.6)]"
            />
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
    </section>
  );
}
