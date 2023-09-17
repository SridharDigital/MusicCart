import "./navbar.css"
import MobileNavbar from "./mobileNavbar/MobileNavbar"

const Navbar = ({ displaySearchBarinMobile }) => {
  return (
    <>
      <MobileNavbar displaySearchBarinMobile={displaySearchBarinMobile} />
    </>
  )
}

export default Navbar
