"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { submitContact } from "@/lib/actions/contact";
import { useLocale } from "@/i18n/provider";
import { localePath } from "@/i18n/routing";
import { Button } from "./button";

export function ContactForm() {
  const { locale, dict } = useLocale();
  const f = dict.contact.form;
  const [isPending, start] = useTransition();
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(formData: FormData) {
    start(async () => {
      const result = await submitContact(formData);
      if (result.ok) {
        toast.success(f.toastSuccess, { description: f.toastSuccessDesc });
        setErrors({});
        const form = document.getElementById("contact-form") as HTMLFormElement | null;
        form?.reset();
      } else {
        toast.error(f.toastError, { description: result.message });
        setErrors(result.fieldErrors ?? {});
      }
    });
  }

  return (
    <form
      id="contact-form"
      action={handleSubmit}
      className="space-y-4 rounded-3xl border border-pearl-300 bg-pearl-50 p-8 shadow-luxe"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label={f.name}
          name="name"
          type="text"
          required
          autoComplete="name"
          error={errors.name}
        />
        <Field
          label={f.email}
          name="email"
          type="email"
          required
          autoComplete="email"
          error={errors.email}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label={f.phone}
          name="phone"
          type="tel"
          autoComplete="tel"
          error={errors.phone}
        />
        <div>
          <label
            htmlFor="subject"
            className="mb-1.5 flex items-baseline justify-between text-[0.8rem] font-medium text-obsidian-900"
          >
            {f.subject}
          </label>
          <select
            id="subject"
            name="subject"
            className="h-11 w-full rounded-xl border border-pearl-300 bg-pearl-50 px-3.5 text-sm text-obsidian-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition-all duration-300 focus:border-champagne-600 focus:outline-none focus:ring-[3px] focus:ring-champagne-400/28"
            defaultValue="visita"
          >
            <option value="visita">{f.subjects.visita}</option>
            <option value="ingressos">{f.subjects.ingressos}</option>
            <option value="agencias">{f.subjects.agencias}</option>
            <option value="escolas">{f.subjects.escolas}</option>
            <option value="imprensa">{f.subjects.imprensa}</option>
            <option value="outro">{f.subjects.outro}</option>
          </select>
        </div>
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-[0.8rem] font-medium text-obsidian-900"
        >
          {f.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          minLength={10}
          className="w-full rounded-xl border border-pearl-300 bg-pearl-50 p-3.5 text-sm text-obsidian-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition-all duration-300 focus:border-champagne-600 focus:outline-none focus:ring-[3px] focus:ring-champagne-400/28"
          placeholder={f.messagePlaceholder}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-[#9a2b3b]">{errors.message}</p>
        )}
      </div>
      <label className="flex items-start gap-2 text-xs text-pearl-700">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 size-4 rounded border-pearl-300 text-imperial-700 focus:ring-champagne-400"
        />
        <span>
          {f.consent.split(" ").slice(0, -2).join(" ")}{" "}
          <a
            href={
              locale === "pt"
                ? "/politica-de-privacidade"
                : "/politica-de-privacidade"
            }
            className="underline"
          >
            {dict.footer.privacyLink}
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
        {isPending ? f.submitting : f.submit}
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
        className="mb-1.5 flex items-baseline justify-between text-[0.8rem] font-medium text-obsidian-900"
      >
        <span>
          {label}
          {required && (
            <span aria-hidden="true" className="text-imperial-700"> *</span>
          )}
        </span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className={
          "h-11 w-full rounded-xl border border-pearl-300 bg-pearl-50 px-3.5 text-sm text-obsidian-900 transition-all duration-300 " +
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] " +
          "focus:border-champagne-600 focus:outline-none focus:ring-[3px] focus:ring-champagne-400/28 " +
          (error ? "border-[#b54456] bg-[#fdf5f4]" : "")
        }
      />
      {error && (
        <p className="mt-1.5 inline-flex items-center gap-1.5 text-[0.7rem] text-[#9a2b3b]">
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
