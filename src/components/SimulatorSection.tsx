import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Calculator, Fuel, TrendingUp } from "lucide-react";

const SimulatorSection = () => {
  const [dias, setDias] = useState(22);
  const [kmDia, setKmDia] = useState(300);
  const [taxaOcupacao, setTaxaOcupacao] = useState(85);
  const [receitaKm, setReceitaKm] = useState(3.5);
  const [combustivel, setCombustivel] = useState<"alcool" | "gasolina">("alcool");

  const resultado = useMemo(() => {
    const kmTotalMes = dias * kmDia;
    const kmProdDia = kmDia * (taxaOcupacao / 100);
    const kmProdMes = dias * kmProdDia;
    const receitaBruta = kmProdMes * receitaKm;

    const custosFixos = 400 + 4200 + 800; // lavagem + aluguel + outros

    let custoVariavel: number;
    if (combustivel === "alcool") {
      custoVariavel = (kmTotalMes / 8.3) * 4.8;
    } else {
      custoVariavel = (kmTotalMes / 11.8) * 5.5;
    }

    const custoTotal = custosFixos + custoVariavel;
    const lucro = receitaBruta - custoTotal;
    const margem = receitaBruta > 0 ? (lucro / receitaBruta) * 100 : 0;

    return { kmTotalMes, kmProdMes, receitaBruta, custosFixos, custoVariavel, custoTotal, lucro, margem };
  }, [dias, kmDia, taxaOcupacao, receitaKm, combustivel]);

  const formatBRL = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <section id="simulador" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-sans text-sm tracking-[0.3em] uppercase mb-4">
            Simulador Financeiro
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
            Projeção de rentabilidade
          </h2>
          <p className="font-sans text-muted-foreground max-w-xl mx-auto">
            Simule diferentes cenários e veja a viabilidade financeira da operação executiva premium.
          </p>
          <div className="divider-gold w-24 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Inputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card-gradient border border-border rounded-lg p-8 space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="text-primary" size={20} />
              <h3 className="font-serif text-lg font-semibold text-foreground">Parâmetros</h3>
            </div>

            <InputSlider label="Dias trabalhados/mês" value={dias} min={15} max={30} onChange={setDias} suffix=" dias" />
            <InputSlider label="KM total diário" value={kmDia} min={100} max={500} step={10} onChange={setKmDia} suffix=" km" />
            <InputSlider label="Taxa de ocupação" value={taxaOcupacao} min={50} max={100} onChange={setTaxaOcupacao} suffix="%" />
            <InputSlider label="Receita por KM produtivo" value={receitaKm} min={2} max={7} step={0.1} onChange={setReceitaKm} prefix="R$ " />

            <div>
              <label className="font-sans text-sm text-muted-foreground mb-2 block">Combustível</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setCombustivel("alcool")}
                  className={`flex-1 py-2.5 rounded-sm text-sm font-sans font-medium transition-all ${
                    combustivel === "alcool"
                      ? "bg-gold-gradient text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  Álcool
                </button>
                <button
                  onClick={() => setCombustivel("gasolina")}
                  className={`flex-1 py-2.5 rounded-sm text-sm font-sans font-medium transition-all ${
                    combustivel === "gasolina"
                      ? "bg-gold-gradient text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  Gasolina
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card-gradient border border-border rounded-lg p-8 space-y-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="text-primary" size={20} />
              <h3 className="font-serif text-lg font-semibold text-foreground">Resultado Mensal</h3>
            </div>

            <ResultRow label="KM total/mês" value={`${resultado.kmTotalMes.toLocaleString("pt-BR")} km`} />
            <ResultRow label="KM produtivo/mês" value={`${resultado.kmProdMes.toLocaleString("pt-BR")} km`} />
            <div className="divider-gold w-full" />
            <ResultRow label="Receita bruta" value={formatBRL(resultado.receitaBruta)} highlight />
            <ResultRow label="Custos fixos" value={formatBRL(resultado.custosFixos)} />
            <ResultRow label={`Combustível (${combustivel})`} value={formatBRL(resultado.custoVariavel)} />
            <ResultRow label="Custo total" value={formatBRL(resultado.custoTotal)} />
            <div className="divider-gold w-full" />

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-5">
              <div className="flex justify-between items-center mb-1">
                <span className="font-sans text-sm text-muted-foreground">Lucro operacional</span>
                <span className={`font-sans text-2xl font-bold ${resultado.lucro >= 0 ? "text-primary" : "text-destructive"}`}>
                  {formatBRL(resultado.lucro)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-sans text-xs text-muted-foreground">Margem</span>
                <span className={`font-sans text-sm font-medium ${resultado.margem >= 0 ? "text-primary" : "text-destructive"}`}>
                  {resultado.margem.toFixed(1)}%
                </span>
              </div>
            </div>

            <p className="font-sans text-xs text-muted-foreground mt-2">
              * Valores estimados antes da taxa da plataforma. Simulação baseada em premissas editáveis.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const InputSlider = ({
  label, value, min, max, step = 1, onChange, prefix = "", suffix = "",
}: {
  label: string; value: number; min: number; max: number; step?: number;
  onChange: (v: number) => void; prefix?: string; suffix?: string;
}) => (
  <div>
    <div className="flex justify-between mb-2">
      <label className="font-sans text-sm text-muted-foreground">{label}</label>
      <span className="font-sans text-sm font-medium text-foreground">
        {prefix}{typeof value === "number" && step < 1 ? value.toFixed(1) : value}{suffix}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-1.5 rounded-full appearance-none bg-secondary cursor-pointer accent-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer"
    />
  </div>
);

const ResultRow = ({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex justify-between items-center">
    <span className="font-sans text-sm text-muted-foreground">{label}</span>
    <span className={`font-sans text-sm font-medium ${highlight ? "text-primary text-base" : "text-foreground"}`}>
      {value}
    </span>
  </div>
);

export default SimulatorSection;
