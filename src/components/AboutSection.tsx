import { Crown, Zap, Heart, Shield } from "lucide-react";

export function AboutSection() {
  return (
    <section id="sobre" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="animate-fade-up">
            <div className="flex items-center gap-2 mb-4">
              <Crown className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-widest">
                Sobre Nós
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display text-foreground mb-6">
              Nascido nas Ruas
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              A Podscre nasceu da cultura streetwear, do skate e do hip-hop.
              Criamos roupas para quem vive intensamente, para quem faz do rolê 
              um estilo de vida. Cada peça carrega a essência da rua, do movimento 
              e da autenticidade.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Nossa missão é vestir a atitude de quem não tem medo de ser diferente, 
              de quem faz acontecer e transforma a cidade em sua passarela.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-6">
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Estilo Único"
              description="Design exclusivo que você não encontra em outro lugar"
              delay="0.1s"
            />
            <FeatureCard
              icon={<Heart className="w-8 h-8" />}
              title="Feito com Amor"
              description="Cada peça é criada com paixão pela cultura street"
              delay="0.2s"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Qualidade Premium"
              description="Materiais de alta qualidade que duram"
              delay="0.3s"
            />
            <FeatureCard
              icon={<Crown className="w-8 h-8" />}
              title="Autenticidade"
              description="100% original, sem imitações"
              delay="0.4s"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}) {
  return (
    <div
      className="bg-card p-6 rounded-lg border border-border/50 card-hover animate-fade-up"
      style={{ animationDelay: delay }}
    >
      <div className="text-primary mb-4 neon-text">{icon}</div>
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
