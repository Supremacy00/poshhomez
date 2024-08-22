import React from "react";
import { TiSocialFacebook, TiSocialTwitter } from "react-icons/ti";
import { IoLogoGithub } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";

const Team = () => {
  const teams = [
    {
      id: 1,
      image: "/assets/teams/team1.jpg",
      name: "Jane Smith",
      role: "Leasing Agent",
      icons: [
        { icon: <TiSocialFacebook />, link: "#" },
        { icon: <TiSocialTwitter />, link: "#" },
        { icon: <IoLogoGithub />, link: "#" },
      ],
    },
    {
      id: 2,
      image: "/assets/teams/team2.jpg",
      name: "Johnny Williams",
      role: "Property Manager",
      icons: [
        { icon: <TiSocialFacebook />, link: "#" },
        { icon: <TiSocialTwitter />, link: "#" },
        { icon: <IoLogoGithub />, link: "#" },
      ],
    },
    {
      id: 3,
      image: "/assets/teams/team3.jpg",
      name: "Emily Davis",
      role: "Tenant Relations Agent",
      icons: [
        { icon: <TiSocialFacebook />, link: "#" },
        { icon: <TiSocialTwitter />, link: "#" },
        { icon: <IoLogoGithub />, link: "#" },
      ],
    },
    {
      id: 4,
      image: "/assets/teams/team4.jpg",
      name: "Michael Brown",
      role: "Acquisition Agent",
      icons: [
        { icon: <TiSocialFacebook />, link: "#" },
        { icon: <TiSocialTwitter />, link: "#" },
        { icon: <IoLogoGithub />, link: "#" },
      ],
    },
    {
      id: 5,
      image: "/assets/teams/team5.jpg",
      name: "James Anderson",
      role: "Marketing Specialist",

      icons: [
        { icon: <TiSocialFacebook />, link: "#" },
        { icon: <TiSocialTwitter />, link: "#" },
        { icon: <IoLogoGithub />, link: "#" },
      ],
    },
    {
      id: 6,
      image: "/assets/teams/team6.jpg",
      name: "Olivia Thompson",
      role: "Sales Coordinator",
      icons: [
        { icon: <TiSocialFacebook />, link: "#" },
        { icon: <TiSocialTwitter />, link: "#" },
        { icon: <IoLogoGithub />, link: "#" },
      ],
    },
    {
      id: 7,
      image: "/assets/teams/team7.jpg",
      name: "David Miller",
      role: "Client Services Manager",
      icons: [
        { icon: <TiSocialFacebook />, link: "#" },
        { icon: <TiSocialTwitter />, link: "#" },
        { icon: <IoLogoGithub />, link: "#" },
      ],
    },
    {
      id: 8,
      image: "/assets/teams/team8.jpg",
      name: "Sophia Johnson",
      role: "Financial Analyst",
      icons: [
        { icon: <TiSocialFacebook />, link: "#" },
        { icon: <TiSocialTwitter />, link: "#" },
        { icon: <IoLogoGithub />, link: "#" },
      ],
    },
  ];

  return (
    <section className="mt-16 lg:mt-24">
      <h1 className="text-[22px] font-semibold text-primary-text sm:text-[30px] tracking-wide">
        Our Agents
      </h1>
      <p className="text-sm text-primary-text font-light mt-1 lg:mt-0 lg:text-base">
        Meet the amazing agents behind our agency.
      </p>
      <article className="mt-7 grid grid-col-1 xs:grid-cols-2 gap-x-7 gap-y-10 md:grid-cols-3 lg:grid-cols-4  lg:mt-12">
        {teams.map((team) => (
          <div key={team.id} className="group">
            <div className="relative aspect-100/80 overflow-hidden bg-custom4 rounded-xl">
              <Image
                src={team.image}
                alt={team.name}
                width={500}
                height={500}
                priority
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white p-2 rounded-md group-hover:bg-primary-text transition-colors duration-500">
                {team.icons.map((icons, index) => (
                  <Link
                    target="blank"
                    key={index}
                    href={icons.link}
                    className="text-[20px] text-primary-text cursor-pointer group-hover:text-white transition-transform duration-500 ease-in-out"
                  >
                    {icons.icon}
                  </Link>
                ))}
              </span>
            </div>
            <div className="mt-3">
              <h3 className="text-sm font-semibold">{team.name}</h3>
              <p className="text-[13px] font-light text-secondary mt0.5">
                {team.role}
              </p>
            </div>
          </div>
        ))}
      </article>
    </section>
  );
};

export default Team;
