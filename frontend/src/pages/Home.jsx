import LatestProducts from "../components/LatestProducts";
import PopularProducts from "../components/PopularProducts";
import MostPopular from "../components/MostPopular";
import Hero from "../components/Hero"

export default function Home() {


    return (
        <>
            <Hero />
            <div className="container home-displayer">
                <LatestProducts />
                <MostPopular />
                <PopularProducts />
            </div>
        </>
    );
}
