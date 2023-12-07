import { NavLink } from 'react-router-dom'
import { partLinks, curriculumLinks, noLinks, soLinks } from '../../utils/links'

const NavLinksNested = ({ curriculum, course }) => {
  let linkesToMap = curriculum ? curriculumLinks : partLinks

  if (course && course == 'so') linkesToMap = soLinks
  if (course && course == 'no') linkesToMap = noLinks

  return (
    <>
      {linkesToMap.map((link) => {
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
          </div>
        )
      })}
    </>
  )
}
export default NavLinksNested
