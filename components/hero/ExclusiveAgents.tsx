import React from "react";
import Image from "next/image";
import { HiPlusSm } from "react-icons/hi";

const ExclusiveAgents = () => {
  return (
    <section className="hidden xl:block absolute right-[12%] -bottom-[180px] bg-white rounded-xl shadow-sm w-[270px] p-8 animate-smooth-bounce ">
      <h3 className="text-[15px] font-medium text-primary-text text-center">
        4 Exclusive Agents
      </h3>
      <div className="mt-3 relative flex items-center mx-auto">
        <div className="w-12 h-12 rounded-full overflow-hidden border-[1.5px] border-white">
          <Image
            src="/assets/agents/agent1.jpg"
            alt="Hero House"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-12 h-12 rounded-full overflow-hidden border-[1.5px] border-white -ml-2.5">
          <Image
            src="/assets/agents/agent2.jpg"
            alt="Hero House"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-12 h-12 rounded-full overflow-hidden border-[1.5px] border-white -ml-2.5">
          <Image
            src="/assets/agents/agent3.jpeg"
            alt="Hero House"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-12 h-12 rounded-full overflow-hidden border-[1.5px] border-white -ml-2.5">
          <Image
            src="/assets/agents/agent4.jpg"
            alt="Hero House"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative w-12 h-12 rounded-full border-[1.5px] border-white -ml-2.5 bg-primary-text">
            <HiPlusSm className="text-white text-[20px] absolute inset-[13px]"/>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveAgents;
