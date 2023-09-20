import { useState } from "react"

import "./taxonomyItem.css"

const TaxonomyItem = ({ taxonomyItem }) => {
  const { displayText, items } = taxonomyItem
  //   console.log(taxonomyItem)
  return (
    <>
      <select className="select-container">
        <option value="" className="hide-select-container">
          {displayText}
        </option>
        {items?.map((item) => (
          <option key={item.id} className="option">
            {item.displayText}
          </option>
        ))}
      </select>
    </>
  )
}

export default TaxonomyItem
