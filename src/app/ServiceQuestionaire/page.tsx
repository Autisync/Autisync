"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const questionnaires = [
  {
    id: "graphic-design",
    title: "Graphic Design Questionnaire",
    tagline: "We want to be 100% aligned and on the same page as you.",
    description:
      "Tell us about your brand, style preferences, and what success looks like for your visuals.",
  },
  {
    id: "web-app",
    title: "App/Website Questionnaire",
    tagline: "To ensure clarity and understanding of your needs.",
    description:
      "Share your goals, target audience, and required features so we can plan the ideal digital experience.",
  },
  {
    id: "social-media",
    title: "Social Media Management",
    tagline: "Tell us about your channels and content preferences.",
    description:
      "Help us understand your tone of voice, posting frequency, and the type of content your audience loves.",
  },
  {
    id: "tech-support",
    title: "Technical Support & Maintenance",
    tagline: "What kind of ongoing support do you expect?",
    description:
      "From updates to monitoring, let us know what level of technical coverage you’d like us to provide.",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Store Setup",
    tagline: "Tell us your goals for your online store.",
    description:
      "Products, shipping, payments and customer journey — share the essentials so we can structure your store.",
  },
  {
    id: "email-marketing",
    title: "Email Marketing Services",
    tagline: "What kind of newsletters or promotions do you plan?",
    description:
      "Tell us about your audience, frequency, and offers so we can craft high-performing email flows.",
  },
];

export default function ServiceQuestionnairePage() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-black via-black/80 to-black/70">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-center bg-cover opacity-40"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/90" />

        <div className="relative px-4 pt-28 pb-20 mx-auto max-w-5xl text-center sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Service Questionnaire
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl mx-auto mt-6 text-base text-gray-200 sm:text-lg"
          >
            This isn&apos;t just any questionnaire; it&apos;s the secret sauce that fuels
            the success of our projects. Help us understand your vision, goals,
            and needs. Say goodbye to miscommunication and hello to seamless
            execution.
          </motion.p>
        </div>
      </section>

      {/* GRID OF QUESTIONNAIRE CARDS (FAQ-STYLE ENTRY POINTS) */}
      <section className="py-16 bg-gray-100">
        <div className="px-4 mx-auto max-w-6xl sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {questionnaires.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="flex flex-col justify-between h-full p-8 bg-white rounded-lg shadow-lg shadow-black/5 border border-gray-100"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-[var(--autisync-gold,#b98b2f)]">
                    {item.tagline}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>

                {/* CTA – you can swap the href to an external form (Typeform, GHL, etc.) */}
                <div className="mt-3">
                  <Link
                    href={`#${item.id}`}
                    className="inline-flex items-center text-sm font-semibold text-[var(--autisync-gold,#b98b2f)] hover:text-gray-900"
                  >
                    Start this questionnaire
                    <span className="ml-2 text-xs">↗</span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* OPTIONAL: FAQ-STYLE SECTION ANCHORS (PLACEHOLDERS) */}
          <div className="mt-20 space-y-4">
            {questionnaires.map((item) => (
              <div
                key={item.id}
                id={item.id}
                className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-sm border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title} – key things we&apos;ll ask you
                </h3>
                <p className="mt-3 text-sm text-gray-600">
                  This section can be expanded into a full FAQ or a list of sample
                  questions you&apos;ll answer in the form. For now, it&apos;s just a
                  placeholder so you can see where that content will live.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
