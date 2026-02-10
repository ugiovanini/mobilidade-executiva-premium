import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface QuoteRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formatCep = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length > 5) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
  return digits;
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
    horario: "",
  });

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.nome.trim() || !form.origemRua.trim() || !form.origemNumero.trim() || !form.origemCep.trim() || !form.destinoRua.trim() || !form.destinoNumero.trim() || !form.destinoCep.trim() || !form.horario.trim()) {
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
      `*Horário desejado:* ${form.horario}`,
    ].filter(Boolean).join("\n");

    const phone = "5511983544301";
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(msg)}`;

    // Use link click to avoid Cross-Origin-Opener-Policy blocking in Safari/iframes
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setForm({ nome: "", origemRua: "", origemNumero: "", origemComplemento: "", origemCep: "", destinoRua: "", destinoNumero: "", destinoComplemento: "", destinoCep: "", referencia: "", horario: "" });
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
            <Label className="text-foreground text-sm font-medium">Nome completo *</Label>
            <Input className={inputClass} value={form.nome} onChange={(e) => update("nome", e.target.value)} maxLength={100} placeholder="Seu nome completo" name="nome_completo" autoComplete="name" />
          </div>

          {/* Origem */}
          <fieldset className="space-y-3">
            <legend className="text-primary text-xs tracking-[0.2em] uppercase font-semibold">Endereço de Origem</legend>
            <div className="space-y-1.5">
              <Label className="text-foreground text-sm">Rua *</Label>
              <Input className={inputClass} value={form.origemRua} onChange={(e) => update("origemRua", e.target.value)} maxLength={60} placeholder="Nome da rua de origem/partida" name="origem_rua" autoComplete="section-origem address-line1" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-foreground text-sm">Número *</Label>
                <Input className={inputClass} value={form.origemNumero} onChange={(e) => update("origemNumero", e.target.value.replace(/\D/g, "").slice(0, 6))} maxLength={6} placeholder="Nº" inputMode="numeric" name="origem_numero" autoComplete="section-origem address-line2" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-foreground text-sm">Complemento</Label>
                <Input className={inputClass} value={form.origemComplemento} onChange={(e) => update("origemComplemento", e.target.value)} maxLength={20} placeholder="Apto, sala..." name="origem_complemento" autoComplete="section-origem address-line3" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-foreground text-sm">CEP *</Label>
              <Input className={inputClass} value={form.origemCep} onChange={(e) => update("origemCep", formatCep(e.target.value))} maxLength={9} placeholder="99999-999" inputMode="numeric" name="origem_cep" autoComplete="section-origem postal-code" />
            </div>
          </fieldset>

          {/* Destino */}
          <fieldset className="space-y-3">
            <legend className="text-primary text-xs tracking-[0.2em] uppercase font-semibold">Endereço de Destino</legend>
            <div className="space-y-1.5">
              <Label className="text-foreground text-sm">Rua *</Label>
              <Input className={inputClass} value={form.destinoRua} onChange={(e) => update("destinoRua", e.target.value)} maxLength={60} placeholder="Nome da rua de destino/chegada" name="destino_rua" autoComplete="section-destino address-line1" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-foreground text-sm">Número *</Label>
                <Input className={inputClass} value={form.destinoNumero} onChange={(e) => update("destinoNumero", e.target.value.replace(/\D/g, "").slice(0, 6))} maxLength={6} placeholder="Nº" inputMode="numeric" name="destino_numero" autoComplete="section-destino address-line2" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-foreground text-sm">Complemento</Label>
                <Input className={inputClass} value={form.destinoComplemento} onChange={(e) => update("destinoComplemento", e.target.value)} maxLength={20} placeholder="Apto, sala..." name="destino_complemento" autoComplete="section-destino address-line3" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-foreground text-sm">CEP *</Label>
              <Input className={inputClass} value={form.destinoCep} onChange={(e) => update("destinoCep", formatCep(e.target.value))} maxLength={9} placeholder="99999-999" inputMode="numeric" name="destino_cep" autoComplete="section-destino postal-code" />
            </div>
          </fieldset>

          {/* Referência */}
          <div className="space-y-1.5">
            <Label className="text-foreground text-sm">Referência</Label>
            <Textarea className={`${inputClass} min-h-[60px] resize-none`} value={form.referencia} onChange={(e) => update("referencia", e.target.value)} maxLength={200} placeholder="Ponto de referência, observações..." />
          </div>

          {/* Horário */}
          <div className="space-y-1.5">
            <Label className="text-foreground text-sm">Horário desejado *</Label>
            <Input type="time" className={inputClass} value={form.horario} onChange={(e) => update("horario", e.target.value)} />
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
