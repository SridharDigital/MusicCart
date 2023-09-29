import "./taxonomyItem.css"

const TaxonomyItem = ({ taxonomyItem, setDisplayConditions }) => {
  const { items, displayText } = taxonomyItem
  const onSelectTaxonomy = (e) => {
    let price = { min: 0, max: Number.MAX_VALUE }
    console.log(taxonomyItem)
    console.log(e.target.value)

    // if (taxonomyItem.id === "price") {
    //   switch (e.target.value) {
    //     case "₹0 - ₹1,000":
    //       console.log("Executed case 1")
    //       price = { min: 0, max: 999 }
    //       break
    //     case "₹1,000 - ₹5,000":
    //       console.log("Executed case 1k+")
    //       price = { min: 1000, max: 4999 }
    //       break
    //     case "₹5,000 - ₹10,000":
    //       console.log("Executed case 5k+")
    //       price = { min: 5000, max: 9999 }
    //       break
    //     case "₹10,000+":
    //       console.log("Executed case 10k+")
    //       price = { min: 10000, max: Number.MAX_VALUE }
    //       break
    //     default:
    //       console.log("Executed case default")
    //       price = { min: 0, max: Number.MAX_VALUE }
    //   }
    //   setDisplayConditions((prevState) => ({
    //     ...prevState,
    //     price,
    //   }))
    // }

    if (taxonomyItem.id === "price") {
      switch (e.target.value) {
        case "₹0 - ₹1,000":
          price = { min: 0, max: 999 }
          break
        case "₹1,000 - ₹5,000":
          price = { min: 1000, max: 4999 }
          break
        case "₹5,000 - ₹10,000":
          price = { min: 5000, max: 9999 }
          break
        case "₹10,000+":
          price = { min: 10000, max: Number.MAX_VALUE }
          break
        default:
          price = { min: 0, max: Number.MAX_VALUE }
      }

      setDisplayConditions((prevState) => ({
        ...prevState,
        price,
      }))
      return
    }

    setDisplayConditions((prevState) => ({
      ...prevState,
      [taxonomyItem.id]: e.target.value,
    }))
  }

  return (
    <>
      <select className="select-container" onChange={onSelectTaxonomy}>
        <option value="">{displayText}</option>
        {items?.map((item, index) => (
          <option key={index} className="option" value={item}>
            {item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
          </option>
        ))}
      </select>
    </>
  )
}

export default TaxonomyItem
