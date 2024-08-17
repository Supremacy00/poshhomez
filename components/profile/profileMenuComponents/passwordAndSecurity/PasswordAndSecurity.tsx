"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import changePassword from "../../../Auth/password/changePassword";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

interface FormInputs {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const PasswordAndSecurity: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    reset,
  } = useForm<FormInputs>();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const errorMessages = Object.values(errors).map((error) => error.message);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    clearErrors();

    if (data.newPassword !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "New passwords do not match",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await changePassword(
        data.currentPassword,
        data.newPassword
      );
      reset();
    } catch (err) {
      alert("An error occurred while changing the password");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="text-primary-text pb-5">
      <div>
        <h1 className="text-[22px] font-semibold text-primary-text mb-5 lg:text-[28px]">
          Password & Security
        </h1>
        <p className="text-[15px] text-secondary font-light mb-5">
          Manage your password settings and secure your account.
        </p>
      </div>
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-[18px] font-semibold">Password</h3>
        <div className="mt-5 xs:flex items-center gap-5 ">
          <div className="w-full">
            <label htmlFor="Password" className="text-[15px]">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                id="currentPassword"
                {...register("currentPassword", {
                  required: "Current password is required",
                })}
                className="w-full mt-1.5 py-2.5 pr-[45px] text-[15px] border-custom11 focus:border-custom9 focus:ring-custom9 focus:ring-[3px] rounded-lg outline-none"
              />
              <button
                type="button"
                className="absolute top-[40%] right-0 pr-3"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {!showCurrentPassword ? (
                  <FaEyeSlash className="text-[20px] text-custom13" />
                ) : (
                  <FaEye className="text-[19px] text-custom13" />
                )}
              </button>
            </div>
          </div>
          <div className="mt-3 w-full xs:mt-9">
            <button className="text-custom2 text-base underline hover:no-underline">
              Forgot Password?
            </button>
          </div>
        </div>
        <div className="mt-7 xs:flex items-center gap-5 xs:mt-4">
          <div className="w-full">
            <label htmlFor="Password" className="text-[15px]">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                {...register("newPassword", {
                  required: "New password is required",
                })}
                className="w-full mt-1.5 py-2.5 pr-[45px] text-[15px] border-custom11 focus:border-custom9 focus:ring-custom9 focus:ring-[3px] rounded-lg outline-none"
              />
              <button
                type="button"
                className="absolute top-[40%] right-0 pr-3"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {!showNewPassword ? (
                  <FaEyeSlash className="text-[20px] text-custom13" />
                ) : (
                  <FaEye className="text-[19px] text-custom13" />
                )}
              </button>
            </div>
          </div>
          <div className="mt-5 w-full xs:mt-0">
            <label htmlFor="Password" className="text-[15px]">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                })}
                className="w-full mt-1.5 py-2.5 pr-[45px] text-[15px] border-custom11 focus:border-custom9 focus:ring-custom9 focus:ring-[3px] rounded-lg outline-none"
              />
              <button
                type="button"
                className="absolute top-[40%] right-0 pr-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {!showConfirmPassword ? (
                  <FaEyeSlash className="text-[20px] text-custom13" />
                ) : (
                  <FaEye className="text-[19px] text-custom13" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <button
            type="submit"
            disabled={loading}
            className={`${loading ? "text-white bg-custom2" : " hover:text-white" } text-[15px] text-custom2 font-semibold px-7 py-2.5 flex justify-center items-center gap-1.5 border-[1px] border-custom2 hover:bg-custom2 rounded-lg transition-colors duration-300 ease-in-out`}
          >
            {loading && <ClipLoader color="#ffffff" size={19} />}
            Update Password
          </button>
        </div>
      </form>
      <div className="w-full h-[1px] bg-custom11 mt-10"></div>
      <div className="mt-7">
        <h1 className="text-[20px] font-semibold">Where you're signed in on</h1>
      </div>
    </section>
  );
};

export default PasswordAndSecurity;
