import "./productImageCarousel.css"
import { useEffect, useState } from "react"
import ProductImageSlick from "./productImageSlick/ProductImageSlick"

const ProductImageCarousel = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0])
  const [thumbnailImages, setThumbnailImages] = useState(images.slice(1))

  return (
    <>
      <div className="product-image-carousel-container">
        <div className="active-img-container">
          <img src={images[0]} className="active-image" />
        </div>
        <div className="thumbnail-image-container">
          {thumbnailImages.map((image) => (
            <divthu className="thumbnail-image-box">
              <img src={image} className="thumbnail-image" />
            </divthu>
          ))}
        </div>
      </div>
      <div>
        {/* <div className="m-carousel-container">
          {images.map((image, index) => (
            <img src={image} className="m-carousel-img" key={index} />
          ))}
        </div> */}
        <div className="slick-container">
          <ProductImageSlick images={images} />
        </div>
      </div>
    </>
  )
}

export default ProductImageCarousel
