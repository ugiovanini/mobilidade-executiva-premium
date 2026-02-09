import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contato" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-sans text-sm tracking-[0.3em] uppercase mb-4">
            Contato
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
            Fale com a <span className="text-gold-gradient">MEP</span>
          </h2>
          <p className="font-sans text-muted-foreground max-w-lg mx-auto">
            Entre em contato e descubra como elevar o padrão de mobilidade da sua empresa.
          </p>
          <div className="divider-gold w-24 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <ContactCard
            icon={Phone}
            title="Telefone"
            info="(11) 9 0000-0000"
            subtitle="Atendimento 24h"
          />
          <ContactCard
            icon={Mail}
            title="E-mail"
            info="contato@mep.com.br"
            subtitle="Resposta em até 2h"
          />
          <ContactCard
            icon={MapPin}
            title="Região"
            info="São Paulo - SP"
            subtitle="Grande São Paulo"
          />
        </div>
      </div>
    </section>
  );
};

const ContactCard = ({
  icon: Icon, title, info, subtitle,
}: {
  icon: React.ElementType; title: string; info: string; subtitle: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-card-gradient border border-border rounded-lg p-8 text-center hover:border-primary/30 transition-colors group"
  >
    <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
      <Icon className="text-primary" size={22} />
    </div>
    <h3 className="font-serif text-lg font-semibold text-foreground mb-1">{title}</h3>
    <p className="font-sans text-sm text-primary font-medium mb-1">{info}</p>
    <p className="font-sans text-xs text-muted-foreground">{subtitle}</p>
  </motion.div>
);

export default ContactSection;
