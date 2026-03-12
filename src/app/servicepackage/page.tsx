"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { CheckIcon } from "@heroicons/react/24/solid"; // if you're on v1, use "@heroicons/react/solid"
import { PhoneIcon } from "@heroicons/react/24/outline"; // v1: "@heroicons/react/outline"
import Items from "./items";
import Packages from "./packages";
import Link from "next/link";

/* -------------------------- Branding cards block -------------------------- */

const BrandingGrid = () => {
  const brandingTiers = [
    {
      name: "Branding - Starter",
      description:
        "The perfect plan if you're just getting started with your business.",
      features: [
        "Logo Design",
        "Envelopes A4 & A5",
        "Company Stamp x1",
        "Business Card Design",
        "Business Card Print-out x50",
      ],
    },
    {
      name: "Branding - Pro",
      description:
        "Ideal for growing businesses looking to establish strong brand identity.",
      features: [
        "Logo Design",
        "Brand Guidelines",
        "Company Stamp x1 & Stationery",
        "Business Card Print-out x300",
        "Business & Employee Card Design",
      ],
    },
    {
      name: "Branding - Enterprise",
      description:
        "Comprehensive solution for large teams or established brands.",
      features: [
        "Logo Design",
        "Brand Guidelines",
        "Digital Signature x6",
        "Presentation Folder Design",
        "Company Document Templates",
        "Stationery Design & Mock-ups",
        "Employee Card Design and Print x6",
        "Business Card Design & Print-out x600",
        "Branded Social Media Banner",
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {brandingTiers.map((tier, index) => (
        <div
          key={index}
          className="rounded-3xl p-6 shadow-md ring-1 ring-gray-200 bg-white"
        >
          <h3 className="text-xl font-bold text-[#B28228] mb-2">
            {tier.name}
          </h3>
          <p className="text-sm text-gray-600 mb-4">{tier.description}</p>
          <ul className="space-y-2 text-sm text-gray-700">
            {tier.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-[#B28228]" />
                {feature}
              </li>
            ))}
          </ul>
          <a
            href="https://wa.me/+447883317646?text=I would like to learn more about your branding services."
            className="mt-6 inline-block w-full text-center py-2 px-4 rounded-md font-semibold border border-[#B28228] text-[#B28228] hover:bg-[#B28228] hover:text-white transition"
            target="_blank"
          >
            Contact Us for a Meeting
          </a>
        </div>
      ))}
    </div>
  );
};

/* --------------------- Social media management block ---------------------- */

const SocialMediaPackages = () => (
  <div className="max-w-6xl mx-auto">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-bold tracking-tight text-[#3B3B3B] sm:text-4xl">
        Social Media Management
      </h2>
      <p className="mt-4 text-lg text-gray-600">
        Professional social media support to boost your digital presence,
        attract new clients, and generate qualified leads.
      </p>
    </div>

    <div className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-3">
      {/* Basic Package */}
      <div className="p-6 border rounded-3xl shadow-sm ring-1 ring-gray-200 bg-white">
        <h3 className="text-xl font-semibold text-[#B28228]">Basic Package</h3>
        <ul className="mt-4 space-y-2 text-sm text-gray-600">
          <li>📅 8 posts/month (design + text)</li>
          <li>🎥 2 reels + 2 flyers</li>
          <li>📱 Management of 2 platforms</li>
          <li>📊 Basic performance report</li>
        </ul>
        <a
          href="https://wa.me/+447883317646?text=I’m interested in the Basic Social Media Management package"
          className="inline-block w-full mt-6 text-center text-sm font-semibold text-[#B28228] border border-[#B28228] py-2 rounded hover:bg-[#B28228] hover:text-white transition"
          target="_blank"
        >
          Contact Us
        </a>
      </div>

      {/* Intermediate Package */}
      <div className="p-6 border rounded-3xl shadow-sm ring-1 ring-gray-200 bg-[#F9F6F0]">
        <h3 className="text-xl font-semibold text-[#B28228]">
          Intermediate Package
        </h3>
        <ul className="mt-4 space-y-2 text-sm text-gray-600">
          <li>📅 12 posts/month</li>
          <li>🎥 4 reels + 4 flyers</li>
          <li>📱 Management of 3 platforms</li>
          <li>📢 Sponsored ads (with targeting)</li>
          <li>📊 Monthly performance & ad reports</li>
        </ul>
        <a
          href="https://wa.me/+447883317646?text=I’m interested in the Intermediate Social Media Management package"
          className="inline-block w-full mt-6 text-center text-sm font-semibold text-[#B28228] border border-[#B28228] py-2 rounded hover:bg-[#B28228] hover:text-white transition"
          target="_blank"
        >
          Contact Us
        </a>
      </div>

      {/* Premium Package */}
      <div className="p-6 border rounded-3xl shadow-sm ring-1 ring-gray-200 bg-white">
        <h3 className="text-xl font-semibold text-[#B28228]">
          Premium Package
        </h3>
        <ul className="mt-4 space-y-2 text-sm text-gray-600">
          <li>📅 16 posts/month</li>
          <li>🎥 6 reels + 6 flyers</li>
          <li>📱 Full management of 3 platforms</li>
          <li>📢 Sponsored ads with strategic budget</li>
          <li>📊 Advanced analytics and reporting</li>
        </ul>
        <a
          href="https://wa.me/+447883317646?text=I’m interested in the Premium Social Media Management package"
          className="inline-block w-full mt-6 text-center text-sm font-semibold text-[#B28228] border border-[#B28228] py-2 rounded hover:bg-[#B28228] hover:text-white transition"
          target="_blank"
        >
          Contact Us
        </a>
      </div>
    </div>
  </div>
);

/* ---------------------------- Main page block ----------------------------- */

export default function ServicePackagesPage() {
  const [openSection, setOpenSection] = useState("branding");

  const sections = [
    {
      id: "branding",
      title: "Branding Packages",
      subtitle: "Logo, stationery & identity foundations for your brand.",
      content: <BrandingGrid />,
    },
    {
      id: "social",
      title: "Social Media Management",
      subtitle: "Monthly content, reels, ads and reporting tailored to you.",
      content: <SocialMediaPackages />,
    },
    {
      id: "services-table",
      title: "Services & Products Table",
      subtitle: "Detailed list of everything we can design, build and manage.",
      content: <Items />,
    },
    {
      id: "web-packages",
      title: "Website Development Packages",
      subtitle: "Full website builds for small business, startups & enterprises.",
      content: <Packages />,
    },
  ];

  return (
    <div className="bg-[#F9F9F9]">
      <div className="py-16 my-6 px-6 mx-auto max-w-7xl">
        {/* Top intro */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-base font-semibold leading-7 text-[#B28228]">
            Flexible Solutions for Your Brand
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-[#3B3B3B] sm:text-5xl">
            Let&apos;s Tailor the<br/>Right Package for You
          </p>
          <p className="mt-4 text-lg text-gray-600">
            We understand every business is unique. Instead of showing fixed
            prices, we invite you to book a consultation. Let’s align your
            needs with the perfect offer.
          </p>
        </div>

        {/* Accordion sections */}
        <div className="space-y-3">
          {sections.map((section) => {
            const isOpen = openSection === section.id;
            return (
              <div
                key={section.id}
                className="bg-white rounded-lg shadow-md ring-1 ring-gray-200 overflow-hidden"
              >
                {/* Header */}
                <button
                  type="button"
                  onClick={() =>
                    setOpenSection((prev) =>
                      prev === section.id ? "" : section.id
                    )
                  }
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-[#3B3B3B]">
                      {section.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {section.subtitle}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="ml-4 flex items-center justify-center rounded-full bg-gray-100 w-8 h-8"
                  >
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </motion.div>
                </button>

                {/* Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                      <div className="border-t border-gray-100 px-6 py-8">
                        {section.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Contact CTA (fixed at bottom) */}
        <div className="mt-12 text-center">
          <Link
            className="inline-flex items-center justify-center px-6 py-2 text-white bg-[var(--autisync-gold,#b98b2f)] rounded-md shadow-lg hover:bg-gray-900 transition-all hover:shadow-[0_16px_30px_rgba(0,0,0,0.25)]/10"
            href="https://wa.me/+447883317646"
          >
            <PhoneIcon className="w-5 h-5 mr-2 text-white" />
            Call Us for IT Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}