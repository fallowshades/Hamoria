import { footerLinks } from '../utils/links'
import { NavLink } from 'react-router-dom'
const WeLinks = ({ startIndex, endIndex }) => {
  const linksInRange = footerLinks.slice(startIndex, endIndex + 1)
  return (
    <div className="nav-links">
      {linksInRange.map((link) => {
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
