"use client";

import { CheckIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

import { websiteTiers as tiers, type Currency } from "@/lib/website-packages";
import { CarePlanNote, CurrencyToggle, TierPrice, usePackageCurrency } from "@/app/components/PackagePricing";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * When `currency` is passed (the /servicepackage page has one switch for
 * every section) this block uses it and hides its own switch.
 */
export default function Packages({ currency: shared }: { currency?: Currency } = {}) {
  const [own, setCurrency] = usePackageCurrency();
  const currency = shared ?? own;
  return (
    <div className="py-16 bg-gray-100 rounded-lg">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-base font-semibold leading-7 text-[#B28228]">
            Pick Your Package
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-[#3B3B3B] sm:text-4xl">
            Website Development Packages
          </p>
        </div>
        <p className="max-w-5xl mx-auto mt-6 text-lg leading-8 text-center text-gray-600">
          Our goal is to deliver{" "}
          <span className="text-[#B28228]">smart design</span> &nbsp;and{" "}
          <span className="text-[#B28228]">scalable websites</span> tailored to
          your business growth.
        </p>
        {!shared && <CurrencyToggle value={currency} onChange={setCurrency} />}

        <div className="grid max-w-md grid-cols-1 mx-auto mt-16 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? "lg:z-10 ring-2 ring-[#B28228]" : "lg:mt-8",
                tierIdx === 0 ? "lg:rounded-r-none" : "",
                tierIdx === tiers.length - 1 ? "lg:rounded-l-none" : "",
                "flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 shadow-md"
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={classNames(
                      tier.mostPopular ? "text-[#B28228]" : "text-[#3B3B3B]",
                      "text-lg font-semibold leading-8"
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular && (
                    <p className="rounded-full bg-[#B28228]/10 px-2.5 py-1 text-xs font-semibold leading-5 text-[#B28228]">
                      Most Popular
                    </p>
                  )}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {tier.description}
                </p>
                <div className="mt-6">
                  <TierPrice amount={tier.price[currency]} currency={currency} ongoing="website" />
                </div>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-gray-700"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className="flex-none w-5 h-5 text-[#B28228]"
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
      </div>

      <div className="object-none object-center max-w-4xl p-4 mx-auto text-center">
        <Link
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-[#3B3B3B]  rounded-md shadow-lg hover:bg-[#B28228] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B28228] sm:mr-2"
          href="/contact"
        >
          Get a Proposal
        </Link>
      </div>
    </div>
  );
}
