"use client";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { usePropertyContext } from "@/contexts/addPropertyContext/AddPropertyContext";
import { useLocationSelector } from "@/hooks/useLocationSelector";
import { AddPropertyDetails } from "@/@types";
import { BsArrowUpRight } from "react-icons/bs";
import { ClipLoader, FadeLoader } from "react-spinners";

const Description: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<AddPropertyDetails>({
    defaultValues: {
      latitude: 0,
      longitude: 0,
    },
  });

  const { submitPropertyDetails, loading } = usePropertyContext();
  const countryData: string[] = ["USA", "Canada", "Australia"];
  const stateData: string[] = ["Kaduna", "Lagos", "Abuja"];
  const citiData: string[] = ["Samaru", "Shika", "Sabon Gari"];
  const genderData: string[] = ["Male", "Female", "Unisex"];

  const errorMessages = Object.values(errors).map((error) => error.message);

  const {
    isCountryVisible,
    isStateVisible,
    isCityVisible,
    isGenderVisible,
    selectedCountry,
    selectedState,
    selectedCity,
    selectedGender,
    toggleCountryDropdown,
    toggleStateDropdown,
    toggleCityDropdown,
    toggleGenderDropdown,
    handleSelectCountry: originalHandleSelectCountry,
    handleSelectState: originalHandleSelectState,
    handleSelectCity: originalHandleSelectCity,
    handleSelectGender: originalHandleSelectGender,
    countryDropdownRef,
    stateDropdownRef,
    cityDropdownRef,
    genderDropdownRef,
    dropdownPosition,
  } = useLocationSelector();

  useEffect(() => {
    register("location.country", { required: "Please select a country" });
    register("location.state", { required: " Please select a state" });
    register("location.city", { required: "Please select a city" });
    register("occupant_gender", { required: "Please select a gender" });
  }, [register]);

  const handleSelectCountry = (country: string) => {
    originalHandleSelectCountry(country);
    setValue("location.country", country, { shouldValidate: true });
  };

  const handleSelectState = (state: string) => {
    originalHandleSelectState(state);
    setValue("location.state", state, { shouldValidate: true });
  };

  const handleSelectCity = (city: string) => {
    originalHandleSelectCity(city);
    setValue("location.city", city, { shouldValidate: true });
  };
  const handleSelectGender = (gender: string) => {
    originalHandleSelectGender(gender);
    setValue("occupant_gender", gender, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<AddPropertyDetails> = async (data) => {
    const fullData = {
      ...data,
      photos: [],
      is_occupied: false,
      amenities: [],
      landlord_id: "",
      tenant_id: "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      await submitPropertyDetails(fullData);
      reset();
    } catch (error) {
      console.log("Error sending data");
    }
  };

  const dropdownTopCountry = dropdownPosition.country ? "auto" : "84px";
  const dropdownBottomCountry = dropdownPosition.country ? "52px" : "auto";
  const dropdownTopCity = dropdownPosition.city ? "auto" : "84px";
  const dropdownBottomCity = dropdownPosition.city ? "52px" : "auto";
  const dropdownTopState = dropdownPosition.state ? "auto" : "84px";
  const dropdownBottomState = dropdownPosition.state ? "52px" : "auto";
  const dropdownTopGender = dropdownPosition.occupant_gender ? "auto" : "84px";
  const dropdownBottomGender = dropdownPosition.occupant_gender
    ? "52px"
    : "auto";

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1 className="text-base font-semibold mb-7">Property Description</h1>
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
          <div className=" w-full">
            <label htmlFor="Password" className="text-sm font-semibold">
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              placeholder="Name"
              className="w-full mt-3 py-3 border-custom11 focus:border-custom9 focus:ring-custom9 focus:ring-[3px] rounded-lg text-[15px] font-light outline-none"
            />
          </div>
          <div className="w-full mt-7">
            <label className="text-primary-text text-sm font-semibold ">
              Description
            </label>
            <textarea
              {...register("about", { required: "Description is required" })}
              placeholder="There are many variatons of passages."
              className="w-full p-4 h-40 mt-2.5 text-[15px] font-light placeholder-secondary rounded-lg border-custom11 focus:border-custom9 focus:ring-custom9 focus:ring-[3px] outline-none"
            ></textarea>
          </div>
        </div>
        <div className="mt-7">
          <h1 className="text-base font-semibold mb-7">Property Location</h1>
          <div className="w-full">
            <label htmlFor="Password" className="text-sm font-semibold">
              Address
            </label>
            <input
              {...register("address", { required: "Address is required" })}
              placeholder="Address"
              className="w-full mt-3 py-3 border-custom11 focus:border-custom9 focus:ring-custom9 focus:ring-[3px] rounded-lg text-[15px] font-light outline-none"
            />
          </div>
          <div className="mt-7 lg:flex items-center gap-5">
            <div className="w-full relative">
              <div className="text-sm font-semibold">State / County</div>
              <div
                ref={stateDropdownRef}
                className={`relative w-full mt-3 py-3 px-4 text-secondary border border-custom11 rounded-lg text-[15px] font-light cursor-pointer ${
                  dropdownPosition.state ? "bottom-full top-auto" : ""
                }`}
                onClick={toggleStateDropdown}
              >
                {selectedState || "Select a State"}
              </div>
              {isStateVisible && (
                <ul
                  className={`absolute z-20 py-1.5 w-full bg-white text-[15px] font-medium border border-custom11 rounded-lg overflow-hidden ${
                    dropdownPosition.state ? "bottom-0 top-auto" : ""
                  }`}
                  style={{ top: dropdownTopState, bottom: dropdownBottomState }}
                >
                  {stateData.map((state, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectState(state)}
                      className="hover:bg-custom8 px-4 py-2 cursor-pointer"
                    >
                      {state}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="relative w-full mt-7 lg:mt-0">
              <div className="text-sm font-semibold">City</div>
              <div
                ref={cityDropdownRef}
                className={`relative w-full mt-3 py-3 px-4 text-secondary border border-custom11 rounded-lg text-[15px] font-light cursor-pointer ${
                  dropdownPosition.city ? "bottom-full top-auto" : ""
                }`}
                onClick={toggleCityDropdown}
              >
                {selectedCity || "Select a City"}
              </div>
              {isCityVisible && (
                <ul
                  className={`absolute z-20 py-1.5 w-full bg-white text-[15px] font-medium border border-custom11 rounded-lg overflow-hidden ${
                    dropdownPosition.city ? "bottom-0 top-auto" : ""
                  }`}
                  style={{ top: dropdownTopCity, bottom: dropdownBottomCity }}
                >
                  {citiData.map((city, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectCity(city)}
                      className="hover:bg-custom8 px-4 py-2 cursor-pointer"
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="mt-7 lg:flex items-center gap-5">
            <div className="relative w-full">
              <div className="text-sm font-semibold">Country</div>
              <div
                ref={countryDropdownRef}
                className={`relative w-full mt-3 py-3 px-4 text-secondary border border-custom11 rounded-lg text-[15px] font-light cursor-pointer ${
                  dropdownPosition.country ? "bottom-full top-auto" : ""
                }`}
                onClick={toggleCountryDropdown}
              >
                {selectedCountry || "Select a State"}
              </div>
              {isCountryVisible && (
                <ul
                  className={`absolute z-20 py-1.5 w-full bg-white text-[15px] font-medium border border-custom11 rounded-lg overflow-hidden ${
                    dropdownPosition.country ? "bottom-0 top-auto" : ""
                  }`}
                  style={{
                    top: dropdownTopCountry,
                    bottom: dropdownBottomCountry,
                  }}
                >
                  {countryData.map((country, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectCountry(country)}
                      className="hover:bg-custom8 px-4 py-2 cursor-pointer"
                    >
                      {country}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="relative w-full mt-7 lg:-mt-0.5">
              <label htmlFor="Postal Code" className="text-sm font-semibold">
                Postal Code
              </label>
              <input
                {...register("location.postal_code", {
                  required: "Postal code is required",
                })}
                placeholder="Postal Code"
                className="w-full mt-2.5 py-3 border-custom11 focus:border-custom9 focus:ring-custom9 focus:ring-[3px] rounded-lg text-[15px] font-light outline-none"
              />
            </div>
          </div>
          <div className="mt-7 lg:flex items-center gap-5">
            <div className="w-full">
              <label htmlFor="Latitude" className="text-sm font-semibold">
                Latitude
              </label>
              <input
                {...register("latitude", { required: false })}
                placeholder="Optional"
                className="w-full mt-3 py-3 border-custom11 focus:border-custom9 focus:ring-custom9 focus:ring-[3px] rounded-lg text-[15px] font-light outline-none"
              />
            </div>
            <div className="w-full mt-7 lg:mt-0">
              <label htmlFor="Longitude" className="text-sm font-semibold">
                Longitude
              </label>
              <input
                {...register("longitude", { required: false })}
                placeholder="Optional"
                className="w-full mt-3 py-3 border-custom11 focus:border-custom9 focus:ring-custom9 focus:ring-[3px] rounded-lg text-[15px] font-light outline-none"
              />
            </div>
          </div>
          <div className="mt-7 w-full">
            <label htmlFor="Password" className="text-sm font-semibold">
              Year Built
            </label>
            <input
              {...register("year_built", {
                required: "Year built is required",
              })}
              placeholder="Year Built"
              className="w-full mt-3 py-3 border-custom11 focus:border-custom9 focus:ring-custom9 focus:ring-[3px] rounded-lg text-[15px] font-light outline-none"
            />
          </div>
          <div className="mt-7 lg:flex items-center gap-5">
            <div className=" w-full">
              <label htmlFor="Bathroon" className="text-sm font-semibold">
                Bathroom Count
              </label>
              <input
                {...register("description.bathroom_count", {
                  required: "Bathroom count is required",
                })}
                placeholder="Bathroom"
                className="w-full mt-3 py-3 border-custom11 focus:border-custom9 focus:ring-custom9 focus:ring-[3px] rounded-lg text-[15px] font-light outline-none"
              />
            </div>
            <div className=" w-full mt-7 lg:mt-0">
              <label htmlFor="Longitude" className="text-sm font-semibold">
                Bedroom Count
              </label>
              <input
                {...register("description.bedroom_count", {
                  required: "Bedroom count is required",
                })}
                placeholder="Bedroom"
                className="w-full mt-3 py-3 border-custom11 focus:border-custom9 focus:ring-custom9 focus:ring-[3px] rounded-lg text-[15px] font-light outline-none"
              />
            </div>
          </div>
          <div className="mt-7 lg:flex items-center gap-5">
            <div className="w-full relative">
              <div className="text-sm font-semibold">Gender</div>
              <div
                ref={genderDropdownRef}
                className={`relative w-full mt-3 py-3 px-4 text-secondary border border-custom11 rounded-lg text-[15px] font-light cursor-pointer ${
                  dropdownPosition.occupant_gender ? "bottom-full top-auto" : ""
                }`}
                onClick={toggleGenderDropdown}
              >
                {selectedGender || "Select a Gender"}
              </div>
              {isGenderVisible && (
                <ul
                  className={`absolute z-20 py-1.5 w-full bg-white text-[15px] font-medium border border-custom11 rounded-lg overflow-hidden ${
                    dropdownPosition.occupant_gender ? "bottom-0 top-auto" : ""
                  }`}
                  style={{
                    top: dropdownTopGender,
                    bottom: dropdownBottomGender,
                  }}
                >
                  {genderData.map((gender, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectGender(gender)}
                      className="hover:bg-custom8 px-4 py-2 cursor-pointer"
                    >
                      {gender}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="w-full mt-7 lg:-mt-0">
              <label htmlFor="Rent Fee" className="text-sm font-semibold">
                Rent Fee
              </label>
              <input
                {...register("rent_fee", { required: "Rent fee is required" })}
                placeholder="Rent Fee"
                className="w-full mt-2.5 py-3 border-custom11 focus:border-custom9 focus:ring-custom9 focus:ring-[3px] rounded-lg text-[15px] font-light outline-none"
              />
            </div>
          </div>
        </div>
        <section className="text-primary-text flex justify-center items-center pt-12 pb-5">
          <div className="relative">
            <button
            disabled={loading.details}
              type="submit"
              className={`${
                loading.details ? "bg-primary-text text-white" : ""
              } relative flex items-center gap-2.5 px-[50px] py-3.5 border-[1px] border-primary-text rounded-xl hover:bg-primary-text hover:text-white transition-colors duration-300 ease-in-out`}
            >
              <h4 className="text-[15px] font-semibold">Continue</h4>
              {loading.details ? (
                <ClipLoader color="#ffffff" size={19} />
              ) : (
                <BsArrowUpRight className="text-[17px]" />
              )}
            </button>
          </div>
        </section>
      </form>
    </>
  );
};

export default Description;
