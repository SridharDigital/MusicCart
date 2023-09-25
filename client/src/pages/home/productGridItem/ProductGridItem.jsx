import "./productGridItem.css"
import { Link } from "react-router-dom"
import cartIcon from "../../../assets/cartIcon.svg"

const ProductGridItem = ({ productItem }) => {
  // console.log(productItem)
  return (
    <li className="product-grid-li-container">
      <Link
        to={`/product/${productItem.id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="img-bg-container">
          <div className="img-bg-white-container">
            <img
              src={productItem.featuredImage}
              className="grid-view-image"
              alt={productItem.name}
            />
          </div>
          <div className="product-grid-cart-icon-circle">
            <img
              src={cartIcon}
              className="home-product-grid-list-view-cart-icon"
              alt="cart icon"
            />
          </div>
        </div>
        <div className="product-grid-li-content-box">
          <p>{productItem.name}</p>
          <p>Price - ₹ {productItem.price.toLocaleString("en-US")}</p>
          <p>
            {productItem.color} | {productItem.type}
          </p>
        </div>
      </Link>
    </li>
  )
}

export default ProductGridItem
