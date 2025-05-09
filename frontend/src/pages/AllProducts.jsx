import { useGlobalContext } from "../context/GlobalContext"

export default function AllProducts() {
    const { sneakers } = useGlobalContext()
    return (
        <>
            <section className="all-products">
                <div className="container row justify-content-between m-auto">
                    <h1>All Sneakers</h1>
                    <div className="tool-bar col-4">


                    </div>
                    <div className="products-displayer col-8 row">
                        {
                            sneakers.map((sneaker) => {
                                return (
                                    <div className="col-4 mb-4">
                                        <div class="card">
                                            <img class="card-img-top" src="assets/01.webp" alt={sneaker.name} />
                                            <div class="card-body">
                                                <h4 class="card-title">{sneaker.name}</h4>
                                                <p class="card-text">{sneaker.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}