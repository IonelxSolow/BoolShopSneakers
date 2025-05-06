export default function Footer() {

    return (
        <>

            <div className="foot-bar bg-whitesmoke">
                <div className="container d-flex justify-content-between align-items-center">

                    <div className="foot-logo">
                        <img src="/assets/01.webp" width={'150px'} alt="kicks-logo" />
                    </div>
                    <div className="foot-socials">
                        <ul className="list-unstyled d-flex gap-3">
                            <li><a href=""><i className="bi bi-facebook"></i></a></li>
                            <li><a href=""><i className="bi bi-instagram"></i></a></li>
                            <li><a href=""><i className="bi bi-twitter-x"></i></a></li>
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