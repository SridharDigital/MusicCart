import "./home.css"
import HeroSection from "./heroSection/HeroSection"
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"
import DesktopHeader from "../../components/desktopHeader/DesktopHeader"

const Home = () => {
  return (
    <>
      <DesktopHeader />
      <ContentWrapper>
        <div className="home-top-section">
          <HeroSection />
        </div>
      </ContentWrapper>
    </>
  )
}

export default Home

/* products = [tittle, price, rating, ratingCount, type, brand, color, isFeatured, extendedTitle, description, tagline, isAvailable, images:[]] */
