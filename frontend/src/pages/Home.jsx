import LatestProducts from "../components/home_page_components/LatestProducts";
import PopularProducts from "../components/home_page_components/PopularProducts";
import OnSaleProducts from "../components/home_page_components/OnSaleProducts";
import MostPopular from "../components/home_page_components/MostPopular";
import Hero from "../components/home_page_components/Hero";
import FeaturesSection from "../components/home_page_components/Utility";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <LatestProducts />
      <MostPopular />
      <PopularProducts />
      {/* <div className="brand-banner" /> */}
      <OnSaleProducts />
    </>
  );
}
