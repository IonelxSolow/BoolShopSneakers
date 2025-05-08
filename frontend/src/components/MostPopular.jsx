import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

export default function MostPopular() {
    const { sneakers } = useGlobalContext();

    return (
        <>
            <section className="bg-light p-3 mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="row p-4">
                        <div className="col-lg-6 d-flex flex-column justify-content-between">

                            <h1 className="fw-bolder display-2">Most Popular 🔥</h1>

                            <div>
                                <h4 className="">New Balance 990</h4>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    Quisquam, voluptatibus.
                                </p>
                                <Link to="/products">
                                    <button className="btn btn-main-light">Shop Now</button>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src="/images/Scarpe/04_New_Balance/01_990/04_01_Variant_1/01_NewBalance990_02.webp" className="img-fluid" alt="" />
                        </div>
                    </div>
                </div>


            </section>

        </>
    )
}