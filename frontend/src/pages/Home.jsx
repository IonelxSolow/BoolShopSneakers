import { useGlobalContext } from "../context/GlobalContext";

export default function Home() {
    const { sneakers } = useGlobalContext()
    console.log(sneakers)

    return (
        <>
            <section className="hero">
                <div className="top-bar border border-black">
                    <ul className="d-flex list-unstyled  py-5 justify-content-around">
                        <li><a href="">Popular</a></li>
                        <i className="bi bi-lightning-charge-fill"></i>
                        <li><a href="">Nike</a></li>
                        <i className="bi bi-lightning-charge-fill"></i>
                        <li><a href="">Jordan</a></li>
                    </ul>
                </div>
                <div className="mb-4 bg-light  hero-container position-relative">
                    <div>
                        <img src="/hero-force1.webp" width={'100%'} alt="hero-force1" />
                        <button className="btn position-absolute btn-lg btn-nike rounded-4" type="button">
                            Nike
                        </button>
                    </div>
                </div>
            </section>

            <div className="container">
                <h1>Don't miss out new Society Drops</h1>
                <div className="row">
                    {sneakers.map((sneaker) => (
                        <div className="col-3" key={sneaker.id}>
                            <div className="card">
                                <img className="card-img-top" src="/assets/01.webp" width={'100%'} alt="Title" />
                                <div className="card-body">
                                    <h4 className="card-title">{sneaker.name}</h4>
                                    <p className="card-text">{sneaker.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>



        </>


    );
}