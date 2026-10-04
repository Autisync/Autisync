import React from "react";
import Link from "next/link";
import { HeroMarketLine } from "@/app/components/MarketCopy";

/* ========= 3D Icon Wrapper (with hover) ========= */

function ServiceIcon3D({ children, gradient }) {
  return (
    <div className="inline-flex items-center justify-center mb-5">
      <div
        className={`
          flex items-center justify-center w-14 h-14 rounded-full
          bg-gradient-to-br ${gradient}
          shadow-[0_14px_30px_rgba(0,0,0,0.35)]/30
          border border-white/10
          transition-transform duration-300 ease-out
          group-hover:scale-105 group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.45)]/30
        `}
      >
        <div
          className={`
            flex items-center justify-center w-9 h-9 rounded-full
            bg-white/95
            shadow-[inset_0_2px_4px_rgba(0,0,0,0.25)]
            transition-transform duration-300 ease-out
            group-hover:scale-110
          `}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* ========= Inline SVG Icons ========= */

const MarketingSeoIcon = ({ className = "w-5 h-5" }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
      {/* Bar chart — evenly spaced, bottom-aligned at y=20 */}
      <rect x="3" y="13" width="3.5" height="7" rx="1" />
      <rect x="10.25" y="9" width="3.5" height="11" rx="1" />
      <rect x="17.5" y="5" width="3.5" height="15" rx="1" />
      {/* Trend line arc connecting bar tops — implies SEO growth */}
      <path d="M4.75 12.5c2.5-3 5-4.5 8-5.5" strokeWidth="1.3" strokeDasharray="1.5 1.5" />
      {/* Magnifier overlay — the "search" in SEO */}
      <circle cx="8.5" cy="7" r="2.5" />
      <path d="M10.3 8.8l1.7 1.7" />
    </svg>
);

const WebDevIcon = ({ className = "w-5 h-5" }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
      {/* Browser chrome */}
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9h18" />
      {/* Traffic lights */}
      <circle cx="6.5" cy="7" r="0.8" strokeWidth="1.2" />
      <circle cx="9.2" cy="7" r="0.8" strokeWidth="1.2" />
      <circle cx="11.9" cy="7" r="0.8" strokeWidth="1.2" />
      {/* Code chevrons — optically centered in content area */}
      <path d="M8.5 13.5L6 15.5l2.5 2" />
      <path d="M15.5 13.5L18 15.5l-2.5 2" />
      <path d="M13 12.5l-2 6" strokeWidth="1.3" />
    </svg>
);

const ITSupportIcon = ({ className = "w-5 h-5" }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
      {/* Headset ear cup */}
      <path d="M5 11a7 7 0 0 1 14 0" />
      {/* Left earpiece */}
      <path d="M5 11v3a1.5 1.5 0 0 0 3 0v-3" />
      {/* Right earpiece */}
      <path d="M16 11v3a1.5 1.5 0 0 0 3 0v-3" />
      {/* Mic boom arm */}
      <path d="M7.5 17.5c0 1.5 1 2.5 4.5 2.5" />
      <path d="M12 20v.5" />
      <circle cx="12" cy="21" r="0.6" strokeWidth="1.2" />
    </svg>
);

const UiUxIcon = ({ className = "w-5 h-5" }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
      {/* Outer frame */}
      <rect x="3" y="4" width="18" height="13" rx="2" />
      {/* Toolbar divider */}
      <path d="M3 8.5h18" />
      {/* Window dots */}
      <circle cx="6.5" cy="6.25" r="0.8" strokeWidth="1.2" />
      <circle cx="9.2" cy="6.25" r="0.8" strokeWidth="1.2" />
      {/* Content layout blocks — sidebar + main */}
      <rect x="5.5" y="11" width="4" height="4" rx="0.8" strokeWidth="1.3" />
      <path d="M12 11.5h6" strokeWidth="1.3" />
      <path d="M12 13.5h4.5" strokeWidth="1.3" />
      {/* Stand */}
      <path d="M10 17l1.5 2.5h1L14 17" />
      <path d="M9 19.5h6" />
    </svg>
);

const GraphicIcon = ({ className = "w-5 h-5" }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
      {/* Pen tool body */}
      <path d="M14 4l6 6-9.5 9.5-2.5.5-1.5-1.5.5-2.5z" />
      {/* Pen nib crease */}
      <path d="M14 4l2 2" strokeWidth="1.2" />
      {/* Anchor point at tip */}
      <path d="M4.5 19.5l2-2" />
      {/* Bezier handle dot */}
      <circle cx="19" cy="5" r="1.3" strokeWidth="1.3" />
    </svg>
);

const AppDevIcon = ({ className = "w-5 h-5" }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
      {/* Phone outline */}
      <rect x="7" y="3" width="10" height="18" rx="2.5" />
      {/* Top notch/speaker */}
      <path d="M10.5 6h3" strokeWidth="1.3" />
      {/* Screen content — code lines */}
      <path d="M10 10l-1.5 1.5L10 13" strokeWidth="1.3" />
      <path d="M14 10l1.5 1.5L14 13" strokeWidth="1.3" />
      <path d="M12.5 9.5l-1 5" strokeWidth="1.2" />
      {/* Home indicator */}
      <path d="M10.5 17.5h3" strokeWidth="1.3" />
    </svg>
);

const WhoWeAreIcon = ({ className = "w-6 h-6" }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
      {/* Center/primary person */}
      <circle cx="12" cy="7.5" r="2.8" />
      <path d="M6.5 19a5.5 5.5 0 0 1 11 0" />
      {/* Left secondary person — smaller, slightly behind */}
      <circle cx="5.5" cy="9.5" r="2" strokeWidth="1.4" />
      <path d="M2 18.5a3.5 3.5 0 0 1 5-2.3" strokeWidth="1.3" />
      {/* Right secondary person */}
      <circle cx="18.5" cy="9.5" r="2" strokeWidth="1.4" />
      <path d="M22 18.5a3.5 3.5 0 0 0-5-2.3" strokeWidth="1.3" />
    </svg>
);

export default function Landing() {
  return (
    <>
      {/* Service info */}
      <div className="relative flex items-center content-center justify-center py-48 pb-32 min-h-screen-75">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/3782235/pexels-photo-3782235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          }}
        >
          <span
            id="blackOverlay"
            className="absolute w-full h-full bg-black opacity-75"
          ></span>
        </div>

        {/* landing */}
        <div className="container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-full px-4 ml-auto mr-auto text-center lg:w-8/12">
              <div className="p-2">
                <h1 className="pb-4 text-5xl font-semibold text-white">
                  We Systemize Your Success.
                </h1>
                <p className="font-thin text-gray-200">
                  From branding to backend - we automate your journey.
                </p>
                <HeroMarketLine />
              </div>
              <br />
                <Link href={"/ServiceQuestionaire"}
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-[var(--autisync-gold,#b98b2f)] border border-transparent rounded-md shadow-lg hover:bg-[#1C1C1C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >Get Started with Us</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Services  and 2nd section*/}
      <section className="pb-20 -mt-24 bg-gray-100">
        <div className="container px-4 mx-auto">
          {/* Services */}
          <div className="flex flex-wrap">
            {/* Marketing (TOP – black circle, gold icon) */}
            <div className="w-full px-4 pt-6 text-center lg:pt-12 md:w-4/12">
              <div className="group relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                <div className="flex-auto px-4 py-5">
                  <ServiceIcon3D gradient="from-[#1C1C1C] via-[#2a2a2a] to-[#000000]">
                    <MarketingSeoIcon className="w-5 h-5 text-[var(--autisync-gold,#b98b2f)]" />
                  </ServiceIcon3D>
                  <h6 className="text-xl font-semibold text-gray-800">
                    Marketing &amp; SEO
                  </h6>
                  <p className="mt-2 mb-4 text-gray-500">
                    Your virtual visual, including social media management needs
                    to achieve the goal of increasing customer satisfaction and
                    brand awareness to target audience.
                  </p>
                </div>
              </div>
            </div>

            {/* Web Development (TOP – black circle, gold icon) */}
            <div className="w-full px-4 text-center md:w-4/12">
              <div className="group relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                <div className="flex-auto px-4 py-5">
                  <ServiceIcon3D gradient="from-[#1C1C1C] via-[#2a2a2a] to-[#000000]">
                    <WebDevIcon className="w-5 h-5 text-[var(--autisync-gold,#b98b2f)]" />
                  </ServiceIcon3D>
                  <h6 className="text-xl font-semibold text-gray-800">
                    Web Development
                  </h6>
                  <p className="mt-2 mb-4 text-gray-500">
                    It is clear that websites play a major role in the success
                    of business marketing and operations. Start customizing,
                    developing your website and take advantage of your success
                    in being more visible to your potential clients.
                  </p>
                </div>
              </div>
            </div>

            {/* IT Consultation/Technical Support (TOP – black circle, gold icon) */}
            <div className="w-full px-4 pt-6 text-center lg:pt-12 md:w-4/12">
              <div className="group relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                <div className="flex-auto px-4 py-5">
                  <ServiceIcon3D gradient="from-[#1C1C1C] via-[#2a2a2a] to-[#000000]">
                    <ITSupportIcon className="w-5 h-5 text-[var(--autisync-gold,#b98b2f)]" />
                  </ServiceIcon3D>
                  <h6 className="text-xl font-semibold text-gray-800">
                    IT Consultation / Technical Support
                  </h6>
                  <p className="mt-2 mb-4 text-gray-500">
                    We help you assess technology options and line them up with
                    how your business actually works, so every system you pay
                    for supports your goals.
                  </p>
                </div>
              </div>
            </div>

            {/* UI/UX Design (BOTTOM – gold circle, dark icon) */}
            <div className="w-full px-4 pt-6 text-center md:w-4/12">
              <div className="group relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                <div className="flex-auto px-4 py-5">
                  <ServiceIcon3D gradient="from-[#b98b2f] via-[#d1a94c] to-[#7a5a1d]">
                    <UiUxIcon className="w-5 h-5 text-gray-900" />
                  </ServiceIcon3D>
                  <h6 className="text-xl font-semibold text-gray-800">
                    UI/UX Design
                  </h6>
                  <p className="mt-2 mb-4 text-gray-500">
                    User Interface and User Experience (UI/UX) design – our
                    designers build interfaces in software or computerized
                    devices, focusing on looks or style.
                  </p>
                </div>
              </div>
            </div>

            {/* Graphic Design (BOTTOM – gold circle, dark icon) */}
            <div className="w-full px-4 text-center md:w-4/12">
              <div className="group relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                <div className="flex-auto px-4 py-5">
                  <ServiceIcon3D gradient="from-[#b98b2f] via-[#d1a94c] to-[#7a5a1d]">
                    <GraphicIcon className="w-5 h-5 text-gray-900" />
                  </ServiceIcon3D>
                  <h6 className="text-xl font-semibold text-gray-800">
                    Graphic Design
                  </h6>
                  <p className="mt-2 mb-4 text-gray-500">
                    Great Graphic Design allows you to make a positive first
                    impression on those looking on.
                  </p>
                </div>
              </div>
            </div>

            {/* Software / App Development (BOTTOM – gold circle, dark icon) */}
            <div className="w-full px-4 pt-6 text-center md:w-4/12">
              <div className="group relative flex flex-col w-full min-w-0 mb-8 break-words bg-white rounded-lg shadow-lg transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                <div className="flex-auto px-4 py-5">
                  <ServiceIcon3D gradient="from-[#b98b2f] via-[#d1a94c] to-[#7a5a1d]">
                    <AppDevIcon className="w-5 h-5 text-gray-900" />
                  </ServiceIcon3D>
                </div>
                <div className="flex-auto px-4 pb-5">
                  <h6 className="text-xl font-semibold text-gray-800">
                    Software / App Development
                  </h6>
                  <p className="mt-2 mb-4 text-gray-500">
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough. Keep your user engaged!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Who are we */}
          <div className="flex flex-wrap items-center mt-32">
            {/* who we are section */}
            <div className="w-full px-4 ml-auto mr-auto md:w-5/12 group">
              <ServiceIcon3D gradient="from-[#1C1C1C] via-[#2a2a2a] to-[#000000]">
                <WhoWeAreIcon className="w-6 h-6 text-[var(--autisync-gold,#b98b2f)]" />
              </ServiceIcon3D>
              <h3 className="mb-2 text-3xl font-semibold leading-normal text-gray-800 transition-colors duration-200 group-hover:text-gray-900">
                Who Are We?
              </h3>
              <p className="mt-4 mb-4 leading-relaxed text-gray-600">
                At AutiSync, we transform businesses through intelligent automation, premium
                digital experiences, and seamless technology systems. We turn complex problems
                into simple, scalable solutions — helping brands save time, increase
                efficiency, and grow faster.
              </p>

              <p className="mt-0 mb-4 leading-relaxed text-gray-600">
                Whether you need AI-powered workflows, custom software, a branded website,
                CRM setup, or ongoing tech support — we build systems that work together,
                operate smoothly, and elevate your entire business. We’re not just a service
                provider. We’re your long-term technology partner.
              </p>
              <Link
                href="https://wa.me/+447883317646"
                target="_blank"
                className="mt-8 font-bold text-gray-800 hover:text-[var(--autisync-gold,#b98b2f)]/90"
              >
                Get in touch with Sales
              </Link>
            </div>

            {/* Seamless services section */}
            <div className="w-full px-4 pt-10 ml-auto mr-auto md:w-4/12 group">
              <div className="
                  relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded-lg shadow-md
                  transition-all duration-300 ease-out 
                  group-hover:-translate-y-2 group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.25)]/10
                "
              >
                <img
                  alt="Seamless services"
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 block w-full h-95-px -top-94-px"
                  >
                    <polygon className="text-gray-800 fill-current"></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-gray-600">
                    Seamless Services
                  </h4>
                  <p className="mt-2 font-light text-gray-600 text-md">
                    Giving the necessary technical support to continue your work
                    daily and long term activities uninterrupted and efficiently.
                  </p>
                </blockquote>
              </div>
            </div>
            {/* Seamless services section end */}

          </div>
        </div>
      </section>
    </>
  );
}
