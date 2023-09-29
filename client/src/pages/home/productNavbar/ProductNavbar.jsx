import { useState, useEffect } from "react"
import "./productNavbar.css"
import searchIcon from "../../../assets/searchIcon.svg"
import gridIcon from "../../../assets/gridIcon.svg"
import listIcon from "../../../assets/listIcon.svg"
import { sortItems } from "../../../constants/constants"
import TaxonomyItem from "./taxonomyItem/TaxonomyItem"
import { callApi } from "../../../utils/callApi"

const ProductNavbar = ({ setDisplayConditions, setDisplayListView }) => {
  const [taxonomies, setTaxonomiesx] = useState()

  const handleSearch = (e) => {
    console.log(e.target.value)
    if (e.key === "Enter") {
      setDisplayConditions((prevState) => ({
        ...prevState,
        title: e.target.value,
      }))
    }
  }

  const onSelectSort = (e) => {
    console.log(e.target.value.charAt(0))
    setDisplayConditions((prevState) => ({
      ...prevState,
      sortBy: {
        [e.target.value.slice(1)]: e.target.value.charAt(0) == 0 ? -1 : 1,
      },
    }))
  }

  useEffect(() => {
    ;(async () => {
      try {
        const taxonomyRes = await callApi("GET", "/get-filter-options")
        setTaxonomiesx(taxonomyRes)
        console.log({ taxonomyRes })
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <div className="product-navbar-container">
      <div className="product-search-container">
        <img src={searchIcon} alt="search icon" />
        <input
          type="search"
          className="desktop-search-input-bar"
          placeholder="Search Product"
          onKeyDown={handleSearch}
        />
      </div>
      <div className="product-filter-and-sort-container">
        <div className="icon-and-taxonomy-container">
          <div className="grid-list-view-icon-container">
            <img
              src={gridIcon}
              alt="grid icon"
              className="product-grid-icon"
              onClick={() => setDisplayListView(false)}
            />
            <img
              src={listIcon}
              alt="list icon"
              className="product-list-icon"
              onClick={() => setDisplayListView(true)}
            />
          </div>
          <select
            className="select-sort-mobile-container"
            onChange={onSelectSort}
          >
            <option value="" className="hide-select-container">
              {sortItems.displayText}
            </option>
            {sortItems.items?.map((item, index) => (
              <option id={index} value={item.id}>
                {item.displayText}
              </option>
            ))}
          </select>

          {taxonomies?.map((eachTexonomy) => (
            <TaxonomyItem
              taxonomyItem={eachTexonomy}
              key={eachTexonomy.id}
              setDisplayConditions={setDisplayConditions}
            />
          ))}
        </div>
        <div className="select-sort-label-desktop-container">
          <label htmlFor="sortSelectDesktop">Sort by : </label>
          <select
            className="select-sort-desktop-container"
            id="sortSelectDesktop"
            onChange={onSelectSort}
          >
            {sortItems.items?.map((item, index) => (
              <option key={index} value={item.id}>
                {item.displayText}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default ProductNavbar
