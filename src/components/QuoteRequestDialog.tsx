import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { format, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";

interface QuoteRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formatCep = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length > 5) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  return digits;
};

const generateDayOptions = () => {
  const options: { value: string; label: string }[] = [];
  for (let i = 0; i < 7; i++) {
    const date = addDays(new Date(), i);
    const label = i === 0 ? "Hoje" : i === 1 ? "Amanhã" : format(date, "EEEE", { locale: ptBR });
    options.push({ value: format(date, "dd/MM/yyyy"), label: `${label} (${format(date, "dd/MM")})` });
  }
  return options;
};

const generateTimeOptions = () => {
  const options: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      options.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  return options;
};

const QuoteRequestDialog = ({ open, onOpenChange }: QuoteRequestDialogProps) => {
  const [form, setForm] = useState({
    nome: "",
    origemRua: "",
    origemNumero: "",
    origemComplemento: "",
    origemCep: "",
    destinoRua: "",
    destinoNumero: "",
    destinoComplemento: "",
    destinoCep: "",
    referencia: "",
    diaViagem: "",
    horarioChegada: "",
  });

  const dayOptions = generateDayOptions();
  const timeOptions = generateTimeOptions();

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.nome.trim() || !form.origemRua.trim() || !form.origemNumero.trim() || !form.origemCep.trim() || !form.destinoRua.trim() || !form.destinoNumero.trim() || !form.destinoCep.trim() || !form.diaViagem || !form.horarioChegada) {
      toast({ title: "Campos obrigatórios", description: "Preencha todos os campos obrigatórios.", variant: "destructive" });
      return;
    }

    const cepRegex = /^\d{5}-\d{3}$/;
    if (!cepRegex.test(form.origemCep) || !cepRegex.test(form.destinoCep)) {
      toast({ title: "CEP inválido", description: "Formato esperado: 99999-999", variant: "destructive" });
      return;
    }

    const msg = [
      `*Solicitação de Orçamento*`,
      ``,
      `*Nome:* ${form.nome}`,
      ``,
      `*Origem:*`,
      `Rua: ${form.origemRua}, ${form.origemNumero}${form.origemComplemento ? ` - ${form.origemComplemento}` : ""}`,
      `CEP: ${form.origemCep}`,
      ``,
      `*Destino:*`,
      `Rua: ${form.destinoRua}, ${form.destinoNumero}${form.destinoComplemento ? ` - ${form.destinoComplemento}` : ""}`,
      `CEP: ${form.destinoCep}`,
      form.referencia ? `\n*Referência:* ${form.referencia}` : "",
      ``,
      `*Dia da viagem:* ${form.diaViagem}`,
      `*Chegue às:* ${form.horarioChegada}`,
    ].filter(Boolean).join("\n");

    const phone = "5511983544301";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

    // Use window.location.href to navigate directly, avoiding COOP blocking in Safari/iframes
    window.location.href = url;

    setForm({ nome: "", origemRua: "", origemNumero: "", origemComplemento: "", origemCep: "", destinoRua: "", destinoNumero: "", destinoComplemento: "", destinoCep: "", referencia: "", diaViagem: "", horarioChegada: "" });
    onOpenChange(false);
  };

  const inputClass = "bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-foreground">
            Solicitar <span className="text-gold-gradient">Orçamento</span>
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Preencha os dados abaixo para receber seu orçamento personalizado.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          {/* Nome */}
          <div className="space-y-1.5">
            <Label htmlFor="quote_nome" className="text-foreground text-sm font-medium">Nome completo *</Label>
            <Input id="quote_nome" className={inputClass} value={form.nome} onChange={(e) => update("nome", e.target.value)} maxLength={100} placeholder="Seu nome completo" name="quote_nome" autoComplete="name" />
          </div>

          {/* Origem = shipping */}
          <fieldset className="space-y-3">
            <legend className="text-primary text-xs tracking-[0.2em] uppercase font-semibold">Endereço de Origem/Partida</legend>
            <div className="space-y-1.5">
              <Label htmlFor="quote_origem_rua" className="text-foreground text-sm">Rua *</Label>
              <Input id="quote_origem_rua" className={inputClass} value={form.origemRua} onChange={(e) => update("origemRua", e.target.value)} maxLength={60} placeholder="Nome da rua de origem/partida" name="quote_origem_rua" autoComplete="shipping address-line1" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="quote_origem_numero" className="text-foreground text-sm">Número *</Label>
                <Input id="quote_origem_numero" className={inputClass} value={form.origemNumero} onChange={(e) => update("origemNumero", e.target.value.replace(/\D/g, "").slice(0, 6))} maxLength={6} placeholder="Nº" inputMode="numeric" name="quote_origem_numero" autoComplete="shipping address-line2" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="quote_origem_complemento" className="text-foreground text-sm">Complemento</Label>
                <Input id="quote_origem_complemento" className={inputClass} value={form.origemComplemento} onChange={(e) => update("origemComplemento", e.target.value)} maxLength={20} placeholder="Apto, sala..." name="quote_origem_complemento" autoComplete="shipping address-line3" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="quote_origem_cep" className="text-foreground text-sm">CEP *</Label>
              <Input id="quote_origem_cep" className={inputClass} value={form.origemCep} onChange={(e) => update("origemCep", formatCep(e.target.value))} maxLength={9} placeholder="99999-999" inputMode="numeric" name="quote_origem_cep" autoComplete="shipping postal-code" />
            </div>
          </fieldset>

          {/* Destino – Safari: "search" in name prevents autofill heuristic */}
          <fieldset className="space-y-3">
            <legend className="text-primary text-xs tracking-[0.2em] uppercase font-semibold">Endereço de Destino/Chegada</legend>
            <div className="space-y-1.5">
              <Label htmlFor="dest_search_rua" className="text-foreground text-sm">Rua *</Label>
              <Input id="dest_search_rua" className={inputClass} value={form.destinoRua} onChange={(e) => update("destinoRua", e.target.value)} maxLength={60} placeholder="Informe o local de chegada" name="dest_search_rua" autoComplete="off" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="dest_search_num" className="text-foreground text-sm">Número *</Label>
                <Input id="dest_search_num" className={inputClass} value={form.destinoNumero} onChange={(e) => update("destinoNumero", e.target.value.replace(/\D/g, "").slice(0, 6))} maxLength={6} placeholder="Nº" inputMode="numeric" name="dest_search_num" autoComplete="off" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="dest_search_comp" className="text-foreground text-sm">Complemento</Label>
                <Input id="dest_search_comp" className={inputClass} value={form.destinoComplemento} onChange={(e) => update("destinoComplemento", e.target.value)} maxLength={20} placeholder="Apto, sala..." name="dest_search_comp" autoComplete="off" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="dest_search_cep" className="text-foreground text-sm">CEP *</Label>
              <Input id="dest_search_cep" className={inputClass} value={form.destinoCep} onChange={(e) => update("destinoCep", formatCep(e.target.value))} maxLength={9} placeholder="99999-999" inputMode="numeric" name="dest_search_cep" autoComplete="off" />
            </div>
          </fieldset>

          {/* Referência */}
          <div className="space-y-1.5">
            <Label className="text-foreground text-sm">Referência</Label>
            <Textarea className={`${inputClass} min-h-[60px] resize-none`} value={form.referencia} onChange={(e) => update("referencia", e.target.value)} maxLength={200} placeholder="Ponto de referência, observações..." />
          </div>

          {/* Dia da viagem + Chegue às */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-foreground text-sm">Dia da viagem *</Label>
              <Select value={form.diaViagem} onValueChange={(v) => update("diaViagem", v)}>
                <SelectTrigger className={inputClass}>
                  <SelectValue placeholder="Selecione o dia" />
                </SelectTrigger>
                <SelectContent>
                  {dayOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-foreground text-sm">Chegue às *</Label>
              <Select value={form.horarioChegada} onValueChange={(v) => update("horarioChegada", v)}>
                <SelectTrigger className={inputClass}>
                  <SelectValue placeholder="Horário" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <button type="submit" className="w-full bg-gold-gradient text-primary-foreground py-3.5 rounded-sm text-sm font-semibold font-sans tracking-wide hover:opacity-90 transition-opacity">
            Enviar Solicitação
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteRequestDialog;
