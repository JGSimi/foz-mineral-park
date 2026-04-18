"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "./button";
import { submitContact } from "@/app/contato/actions";

export function ContactForm() {
  const [isPending, start] = useTransition();
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(formData: FormData) {
    start(async () => {
      const result = await submitContact(formData);
      if (result.ok) {
        toast.success("Mensagem recebida!", {
          description:
            "A gente responde pelo canal que você escolheu em até um dia útil.",
        });
        setErrors({});
        const form = document.getElementById("contact-form") as HTMLFormElement | null;
        form?.reset();
      } else {
        toast.error("Não conseguimos enviar agora.", {
          description: result.message,
        });
        setErrors(result.fieldErrors ?? {});
      }
    });
  }

  return (
    <form
      id="contact-form"
      action={handleSubmit}
      className="space-y-4 rounded-3xl border border-border bg-background p-8"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Seu nome"
          name="name"
          type="text"
          required
          autoComplete="name"
          error={errors.name}
        />
        <Field
          label="E-mail"
          name="email"
          type="email"
          required
          autoComplete="email"
          error={errors.email}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Telefone ou WhatsApp"
          name="phone"
          type="tel"
          autoComplete="tel"
          error={errors.phone}
        />
        <div>
          <label
            htmlFor="subject"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Assunto
          </label>
          <select
            id="subject"
            name="subject"
            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm focus:border-amethyst-500 focus:outline-none focus:ring-2 focus:ring-amethyst-200"
            defaultValue="visita"
          >
            <option value="visita">Planejar visita</option>
            <option value="ingressos">Ingressos</option>
            <option value="agencias">Agência de turismo</option>
            <option value="escolas">Grupo escolar</option>
            <option value="imprensa">Imprensa</option>
            <option value="outro">Outro</option>
          </select>
        </div>
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Como podemos ajudar?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          minLength={10}
          className="w-full rounded-xl border border-border bg-background p-3 text-sm focus:border-amethyst-500 focus:outline-none focus:ring-2 focus:ring-amethyst-200"
          placeholder="Quero visitar no dia X, somos Y pessoas..."
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-600">{errors.message}</p>
        )}
      </div>
      <label className="flex items-start gap-2 text-xs text-quartz-600">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 size-4 rounded border-border text-amethyst-700 focus:ring-amethyst-500"
        />
        <span>
          Concordo com o tratamento dos meus dados para resposta a este contato
          conforme a{" "}
          <a href="/politica-de-privacidade" className="underline">
            Política de Privacidade
          </a>
          .
        </span>
      </label>
      <input type="hidden" name="honeypot" />
      <Button
        type="submit"
        size="lg"
        variant="primary"
        disabled={isPending}
        className="w-full"
      >
        {isPending ? "Enviando..." : "Enviar mensagem"}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  required,
  autoComplete,
  error,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-foreground"
      >
        {label}
        {required && <span aria-hidden="true" className="text-amethyst-700"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm focus:border-amethyst-500 focus:outline-none focus:ring-2 focus:ring-amethyst-200"
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
