import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import Rating from "react-rating"

import "./productDetails.css"
import leftArrow from "../../assets/leftArrow.svg"
import goldenStar from "../../assets/goldenStar.svg"
import emptyStar from "../../assets/emptyStar.svg"
import { callApi } from "../../utils/callApi"
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"
import DesktopHeader from "../../components/desktopHeader/DesktopHeader"
import ProductImageCarousel from "./productImageCarousel/ProductImageCarousel"

const ProductDetails = (props) => {
  const [productDetails, setProductDetails] = useState({})
  const location = useLocation()

  const fetchProductDetails = async () => {
    try {
      const url = location.pathname
      const productDetails = await callApi("GET", url)
      console.log({ productDetails })
      setProductDetails(productDetails)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProductDetails()
  }, [])

  return (
    <>
      <DesktopHeader />
      <ContentWrapper>
        <img src={leftArrow} className="left-arrow-icon" /> <br />
        <button className="product-details-buy-now-btn btn-top">Buy Now</button>
        <button className="product-details-back-to-products-btn">
          Back to products
        </button>
        <br />
        <p className="desktop-product-details-title">{productDetails.title}</p>
        <div className="carousel-and-content-container">
          {productDetails.images ? (
            <ProductImageCarousel images={productDetails.images} />
          ) : null}
          <div className="product-details-content-container">
            <h1>{productDetails.name}</h1>
            <div className="rating-and-rating-count-container">
              <Rating
                initialRating={productDetails.rating}
                emptySymbol={<img src={emptyStar} className="icon" />}
                fullSymbol={<img src={goldenStar} className="icon" />}
                readonly
              />
              <p>
                ({productDetails.ratingCount?.toLocaleString("en-US")} Customer
                reviews)
              </p>
            </div>
            <h2 className="product-details-title-text">
              {productDetails.title}
            </h2>
            <p className="product-details-price">
              Price - ₹ {productDetails.price?.toLocaleString("en-US")}
            </p>
            <p style={{ fontWeight: "500" }}>
              {productDetails.color} | {productDetails.type}
            </p>
            <p className="about-this-item">About this item</p>
            <ul>
              {productDetails.description?.map((eachPoint) => (
                <li>{eachPoint}</li>
              ))}
            </ul>
            <p style={{ fontWeight: "500", marginBottom: "6px" }}>
              Avaliable -{" "}
              <span style={{ fontWeight: "400" }}>
                {productDetails.isAvailable ? "In stock" : "Out of stock"}{" "}
              </span>
            </p>
            <p style={{ fontWeight: "500", marginTop: "0px" }}>
              Brand -{" "}
              <span style={{ fontWeight: "400" }}>
                {productDetails.company}
              </span>
            </p>
            <button className="product-details-add-to-cart-btn">
              Add to cart
            </button>
            <br />
            <button className="product-details-buy-now-btn">Buy Now</button>
          </div>
        </div>
      </ContentWrapper>
    </>
  )
}

export default ProductDetails
