import { useState, useEffect } from "react"

import "./home.css"
import HeroSection from "./heroSection/HeroSection"
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"
import DesktopHeader from "../../components/desktopHeader/DesktopHeader"
import ProductNavbar from "./productNavbar/ProductNavbar"
import ProductGridItem from "./productGridItem/ProductGridItem"
import ProductListViewItem from "./productListViewItem/ProductListViewItem"
import { callApi } from "../../utils/callApi"

const initalDisplayConditions = {
  isAvailable: true,
  rating: 0,
  color: "",
  company: "",
  type: "",
  price: { min: 0, max: Number.MAX_VALUE },
  title: "",
  sortBy: { name: 1 },
}

const Home = () => {
  const [displayListView, setDisplayListView] = useState(false)
  const [products, setProducts] = useState([])
  const [screenWidth, setScreenWidth] = useState(window.screen.width)
  const [displayConditions, setDisplayConditions] = useState(
    initalDisplayConditions
  )

  useEffect(() => {
    ;(async () => {
      try {
        const url = "/products"
        const featuredProducts = await callApi("GET", url, displayConditions)
        console.log({ featuredProducts })
        setProducts(featuredProducts)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        const url = "/products"
        const featuredProducts = await callApi("GET", url, displayConditions)
        console.log({ featuredProducts })
        setProducts(featuredProducts)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [displayConditions])

  useEffect(() => {
    const updateWidth = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener("resize", updateWidth)

    if (screenWidth < 1024) {
      setDisplayListView(false)
    }

    return () => {
      window.removeEventListener("resize", updateWidth)
    }
  }, [screenWidth])

  console.log({ displayConditions })

  return (
    <>
      <DesktopHeader displayViewCart displayPath="Home" />
      <ContentWrapper>
        <div className="home-top-section">
          <HeroSection />
          <ProductNavbar
            setDisplayConditions={setDisplayConditions}
            setDisplayListView={setDisplayListView}
          />
        </div>
        {products.length > 0 ? (
          <>
            {displayListView ? (
              <ul className="product-list-view-ul-container">
                {products?.map((eachProduct) => (
                  <ProductListViewItem
                    productItem={eachProduct}
                    key={eachProduct.id}
                  />
                ))}
              </ul>
            ) : (
              <ul className="product-grid-view-ul-container">
                {products?.map((eachProduct) => (
                  <ProductGridItem
                    productItem={eachProduct}
                    key={eachProduct.id}
                  />
                ))}
              </ul>
            )}
          </>
        ) : (
          <h1>No Products Found</h1>
        )}
      </ContentWrapper>
    </>
  )
}

export default Home

/* products = [tittle, price, rating, ratingCount, type, brand, color, isFeatured, extendedTitle, description, tagline, isAvailable, images:[]] */
