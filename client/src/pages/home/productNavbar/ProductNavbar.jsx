import "./productNavbar.css"
import searchIcon from "../../../assets/searchIcon.svg"
import gridIcon from "../../../assets/gridIcon.svg"
import listIcon from "../../../assets/listIcon.svg"
import { taxonomies, sortItems } from "../../../constants/constants"
import TaxonomyItem from "./taxonomyItem/TaxonomyItem"

const ProductNavbar = () => {
  // console.log({ taxonomies })
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
      <div className="product-filter-and-sort-container">
        <div className="icon-and-taxonomy-container">
          <div className="grid-list-view-icon-container">
            <img src={gridIcon} alt="grid icon" className="product-grid-icon" />
            <img src={listIcon} alt="list icon" className="product-list-icon" />
          </div>
          <select className="select-sort-mobile-container">
            <option value="" className="hide-select-container">
              {sortItems.displayText}
            </option>
            {sortItems.items?.map((item) => (
              <option key={item.id}>{item.displayText}</option>
            ))}
          </select>

          {taxonomies.map((eachTexonomy) => (
            <TaxonomyItem taxonomyItem={eachTexonomy} key={eachTexonomy.id} />
          ))}
        </div>
        <div className="select-sort-label-desktop-container">
          <label htmlFor="sortSelectDesktop">Sort by : </label>
          <select
            className="select-sort-desktop-container"
            id="sortSelectDesktop"
          >
            {sortItems.items?.map((item) => (
              <option key={item.id}>{item.displayText}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default ProductNavbar
