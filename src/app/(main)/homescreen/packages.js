"use client";

import { CheckIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

import { websiteTiers as tiers } from "@/lib/website-packages";
import { CarePlanNote, CurrencyToggle, TierPrice, usePackageCurrency } from "@/app/components/PackagePricing";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Packages() {
  const [currency, setCurrency] = usePackageCurrency();
  return (
    <div className="bg-gray-100 py-16">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-base font-semibold leading-7 text-[var(--autisync-gold,#b98b2f)]">
            Pick Your Package
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-800 sm:text-4xl">
            Website Packages
          </p>
        </div>
        <p className="max-w-5xl mx-auto mt-6 text-lg leading-8 text-center text-gray-600">
          We combine stunning design, automation, and strategy to launch your business online.
          <br />
          Every package includes tools that scale with your growth.
        </p>
        <CurrencyToggle value={currency} onChange={setCurrency} />

        <div className="grid max-w-md grid-cols-1 mx-auto mt-16 isolate gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? "lg:z-10 lg:rounded-b-none" : "lg:mt-8",
                tierIdx === 0 ? "lg:rounded-r-none" : "",
                tierIdx === tiers.length - 1 ? "lg:rounded-l-none" : "",
                "flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10"
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={classNames(
                      tier.mostPopular ? "text-[var(--autisync-gold,#b98b2f)]" : "text-gray-900",
                      "text-lg font-semibold leading-8"
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular ? (
                    <p className="rounded-full bg-yellow-500/10 px-2.5 py-1 text-xs font-semibold leading-5 text-yellow-700">
                      Most popular
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {tier.description}
                </p>
                <div className="mt-6">
                  <TierPrice amount={tier.price[currency]} currency={currency} />
                </div>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className="flex-none w-5 h-6 text-[var(--autisync-gold,#b98b2f)]"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <CarePlanNote currency={currency} />

        <div className="object-none object-center max-w-4xl p-4 mx-auto text-center">
          <Link
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-[var(--autisync-gold,#b98b2f)] border border-transparent rounded-md shadow-lg hover:bg-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:mr-2 transition-all hover:shadow-[0_16px_30px_rgba(0,0,0,0.18)]/10"
            href="/contact"
          >
            Get a Proposal
          </Link>
          <Link
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-800 border border-gray-700 rounded-md shadow-lg hover:text-white hover:bg-[#1C1C1C] focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mr-2 transition-all hover:shadow-[0_16px_30px_rgba(0,0,0,0.18)]/10"
            href="/servicepackage"
          >
            Other Packages
          </Link>
        </div>
      </div>
    </div>
  );
}
