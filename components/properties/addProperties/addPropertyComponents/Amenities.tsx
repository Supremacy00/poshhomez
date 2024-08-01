import React, { useState } from "react";
import { usePropertyContext } from "@/contexts/addPropertyContext/AddPropertyContext";
import { ClipLoader, FadeLoader } from "react-spinners";
import { BsArrowUpRight } from "react-icons/bs";
import { toast } from "sonner";
import { AddPropertyAmenities } from "@/@types";

interface Amenity {
  name: string;
  description: string;
  id: number;
}

const amenitiesList: Amenity[] = [
  { name: "Wi-Fi", description: "", id: 1 },
  { name: "Air Conditioning", description: "", id: 2 },
  { name: "Swimming Pool", description: "", id: 3 },
  { name: "Gym", description: "", id: 4 },
  { name: "Parking", description: "", id: 5 },
  { name: "Pet Friendly", description: "", id: 6 },
  { name: "Security", description: "", id: 7 },
  { name: "Laundry", description: "", id: 8 },
  { name: "Electricity Backup", description: "", id: 9 },
];

const Amenities: React.FC = () => {
  const { addAmenities, propertyId, loading, handleSkip, setCurrentStep } =
    usePropertyContext();
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>([]);

  const handleCheckboxChange = (amenity: Amenity) => {
    setSelectedAmenities((prevSelectedAmenities) => {
      const isAlreadySelected = prevSelectedAmenities.some(
        (selected) => selected.id === amenity.id
      );

      let updatedAmenities: Amenity[];

      if (isAlreadySelected) {
        updatedAmenities = prevSelectedAmenities.filter(
          (selected) => selected.id !== amenity.id
        );
      } else {
        updatedAmenities = [...prevSelectedAmenities, amenity];
      }

      return updatedAmenities;
    });
  };

  const handleAddAmenity = () => {
    if (propertyId && selectedAmenities.length > 0) {
      const amenitiesToSend = selectedAmenities.map(
        ({ name, description }) => ({
          name,
          description,
        })
      );

      addAmenities(amenitiesToSend, propertyId);
    } else {
      toast.error("Please select at least one amenity to upload.");
      return;
    }
  };

  const handleSkipAmenity = () => {
    setCurrentStep(1);
  };

  return (
    <section>
      <h2 className="text-base font-semibold text-primary-text mb-7">
        Select Amenities
      </h2>
      <div className="grid grid-cols-1 xs:grid-cols-3 gap-4">
        {amenitiesList.map((amenity) => (
          <label key={amenity.id} className="flex items-center text-[15px]">
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(amenity)}
              checked={selectedAmenities.some(
                (selected) => selected.id === amenity.id
              )}
              className="mr-2 w-4 h-4 border border-custom10 rounded bg-gray-100 focus:ring-transparent text-primary-text checked:bg-primary-text"
              aria-label={`Select ${amenity.name}`}
            />
            {amenity.name}
          </label>
        ))}
      </div>
      <section className="text-primary-text flex justify-between items-center gap-2 pt-12 pb-5">
        <div className="relative">
          <button
            onClick={handleSkipAmenity}
            className="relative flex items-center gap-2.5 px-6 md:px-[50px] py-3.5 border-[1px] border-primary-text rounded-xl hover:bg-primary-text hover:text-white transition-colors duration-300 ease-in-out"
          >
            <h4 className="text-[15px] font-semibold">Skip</h4>
            <BsArrowUpRight className="text-[15px] md:text-[17px]" />
          </button>
        </div>
        <div className="relative">
          <button
            disabled={loading.amenities}
            onClick={handleAddAmenity}
            className={`${
              loading.amenities ? "bg-primary-text text-white" : ""
            } relative flex items-center gap-2.5 px-6 md:px-[50px] py-3.5 border-[1px] border-primary-text rounded-xl hover:bg-primary-text hover:text-white transition-colors duration-300 ease-in-out`}
          >
            <h4 className="text-[15px] font-semibold">Finish</h4>
            {loading.amenities ? (
              <ClipLoader color="#ffffff" size={19} />
            ) : (
              <BsArrowUpRight className="text-[15px] md:text-[17px]" />
            )}
          </button>
        </div>
      </section>
    </section>
  );
};

export default Amenities;
