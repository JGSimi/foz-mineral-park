"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

import { site } from "@/lib/site";

/**
 * Faixa fina acima da navbar (desktop-only) com endereço, indicador de
 * status em tempo real e placeholder de seletor de idioma. Mostra
 * "Aberto agora · até 18h" quando dentro do expediente, senão mostra
 * "Fechado · abre às 9h".
 */
export function UtilityStrip() {
  const [status, setStatus] = useState<{ open: boolean; label: string }>({
    open: true,
    label: "Aberto agora · até 18h",
  });

  useEffect(() => {
    const compute = () => {
      const now = new Date();
      const hour = now.getHours();
      const open = hour >= 9 && hour < 18;
      setStatus({
        open,
        label: open ? "Aberto agora · até 18h" : "Fechado · abre às 9h",
      });
    };
    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hidden h-[30px] items-center gap-5 border-b border-champagne-400/10 bg-obsidian-950 px-7 text-[0.6rem] uppercase tracking-[0.22em] text-pearl-100/55 md:flex">
      <span className="inline-flex items-center gap-1.5">
        <MapPin className="size-2.5 text-champagne-300" strokeWidth={1.4} />
        <span>
          {site.address.street.replace("Av. das Cataratas, ", "Av. das Cataratas · ")}{" "}
          · {site.address.neighborhood}
        </span>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span
          aria-hidden="true"
          className={
            "inline-block size-[5px] rounded-full " +
            (status.open
              ? "bg-[#6aa87a] shadow-[0_0_0_3px_rgba(106,168,122,0.18)]"
              : "bg-pearl-600 shadow-[0_0_0_3px_rgba(118,105,84,0.18)]")
          }
        />
        <span>{status.label}</span>
      </span>
      <span className="ml-auto inline-flex gap-[10px] text-pearl-100/40">
        <span className="text-champagne-300">PT</span>
        <span className="opacity-30">·</span>
        <span>EN</span>
        <span className="opacity-30">·</span>
        <span>ES</span>
      </span>
    </div>
  );
}
