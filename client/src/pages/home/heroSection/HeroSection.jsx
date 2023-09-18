import "./heroSection.css"

import heroSectionImage from "../../../assets/heroSectionWomen.png"

const HeroSection = () => {
  return (
    <div className="hero-section-container">
      <div className="hero-content-container">
        <h1 className="hero-section-heading">
          Grab upto 50% off on <br /> Selected headphones
        </h1>
        <button className="buy-now-btn">Buy Now</button>
      </div>
      <img src={heroSectionImage} alt="hero" className="hero-section-image" />
    </div>
  )
}

export default HeroSection
