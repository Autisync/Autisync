import { Fragment } from "react";

const locations = [
  {
    name: "Graphic Design",
    people: [
      {
        name: "Logo Design",
        desc: "Not including branding book",
        duration: "+- 14 Days",
        price: "Contact Us",
      },
      {
        name: "Brand Creation",
        desc: "Company name, concept, slogan, vision & mission",
        duration: "+- 10 Days",
        price: "Contact Us",
      },
      {
        name: "Rollup",
        desc: "Design and printing of rollup",
        duration: "+- 7 Days",
        price: "Contact Us",
      },
      {
        name: "Logo Redesign",
        desc: "Modern redesign to meet current standards",
        duration: "+- 12 Days",
        price: "Contact Us",
      },
      {
        name: "Flyers / Brochures",
        desc: "A3, A4, A5 flyers, pamphlets, brochures etc.",
        duration: "7 Days",
        price: "Contact Us",
      },
      {
        name: "Business Card",
        desc: "Design front & back business card",
        duration: "+- 4 Days",
        price: "Contact Us",
      },
      {
        name: "Social Media Banner",
        desc: "PNG & JPEG banner designs",
        duration: "2 Days",
        price: "Contact Us",
      },
      {
        name: "Company Profile",
        desc: "9-page design, excluding copywriting",
        duration: "+- 15 Days",
        price: "Contact Us",
      },
      {
        name: "Video animation",
        desc: "Design & creation of animations",
        duration: "+- 9 Days",
        price: "Contact Us",
      },
      {
        name: "Digital Signature",
        desc: "Animated or static signature design",
        duration: "+- 1 Days",
        price: "Contact Us",
      },
      {
        name: "Email Template",
        desc: "Custom design, DOCX + HTML",
        duration: "+- 2 Days",
        price: "Contact Us",
      },
      {
        name: "Company Docx",
        desc: "Letterheads & branded templates",
        duration: "-",
        price: "Contact Us",
      },
    ],
  },
  {
    name: "Social Media",
    people: [
      {
        name: "Social Media Management",
        desc: "Strategy, reports, corrections & insights",
        duration: "Monthly",
        price: "Contact Us",
      },
      {
        name: "Google Business Setup",
        desc: "Maps, visibility, reviews, business info",
        duration: "+- 7 Days",
        price: "Contact Us",
      },
      {
        name: "Social Media Creation",
        desc: "Account setup for FB, IG, LinkedIn",
        duration: "+- 7 Days",
        price: "Contact Us",
      },
      {
        name: "Email Marketing",
        desc: "Custom branded campaigns (weekly)",
        duration: "Monthly",
        price: "Contact Us",
      },
      {
        name: "Starter Package",
        desc: "15 posts, 4 designs, automation",
        duration: "Monthly",
        price: "Contact Us",
      },
      {
        name: "Intermediate Package",
        desc: "20 posts, 7 designs, auto replies, more",
        duration: "Monthly",
        price: "Contact Us",
      },
      {
        name: "Enterprise Package",
        desc: "30+ posts, advanced reporting, automation",
        duration: "Monthly",
        price: "Contact Us",
      },
    ],
  },
  {
    name: "Development Services",
    people: [
      {
        name: "Professional Email",
        desc: "Custom email accounts w/ domain",
        duration: "-",
        price: "Contact Us",
      },
      {
        name: "Web Hosting",
        desc: "Secure, fast and scalable",
        duration: "-",
        price: "Contact Us",
      },
      {
        name: "SEO Application",
        desc: "Search engine optimization implementation",
        duration: "-",
        price: "Contact Us",
      },
      {
        name: "App Development",
        desc: "Mobile or web application builds",
        duration: "-",
        price: "Contact Us",
      },
      {
        name: "Tech Support",
        desc: "Monthly maintenance and updates",
        duration: "Monthly",
        price: "Contact Us",
      },
      {
        name: "Globalization",
        desc: "Multi-language site setup (6 pages)",
        duration: "+- 25 Days",
        price: "Contact Us",
      },
    ],
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Items() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-xl font-bold leading-6 text-[#3B3B3B]">
            Services and Products
          </h2>
        </div>
      </div>

      <div className="flow-root mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#3B3B3B]">
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-bold text-white sm:pl-3">
                    Name
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-bold text-white">
                    Description
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-bold text-white">
                    Timeframe
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-bold text-white">
                    Price
                  </th>
                  <th className="py-3.5 pl-3 pr-4 sm:pr-3">
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {locations.map((location) => (
                  <Fragment key={location.name}>
                    <tr className="border-t border-gray-200">
                      <th
                        colSpan={5}
                        className="py-2 pl-4 pr-3 text-sm font-semibold text-center bg-[#B28228] text-white sm:pl-3"
                      >
                        {location.name}
                      </th>
                    </tr>
                    {location.people.map((person, idx) => (
                      <tr
                        key={person.name + idx}
                        className={classNames(
                          idx === 0 ? "border-gray-300" : "border-gray-200",
                          "border-t"
                        )}
                      >
                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                          {person.name}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-600">
                          {person.desc}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-600">
                          {person.duration}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-600">
                          {person.price}
                        </td>
                        <td className="py-4 pl-3 pr-4 text-sm text-right sm:pr-3">
                          <a
                            href="https://wa.me/+447883317646?text=I%20would%20like%20to%20get%20to%20know%20about%20your%20services."
                            target="_blank"
                            className="text-[#B28228] hover:text-[#3B3B3B] font-medium"
                            rel="noreferrer"
                          >
                            Inquire
                            <span className="sr-only">, {person.name}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
