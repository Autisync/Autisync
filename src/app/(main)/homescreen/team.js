import React from "react";
import Link from "next/link";
import { localHref } from "@/lib/i18n/routes";

export default function Landing({ lang = "en" } = {}) {
  const pt = lang === "pt";
  const t = (en, ptText) => (pt ? ptText : en);
  return (
    <>
      {/* Team Section */}
      <section className="pt-20 pb-6 bg-gray-950">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap justify-center mb-24 text-center">
            <div className="w-full px-4 lg:w-8/12">
              <h2 className="text-4xl font-semibold text-gray-200">{t("Dedicated Colaborators", "Uma equipa dedicada")}</h2>
              <p className="m-4 text-base leading-relaxed text-gray-300">
                {t(
                  "At AutiSync, customer care takes precedence, and our ultimate goal is customer satisfaction. We have a dedicated team of collaborators committed to ensuring your success.",
                  "Na AutiSync, o cliente vem sempre primeiro e o nosso objetivo é a sua satisfação. Temos uma equipa de colaboradores dedicada, empenhada no sucesso da sua empresa."
                )}
              </p>
                <Link href={localHref("/about", pt)} className="inline-flex justify-center px-4 py-2 text-sm font-medium hover:text-gray-50 text-[var(--autisync-gold,#b98b2f)] bg-gray-50 border border-transparent rounded-md shadow-lg hover:bg-[var(--autisync-gold,#b98b2f)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all hover:shadow-[0_16px_30px_var(--autisync-gold,#b98b2f)]/10">
                  {t("Meet the Team", "Conheça a equipa")}
                </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
