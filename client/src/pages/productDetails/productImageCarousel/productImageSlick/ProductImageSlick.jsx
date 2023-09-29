import "./productImageSlick.css"
import React, { useState } from "react"
import rightSlickArrow from "../../../../assets/rightSlickArrow.svg"
import leftSlickArrow from "../../../../assets/leftSlickArrow.svg"

const ProductImageSlick = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length
    setCurrentIndex(nextIndex)
  }

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length
    setCurrentIndex(prevIndex)
  }

  const handleDotClick = (index) => {
    setCurrentIndex(index)
  }

  return (
    <div className="carousel-container">
      <img
        src={images[currentIndex]}
        alt={`Image ${currentIndex + 1}`}
        className="carousel-image"
      />
      <div className="carousel-buttons">
        <button className="carousel-button" onClick={handlePrev}>
          <img src={leftSlickArrow} />
        </button>
        <div className="carousel-dots">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-dot ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
        <button className="carousel-button" onClick={handleNext}>
          <img src={rightSlickArrow} />
        </button>
      </div>
    </div>
  )
}

export default ProductImageSlick
