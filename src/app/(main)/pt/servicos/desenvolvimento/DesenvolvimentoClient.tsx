import Image from "next/image";
import Clients from "@/app/(main)/solutions/clients";
import Link from "next/link";


const features = [
    {   id: 1,
        name: "Apresente a sua ideia",
        description:
            "Definimos o caminho a seguir com o apoio da nossa equipa de desenvolvimento.",
        num: "1",
    },
    {id: 2,
        name: "Escolha da tecnologia",
        description:
            "Decidimos a stack tecnológica e a abordagem geral do projeto.",
        num: "2",
    },
    {id: 3,
        name: "Design",
        description: "Criamos uma solução visualmente apelativa e fácil de utilizar.",
        num: "3",
    },
    {id: 4,
        name: "Desenvolvimento",
        description:
            "Os nossos engenheiros experientes desenvolvem o sistema ou plataforma.",
        num: "4",
    },
    {id: 5,
        name: "Lançamento no mercado",
        description:
            "Garantimos um lançamento bem-sucedido, com suporte e manutenção contínuos.",
        num: "5",
    },
];

const services = [
    {
        name: "Desenvolvimento de software",
        description:
            "Desenvolvemos software à medida, ajustado às necessidades específicas de cada cliente, com mais automação e melhor usabilidade.",
    },
    {
        name: "Desenvolvimento web",
        description:
            "Integramos frontend, backend e as restantes tecnologias essenciais de forma fluida para garantir o sucesso do seu produto.",
    },
    {
        name: "Desenvolvimento de aplicações móveis",
        description:
            "Com interfaces intuitivas, funcionamento impecável e experiências personalizadas, as nossas aplicações móveis servem melhor os seus clientes e aproximam a sua empresa dos seus objetivos.",
    },
    {
        name: "Integração tecnológica",
        description:
            "Recorremos a diversas tecnologias, incluindo a cloud, para melhorar a organização, o acesso e a partilha dos seus dados, garantindo que estão bem geridos e sempre disponíveis.",
    },
    {
        name: "Soluções empresariais à medida",
        description:
            "Obtenha a solução tecnológica empresarial ideal para fazer crescer a sua organização hoje e no futuro, com resultados precisos e sustentáveis.",
    },
    {
        name: "Personalização e implementação de CMS",
        description:
            "Desenvolvemos CMS à medida que otimizam a gestão de conteúdos, aceleram processos e aumentam a eficiência da sua organização.",
    },
];

export default function DesenvolvimentoClient() {
    return (
        <>

            {/* Landing */}
            <div className="relative overflow-hidden bg-gray-100 isolate pt-12">
                <svg
                    className="absolute inset-0 -z-10 h-full w-full stroke-[var(--autisync-gold,#B98B2F)]/20 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
                            width={200}
                            height={200}
                            x="50%"
                            y={-1}
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M.5 200V.5H200" fill="none" />
                        </pattern>
                    </defs>
                    <rect
                        width="100%"
                        height="100%"
                        strokeWidth={0}
                        fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
                    />
                </svg>
                <div className="px-6 pt-10 pb-24 mx-auto max-w-7xl sm:pb-32 lg:flex lg:px-8 lg:py-20">
                    <div className="max-w-2xl mx-auto lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
                        <h1 className="mt-10 text-base font-base text-[var(--autisync-gold,#B98B2F)]">
                            Plataformas que ajudam
                        </h1>
                        <h2 className="text-4xl font-bold tracking-tight text-gray-700 sm:text-6xl">
                            Serviços de Desenvolvimento
                        </h2>
                        <p className="mt-6 text-base leading-8 text-gray-600">
                            Temos orgulho em prestar serviços de desenvolvimento de excelência
                            a clientes muito diversos, de pequenas empresas a grandes marcas
                            internacionais. Com provas dadas e uma equipa de profissionais
                            qualificados, respondemos às necessidades específicas de cada
                            projeto.
                        </p>
                        <br/>
                        <Link
                            className="px-4 py-3 mb-1 text-xs text-white uppercase transition-all duration-150 ease-linear bg-[var(--autisync-gold,#B98B2F)] rounded shadow outline-none hover:bg-[#1C1C1C] hover:shadow-md focus:outline-none sm:mr-2 transition-all hover:shadow-[0_16px_30px_rgba(0,0,0,0.18)]/10"
                            type="button"
                            href="/pt/precos"
                        >
                            Ver os nossos pacotes
                        </Link>
                    </div>
                    <div className="flex max-w-2xl mx-auto mt-16 sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                        <div className="flex-none max-w-3xl sm:max-w-5xl lg:max-w-none">
                            <div className="p-2 -m-2 bg-[#1C1C1C] rounded-xl ring-1 ring-inset ring-gray-800 lg:-m-4 lg:rounded-2xl lg:p-4">
                                <Image
                                    src="https://images.pexels.com/photos/7988210/pexels-photo-7988210.jpeg"
                                    alt="Captura de ecrã de uma aplicação"
                                    width={1200}
                                    height={1200}
                                    className="w-[40rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main body */}
            <div className="py-16 bg-gray-100 sm:py-32">
                <div className="px-6 mx-auto max-w-7xl lg:px-8">
                    <div className="max-w-5xl mx-auto lg:text-center">
                        <h2 className="text-base leading-7 text-[var(--autisync-gold,#B98B2F)] font-base">
                            Como trabalhamos
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-700 sm:text-4xl">
                            Um processo de desenvolvimento comprovado
                        </p>
                        <p className="mt-6 text-base leading-8 text-gray-600">
                            Na Autisync, sabemos que os projetos mais complexos exigem que a
                            nossa equipa de desenvolvimento web cuide de cada detalhe na
                            criação de soluções web. Com mais de 50 projetos entregues com
                            sucesso, temos a experiência prática necessária para conduzir um
                            processo de desenvolvimento fluido e otimizado.{" "}
                        </p>
                        <br />
                    </div>

                    {/* Timeline */}
                    <ol className="items-center sm:flex">
                        {features.map((feature) => (
                            <li className="relative mb-6 sm:mb-0" key={feature.id}>
                                <div className="flex items-center">
                                    <div className="z-10 flex items-center justify-center w-6 h-6 bg-[var(--autisync-gold,#B98B2F)]/20 rounded-full ring-0 ring-white dark:bg-[var(--autisync-gold,#B98B2F)] sm:ring-8 dark:ring-gray-900 shrink-0 hover:scale-150 transition-all duration-300 ease-out">
                                        <h4 className="font-semibold text-gray-700">
                                            {feature.num}
                                        </h4>
                                    </div>
                                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                                </div>

                                <div className="mt-3 sm:pr-4" key={feature.name}>
                                    <h3 className="text-lg font-semibold text-gray-700 ">
                                        {feature.name}
                                    </h3>
                                    <p className="text-base font-normal text-gray-500 ">
                                        {feature.description}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>

            {/* Services */}
            <div className="py-24 bg-[#1C1C1C] sm:py-32">
                <div className="px-6 mx-auto max-w-7xl lg:px-8">
                    <div className="max-w-2xl mx-auto lg:mx-0">
                        <h2 className="text-base leading-7 text-[var(--autisync-gold,#B98B2F)] font-base">
                            Tudo o que precisa
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Serviços de Desenvolvimento
                        </p>
                        {/* <p className="mt-6 text-lg leading-8 text-gray-300">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste
            dolor cupiditate blanditiis.
          </p> */}
                    </div>
                    <dl className="grid max-w-2xl grid-cols-1 gap-8 mx-auto mt-16 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
                        {services.map((service) => (
                            <div key={service.name} className="relative">
                                <dt className="inline font-semibold text-gray-50">
                                    {service.name}
                                </dt>{" "}
                                <dd className="text-justify text-gray-400 ">
                                    {service.description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

            <Clients title="Empresas que confiam em nós" />

            {/* Call to Action */}
            <div className="relative overflow-hidden bg-gray-100 isolate">
                <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-600 sm:text-4xl">
                            <span className="text-[var(--autisync-gold,#B98B2F)]">Aumente a sua produtividade.</span>
                            <br />
                            Comece hoje com os nossos serviços de desenvolvimento.
                        </h2>

                        <div className="flex items-center justify-center mt-10 gap-x-6">
                            <Link
                                href="tel:+244927114400"
                                target="_blank"
                                className="rounded-md bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-md hover:bg-[#1C1C1C] hover:text-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white hover:shadow-lg transition-all hover:shadow-[0_16px_30px_rgba(0,0,0,0.18)]/10"
                            >
                                Ligue-nos
                            </Link>
                            <Link
                                href="mailto:info@autisync.com"
                                className="text-sm font-semibold leading-6 text-gray-600 hover:text-[var(--autisync-gold,#B98B2F)]"
                            >
                                Marcar uma consulta <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}