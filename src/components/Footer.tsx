const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="text-gold-gradient font-serif text-xl font-bold tracking-wider">MEP</span>
            <p className="font-sans text-xs text-muted-foreground mt-1 tracking-wider uppercase">
              Mobilidade Executiva Premium
            </p>
          </div>
          <div className="font-sans text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} MEP — Mobilidade Executiva Premium. Todos os direitos reservados.
          </div>
          <div className="flex gap-6">
            <a href="#inicio" className="font-sans text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide">
              Início
            </a>
            <a href="#servicos" className="font-sans text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide">
              Serviços
            </a>
            <a href="#contato" className="font-sans text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide">
              Contato
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
