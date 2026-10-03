import React from "react";

export default function SobreLanding() {
  return (
    <>
      {/* Landing */}
      <div className="relative flex items-center content-center justify-center pt-20 pb-32 ">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80')",
          }}
        >
          <span
            id="blackOverlay"
            className="absolute w-full h-full bg-black opacity-95"
          ></span>
        </div>

        <div className="relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-full px-4 ml-auto mr-auto text-center lg:w-9/12">
              <div className="p-4">
                <h1 className="mt-24 text-5xl font-semibold text-white">
                  Sobre Nós
                </h1>

                <p className="mt-4 text-lg text-gray-200">
                  Ajudamos empresas a modernizar a sua marca, os seus sistemas e
                  a experiência dos seus clientes. Do design criativo e
                  desenvolvimento de websites à consultoria de TI, automação e
                  software à medida — a AutiSync reúne tudo numa só estratégia.
                </p>

                <p className="mt-4 text-base leading-7 text-gray-300">
                  Não somos apenas um fornecedor de serviços — somos o seu
                  parceiro de crescimento a longo prazo.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 top-auto w-full h-16 overflow-hidden pointer-events-none"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
          >
            <polygon
              className="text-gray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>
    </>
  );
}
