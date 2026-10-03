import Link from "next/link";
import Image from "next/image";
const logos = [
    {   id: 1,
        src: "/logos/YourP.png",
        alt: "YourPharmacy logo",
        href: "https://yourpharmacynam.com/",
    },
    {   id: 2,
        src: "/logos/oku.png",
        alt: "Oku Tanga logo",
        href: "",
    },
    {   id: 3,
        src: "/logos/TcharyGlamour.png",
        alt: "Tchary Glamour logo",
        href: "https://tcharyglamour.netlify.app/index.html",
    },
    {   id: 4,
        src: "/logos/blue.png",
        alt: "Bluehorizon logo",
        href: "https://bluehorizon.co.ao/",
    },
    {   id: 5,
        src: "/logos/shivali.webp",
        alt: "Shivali logo",
        href: "https://www.shivaliinvestments.com/",
    },
    {
      src:"/logos/Florentek.png",
      alt:"Florentek logo",
      href:"https://www.florentek.co.ao/",
    },
    {
      src:"/logos/Girassol.svg",
      alt:"Girassol logo",
      href:"https://www.grupogirassol.co.ao/",
    },
    {
      src:"/logos/Globus.svg",
      alt:"Globus logo",
      href:"https://www.globus.co.ao/",
    },
    {
      src:"/logos/GoldenRose.svg",
      alt:"GoldenRose logo",
      href:"https://www.grupogirassol.co.ao/Goldenrose",
    },
    {
        src:"/logos/Mavunzuka.svg",
        alt:"Mavunzuka logo",
        href:"https://www.mavunzuka.co.ao/",
    },
];

export default function Clients() {
    return (
        <div className="py-16 bg-gray-100 sm:py-16">
            <div className="px-6 mx-auto max-w-7xl lg:px-8">
                <h2 className="text-3xl font-semibold leading-8 text-center text-gray-700 ">
                    Trusted by
                </h2>
                <div className="grid items-center max-w-lg grid-cols-3 mx-auto mt-10 gap-x-4 gap-y-10 sm:max-w-xl sm:grid-cols-5 sm:gap-x-2 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    {logos.map((logo) => {
                        const img = (
                            <Image
                                className="object-contain w-full col-span-2 max-h-22 lg:col-span-1"
                                src={logo.src}
                                alt={logo.alt}
                                width={500}
                                height={500}
                            />
                        );
                        // Not every client has a public site; render those logos without a link.
                        return logo.href ? (
                            <Link key={logo.src} href={logo.href} target="_blank" rel="noopener noreferrer" className="transition duration-150 ease-in-out delay-100 hover:scale-125">
                                {img}
                            </Link>
                        ) : (
                            <div key={logo.src}>{img}</div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}