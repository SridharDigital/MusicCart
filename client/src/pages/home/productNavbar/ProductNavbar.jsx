import "./productNavbar.css"
import searchIcon from "../../../assets/searchIcon.svg"

const ProductNavbar = () => {
  return (
    <div className="product-navbar-container">
      <div className="product-search-container">
        <img src={searchIcon} alt="search icon" />
        <input
          type="search"
          className="desktop-search-input-bar"
          placeholder="Search Product"
        />
      </div>
      <div className="product-filter-and-sort-container"></div>
    </div>
  )
}

export default ProductNavbar
