import Link from "next/link";
import React from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import ContactForm from "./ContactForm";
import { FaEnvelopeOpenText, FaSquarePhone } from "react-icons/fa6";

const Contact = () => {
  const contactData = [
    {
      logo: <FaEnvelopeOpenText />,
      title: "Email",
      email: "Loremipsum@poshhomez.com",
    },
    {
      logo: <FaSquarePhone />,
      title: "Phone",
      email: "+2348166836197",
    },
  ];

  return (
    <section className="relative w-full bg-custom4 text-primary-text pt-24 pb-24 lg:pt-[120px]">
      <div className="mx-auto px-4 lg:max-w-[993px] lg:px-5 xl:max-w-[1200px] xxl:px-0">
        <div>
          <div className="flex items-center gap-1.5 text-secondary font-light text-sm">
            <Link href="/">
              <h3 className="hover:text-primary-text transition-colors duration-300 ease-in-out">
                Home
              </h3>
            </Link>
            <span className="text-[19px]">
              <RiArrowRightSLine />
            </span>
            <h3 className="text-custom2">Contact</h3>
          </div>
        </div>
        <section className="lg:flex justify-between gap-10 mt-8 lg:gap-20">
          <div className="w-full lg:w-[45%]">
            <div className="w-full xs:max-w-[410px]">
              <div>
                <h3 className="text-[22px] font-medium mb-3 sm:text-[30px]">
                  Get In Touch
                </h3>
                <p className="text-[15px] text-secondary leading-[27px]">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Commodi cum perferendis nulla fuga porro illum eos id.
                </p>
              </div>
              <div className="w-full space-y-5 mt-8">
                {contactData.map((contact, index) => (
                  <div key={index} className="w-full flex items-center gap-3.5 bg-white rounded-xl p-5 overflow-hidden">
                    <span className="bg-custom8 p-4 rounded-full text-[30px] text-custom6">
                      {contact.logo}
                    </span>
                    <div>
                      <h3 className="text-[15px] font-medium text-primary-text line-clamp-1 mb-1">
                        {contact.title}
                      </h3>
                      <p className="text-sm font-normal text-secondary line-clamp-1">
                        {contact.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full mt-8 lg:mt-0 lg:w-[55%]">
            <ContactForm />
          </div>
        </section>
      </div>
    </section>
  );
};

export default Contact;
