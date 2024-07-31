import { certificates } from "../utils/constants";
import CarouselCert from "./CarousalCert";
import Carousel from "./CarousalProject";
const Certificates = () => {
  return (
    <section id="certificate" className="sm:min-h-[50vh] sm:py-8 bg-white rounded-lg shadow-lg my-8 w-full lg:w-8/12 mx-auto">
      <h2 className="text-2xl sm:text-4xl text-[#323954] pt-8 font-semibold text-center">
        Certificates ({certificates.length})
      </h2>

      <div className="sm:w-8/12 mx-auto flex items-center justify-center ">
        <CarouselCert certificates={certificates} />
      </div>
    </section>
  );
};

export default Certificates;
