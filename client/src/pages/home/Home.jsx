import "./home.css"
import HeroSection from "./heroSection/HeroSection"
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"
import DesktopHeader from "../../components/desktopHeader/DesktopHeader"
import ProductNavbar from "./productNavbar/ProductNavbar"

const Home = () => {
  return (
    <>
      <DesktopHeader />
      <ContentWrapper>
        <div className="home-top-section">
          <HeroSection />
          <ProductNavbar />
        </div>
      </ContentWrapper>
    </>
  )
}

export default Home

/* products = [tittle, price, rating, ratingCount, type, brand, color, isFeatured, extendedTitle, description, tagline, isAvailable, images:[]] */
