"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FadeLoader } from "react-spinners";
import { useAuth } from "@/contexts/authContext/Auth-Context";
import { LoginCredentials } from "@/@types";
import { HiHomeModern } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginLoading, logIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginCredentials>();

  const errorMessages = Object.values(errors).map((error) => error.message);

  const onSubmit = async (data: LoginCredentials) => {
    try {
      await logIn(data);
      reset();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <section className="text-primary-text bg-white">
      <div className="lg:flex justify-start items-center xl:gap-24">
        <div className="hidden lg:block h-screen  aspect-3/2 max-w-[460px] xl:max-w-[400px]">
          <Image
            src="/assets/images/login-image.jpg"
            alt="Login Image"
            priority
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full h-[100dvh] flex items-center justify-start ">
          <div className="mx-auto w-[450px] px-5 lg:w-[520px] lg:px-14 xl:mx-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-center mb-5">
                <Link href="/">
                  <div className="bg-custom2 p-3 rounded-[40%]">
                    <HiHomeModern className="text-[25px] text-white" />
                  </div>
                </Link>
              </div>
              <div className="text-center mb-10">
                <h1 className="text-[25px] font-medium">
                  Welcome back!
                </h1>
                <p className="text-[15px] font-normal mt-1">
                  Please enter your details
                </p>
              </div>
              <div>
                {errorMessages.length > 0 && (
                  <div className="mb-4">
                    <ul className="list-disc pl-5 text-[13px]">
                      {errorMessages.map((message, index) => (
                        <li key={index} className="text-red-500">
                          {message}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mb-6 relative flex flex-col">
                  <input
                    type="text"
                    placeholder="Email"
                    {...register("email", { required: "Email is required", pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    }, })}
                    className={`w-full text-sm py-4 px-4 border-b-[2px] placeholder:text-sm placeholder:text-custom5 ${
                      errors.email
                        ? "border-red-500 animate-shake bg-custom8"
                        : "border-custom11"
                    } border-t-0 border-r-0 border-l-0 rounded-xl focus:ring-transparent  hover:border-custom9 focus:border-b-custom9 focus:border-b-[2px] focus:border-t-0 focus:border-r-0 focus:border-l-0 transition-colors duration-300 ease-in-out`}
                  />
                </div>
                <div className="mb-5 relative flex flex-col">
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className={`w-full text-sm py-4 px-4 border-b-[2px] placeholder:text-sm placeholder:text-custom5 ${
                      errors.password
                        ? "border-red-500 animate-shake bg-custom8"
                        : "border-custom11"
                    } border-t-0 border-r-0 border-l-0 rounded-xl focus:ring-transparent hover:border-custom9 focus:border-b-custom9 focus:border-b-[2px] focus:border-t-0 focus:border-r-0 focus:border-l-0 transition-colors duration-300 ease-in-out`}
                  />
                </div>
                <div className="flex justify-between items-center gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="remeber_me"
                      id="remember_me"
                      className="w-3.5 h-3.5 border border-custom10 rounded bg-gray-100 focus:ring-transparent text-primary-text checked:bg-primary-text"
                    />
                    <p>Remember me</p>
                  </div>
                  <p className="cursor-pointer hover:underline underline-offset-2 ">
                    Forgot Password?
                  </p>
                </div>
                <button
                  type="submit"
                  className={`${
                    loginLoading ? "bg-opacity-70" : ""
                  } relative w-full mt-12 flex justify-center items-center py-7 bg-primary-text text-sm rounded-full overflow-hidden text-white hover:bg-opacity-70 transition-all duration-500 ease-in-out`}
                >
                  {loginLoading ? (
                    <span className="absolute top-[43%] left-1/2">
                      <FadeLoader
                        color="#ffffff"
                        height={7}
                        margin={-9}
                        radius={0}
                        width={2.5}
                      />
                    </span>
                  ) : (
                    <span className="absolute text-[14px]">
                      Log In
                    </span>
                  )}
                </button>
                <div className="text-sm flex items-center justify-center flex-wrap gap-1.5 mt-5">
                  <h3>Don't have an account?</h3>
                  <Link href="/auth/signup">
                    <button className="font-medium underline underline-offset-2">
                      Sign up
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
