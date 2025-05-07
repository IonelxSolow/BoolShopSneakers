import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";

export default function Home() {
    const { sneakers } = useGlobalContext()
    const [isList, setIsList] = useState(false)
    const [isGrid, setIsGrid] = useState(true)
    function switchDisplay() {
        if (isList === false) {
            setIsList(true)

        } else {
            setIsList(false)
        }
        if (isGrid === false) {
            setIsGrid(true)

        } else {
            setIsGrid(false)
        }
    }
    console.log(sneakers)

    return (
        <>
            <section className="hero">
                <div className="top-bar border border-black">
                    <ul className="d-flex list-unstyled  py-4 justify-content-around">
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

            <div className="container home-displayer">
                <h1>Don't miss out new Society Drops</h1>
                {
                    isGrid && (
                        <>
                            <div className="btn" onClick={() => { switchDisplay() }}><i className="bi bi-list-task"></i></div>
                            <div className="row">
                                {sneakers.map((sneaker) => (
                                    <div className="col-3" key={sneaker.id}>
                                        <div className="card position-relative">
                                            <img className="card-img-top" src="/assets/01.webp" width={'100%'} alt="Title" />
                                            <div className="card-body">
                                                <h4 className="card-title text-center">{sneaker.name}</h4>
                                                <div className="btn btn-price position-absolute">{sneaker.price}$</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </>
                    )
                }
                {
                    isList && (
                        <>
                            <div className="btn" onClick={() => { switchDisplay() }}><i class="bi bi-grid"></i></div>
                            <div className="list-group">
                                {sneakers.map((sneaker) => (
                                    <div className="list-group-item mb-3" key={sneaker.id}>
                                        <div className="d-flex">
                                            <img src="/assets/01.webp" alt="Sneaker" width="150" className="me-3" />
                                            <div className="">
                                                <h4 className="my-3">{sneaker.name}</h4>
                                                <p>{sneaker.description}</p>
                                                <p className="mb-0">price: {sneaker.price}$</p>
                                                <p>dicounted price: {parseFloat(sneaker.discounted_price).toFixed(2)}$</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </>
                    )
                }
            </div>
        </>


    );
}