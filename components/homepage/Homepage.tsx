import Hero from "../hero/Hero";
import Trustees from "../trustees/Trustees";
import ApartmentByLocation from "../properties/popularProperties/ApartmentByLocation";
import PopularApartment from "../properties/popularProperties/PopularApartment";
import WhyChooseUs from "../whyChooseUs/WhyChooseUs";
import Testimonial from "../testimonials/Testimonial";

const Homepage = () => {
  return (
    <div>
      <Hero />
      <Trustees />
      <ApartmentByLocation />
      <PopularApartment />
      <WhyChooseUs />
      <Testimonial />
    </div>
  );
};

export default Homepage;
