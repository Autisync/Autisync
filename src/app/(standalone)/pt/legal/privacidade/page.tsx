import type { Metadata } from "next";
import LegalDocument, { type LegalSection } from "@/app/legal/LegalDocument";

const EN_URL = "https://www.autisync.com/legal/privacy";
const URL = "https://www.autisync.com/pt/legal/privacidade";
const TITLE = "Política de Privacidade do Autisync CRM";
const DESCRIPTION =
    "Como o Autisync CRM trata as mensagens, os contactos e os ficheiros que lhe chegam do WhatsApp, do Facebook Messenger, do Instagram, do e-mail e de formulários de websites, bem como os dados de calendário de uma conta Google ligada.";

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: URL, languages: { en: EN_URL, pt: URL, "x-default": EN_URL } },
    openGraph: { type: "website", url: URL, siteName: "Autisync", title: TITLE, description: DESCRIPTION, locale: "pt_AO" },
    robots: { index: true, follow: true },
};

const LAST_UPDATED = "21 de outubro de 2026";

const sections: LegalSection[] = [
    {
        id: "responsibility",
        title: "Quem é responsável pelo quê",
        content: [
            {
                body: "Em qualquer conversa mantida na Autisync estão envolvidas duas empresas diferentes, e a lei trata-as de forma diferente.",
                definitions: [
                    {
                        term: "A empresa que utiliza a Autisync",
                        def: "Decide com quem fala e o que diz. É a responsável pelo tratamento dos dados dos seus próprios clientes, e é a sua própria política de privacidade que rege essa relação.",
                    },
                    {
                        term: "Maheldom Consulting, Lda (Autisync)",
                        def: "Armazena e entrega essas conversas por instrução dessa empresa e de mais ninguém. Somos o subcontratante. Não decidimos o que é enviado e não utilizamos o conteúdo para fins próprios.",
                    },
                ],
            },
        ],
    },
    {
        id: "what-we-hold",
        title: "Que dados detemos",
        content: [
            {
                heading: "Sobre as pessoas que utilizam a Autisync",
                list: [
                    "Nome, endereço de e-mail e função.",
                    "Uma palavra-passe guardada apenas sob a forma de hash criptográfico — nós não a conseguimos ler, nem quem quer que obtenha a base de dados.",
                    "Horas de início de sessão e o endereço IP de onde partiu cada pedido, guardados em registos de acesso.",
                ],
            },
            {
                heading: "Sobre os contactos com quem falam",
                list: [
                    "Nome, endereço de e-mail, número de telefone e empresa, quando a empresa os tem.",
                    "As próprias mensagens: o texto, a hora, o sentido e se cada uma foi enviada, entregue e lida.",
                    "Ficheiros que um contacto envia — fotografias, documentos, mensagens de voz, autocolantes — descarregados e guardados para que a conversa continue completa quando alguém a abrir mais tarde.",
                    "O identificador que o canal utiliza para essa pessoa. No Messenger e no Instagram trata-se de um identificador de âmbito restrito, que só tem significado entre essa conta e esta aplicação; no WhatsApp é o número de telefone a partir do qual a pessoa escreveu.",
                    "Nome e fotografia de perfil públicos, obtidos do canal para que uma conversa mostre uma pessoa e não um número.",
                    "Os comentários que as pessoas deixam nas publicações da própria Página do Facebook e da conta de Instagram da empresa, com a publicação em que cada um foi deixado, para que a empresa os possa ler e responder-lhes num só lugar.",
                ],
            },
            {
                heading: "Sobre as contas ligadas",
                list: [
                    "Tokens de acesso dos canais que uma empresa liga. São encriptados antes de serem gravados na base de dados e nunca voltam a ser mostrados por inteiro.",
                    "Identificadores da página, da conta de Instagram e da conta empresarial de WhatsApp, utilizados para encaminhar cada mensagem recebida para a empresa certa.",
                ],
            },
        ],
    },
    {
        id: "google",
        title: "Dados de contas Google",
        content: [
            {
                body: "Uma empresa que utiliza a Autisync pode ligar a sua própria conta Google para que as marcações feitas através do CRM apareçam no seu calendário. A ligação é opcional, e nada do que se descreve abaixo acontece a menos que alguém opte por ligar a conta.",
            },
            {
                heading: "A que acedemos",
                body: "Aos calendários dessa conta Google e aos eventos neles registados. Quando uma empresa liga também o Perfil da Empresa no Google, ao perfil e às respetivas avaliações. Pedimos o acesso no momento da ligação, e a Google mostra exatamente o que está a ser concedido antes de alguém o aceitar.",
            },
            {
                heading: "O que fazemos com esses dados",
                body: "Uma única coisa: manter a agenda em ordem. Criamos um evento quando é feita uma marcação, alteramo-lo quando a marcação muda e removemo-lo quando a marcação é cancelada. Lemos o calendário para saber que horários já estão ocupados, para que a página de marcações não ofereça um horário que não está livre. Quando o Perfil da Empresa está ligado, lemos as avaliações para que possam ser vistas e respondidas no CRM.",
            },
            {
                heading: "O que não fazemos com esses dados",
                body: "Não os vendemos. Não os transferimos para ninguém, exceto nos termos descritos em «Quem mais tem acesso». Não os utilizamos para publicidade, para definição de perfis nem para treinar modelos de aprendizagem automática. Não os lemos para nenhum outro fim que não seja o funcionamento das funcionalidades de marcações e avaliações que a empresa pediu. Ninguém na Autisync lê os dados Google de um cliente, a menos que a empresa nos peça ajuda com um problema concreto e o autorize, ou que a lei o exija.",
            },
            {
                heading: "Utilização Limitada",
                body: "A utilização e a transferência, pela Autisync, de informações recebidas das APIs da Google cumprem a Política de Dados do Utilizador dos Serviços de API da Google (developers.google.com/terms/api-services-user-data-policy), incluindo os requisitos de Utilização Limitada.",
            },
            {
                heading: "Como é mantida a ligação",
                body: "A Google emite-nos um token e não uma palavra-passe — nunca vemos nem guardamos as credenciais da conta Google. Esse token é encriptado antes de ser gravado na base de dados e nunca volta a ser mostrado por inteiro.",
            },
            {
                heading: "Terminar a ligação",
                body: "Uma empresa pode desligar a Google a qualquer momento no ecrã de Integrações do CRM, o que elimina o token guardado. O acesso pode também ser retirado diretamente na Google, em myaccount.google.com/permissions. Em qualquer dos casos, deixamos de ter acesso de imediato. Os eventos já escritos no calendário mantêm-se, porque pertencem a esse calendário — podem ser eliminados no Google Calendar como qualquer outro evento.",
            },
        ],
    },
    {
        id: "why",
        title: "Porque detemos estes dados",
        content: [
            {
                body: "Para fazer funcionar a caixa de entrada, e para nada mais: mostrar uma conversa por ordem, atribuí-la ao contacto certo, entregar uma resposta, indicar se chegou e se foi lida, e guardar o ficheiro que um cliente enviou para que possa voltar a ser aberto. O estado de entrega e os motivos de falha são também guardados, para que uma empresa consiga distinguir uma mensagem que foi ignorada de uma que nunca chegou.",
            },
            {
                heading: "Funções opcionais que uma empresa pode ligar",
                list: [
                    "Respostas sugeridas: o texto de uma mensagem ou comentário é enviado ao nosso fornecedor de IA para redigir uma resposta. Um membro da equipa da empresa lê-a, pode alterá-la e decide se a envia.",
                    "Respostas por palavra-chave: quando alguém comenta uma palavra escolhida pela empresa (por exemplo \"DEMO\") numa das suas publicações, a empresa envia a essa pessoa uma mensagem privada com a informação pedida, e o comentário fica registado na ficha do contacto.",
                    "Ambas estão desligadas até a empresa as ligar, e a empresa pode desligá-las a qualquer momento.",
                ],
            },
        ],
    },
    {
        id: "what-we-do-not-do",
        title: "O que não fazemos",
        content: [
            {
                list: [
                    "Não vendemos dados pessoais, nem nunca o fizemos.",
                    "Não utilizamos o conteúdo das mensagens para publicidade nem para definição de perfis.",
                    "Não utilizamos o conteúdo das mensagens para treinar modelos de aprendizagem automática.",
                    "Não deixamos que uma empresa veja as conversas de outra. Cada registo está associado à sua empresa, e essa separação é imposta na própria base de dados, não apenas na interface.",
                ],
            },
        ],
    },
    {
        id: "who-else",
        title: "Quem mais tem acesso",
        content: [
            {
                body: "Apenas as entidades que precisam, para que uma mensagem possa circular:",
                list: [
                    "Meta Platforms — as mensagens de e para o WhatsApp, o Messenger e o Instagram passam pelas APIs da Meta, ao abrigo dos termos da própria Meta.",
                    "Google — quando uma empresa liga a sua conta Google, os eventos de calendário e, se ativadas, as avaliações do Perfil da Empresa passam pelas APIs da Google, ao abrigo dos termos da própria Google.",
                    "Hetzner Online GmbH, o nosso fornecedor de alojamento, que gere os servidores onde os dados estão guardados, em Nuremberga, na Alemanha.",
                    "Cloudflare, Inc., que fica à frente dos nossos servidores para os proteger de ataques e encaminhar o tráfego até eles de forma segura.",
                    "OpenAI (OpenAI Ireland Ltd), apenas quando uma empresa utiliza as respostas sugeridas: o texto dessa mensagem ou comentário é enviado para o serviço europeu da OpenAI para redigir a resposta. Nos termos da API da OpenAI, não é utilizado para treinar os seus modelos.",
                    "Um fornecedor de envio de e-mail, para as mensagens enviadas por e-mail.",
                ],
            },
            {
                body: "Não divulgamos dados a mais ninguém, exceto quando uma lei nos obrigue e nos seja permitido dizê-lo.",
            },
        ],
    },
    {
        id: "retention",
        title: "Onde são guardados e durante quanto tempo",
        content: [
            {
                body: "Os dados são guardados em servidores na União Europeia. As conversas e os ficheiros são conservados enquanto a conta da empresa estiver aberta, porque esse é o registo que a empresa nos paga para manter. Quando uma conta é encerrada, tudo o que lhe pertence é eliminado no prazo de 30 dias.",
            },
            {
                body: "Uma empresa pode eliminar um contacto, uma conversa ou um ficheiro a qualquer momento, e pode pedir-nos que eliminemos qualquer coisa mais cedo. A eliminação abrange tanto os ficheiros guardados como os registos da base de dados, e fica registada para que se possa demonstrar que aconteceu — sob a forma de uma contagem e de um hash unidirecional do identificador, nunca do próprio identificador.",
            },
            {
                body: "A única exceção é um registo contabilístico que a empresa seja legalmente obrigada a conservar: a fatura ou o pagamento mantém-se, sem o nome e os contactos que o tornavam pessoal.",
            },
        ],
    },
    {
        id: "protection",
        title: "Como são protegidos",
        content: [
            {
                list: [
                    "O tráfego é encriptado em trânsito.",
                    "Os tokens de acesso dos canais são encriptados antes de serem guardados.",
                    "As palavras-passe são guardadas sob a forma de hash e nunca são armazenadas nem transmitidas de forma legível.",
                    "Cada webhook recebido é verificado através de uma assinatura criptográfica antes de ser processado, para que um pedido falsificado não consiga introduzir uma mensagem.",
                    "O acesso está limitado às pessoas que dele precisam para operar o serviço.",
                ],
            },
        ],
    },
    {
        id: "rights",
        title: "Os seus direitos",
        content: [
            {
                body: "Se é contacto de uma empresa que utiliza a Autisync, é essa empresa que detém o seu registo e é a ela que se deve dirigir em primeiro lugar. Se preferir dirigir-se a nós, ou se a empresa já não existir, escreva para info@autisync.com e trataremos do assunto diretamente. Pode pedir uma cópia dos dados que temos sobre si, pedir que sejam corrigidos ou pedir que sejam apagados. Quando o RGPD for aplicável, tem também o direito de apresentar reclamação junto da autoridade de controlo do seu país.",
            },
        ],
    },
    {
        id: "deleting",
        title: "Eliminar os seus dados",
        content: [
            {
                body: "As instruções, incluindo como remover dados que nos chegaram através do Facebook ou do Instagram, estão na página de eliminação de dados, em autisync.com/pt/legal/eliminacao-de-dados.",
            },
        ],
    },
    {
        id: "children",
        title: "Crianças",
        content: [
            {
                body: "A Autisync é uma ferramenta para empresas e não se destina a crianças. Não recolhemos conscientemente dados de menores de 16 anos. Se acreditar que o fizemos, informe-nos e removê-los-emos.",
            },
        ],
    },
    {
        id: "changes",
        title: "Alterações",
        content: [
            {
                body: "Se esta política mudar de forma que afete o que fazemos com os dados pessoais, informaremos as empresas que utilizam a Autisync antes de a alteração produzir efeitos, e a data no topo desta página será atualizada.",
            },
        ],
    },
];

export default function AutisyncCrmPrivacidadePage() {
    return (
        <div lang="pt">
            <LegalDocument
                lang="pt"
                title="Política de Privacidade"
                lastUpdated={LAST_UPDATED}
                standfirst="O Autisync CRM é um sistema de gestão de relacionamento com clientes. As empresas utilizam-no para falar com os seus próprios clientes através do WhatsApp, do Facebook Messenger, do Instagram, do e-mail e de formulários de websites, numa única caixa de entrada. Esta página explica o que acontece aos dados que por ele passam."
                intro="A Autisync é um produto da Maheldom Consulting, Lda, sociedade registada em Angola com o NIF 5003472418 e a matrícula 41063-26/260824, cuja sede social consta do fundo desta página. Sempre que esta política diz «nós», refere-se a essa sociedade."
                sections={sections}
            />
        </div>
    );
}
