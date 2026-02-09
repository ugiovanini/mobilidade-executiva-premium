import { motion } from "framer-motion";
import { Shield, Clock, Car, Star } from "lucide-react";

const services = [
  {
    icon: Car,
    title: "Transfer Executivo",
    description:
      "Deslocamentos corporativos com veículos categoria Black, motoristas treinados e pontualidade absoluta.",
  },
  {
    icon: Clock,
    title: "Agenda Recorrente",
    description:
      "Atendimento dedicado para executivos com rotas fixas diárias ou semanais. Sem surpresas, sem atrasos, mas ágil!",
  },
  {
    icon: Shield,
    title: "Segurança & Discrição",
    description:
      "Privacidade total, veículos rastreados, motoristas com antecedentes verificados e seguro completo.",
  },
  {
    icon: Star,
    title: "Experiência Premium",
    description:
      "Água, Wi-Fi, climatização perfeita e veículos impecáveis. O padrão que executivos A+ esperam.",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-sans text-sm tracking-[0.3em] uppercase mb-4">
            Nossos Serviços
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
            Mobilidade sob medida
          </h2>
          <div className="divider-gold w-24 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card-gradient border border-border rounded-lg p-8 hover:border-primary/30 transition-colors group glow-gold"
            >
              <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
