import "./productGridItem.css";
import { Link, useNavigate } from "react-router-dom";
import cartIcon from "../../../assets/cartIcon.svg";
import { callApi } from "../../../utils/callApi";
import { UseSelector, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { addToCart } from "../../../utils/addToCart";

const ProductGridItem = ({ productItem }) => {
  const userId = useSelector((state) => state.user.userId);
  const navigate = useNavigate();
  const onClickAddToCart = async () => {
    if (!userId) {
      return navigate("/login");
    }
    const status = await addToCart(userId, productItem.id);
    if (status) {
      navigate("/cart");
    }
  };

  return (
    <li className="product-grid-li-container">
      <div className="img-bg-container">
        <div className="img-bg-white-container">
          <img
            src={productItem.featuredImage}
            className="grid-view-image"
            alt={productItem.name}
          />
        </div>

        <div
          className="product-grid-cart-icon-circle"
          onClick={onClickAddToCart}
        >
          <img
            src={cartIcon}
            className="home-product-grid-list-view-cart-icon"
            alt="cart icon"
          />
        </div>
      </div>
      <Link
        to={`/product/${productItem.id}`}
        style={{ textDecoration: "none", color: "black", cursor: "pointer" }}
      >
        <div className="product-grid-li-content-box">
          <p>{productItem.name}</p>
          <p>Price - ₹ {productItem.price.toLocaleString("en-US")}</p>
          <p>
            {productItem.color?.charAt(0).toUpperCase() +
              productItem.color?.slice(1).toLowerCase()}{" "}
            |{" "}
            {productItem.type?.charAt(0).toUpperCase() +
              productItem.type?.slice(1).toLowerCase()}
          </p>
        </div>
      </Link>
      {/* </Link> */}
    </li>
  );
};

export default ProductGridItem;
