"use client";
import React from "react";
import { useRouter } from "next/navigation";
import useSignUp from "@/contexts/authContext/useSignUp";
import { useAuth } from "@/contexts/authContext/Auth-Context";
import { SignUpCredentials } from "@/@types";
import { useForm } from "react-hook-form";
import { HiHomeModern } from "react-icons/hi2";
import { FadeLoader } from "react-spinners";
import Link from "next/link";
import Image from "next/image";

const SignUp: React.FC = () => {
  const { signupLoading } = useAuth();
  const {
    signUp,
    gender,
    role,
    setRole,
    setGender,
    isGender,
    isRole,
    setIsRole,
    setIsGender,
    handleIsGender,
    handleIsRole,
    genderDropdownRef,
    roleDropdownRef,
  } = useSignUp();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<SignUpCredentials & { confirmPassword: string }>();
  const router = useRouter();
  const genderList: string[] = ["Male", "Female"];
  const roleList: string[] = ["LandLord", "Tenant"];

  const password = watch("password");
  const errorMessages = Object.values(errors).map((error) => error.message);

  const handleSelectRole = (role: string) => {
    setRole(role);
    setIsRole(false);
    setValue("role", role, { shouldValidate: true });
  };

  const handleSelectGender = (gender: string) => {
    setGender(gender);
    setIsGender(false);
    setValue("gender", gender, { shouldValidate: true });
  };

  const onSubmit = async (
    data: SignUpCredentials & { confirmPassword: string }
  ) => {
    const { confirmPassword, ...submitData } = data;
    try {
      await signUp({ ...submitData });
      reset();
      setGender("");
      setRole("");
    } catch (error) {
      console.error("Sign up failed. Try again");
    }
  };

  return (
    <section className="text-primary-text font-sans bg-white">
      <div className="lg:flex justify-start items-center xl:gap-24">
        <div className="hidden lg:block h-screen aspect-4/3 max-w-[460px] xl:max-w-[400px]">
          <Image
            src="/assets/images/signup-image.jpg"
            alt="sign up Image"
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
                <h1 className="text-[25px] font-roboto font-semibold">
                  Create your account!
                </h1>
                <p className="text-[15px] mt-1">Please enter your details</p>
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
                <div className="md:flex item-center gap-5">
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Name"
                      {...register("name", { required: "Name is required" })}
                      className={`w-full text-sm py-4 px-4 border-b-[2px] placeholder:text-sm ${
                        errors.name
                          ? "border-red-500 animate-shake bg-custom8"
                          : "border-custom11"
                      } border-t-0 border-r-0 border-l-0 rounded-xl focus:ring-transparent hover:border-custom9 focus:border-b-[2px] focus:border-b-custom9 focus:border-t-0 focus:border-r-0 focus:border-l-0 transition-colors duration-300 ease-in-out`}
                    />
                  </div>
                  <div className="w-full mt-5 md:mt-0">
                    <input
                      type="text"
                      placeholder="Phone Number"
                      {...register("phone_number", {
                        required: "Phone number is required",
                        minLength: {
                          value: 11,
                          message: "Invalid phone number",
                        },
                        maxLength: {
                          value: 15,
                          message: "Invalid phone number",
                        },
                      })}
                      className={`w-full text-sm py-4 px-4 border-b-[2px] placeholder:text-sm ${
                        errors.phone_number
                          ? "border-red-500 animate-shake bg-custom8"
                          : "border-custom11"
                      } border-t-0 border-r-0 border-l-0 rounded-xl focus:ring-transparent hover:border-custom9 focus:border-b-[2px] focus:border-b-custom9 focus:border-t-0 focus:border-r-0 focus:border-l-0 transition-colors duration-300 ease-in-out`}
                    />
                  </div>
                </div>
                <div className="w-full mt-5">
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
                    className={`w-full text-sm py-4 px-4 border-b-[2px] placeholder:text-sm ${
                      errors.email
                        ? "border-red-500 animate-shake bg-custom8"
                        : "border-custom11"
                    } border-t-0 border-r-0 border-l-0 rounded-xl focus:ring-transparent hover:border-custom9 focus:border-b-custom9 focus:border-b-[2px] focus:border-t-0 focus:border-r-0 focus:border-l-0 transition-colors duration-300 ease-in-out`}
                  />
                </div>
                <div className="flex items-center gap-5">
                  <div className="relative w-full mt-5" ref={genderDropdownRef}>
                    <div
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                      className={`relative w-full text-sm py-4 px-4 border-b-[2px] placeholder:text-sm ${
                        errors.gender
                          ? "border-red-500 animate-shake bg-custom8"
                          : "border-custom11"
                      } border-t-0 border-r-0 border-l-0 rounded-xl focus:ring-transparent hover:border-custom9 focus:border-b-custom9 focus:border-b-[2px] focus:border-t-0 focus:border-r-0 focus:border-l-0 transition-colors duration-300 ease-in-out cursor-pointer`}
                      onClick={handleIsGender}
                    >
                      {gender || (
                        <span className="text-custom5">Select a gender</span>
                      )}
                    </div>
                    {isGender && (
                      <ul className="absolute top-14 right-0 left-0 z-30 bg-white rounded-xl border-[1px] border-custom11 overflow-hidden">
                        {genderList.map((gender, index) => (
                          <li
                            key={index}
                            className={`${
                              index === 0 && "border-b-[1px] border-custom11"
                            } text-sm p-3 hover:bg-custom8 cursor-pointer`}
                            onClick={() => handleSelectGender(gender)}
                          >
                            {gender}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="relative w-full mt-5" ref={roleDropdownRef}>
                    <div
                      {...register("role", { required: "Role is required" })}
                      className={`relative w-full text-sm py-4 px-4 border-b-[2px] placeholder:text-sm ${
                        errors.role
                          ? "border-red-500 animate-shake bg-custom8"
                          : "border-custom11"
                      } border-t-0 border-r-0 border-l-0 rounded-xl focus:ring-transparent hover:border-custom9 focus:border-b-[2px] focus:border-b-custom9 focus:border-t-0 focus:border-r-0 focus:border-l-0 transition-colors duration-300 ease-in-out cursor-pointer`}
                      onClick={handleIsRole}
                    >
                      {role || (
                        <span className="text-custom5">Select a role</span>
                      )}
                    </div>
                    {isRole && (
                      <ul className="absolute top-14 right-0 left-0 z-30 bg-white rounded-xl border-[1px] border-custom11 overflow-hidden">
                        {roleList.map((role, index) => (
                          <li
                            key={index}
                            className={`${
                              index === 0 && "border-b-[1px] border-custom11"
                            } text-sm p-3 hover:bg-custom8 cursor-pointer`}
                            onClick={() => handleSelectRole(role)}
                          >
                            {role}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-full mt-5">
                    <input
                      type="password"
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message:
                            "Password must be at least 6 characters long",
                        },
                      })}
                      className={`w-full text-sm py-4 px-4 border-b-[2px] placeholder:text-sm ${
                        errors.password
                          ? "border-red-500 animate-shake bg-red-50"
                          : "border-custom11"
                      } border-t-0 border-r-0 border-l-0 rounded-xl focus:ring-transparent hover:border-custom9 focus:border-b-[2px] focus:border-b-custom9 focus:border-t-0 focus:border-r-0 focus:border-l-0 transition-colors duration-300 ease-in-out`}
                    />
                  </div>

                  <div className="w-full mt-5">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      {...register("confirmPassword", {
                        validate: (value) =>
                          value === password || "The passwords do not match",
                      })}
                      className={`w-full text-sm py-4 px-4 border-b-[2px] placeholder:text-sm ${
                        errors.confirmPassword
                          ? "border-red-500 animate-shake bg-custom8"
                          : "border-custom11"
                      } border-t-0 border-r-0 border-l-0 rounded-xl focus:ring-transparent hover:border-custom9 focus:border-b-[2px] focus:border-b-custom9 focus:border-t-0 focus:border-r-0 focus:border-l-0 transition-colors duration-300 ease-in-out`}
                    />
                  </div>
                </div>
                <div className="mt-12 w-full">
                  <button
                    disabled={signupLoading}
                    type="submit"
                    className={`${
                      signupLoading ? "bg-opacity-70" : ""
                    } relative w-full mt-12 flex justify-center items-center py-7 bg-primary-text text-[14px] rounded-full font-medium overflow-hidden text-white hover:bg-opacity-70 transition-all duration-500 ease-in-out`}
                  >
                    {signupLoading ? (
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
                      <span className="absolute text-[14px] font-medium">
                        Sign Up
                      </span>
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-center flex-wrap gap-1.5 mt-5">
                  <h3 className="text-[14px]">Already have an account?</h3>
                  <Link href="/auth/login">
                    <button className="text-[14px] font-medium underline underline-offset-2">
                      Log in
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

export default SignUp;
