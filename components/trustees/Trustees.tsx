import Image from "next/image";
import React from "react";

const Trustees = () => {
  

  return (
    <section className="mx-auto py-16 font-nunito xs:max-w-[550px] md:max-w-[780px] md:px-10 lg:max-w-[993px] lg:px-5 lg:py-12 xl:pt-32 xl:max-w-[1200px] xxl:px-0">
      <div className="text-primary-text text-base font-semibold text-center">
        <h3>Trusted by the world's best</h3>
      </div>
      <div className="w-[60px] h-[60px] mx-auto flex justify-center items-center mt-6">
        <div>
          <Image
            src="/assets/images/trustee1.png"
            alt="Hero House"
            width={500}
            height={500}
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Trustees;
