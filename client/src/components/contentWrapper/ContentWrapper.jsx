import "./contentWrapper.css"

const ContentWrapper = ({ children, customClasses, width }) => {
  const customClass = customClasses ? customClasses : ""
  const maxWidth = width ? width : ""
  return (
    <div
      className={`content-wrapper ${customClass}`}
      style={{ "max-width": maxWidth }}
    >
      {children}
    </div>
  )
}

export default ContentWrapper
