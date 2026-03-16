"use client"

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
      {/* Call to Action */}
      <section className="relative block pt-6 pb-20 bg-gray-800">
        <div className="container px-4 mx-auto lg:pt-24 lg:pb-64">
          <div className="flex flex-wrap justify-center text-center">
            <div className="w-full px-4 lg:w-6/12">
              <h2 className="text-4xl font-semibold text-white">
                Why Build Something with Us?
              </h2>
            </div>
          </div>
          <div className="flex flex-wrap justify-center mt-12">
            {/* Automation Ready */}
            <div className="w-full px-4 text-center lg:w-3/12">
              <div className="inline-flex items-center justify-center w-12 h-12 p-3 text-gray-800 bg-white rounded-full shadow-lg animate-pulse">
                <i className="text-xl fas fa-cogs"></i>
              </div>
              <h6 className="mt-5 text-xl font-semibold text-white">Automation Ready</h6>
              <p className="mt-2 mb-4 text-gray-400">
                We integrate backend systems and AI tools to streamline your operations.
              </p>
            </div>

            {/* Scalable Growth */}
            <div className="w-full px-4 text-center lg:w-3/12">
              <div className="inline-flex items-center justify-center w-12 h-12 p-3 text-gray-800 bg-yellow-300 rounded-full shadow-lg animate-pulse">
                <i className="text-xl fas fa-bolt"></i>
              </div>
              <h5 className="mt-5 text-xl font-semibold text-white">Scalable Growth</h5>
              <p className="mt-2 mb-4 text-gray-400">
                From startup to enterprise, we tailor solutions that grow with you.
              </p>
            </div>

            {/* Results Driven */}
            <div className="w-full px-4 text-center lg:w-3/12 group">
              <div className="inline-flex items-center justify-center w-12 h-12 p-3 text-white bg-[var(--autisync-gold,#b98b2f)] rounded-full shadow-lg animate-pulse">
                <i className="text-xl fas fa-chart-line"></i>
              </div>
              <h5 className="mt-5 text-xl font-semibold text-white">Results Driven</h5>
              <p className="mt-2 mb-4 text-gray-400">
                We focus on ROI, lead generation, and performance tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="relative block py-24 bg-gray-800 lg:pt-0">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap justify-center -mt-48 lg:-mt-64">
            <div className="w-full px-4 lg:w-6/12">
              <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded-lg shadow-lg">
                <div className="flex-auto p-5 lg:p-10">
                  <h4 className="text-2xl font-semibold text-gray-800">Want to work with us?</h4>
                  <p className="mt-1 mb-4 text-gray-600">
                    Complete this form and we’ll be in touch within 24 hours. Or{" "}
                    <a
                      href="https://wa.me/+447883317646"
                      className="text-[var(--autisync-gold,#b98b2f)] font-semibold hover:text-yellow-700"
                    >
                      message us on WhatsApp
                    </a>
                    .
                  </p>

                  {/* Embedded Autisync Form */}
                  <div className="overflow-hidden rounded-md">
                    <iframe
                      src="https://brand.autisync.com/widget/form/IKN6hrcTISji3knYiOt9"
                      style={{
                        width: "100%",
                        height: "905px",
                        border: "none",
                        borderRadius: "8px",
                        background: "#f9fafb"
                      }}
                      id="inline-IKN6hrcTISji3knYiOt9"
                      data-layout='{"id":"INLINE"}'
                      data-trigger-type="alwaysShow"
                      data-activation-type="alwaysActivated"
                      data-deactivation-type="neverDeactivate"
                      data-form-name="Contact Us"
                      data-height="905"
                      title="Contact Us"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
