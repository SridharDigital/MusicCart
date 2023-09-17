import Logo from "../../logo/Logo"
import ContentWrapper from "../../contentWrapper/ContentWrapper"
import searchIcon from "../../../assets/searchIcon.svg"

import "./mobileNavbar.css"

const MobileNavbar = ({ displaySearchBar }) => {
  return (
    <div className="mobile-header-container">
      <ContentWrapper>
        {!displaySearchBar ? (
          <Logo extraClassNames={"text-white"} />
        ) : (
          <div className="search-bar-container">
            <img src={searchIcon} className="search-icon" />
            <input
              type="text"
              className="mobile-header-search-input"
              placeholder="Search Musicart"
            />
          </div>
        )}
      </ContentWrapper>
    </div>
  )
}

export default MobileNavbar
