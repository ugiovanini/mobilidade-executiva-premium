import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import QuoteRequestDialog from "./QuoteRequestDialog";

const HeroSection = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);
  return (
    <>
    <QuoteRequestDialog open={quoteOpen} onOpenChange={setQuoteOpen} />
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Veículo executivo premium em São Paulo"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 text-center pt-20 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <p className="text-primary font-sans text-sm md:text-base tracking-[0.3em] uppercase mb-6">
            Transporte Executivo em São Paulo
          </p>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="text-foreground">Mobilidade</span>
            <br />
            <span className="text-gold-gradient">Executiva Premium</span>
          </h1>

          <p className="font-sans text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Excelência, conforto e pontualidade para executivos C-level e clientes 
            que exigem o mais alto padrão em transporte na capital paulista.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setQuoteOpen(true)}
              className="bg-gold-gradient text-primary-foreground px-10 py-4 rounded-sm text-base font-semibold font-sans tracking-wide hover:opacity-90 transition-opacity"
            >
              Solicitar Agora
            </button>
            <a
              href="#servicos"
              className="border border-gold text-foreground px-10 py-4 rounded-sm text-base font-sans tracking-wide hover:bg-primary/10 transition-colors"
            >
              Conheça Nossos Serviços
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-primary" size={28} />
      </motion.div>
    </section>
    </>
  );
};

export default HeroSection;
