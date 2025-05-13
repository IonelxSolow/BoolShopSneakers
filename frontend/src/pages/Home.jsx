import LatestProducts from "../components/LatestProducts";
import PopularProducts from "../components/PopularProducts";
import OnSaleProducts from "../components/OnSaleProducts";
import MostPopular from "../components/MostPopular";
import Hero from "../components/Hero"
import FeaturesSection from "../components/Utility";

export default function Home() {


    return (
      <>
        <Hero />
        <FeaturesSection />
        <LatestProducts />
        <MostPopular />
        <PopularProducts />
        <div className="brand-banner" />
        <OnSaleProducts />
      </>
    );
}
