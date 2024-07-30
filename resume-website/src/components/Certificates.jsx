import { certificates } from "../utils/constants"
import CarouselCert from "./CarousalCert"
import Carousel from "./CarousalProject"
const Certificates = () => {
  return (
    <section className="sm:min-h-[50vh] sm:py-8 bg-green-400">
        <h2 className="text-2xl sm:text-4xl pt-8 font-semibold font-mono text-center">
          Certificates ({certificates.length})
        </h2>

        <div className="sm:w-8/12 mx-auto flex items-center justify-center ">
          <CarouselCert certificates = {certificates}/>
        </div>
    </section>
  )
}

export default Certificates
