import type { Metadata } from "next";

import { site } from "@/lib/site";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como o Foz Mineral Park trata os dados pessoais dos visitantes do site, em conformidade com a LGPD (Lei 13.709/18).",
};

export default function PrivacidadePage() {
  const lastUpdate = "18 de abril de 2026";

  return (
    <section className="pt-24 pb-24 sm:pt-32">
      <Container size="md" className="prose prose-quartz max-w-none">
        <p className="text-xs uppercase tracking-[0.22em] text-amethyst-700">
          Institucional
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">
          Política de Privacidade
        </h1>
        <p className="mt-3 text-sm text-quartz-500">
          Última atualização: {lastUpdate}. Controlador:{" "}
          {site.company.legalName}, CNPJ {site.company.cnpj}.
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-quartz-700">
          <Block title="1. Quem somos">
            <p>
              {site.company.legalName} ({site.name}) é um parque e museu de
              minerais em Foz do Iguaçu/PR. Esta política explica como tratamos
              os dados pessoais coletados por meio do site{" "}
              <a href={site.url} className="underline">
                {site.url}
              </a>
              , em conformidade com a Lei Geral de Proteção de Dados (Lei
              13.709/18).
            </p>
          </Block>

          <Block title="2. Dados que tratamos">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Dados de contato</strong> que você nos informa em
                formulários: nome, e-mail, telefone, mensagem e assunto.
              </li>
              <li>
                <strong>Dados de ingresso</strong> quando efetuar compra: nome,
                CPF (quando exigido pela fiscalização), e-mail, data escolhida
                e dados do pagamento (processados pelo gateway escolhido).
              </li>
              <li>
                <strong>Dados técnicos</strong> de navegação agregados e
                anônimos — página visitada, tempo de visita, tipo de
                dispositivo, país de acesso — coletados via Vercel Analytics,
                sem cookies persistentes e sem identificar pessoas.
              </li>
            </ul>
          </Block>

          <Block title="3. Para que usamos">
            <ul className="list-disc space-y-2 pl-5">
              <li>Responder ao seu contato e planejar sua visita.</li>
              <li>
                Emitir ingresso, voucher e cumprir obrigações fiscais e legais.
              </li>
              <li>Melhorar o site com base em métricas agregadas.</li>
              <li>
                Enviar, apenas mediante opt-in, conteúdo sobre o parque e
                promoções sazonais.
              </li>
            </ul>
          </Block>

          <Block title="4. Bases legais (art. 7º da LGPD)">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Execução de contrato</strong> para operar a compra de
                ingressos e o atendimento.
              </li>
              <li>
                <strong>Obrigação legal</strong> para emissão de nota fiscal e
                guarda de registros.
              </li>
              <li>
                <strong>Legítimo interesse</strong> para segurança do site e
                análise estatística agregada.
              </li>
              <li>
                <strong>Consentimento</strong> para comunicações de marketing,
                revogável a qualquer tempo.
              </li>
            </ul>
          </Block>

          <Block title="5. Compartilhamento">
            <p>
              Não vendemos seus dados. Compartilhamos apenas o mínimo
              necessário com:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Vercel Inc.</strong> — hospedagem e medição de
                performance (Vercel Analytics, sem PII).
              </li>
              <li>
                <strong>Resend.com</strong> — entrega dos e-mails enviados a
                partir do formulário de contato.
              </li>
              <li>
                <strong>Gateways de pagamento</strong> homologados no Brasil —
                processamento da compra de ingressos. Não armazenamos dados do
                cartão.
              </li>
              <li>
                <strong>Autoridades</strong> — quando exigido por lei ou ordem
                judicial.
              </li>
            </ul>
          </Block>

          <Block title="6. Transferência internacional">
            <p>
              Alguns fornecedores listados operam servidores fora do Brasil.
              Nesses casos, utilizamos empresas que adotam padrões
              internacionais reconhecidos de proteção de dados, conforme
              permitido pelo art. 33 da LGPD.
            </p>
          </Block>

          <Block title="7. Retenção">
            <p>
              Mantemos registros de contato por até 24 meses e registros de
              compra pelo prazo legal exigido pela Receita Federal. Você pode,
              a qualquer momento, pedir a exclusão de dados que não estejam
              sujeitos a retenção obrigatória.
            </p>
          </Block>

          <Block title="8. Seus direitos (art. 18 da LGPD)">
            <p>Você pode, a qualquer tempo, solicitar:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                confirmação de tratamento; acesso aos seus dados; correção;
              </li>
              <li>
                anonimização, bloqueio ou eliminação; portabilidade;
              </li>
              <li>
                informação sobre com quem compartilhamos; revogação do
                consentimento.
              </li>
            </ul>
            <p>
              Para exercer qualquer direito, escreva para{" "}
              <a
                href={`mailto:${site.contact.email}`}
                className="underline"
              >
                {site.contact.email}
              </a>
              .
            </p>
          </Block>

          <Block title="9. Cookies">
            <p>
              Usamos apenas cookies essenciais (funcionamento do site e
              segurança) e, com sua autorização, cookies analíticos para
              estatísticas agregadas via Vercel Analytics. O banner apresentado
              na sua primeira visita oferece opção para aceitar ou recusar.
            </p>
          </Block>

          <Block title="10. Segurança">
            <p>
              Adotamos medidas técnicas e organizacionais razoáveis para
              proteger seus dados: HTTPS forte, headers de segurança modernos,
              controle de acesso, logs de auditoria e rotação regular de
              credenciais.
            </p>
          </Block>

          <Block title="11. Encarregado (DPO)">
            <p>
              Nosso ponto de contato para assuntos de privacidade é{" "}
              <a href={`mailto:${site.contact.email}`} className="underline">
                {site.contact.email}
              </a>
              . Para denúncias à ANPD:{" "}
              <a
                href="https://www.gov.br/anpd"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                gov.br/anpd
              </a>
              .
            </p>
          </Block>

          <Block title="12. Alterações">
            <p>
              Podemos atualizar esta política. Mudanças relevantes serão
              destacadas nesta página com a nova data de atualização.
            </p>
          </Block>
        </div>
      </Container>
    </section>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl text-foreground">{title}</h2>
      <div className="mt-2 space-y-3">{children}</div>
    </div>
  );
}
