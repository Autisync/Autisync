import type { Metadata } from "next";
import LegalDocument, { type LegalSection } from "@/app/legal/LegalDocument";

const EN_URL = "https://www.autisync.com/legal/data-deletion";
const URL = "https://www.autisync.com/pt/legal/eliminacao-de-dados";
const TITLE = "Eliminar os seus dados";
const DESCRIPTION =
    "Como pedir a eliminação de dados que chegaram ao Autisync CRM através do Facebook, do Instagram ou do WhatsApp, e o que acontece quando uma empresa encerra a sua conta.";

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
        id: "messaged-a-business",
        title: "Se enviou mensagens a uma empresa e quer que o seu registo seja removido",
        content: [
            {
                body: "A empresa a quem escreveu é quem detém essa conversa e pode eliminá-la diretamente na Autisync a qualquer momento. Pedir-lhe diretamente é, normalmente, o caminho mais rápido.",
            },
            {
                body: "Se preferir dirigir-se a nós, envie um e-mail para info@autisync.com a partir do endereço que utilizou, ou indique-nos o número de telefone ou a conta a partir da qual enviou as mensagens. Não precisamos de mais nada. Localizaremos todos os registos associados a esse identificador e apagá-los-emos — o registo de contacto, as mensagens e quaisquer fotografias, documentos ou mensagens de voz anexados — no prazo de 30 dias, e responderemos a confirmar quando estiver concluído.",
            },
            {
                body: "Há uma coisa que subsiste a essa eliminação. Quando a empresa é legalmente obrigada a conservar um registo contabilístico — uma fatura que lhe emitiu, um pagamento que efetuou — o registo mantém-se, mas o seu nome, endereço de e-mail, número de telefone e morada são removidos, de modo a que deixe de o identificar. Nada do que escreveu nem nada do que enviou é conservado juntamente com ele.",
            },
            {
                body: "Poderemos conservar um registo mínimo de que foi apresentado e satisfeito um pedido de eliminação, porque temos de conseguir demonstrar que lhe demos seguimento. Esse registo consiste numa contagem e num hash unidirecional do identificador. Não contém o conteúdo de quaisquer mensagens e não permite descobrir quem fez o pedido.",
            },
        ],
    },
    {
        id: "removed-the-app",
        title: "Se removeu a Autisync da sua conta do Facebook ou do Instagram",
        content: [
            {
                body: "Remover a aplicação nas definições do Facebook ou do Instagram impede que nos cheguem mais dados, e a Meta informa-nos de que o fez. Isso, por si só, não apaga o que uma empresa já recebeu, porque essas mensagens fazem parte da conversa que essa empresa teve consigo. Para que também sejam apagadas, envie o pedido descrito acima.",
            },
        ],
    },
    {
        id: "closing-an-account",
        title: "Se é uma empresa e vai encerrar a sua conta Autisync",
        content: [
            {
                body: "Peça-nos o encerramento ou utilize as definições da conta no produto. Tudo o que pertence à conta — utilizadores, contactos, conversas, ficheiros e credenciais dos canais ligados — é eliminado no prazo de 30 dias. Avise-nos se precisar de exportar os dados antes; depois de a eliminação ser executada, não pode ser revertida.",
            },
        ],
    },
    {
        id: "backups",
        title: "O que acontece às cópias de segurança",
        content: [
            {
                body: "Os dados eliminados podem permanecer em cópias de segurança encriptadas durante um curto período após a eliminação. Essas cópias seguem um ciclo rotativo e expiram no prazo de 30 dias, após o qual não resta nenhuma cópia.",
            },
        ],
    },
    {
        id: "how-long",
        title: "Quanto tempo demora",
        content: [
            {
                body: "Procuramos concluir os pedidos de eliminação no prazo de 7 dias e estamos obrigados a concluí-los no prazo de 30. Se um pedido precisar de mais tempo por uma razão que possamos explicar, dir-lhe-emos porquê, em vez de deixarmos o prazo esgotar-se em silêncio.",
            },
        ],
    },
];

export default function AutisyncCrmEliminacaoDeDadosPage() {
    return (
        <div lang="pt">
            <LegalDocument
                lang="pt"
                title="Eliminar os seus dados"
                lastUpdated={LAST_UPDATED}
                standfirst="A Meta exige que todas as aplicações expliquem com clareza como uma pessoa pode pedir a remoção dos seus dados. É esta a página. Aplica-se aos dados que chegaram ao Autisync CRM através do Facebook, do Instagram ou do WhatsApp, e a tudo o resto que detemos."
                intro="Para iniciar um pedido, envie um e-mail para info@autisync.com a partir do endereço que utilizou, ou indique-nos o número de telefone ou a conta a partir da qual enviou as mensagens. Tudo o que se segue explica o que acontece depois."
                sections={sections}
            />
        </div>
    );
}
