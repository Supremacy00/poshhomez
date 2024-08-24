import React from "react";

const AboutExperience = () => {
  const aeData = [
    {
      title: "Years Experience",
      rate: 3.5,
      id: 1,
    },
    {
      title: "Project Challenge",
      rate: 23,
      id: 2,
    },
    {
      title: "Trusted Landlords",
      rate: "100+",
      id: 3,
    },
    {
      title: "Trusted Renters",
      rate: "830K",
      id: 4,
    },
  ];
  return (
    <div className="bg-white rounded-xl shadow-2xl p-7 mt-5">
      <ul className="grid grid-cols-2 gap-3">
        {aeData.map((item) => (
          <div key={item.id} className="bg-custom4 p-5 rounded-xl">
            <li className="text-[25px] text-primary-text font-semibold md:text-[30px]">{item.rate}</li>
            <li className="text-[13px] font-light text-secondary">{item.title}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default AboutExperience;
