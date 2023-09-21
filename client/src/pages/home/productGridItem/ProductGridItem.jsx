import "./productGridItem.css"
import cartIcon from "../../../assets/cartIcon.svg"

const ProductGridItem = ({ productItem }) => {
  return (
    <li className="product-grid-li-container">
      <div className="img-bg-container">
        <div className="img-bg-white-container">
          <img src={productItem.images[0]} className="grid-view-image" />
        </div>
        <img src={cartIcon} className="home-product-cart-icon" />
      </div>
      <div className="product-grid-li-content-box">
        <p>{productItem.name}</p>
        <p>Price - ₹ {productItem.price.toLocaleString("en-US")}</p>
        <p>
          {productItem.color} | {productItem.type}
        </p>
      </div>
    </li>
  )
}

export default ProductGridItem
