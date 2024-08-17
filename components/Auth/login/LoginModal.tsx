"use client";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { FadeLoader } from "react-spinners";
import { LoginCredentials } from "@/@types";
import { useAuth } from "@/contexts/authContext/Auth-Context";
import { useModal } from "@/contexts/modalContext/ModalContext";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import useCloseOnOutsideClick from "@/hooks/useCloseOnOutsideClick";

const LoginModal: React.FC = () => {
  const { isLoginModal, setIsLoginModal, handleIsLoginModal } = useModal();
  const { loginLoading, logIn } = useAuth();
  const modalRef = useRef<HTMLDivElement>(null);

  useCloseOnOutsideClick(isLoginModal, () => setIsLoginModal(false), modalRef);

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
    <article
      className={`${
        isLoginModal ? "block" : "hidden"
      } mx-auto fixed right-0 left-0 top-0 bottom-0 inset-0 bg-black bg-opacity-50 flex justify-center z-40 text-primary-text`}
    >
      <div className="flex justify-center items-center">
        <div className="w-full fixed top-12 px-4 md:w-[520px]">
          <div
            className="absolute right-7 top-3 bg-gray-200 bg-opacity-40 hover:bg-opacity-50 p-2.5 text-primary-text text-opacity-70 text-[22px] rounded-full cursor-pointer transition-all duration-300 ease-in-out md:text-white md:-top-5 md:-right-6 md:bg-custom1 md:hover:bg-opacity-100 md:hover:hover:bg-gray-400 md:p-2 "
            onClick={handleIsLoginModal}
          >
            <IoClose />
          </div>
          <div
            className=" p-12 z-50 bg-white rounded-2xl shadow-lg"
            ref={modalRef}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="text-center mb-10">
                <h1 className="text-[25px] font-medium">
                  Welcome back!
                </h1>
                <p className="text-[15px] mt-1 font-normal">Please enter your details</p>
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
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    className={`w-full text-sm py-4 px-4 border-b-[2px] placeholder:text-sm placeholder:text-custom5 ${
                      errors.email
                        ? "border-red-500 animate-shake bg-custom8"
                        : "border-custom11"
                    } border-t-0 border-r-0 border-l-0 rounded-xl focus:ring-transparent hover:border-custom9 focus:border-b-[2px] focus:border-b-custom9 focus:border-t-0 focus:border-r-0 focus:border-l-0 transition-colors duration-300 ease-in-out`}
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
                    } border-t-0 border-r-0 border-l-0 rounded-xl focus:ring-transparent hover:border-custom9 focus:border-b-[2px] focus:border-b-custom9 focus:border-t-0 focus:border-r-0 focus:border-l-0 transition-colors duration-300 ease-in-out`}
                  />
                </div>
                <div className="flex justify-between items-center gap-2 flex-wrap text-sm">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="w-3.5 h-3.5 border border-custom10 rounded bg-gray-100 focus:ring-transparent text-primary-text checked:bg-primary-text"
                    />
                    <p>Remember me</p>
                  </div>
                  <p className="cursor-pointer hover:underline underline-offset-2 ">
                    Forgot Password?
                  </p>
                </div>
                <button
                  disabled={loginLoading}
                  type="submit"
                  className={`${
                    loginLoading ? "bg-opacity-70 " : ""
                  } relative w-full mt-8 flex justify-center items-center py-7 bg-primary-text text-[14px] rounded-full overflow-hidden text-white hover:bg-opacity-70 transition-all duration-500 ease-in-out`}
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
                    <span className="absolute">Log In</span>
                  )}
                </button>
                <div className="text-sm flex items-center justify-center flex-wrap gap-1.5 mt-5">
                  <h3>Don't have an account?</h3>
                  <Link href="/auth/signup">
                    <button className="font-medium underline underline-offset-2">
                      Sign Up
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </article>
  );
};

export default LoginModal;
