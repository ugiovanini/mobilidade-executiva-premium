import { motion } from "framer-motion";
import { Check } from "lucide-react";

const differentials = [
  "Veículos categoria Black (sedan executivo de luxo)",
  "Motoristas treinado executivo",
  "Pontualidade garantida, compromisso inegociável.",
  "Atendimento 24h para executivos e empresas",
  "Privacidade total, sigilo absoluto nas corridas",
  "Conforto premium: climatização, água, Wi-Fi",
  "Flexibilidade para demandas corporativas recorrentes",
];

const DifferentialsSection = () => {
  return (
    <section id="diferenciais" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-primary font-sans text-sm tracking-[0.3em] uppercase mb-4">
              Por que a MEP
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6">
              Diferenciais que
              <br />
              <span className="text-gold-gradient">fazem a diferença</span>
            </h2>
            <p className="font-sans text-muted-foreground leading-relaxed mb-8">
              A MEP foi projetada para atender um público que não aceita menos que excelência. 
              Cada detalhe, do veículo ao motorista, é pensado para proporcionar a melhor 
              experiência em mobilidade executiva de São Paulo.
            </p>
            <div className="divider-gold w-24 mb-8" />
            <a
              href="#contato"
              className="bg-gold-gradient text-primary-foreground px-8 py-3.5 rounded-sm text-sm font-semibold font-sans tracking-wide hover:opacity-90 transition-opacity inline-block"
            >
              Solicitar Orçamento
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            {differentials.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex items-start gap-4 bg-card-gradient border border-border rounded-lg p-4 hover:border-primary/30 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="text-primary" size={14} />
                </div>
                <p className="font-sans text-sm text-foreground">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DifferentialsSection;
