import dynamic from 'next/dynamic';
import Hero from "../hero/Hero";
import Cities from "../properties/popularProperties/Cities";
import PopularProperties from '../properties/popularProperties/PopularProperties';
import Testimonial from "../testimonials/Testimonial";
import Trustees from "../trustees/Trustees";
import WhyChooseUs from "../whyChooseUs/WhyChooseUs";

const Homepage = () => {
  
  return (
        <div>
          <Hero />
          <Trustees />
          <Cities />
          <PopularProperties />
          <WhyChooseUs />
          <Testimonial />
        </div>
  );
};

export default Homepage;
