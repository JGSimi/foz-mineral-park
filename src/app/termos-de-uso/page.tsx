import type { Metadata } from "next";

import { site } from "@/lib/site";
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos que regem o uso do site do Foz Mineral Park e a compra de ingressos.",
};

export default function TermosPage() {
  const lastUpdate = "18 de abril de 2026";

  return (
    <section className="pt-24 pb-24 sm:pt-32">
      <Container size="md">
        <p className="text-xs uppercase tracking-[0.22em] text-amethyst-700">
          Institucional
        </p>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Termos de Uso</h1>
        <p className="mt-3 text-sm text-quartz-500">
          Última atualização: {lastUpdate}.
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-quartz-700">
          <Block title="1. Aceitação">
            <p>
              Ao acessar este site, você concorda com estes Termos e com a{" "}
              <a href="/politica-de-privacidade" className="underline">
                Política de Privacidade
              </a>
              . Se não concordar, por favor não utilize os serviços.
            </p>
          </Block>

          <Block title="2. Sobre o serviço">
            <p>
              Este site pertence a {site.company.legalName}, CNPJ{" "}
              {site.company.cnpj}, e tem o propósito de apresentar o parque,
              possibilitar a compra de ingressos e intermediar o contato entre
              visitantes e a equipe.
            </p>
          </Block>

          <Block title="3. Compra de ingressos">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                O ingresso é pessoal, intransferível após emissão e dá acesso
                único ao parque na data escolhida.
              </li>
              <li>
                Cancelamento com reembolso integral é aceito até 7 dias antes
                da data da visita. Após esse prazo, oferecemos remarcação
                gratuita por até 90 dias.
              </li>
              <li>
                Meia-entrada e gratuidades são garantidas mediante comprovação
                documental na recepção.
              </li>
              <li>
                Em caso de fechamento por força maior (clima severo, queda de
                energia, ordem das autoridades), é garantida a remarcação sem
                custo.
              </li>
            </ul>
          </Block>

          <Block title="4. Regras de visitação">
            <ul className="list-disc space-y-2 pl-5">
              <li>
                É proibido tocar nas peças em exposição, salvo quando indicado.
              </li>
              <li>
                Bebidas e alimentos não podem ser consumidos nas áreas de
                acervo.
              </li>
              <li>
                Fotos para uso pessoal são permitidas. Para uso comercial, é
                necessária autorização prévia por escrito.
              </li>
              <li>
                A direção se reserva o direito de encerrar a visita de quem
                descumpra regras ou coloque em risco o acervo e outros
                visitantes.
              </li>
            </ul>
          </Block>

          <Block title="5. Propriedade intelectual">
            <p>
              Marcas, nome, logotipo, textos, imagens e layout deste site são
              de titularidade de {site.company.legalName}. É vedado o uso sem
              autorização.
            </p>
          </Block>

          <Block title="6. Limitação de responsabilidade">
            <p>
              Nos esforçamos para manter o site disponível e seguro, mas não
              garantimos ausência absoluta de erros ou interrupções. O uso do
              site é por conta e risco do usuário.
            </p>
          </Block>

          <Block title="7. Foro">
            <p>
              Fica eleito o foro da comarca de Foz do Iguaçu/PR para dirimir
              eventuais controvérsias decorrentes destes Termos.
            </p>
          </Block>

          <Block title="8. Contato">
            <p>
              Dúvidas sobre estes Termos:{" "}
              <a href={`mailto:${site.contact.email}`} className="underline">
                {site.contact.email}
              </a>
              .
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
