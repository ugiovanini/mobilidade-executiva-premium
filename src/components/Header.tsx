import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Simulador", href: "#simulador" },
  { label: "Contato", href: "#contato" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <a href="#inicio" className="flex items-center gap-2">
          <span className="text-gold-gradient font-serif text-2xl font-bold tracking-wider">MEP</span>
          <span className="hidden sm:inline text-muted-foreground text-xs tracking-widest uppercase font-sans">
            Mobilidade Executiva Premium
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-sans text-muted-foreground hover:text-primary transition-colors tracking-wide uppercase"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contato"
            className="bg-gold-gradient text-primary-foreground px-6 py-2.5 rounded-sm text-sm font-semibold font-sans tracking-wide hover:opacity-90 transition-opacity"
          >
            Solicitar Serviço
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-card border-t border-border"
        >
          <div className="flex flex-col p-6 gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-sans text-muted-foreground hover:text-primary transition-colors tracking-wide uppercase"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setIsOpen(false)}
              className="bg-gold-gradient text-primary-foreground px-6 py-2.5 rounded-sm text-sm font-semibold font-sans tracking-wide text-center"
            >
              Solicitar Serviço
            </a>
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
};

export default Header;
