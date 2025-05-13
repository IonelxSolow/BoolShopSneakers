export default function Thumbnails({
  variant,
  images,
  variantImages,
  counter,
  setCounter,
}) {
  return (
    <div className="col-12 col-xxl-1 order-2 order-xxl-1 my-4 my-xxl-0">
      <div className=" d-flex flex-xxl-column justify-content-center align-items-center gap-3 thumbContainer">
        {variant === 0
          ? images?.map((image, index) => (
              <div
                key={index}
                className={
                  counter === index
                    ? `thumb-wrapper wrapper-border`
                    : "thumb-wrapper"
                }
              >
                <img
                  src={images ? `/assets/${image}` : "/assets/01.webp"}
                  alt=""
                  onMouseOver={() => {
                    setCounter(index);
                  }}
                />
              </div>
            ))
          : variantImages?.map((image, index) => (
              <div
                key={index}
                className={
                  counter === index
                    ? `thumb-wrapper wrapper-border`
                    : "thumb-wrapper"
                }
              >
                <img
                  src={images ? `/assets/${image}` : "/assets/01.webp"}
                  alt=""
                  onMouseOver={() => {
                    setCounter(index);
                  }}
                />
              </div>
            ))}
      </div>
    </div>
  );
}
