export default function Footer() {

    return (
        <>

            <div className="foot-bar bg-black">
                <div className="container d-flex justify-content-between align-items-center">

                    <div className="foot-logo">
                        <img src="impact.png" width={'150px'} alt="impact-logo" />
                    </div>
                    <div className="foot-socials">
                        <ul className="list-unstyled d-flex gap-3">
                            <li><a href=""><i className="bi bi-facebook text-light"></i></a></li>
                            <li><a href=""><i className="bi bi-instagram text-light"></i></a></li>
                            <li><a href=""><i className="bi bi-twitter-x text-light"></i></a></li>
                        </ul>
                    </div>
                    <div className="foot-links my-3">
                        <ul className="list-unstyled d-flex gap-3">
                            <li><a href="">Contacts</a></li>
                            <li><a href="">About us</a></li>
                            <li><a href="">Support</a></li>
                        </ul>

                    </div>

                </div>
            </div>
        </>
    )
}