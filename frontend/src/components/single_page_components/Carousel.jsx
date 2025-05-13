export default function Carousel({
  variant,
  images,
  variantImages,
  counter,
  setCounter,
}) {
  return (
    <>
      <div className="col-12 col-xxl-8 order-1 order-xxl-1">
        <div className="carouselContainer">
          <div className="carousel d-flex align-items-center">
            {variant === 0 ? (
              <img
                src={images ? `/assets/${images[counter]}` : "/assets/01.webp"}
                alt=""
              />
            ) : (
              <img
                src={
                  images
                    ? `/assets/${variantImages[counter]}`
                    : "/assets/01.webp"
                }
                alt=""
              />
            )}

            <button
              onClick={() =>
                setCounter(counter > 0 ? counter - 1 : images.length - 1)
              }
              className=" btn-left"
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button
              onClick={() =>
                setCounter(counter === images.length - 1 ? 0 : counter + 1)
              }
              className="btn-right"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
