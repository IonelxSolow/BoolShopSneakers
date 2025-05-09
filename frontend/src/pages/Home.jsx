import LatestProducts from "../components/LatestProducts";
import PopularProducts from "../components/PopularProducts";
import MostPopular from "../components/MostPopular";
import Hero from "../components/Hero"
import { Link } from "react-router-dom";

export default function Home() {


    return (
        <>
            <Hero />
            <div className="container home-displayer">
                <Link type="button" to={'/all-products'} className="btn btn-main-light mb-4">
                    All shoes
                </Link>

                <LatestProducts />
                <MostPopular />
                <PopularProducts />
            </div>
        </>
    );
}
