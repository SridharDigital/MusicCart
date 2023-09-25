import { Link } from "react-router-dom"
import logoIcon from "../../assets/logoIcon.png"
import "./logo.css"

const Logo = ({ extraClassNames }) => {
  return (
    <Link to="/" style={{ textDecoration: "none", color: "black" }}>
      <div className="logo-box">
        <img src={logoIcon} className="logo-icon" alt="logo icon" />
        <p className={`logo-text ${extraClassNames}`}>Musicart</p>
      </div>
    </Link>
  )
}

export default Logo
