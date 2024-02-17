import React from "react";

const PasswordAndSecurity = () => {
  return (
    <section className="text-primary-text font-noto pb-5">
      <div>
        <h1 className="text-[22px] font-semibold text-primary-text mb-4">
          Password & Security
        </h1>
        <p className="text-base text-secondary font-light mb-5">
          Manage your password settings and secure your account.
        </p>
      </div>
      <form>
        <h3 className="text-[18px] font-semibold">Password</h3>
        <div className="mt-5 xs:flex items-center gap-5 ">
          <div className="w-full">
            <label htmlFor="Password" className="text-base">
              Current Password
            </label>
            <input
              type="text"
              name=""
              id=""
              className="w-full mt-1.5 py-2.5 border-custom11 rounded-lg outline-none"
            />
          </div>
          <div className="mt-3 w-full xs:mt-9">
            <button className="text-custom2 text-base underline hover:no-underline">
              Forgot Password?
            </button>
          </div>
        </div>
        <div className="mt-7 xs:flex items-center gap-5 xs:mt-4">
          <div className="w-full">
            <label htmlFor="Password" className="text-base">
              New Password
            </label>
            <input
              type="text"
              name=""
              id=""
              className="w-full mt-1.5 py-2.5 border-custom11 rounded-lg outline-none"
            />
          </div>
          <div className="mt-5 w-full xs:mt-0">
            <label htmlFor="Password" className="text-base">
              Confirm Password
            </label>
            <input
              type="text"
              name=""
              id=""
              className="w-full mt-1.5 py-2.5 border-custom11 rounded-lg outline-none"
            />
          </div>
        </div>
        <div className="mt-5">
          <button className="text-base text-custom2 font-semibold px-7 py-2.5 border-[1px] border-custom2 rounded-lg hover:bg-custom2 hover:text-white transition-colors duration-300 ease-in-out">
            Update Password
          </button>
        </div>
      </form>
      <div className="w-full h-[1px] bg-custom11 mt-10"></div>
      <div className="mt-7">
        <h1 className="text-[20px] font-semibold">{`Where you're signed in on`}</h1>
      </div>
    </section>
  );
};

export default PasswordAndSecurity;
