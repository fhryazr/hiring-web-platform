import Navbar from "@/components/Navbar";
import CareerSection from "@/components/career/CareerSection";

const CareerPage = () => {
  return (
    <section className="flex flex-col max-h-dvh">
      <Navbar />
      <CareerSection />
    </section>
  );
};

export default CareerPage;
