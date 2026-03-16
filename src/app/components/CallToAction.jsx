import React, { useEffect } from "react";

export default function CallToAction() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://brand.autisync.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <section className="relative block pt-6 bg-transparent">
        {/* Top Placeholder SVG */}
        <div
          className="absolute top-0 left-0 right-0 bottom-auto w-full h-20 -mt-20 overflow-hidden pointer-events-none"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 2560 100"
          ></svg>
        </div>

        <div className="container px-4 mx-auto lg:pt-24 lg:pb-24">
          {/* Section Title */}
          <div className="flex flex-wrap justify-center text-center">
            <div className="w-full px-4 lg:w-6/12">
              <h2 className="text-4xl font-semibold text-white">
                Why Build Something with Us?
              </h2>
            </div>
          </div>

          {/* 3D Icon Grid */}
          <div className="flex flex-wrap justify-center mt-12 gap-y-12">
            {/* ===================== COST EFFECTIVE ===================== */}
            <div className="w-full px-4 text-center lg:w-3/12">
              {/* 3D Icon */}
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-300 via-slate-500 to-slate-700 shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#1C1C1C] shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)] flex items-center justify-center">
                    {/* Piggy Bank Icon */}
                    <svg
                      viewBox="0 0 24 24"
                      className="w-7 h-7 text-slate-100"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 11a6 6 0 0 1 6-6h4.5A3.5 3.5 0 0 1 18 8.5V11" />
                      <path d="M6 17h9.5A3.5 3.5 0 0 0 19 13.5V12a4 4 0 0 0-4-4H10a4 4 0 0 0-4 4v1.5A3.5 3.5 0 0 0 6 17Z" />
                      <path d="M8.75 10.25h2.5" />
                      <path d="M9.5 9v2.5" />
                      <path d="M5 13H3" />
                    </svg>
                  </div>
                </div>
              </div>

              <h6 className="mt-5 text-xl font-semibold text-white">
                Cost Effective
              </h6>
              <p className="mt-2 mb-4 text-gray-400">
                Service & support that allow you to get the best from your
                I.T./software investment.
              </p>
            </div>

            {/* ===================== CUSTOMER CENTRIC ===================== */}
            <div className="w-full px-4 text-center lg:w-3/12">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-300 via-rose-500 to-rose-700 shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#1C1C1C] shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)] flex items-center justify-center">
                    {/* Heart Icon */}
                    <svg
                      viewBox="0 0 24 24"
                      className="w-7 h-7 text-rose-50"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.5 7.5c-1-1-2.8-1-3.8 0l-.7.7-.7-.7c-1-1-2.8-1-3.8 0-1.1 1.1-1.1 2.9 0 4l4.5 4.5 4.5-4.5c1.1-1.1 1.1-2.9 0-4Z" />
                      <circle cx="6" cy="6" r="1.6" />
                      <path d="M3.5 10.2A2.8 2.8 0 0 1 6 9c.9 0 1.7.4 2.2 1" />
                    </svg>
                  </div>
                </div>
              </div>

              <h5 className="mt-5 text-xl font-semibold text-white">
                Customer-Centric
              </h5>
              <p className="mt-2 mb-4 text-gray-400">
                Positioning a customer-first, quality-first approach as the
                foundation of our business.
              </p>
            </div>

            {/* ===================== GROWTH CAPABILITY ===================== */}
            <div className="w-full px-4 text-center lg:w-3/12">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 via-amber-500 to-amber-700 shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#1C1C1C] shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)] flex items-center justify-center">
                    {/* Growth Icon */}
                    <svg
                      viewBox="0 0 24 24"
                      className="w-7 h-7 text-amber-50"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 19.5V10" />
                      <path d="M9 19.5V7" />
                      <path d="M14 19.5V9" />
                      <path d="M19 19.5V5.5" />
                      <path d="M4 5l3 3 5-5 5 5 3-3" />
                    </svg>
                  </div>
                </div>
              </div>

              <h5 className="mt-5 text-xl font-semibold text-white">
                Growth-Capability
              </h5>
              <p className="mt-2 mb-4 text-gray-400">
                Our strategy is to attain and build business relationships to
                aid business growth.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
