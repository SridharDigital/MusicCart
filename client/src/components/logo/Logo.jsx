import logoIcon from "../../assets/logoIcon.png"
import "./logo.css"

const Logo = ({ extraClassNames }) => {
  return (
    <div className="logo-box">
      <img src={logoIcon} className="logo-icon" alt="logo icon" />
      <p className={`logo-text ${extraClassNames}`}>Musicart</p>
    </div>
  )
}

export default Logo
