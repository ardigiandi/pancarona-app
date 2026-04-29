import BestSeller from "@/components/fragments/BestSeller";
import Cta from "@/components/fragments/Cta";
import Hero from "@/components/fragments/Hero";
import NewArrival from "@/components/fragments/NewArrival";
import OurSeries from "@/components/fragments/OurSeries";

export default function HomePage() {
  return (
    <>
      <Hero />
      <NewArrival />
      <OurSeries />
      <BestSeller />
      <Cta />
    </>
  );
}
