import Image from "next/image";
import React from "react";

const Trustees = () => {
  

  return (
    <section className="mx-auto py-16 font-poppins xs:max-w-[550px] md:max-w-[780px] md:px-10 lg:max-w-[993px] lg:px-5 lg:py-12 xl:pt-32 xl:max-w-[1200px] xxl:px-0">
      <div className="text-primary-text text-[15px] font-semibold text-center">
        <h3>{`Trusted by the world's best`}</h3>
      </div>
      <div className="flex justify-center items-center mt-6">
        <div>
          <Image
            src="/assets/images/trustee1.png"
            alt="Hero House"
            width={60}
            height={60}
            className="w-auto h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Trustees;
