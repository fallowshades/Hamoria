import { NavLink } from 'react-router-dom'
import { partLinks } from '../utils/links'

const NavLinksNested = () => {
  return (
    <>
      {partLinks.map((link) => {
        const { id, text, path, icon } = link

        return (
          <div key={id} className="dropdown-item">
            <NavLink
              to={path}
              key={id}
              className="nav-link"
              // will discuss in a second
              end
            >
              <span className="icon">{icon}</span>
              {text}
            </NavLink>
            {id}
          </div>
        )
      })}
    </>
  )
}
export default NavLinksNested