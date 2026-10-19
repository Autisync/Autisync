import Image from "next/image";
import React from "react";

const logos = [
  {
    src: "/logos/ai.png",
    alt: "Adobe AI logo",
  },
  {
    src: "/logos/android-studio.png",
    alt: "Android studio logo",
  },
  {
    src: "/logos/aws.png",
    alt: "aws logo",
  },
  {
    src: "/logos/behance.png",
    alt: "behance logo",
  },
  {
    src: "/logos/dart.png",
    alt: "Dart Logo",
  },
  {
    src: "/logos/docker.png",
    alt: "docker logo",
  },
  {
    src: "/logos/firebase.svg",
    alt: "Firebase logo",
  },
  {
    src: "/logos/github.png",
    alt: "Github logo",
  },
  {
    src: "/logos/google.svg",
    alt: "Google marketing logo",
  },
  {
    src: "/logos/java.png",
    alt: "Java logo",
  },
  {
    src: "/logos/jira.svg",
    alt: "Jira logo",
  },
  {
    src: "/logos/mongodb.png",
    alt: "MongoDB logo",
  },
  {
    src: "/logos/mysql.png",
    alt: "MySQL logo",
  },
  {
    src: "/logos/PHP.png",
    alt: "PHP logo",
  },

  {
    src: "/logos/nginx.png",
    alt: "Nginx logo",
  },
  {
    src: "/logos/nodejs.png",
    alt: "NodeJS logo",
  },
//   {
//     src: "/logos/Oracle.png",
//     alt: "Oracle logo",
//   },
  {
    src: "/logos/Nextjs.png",
    alt: "NextJS logo",
  },
  {
    src: "/logos/psd.png",
    alt: "Photoshop logo",
  },
  {
    src: "/logos/vercel.png",
    alt: "Vercel logo",
  },
  {
    src: "/logos/xd.png",
    alt: "Adobe XD logo",
  },
];

/** "Docker logo" → "Logótipo Docker" for the Portuguese page. */
const ptAlt = (alt) => `Logótipo ${alt.replace(/\s*logo$/i, "")}`;

export default function Example({ lang = "en" } = {}) {
  const pt = lang === "pt";
  return (
      <>
    <div className="py-24 bg-gray-100 sm:py-32">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <h2 className="text-3xl font-semibold leading-8 text-center text-gray-800 ">
          {pt ? "Tecnologias que usamos" : "Technologies Used"}
        </h2>
        <div className="grid items-center max-w-lg grid-cols-4 mx-auto mt-10 gap-x-4 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-2 lg:mx-0 lg:max-w-none lg:grid-cols-10">
          {logos.map((logo) => (
            <Image
              className="object-contain w-full col-span-2 max-h-12 lg:col-span-1"
              src={logo.src}
              alt={pt ? ptAlt(logo.alt) : logo.alt}
              key={logo.src}
              width={108}
              height={48}
            />
          ))}
        </div>
      </div>
    </div>
      </>
  );
}
