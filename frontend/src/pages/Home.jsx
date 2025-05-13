import LatestProducts from "../components/LatestProducts";
import PopularProducts from "../components/PopularProducts";
import OnSaleProducts from "../components/OnSaleProducts";
import MostPopular from "../components/MostPopular";
import Hero from "../components/Hero"

export default function Home() {


    return (
        <>
            <Hero />
            <LatestProducts />
            <MostPopular />
            <PopularProducts />
            <div className="brand-banner" />
            <OnSaleProducts />

        </>
    );
}
