import { footerLinks } from '../utils/links'
import { NavLink } from 'react-router-dom'
const WeLinks = () => {
  return (
    <div className="nav-links">
      {footerLinks.map((link) => {
        const { text, path, icon } = link

        return (
          <NavLink to={path} key={text} className="nav-link" end>
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        )
      })}
    </div>
  )
}
export default WeLinks
