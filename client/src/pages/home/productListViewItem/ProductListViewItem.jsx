import "./productListViewItem.css"
import cartIcon from "../../../assets/cartIcon.svg"

const ProductListViewItem = ({ productItem }) => {
  return (
    <li className="product-list-li-container">
      <div className="product-list-view-img-bg-container">
        <div className="img-bg-list-view-white-container">
          <img src={productItem.images[0]} className="grid-view-image" />
        </div>
        <div className="product-cart-icon-circle">
          <img src={cartIcon} className="home-product-list-view-cart-icon" />
        </div>
      </div>
      <div className="list-view-content-box">
        <h2>{productItem.name}</h2>
        <p>Price - ₹ {productItem.price.toLocaleString("en-US")}</p>
        <p>
          {productItem.color} | {productItem.type}
        </p>
        <p>{productItem.title}</p>
        <button>Details</button>
      </div>
    </li>
  )
}

export default ProductListViewItem
