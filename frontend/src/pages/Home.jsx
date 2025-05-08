import LatestProducts from "../components/LatestProducts";
import PopularProducts from "../components/PopularProducts";

export default function Home() {


    return (
        <>
            <section className="hero">
                <div className="top-bar border border-black">
                    <ul className="d-flex flex-wrap list-unstyled py-4 justify-content-around mb-0">
                        <li>
                            <a href="">Popular</a>
                        </li>
                        <i className="bi bi-lightning-charge-fill"></i>
                        <li>
                            <a href="">Nike</a>
                        </li>
                        <i className="bi bi-lightning-charge-fill"></i>
                        <li>
                            <a href="">Jordan</a>
                        </li>
                    </ul>
                </div>
                <div className="mb-4 bg-light hero-container position-relative">
                    <div>
                        <img
                            src="/hero-force1.webp"
                            className="img-fluid"
                            alt="hero-force1"
                        />
                        <button
                            className="btn position-absolute btn-lg btn-nike rounded-4"
                            type="button"
                        >
                            Nike
                        </button>
                    </div>
                </div>
            </section>
            <div className="container home-displayer">
                <LatestProducts />
                <PopularProducts />
            </div>
        </>
    );
}
