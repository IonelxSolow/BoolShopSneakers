export default function Footer() {

    return (
        <>
            <footer >
                <div className="foot-bar bg-whitesmoke mt-4 bg-main-light">
                    {/* Green Footer */}
                    <div className="container d-flex justify-content-between align-items-center">
                        <div className="row d-flex align-items-center p-3 w-100">
                            <div className="col-6">
                                <h1 className="fw-bold">JOIN OUR KICKSOCIETY <br /> CLUB  & GET 15% OFF</h1>
                                <span>Sign up fro free! join the community!</span>
                                <form action="" className="d-flex g-3 mt-3">
                                    <div class="mb-3 me-3">
                                        <input
                                            type="email"
                                            class="form-control d-inline"
                                            name=""
                                            id=""
                                            aria-describedby="helpId"
                                            placeholder=""
                                        />

                                    </div>

                                    <button
                                        type="submit"
                                        class="btn bg-black text-white fw-bold px-3"
                                    >
                                        Submit
                                    </button>

                                </form>


                            </div>
                            <div className="col-6 text-center">

                                <h1 className="p-5 fw-bold display-3">KICKSOCIETY</h1>

                            </div>
                        </div>


                    </div>
                </div>
                {/* Black Footer */}
                <div className="foot-bar bg-whitesmoke bg-black bg-main-light">
                    <div className="container py-3">
                        <div className="row w-100 p-3 rounded">
                            <div className="col-6">
                                <h3 className="fw-bold secondary-color">About us</h3>
                                <span className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, laborum?</span>

                            </div>
                            <div className="col-6">
                                <div className="row">
                                    <div className="col-4">
                                        <h5 className="fw-bold secondary-color">Categories</h5>
                                        <ul className="text-white">
                                            <li>Runners</li>
                                            <li>Runners</li>
                                            <li>Runners</li>
                                            <li>Runners</li>
                                            <li>Runners</li>
                                            <li>Runners</li>

                                        </ul>
                                    </div>
                                    <div className="col-4">
                                        <h5 className="fw-bold secondary-color">Categories</h5>
                                        <ul className="text-white">
                                            <li>Runners</li>
                                            <li>Runners</li>
                                            <li>Runners</li>
                                        </ul>
                                    </div>
                                    <div className="col-4">
                                        <h5 className="fw-bold secondary-color">Follow us</h5>
                                        <ul className="text-white">
                                            <li>Runners</li>
                                            <li>Runners</li>
                                            <li>Runners</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </footer>

        </>
    )
}
