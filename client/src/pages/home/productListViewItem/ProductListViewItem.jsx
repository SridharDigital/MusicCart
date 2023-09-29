import "./productListViewItem.css"
import { Link } from "react-router-dom"
import cartIcon from "../../../assets/cartIcon.svg"

const ProductListViewItem = ({ productItem }) => {
  return (
    <li className="product-list-li-container">
      <div className="product-list-view-img-bg-container">
        <div className="img-bg-list-view-white-container">
          <img
            src={productItem.featuredImage}
            className="grid-view-image"
            alt={productItem.name}
          />
        </div>
        <div className="product-cart-icon-circle">
          <img src={cartIcon} className="home-product-list-view-cart-icon" />
        </div>
      </div>
      <div className="list-view-content-box">
        <h2>{productItem.name}</h2>
        <p>Price - ₹ {productItem.price.toLocaleString("en-US")}</p>
        <p>
          {productItem.color?.charAt(0).toUpperCase() +
            productItem.color?.slice(1).toLowerCase()}{" "}
          |{" "}
          {productItem.type?.charAt(0).toUpperCase() +
            productItem.type?.slice(1).toLowerCase()}
        </p>
        <p>{productItem.title}</p>
        <Link
          to={`/product/${productItem.id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <button>Details</button>
        </Link>
      </div>
    </li>
  )
}

export default ProductListViewItem
