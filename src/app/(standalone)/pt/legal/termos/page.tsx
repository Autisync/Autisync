import type { Metadata } from "next";
import LegalDocument, { type LegalSection } from "@/app/legal/LegalDocument";

const EN_URL = "https://www.autisync.com/legal/terms";
const URL = "https://www.autisync.com/pt/legal/termos";
const TITLE = "Termos de Serviço do Autisync CRM";
const DESCRIPTION =
    "Os termos que regem a utilização do Autisync CRM: contas, utilização aceitável, titularidade dos dados, canais de terceiros, pagamento e cessação.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: URL, languages: { en: EN_URL, pt: URL, "x-default": EN_URL } },
    openGraph: { type: "website", url: URL, siteName: "Autisync", title: TITLE, description: DESCRIPTION, locale: "pt_AO" },
    robots: { index: true, follow: true },
};

const LAST_UPDATED = "22 de setembro de 2026";

const sections: LegalSection[] = [
    {
        id: "what-it-is",
        title: "O que é o serviço",
        content: [
            {
                body: "O Autisync CRM dá a uma empresa uma única caixa de entrada para as conversas que mantém com os seus clientes através do WhatsApp, do Facebook Messenger, do Instagram, do e-mail e do seu próprio website, juntamente com os registos de contactos, tarefas e automações construídos em torno delas.",
            },
        ],
    },
    {
        id: "your-account",
        title: "A sua conta",
        content: [
            {
                list: [
                    "É responsável pelo que acontece na sua conta, incluindo o que fazem as pessoas que convidar para ela.",
                    "Mantenha as credenciais em segredo. Avise-nos sem demora se achar que foram expostas.",
                    "Tem de ter idade suficiente para celebrar contratos no seu país e poderes para vincular a empresa que está a registar.",
                ],
            },
        ],
    },
    {
        id: "acceptable-use",
        title: "O que não pode fazer com o serviço",
        content: [
            {
                list: [
                    "Enviar mensagens em massa não solicitadas, ou qualquer conteúdo proibido pelas regras da plataforma de destino. As mensagens enviadas através do WhatsApp, do Messenger e do Instagram estão também sujeitas às políticas da Meta, que se aplicam diretamente a si.",
                    "Enviar mensagens a pessoas que lhe pediram para parar.",
                    "Carregar ou transmitir qualquer conteúdo ilícito, ou qualquer conteúdo que não tenha o direito de enviar.",
                    "Tentar aceder aos dados de outra empresa, ou contornar a separação entre contas.",
                    "Revender o acesso ao serviço sem um acordo escrito connosco.",
                ],
            },
            { body: "Podemos suspender uma conta que viole estas regras e indicaremos o motivo." },
        ],
    },
    {
        id: "your-data",
        title: "Os seus dados continuam a ser seus",
        content: [
            {
                body: "Os seus contactos, conversas e ficheiros pertencem-lhe. Armazenamo-los e transmitimo-los por sua instrução, conforme descrito na política de privacidade. Não os vendemos, não os exploramos para publicidade nem os usamos para treinar modelos. Pode exportá-los ou eliminá-los, e eliminamos tudo no prazo de 30 dias após o encerramento da sua conta.",
            },
        ],
    },
    {
        id: "channels",
        title: "Canais de terceiros",
        content: [
            {
                body: "O WhatsApp, o Messenger, o Instagram e o e-mail são operados por outras empresas. A Autisync liga-se a eles, mas não os controla. Se uma plataforma alterar as suas regras, restringir uma conta ou sofrer uma interrupção, isso afeta o que o serviço consegue fazer e está fora do nosso controlo. Alguns canais impõem também os seus próprios limites — por exemplo, o período durante o qual pode responder a um cliente sem um modelo de mensagem pago.",
            },
        ],
    },
    {
        id: "availability",
        title: "Disponibilidade",
        content: [
            {
                body: "Procuramos manter o serviço em funcionamento e avisar com antecedência antes de manutenções planeadas. Não garantimos disponibilidade ininterrupta, salvo se um acordo escrito separado o previr.",
            },
        ],
    },
    {
        id: "payment",
        title: "Pagamento",
        content: [
            {
                body: "As tarifas, o período de faturação e o pré-aviso constam do seu plano ou nota de encomenda. As tarifas são pagas antecipadamente, salvo acordo em contrário. Avisaremos com pelo menos 30 dias de antecedência antes de uma alteração de preço produzir efeitos.",
            },
        ],
    },
    {
        id: "ending",
        title: "Cessação",
        content: [
            {
                body: "Pode encerrar a sua conta a qualquer momento. Podemos pôr termo a este acordo com um pré-aviso de 30 dias, ou de imediato se a conta for utilizada de forma que viole estes termos ou nos exponha, a nós ou a terceiros, a risco jurídico. Após a cessação, mantém o direito de exportar os seus dados durante 30 dias.",
            },
        ],
    },
    {
        id: "liability",
        title: "Responsabilidade",
        content: [
            {
                body: "O serviço é prestado no estado em que se encontra. Na medida em que a lei o permita, não somos responsáveis por perdas indiretas ou consequenciais, lucros cessantes ou perda de negócio. Nada nestes termos limita a responsabilidade por morte, danos pessoais, fraude ou qualquer outra situação cuja responsabilidade não possa ser limitada por lei.",
            },
        ],
    },
    {
        id: "changes",
        title: "Alterações a estes termos",
        content: [
            {
                body: "Avisaremos com pelo menos 30 dias de antecedência de qualquer alteração relevante. Continuar a utilizar o serviço após esse prazo significa aceitar os novos termos.",
            },
        ],
    },
    {
        id: "governing-law",
        title: "Lei aplicável",
        content: [
            {
                body: "Estes termos regem-se pela lei de Inglaterra e do País de Gales, e os respetivos tribunais têm competência exclusiva.",
            },
        ],
    },
];

export default function AutisyncCrmTermosPage() {
    return (
        <div lang="pt">
            <LegalDocument
                lang="pt"
                title="Termos de Serviço"
                lastUpdated={LAST_UPDATED}
                standfirst="Estes termos regem a utilização do Autisync CRM, um sistema de gestão de relacionamento com clientes explorado pela Maheldom Consulting, Lda. Utilizar o serviço significa aceitá-los."
                intro="Estes termos abrangem o produto Autisync CRM. A utilização do próprio website autisync.com está abrangida pelos Termos de Utilização separados, disponíveis no rodapé do website."
                sections={sections}
            />
        </div>
    );
}
