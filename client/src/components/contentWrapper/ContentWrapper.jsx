import "./contentWrapper.css"

const ContentWrapper = ({ children, customClasses }) => {
  return <div className={`content-wrapper ${customClasses}`}>{children}</div>
}

export default ContentWrapper
