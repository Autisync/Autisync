"use client";

import * as React from "react";
import Link from "next/link";
import CallToAction from "@/app/components/CallToAction";

const navigation = {
  social: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/autisync",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
        >
          {/* outer soft circle */}
          <circle cx="12" cy="12" r="9" />
          {/* stylised “f” */}
          <path
            fill="currentColor"
            stroke="none"
            d="M12.9 7.2h-1.1c-1.4 0-2.3.9-2.3 2.3v1.4H8.4v1.9h1.1v4h2.1v-4h1.5l.5-1.9h-2v-1.2c0-.5.3-.8.8-.8h1.1V7.2z"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/autisync__/",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
        >
          {/* outer circle */}
          <circle cx="12" cy="12" r="9" />
          {/* camera body */}
          <rect x="8" y="8" width="8" height="8" rx="2.5" />
          {/* lens */}
          <circle cx="12" cy="12" r="2.2" />
          {/* flash dot */}
          <circle cx="15.3" cy="8.8" r="0.8" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/autisync",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
        >
          {/* outer circle */}
          <circle cx="12" cy="12" r="9" />
          {/* “in” block */}
          <rect x="8.2" y="9.7" width="1.7" height="6" />
          <circle cx="9" cy="7.6" r="0.9" />
          <path d="M12 15.7v-3.5c0-.9.6-1.6 1.5-1.6 1 0 1.5.7 1.5 1.6v3.5" />
        </svg>
      ),
    },
    {
      name: "Behance",
      href: "https://www.behance.net/ENOV-Technologies",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
        >
          {/* outer circle */}
          <circle cx="12" cy="12" r="9" />
          {/* “Be” style mark */}
          <path d="M8 9h2.1c1.1 0 1.9.6 1.9 1.7 0 1.1-.8 1.7-1.9 1.7H8" />
          <path d="M8 12.4h2.3c1.2 0 2 .7 2 1.9 0 1.1-.8 1.9-2 1.9H8" />
          <line x1="8" y1="8.5" x2="8" y2="16" />
          <path d="M14 11.1h3" />
          <path d="M14 14.9c.3.7.9 1.1 1.8 1.1 1.2 0 2-.9 2-2.4 0-1.6-.8-2.4-2-2.4-.9 0-1.5.4-1.8 1.1" />
        </svg>
      ),
    },
  ],
};

export default function Footer() {
  return (
    <footer className="relative pt-8 pb-6 bg-[#1C1C1C] text-gray-200">
      <CallToAction />

      {/* top wedge */}
      <div
        className="absolute top-0 left-0 right-0 bottom-auto w-full h-20 -mt-20 overflow-hidden pointer-events-none"
        style={{ transform: "translateZ(0)" }}
      >
        <svg
          className="absolute bottom-0 overflow-hidden text-[#1C1C1C] fill-current"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 2560 100"
        >
          <polygon points="2560 0 2560 100 0 100" />
        </svg>
      </div>

      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap text-center lg:text-left">
          {/* Left column */}
          <div className="w-full px-4 lg:w-6/12">
            <h4 className="text-3xl font-semibold text-white capitalize">
              <span className="text-[#B28228]">Scale </span>
              your digital <br />
              presence and <span className="text-[#B28228]">operations.</span>
            </h4>
            <p className="mt-0 mb-2 text-base text-gray-400">
              We provide an integrated approach, leveraging AI and automation
              across marketing, custom software, and design to reduce costs,
              ensure brand consistency, and drive measurable growth.
            </p>
            <div className="flex justify-center mt-6 space-x-6 lg:justify-start" />
          </div>

          {/* Right column */}
          <div className="w-full px-4 mt-10 lg:mt-0 lg:w-6/12">
            <div className="flex flex-wrap mb-6 items-top">
              {/* Useful links */}
              <div className="w-full px-4 ml-auto lg:w-4/12">
                <span className="block mb-2 text-sm font-semibold uppercase">
                  Useful Links
                </span>
                <ul className="list-none">
                  <li>
                    <Link
                      href="/about"
                      className="block pb-2 text-sm hover:text-[#B28228]"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/portfolio"
                      className="block pb-2 text-sm hover:text-[#B28228]"
                    >
                      Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/src/app/(main)/solutions"
                      className="block pb-2 text-sm hover:text-[#B28228]"
                    >
                      Solutions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/servicepackage"
                      className="block pb-2 text-sm hover:text-[#B28228]"
                    >
                      Service Packages
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div className="w-full px-4 lg:w-4/12">
                <span className="block mb-2 text-sm font-semibold uppercase">
                  Resources
                </span>
                <ul className="list-none">
                  <li>
                    <Link
                      href="/ServiceQuestionaire"
                      className="block pb-2 text-sm hover:text-[#B28228]"
                    >
                      Service Questionnaire
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/PrivacyPolicy/"
                      target="_blank"
                      className="block pb-2 text-sm hover:text-[#B28228]"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                        href="/TermsofUse/"
                        target="_blank"
                        className="block pb-2 text-sm hover:text-[#B28228]"
                    >
                      Terms of Use
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="block pb-2 text-sm hover:text-[#B28228]"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-600" />
        
        {/* Bottom row: social + copyright */}
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="w-full px-4 mx-auto text-center md:w-4/12">
            <div className="flex justify-center space-x-6">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-400 hover:text-[#B28228] transition-colors"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="w-6 h-6" aria-hidden="true" />
                </a>
              ))}
            </div>
            <p className="py-1 text-sm text-gray-400">
              © {new Date().getFullYear()} Autisync. All rights reserved.
              <br />
              <span className="font-light">NIF: 5001246658</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
