"use server";

import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Nome muito curto").max(120),
  email: z.string().trim().email("E-mail inválido").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.enum([
    "visita",
    "ingressos",
    "agencias",
    "escolas",
    "imprensa",
    "outro",
  ]),
  message: z.string().trim().min(10, "Conte um pouco mais").max(3000),
  consent: z.literal("on", {
    message: "Precisamos da sua autorização para responder.",
  }),
  honeypot: z.string().max(0).optional(),
});

type Result =
  | { ok: true }
  | { ok: false; message: string; fieldErrors?: Record<string, string> };

export async function submitContact(formData: FormData): Promise<Result> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString() ?? "form";
      fieldErrors[key] = issue.message;
    }
    return {
      ok: false,
      message: "Revise os campos destacados.",
      fieldErrors,
    };
  }

  if (parsed.data.honeypot) {
    // Bot detectado — descarta silenciosamente
    return { ok: true };
  }

  const resendKey = process.env.RESEND_API_KEY;
  const destination = process.env.CONTACT_EMAIL ?? "contato@fozmineralpark.com.br";

  if (!resendKey) {
    // Fallback: registra no log do servidor. Em produção, o Resend deve estar configurado.
    console.info("[contato] Nova mensagem (sem Resend):", {
      ...parsed.data,
      receivedAt: new Date().toISOString(),
    });
    return { ok: true };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: "Foz Mineral Park <site@fozmineralpark.com.br>",
        to: [destination],
        reply_to: parsed.data.email,
        subject: `[site] Contato: ${parsed.data.subject} — ${parsed.data.name}`,
        text: formatMessage(parsed.data),
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error("[contato] Falha no Resend:", response.status, body);
      return {
        ok: false,
        message:
          "Serviço de e-mail indisponível. Tente de novo em instantes ou nos chame no WhatsApp.",
      };
    }

    return { ok: true };
  } catch (err) {
    console.error("[contato] Erro inesperado:", err);
    return {
      ok: false,
      message: "Algo falhou do nosso lado. Por favor, tente pelo WhatsApp.",
    };
  }
}

function formatMessage(data: z.infer<typeof schema>) {
  return [
    `Nome: ${data.name}`,
    `E-mail: ${data.email}`,
    `Telefone: ${data.phone ?? "—"}`,
    `Assunto: ${data.subject}`,
    "",
    data.message,
  ].join("\n");
}
