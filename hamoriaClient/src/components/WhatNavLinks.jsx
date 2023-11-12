import { useDashboardContext } from '../pages/DashboardLayout'
import whatlinks from '../utils/links'
import { NavLink } from 'react-router-dom'

const WhatNavLinks = ({ isBigSidebar }) => {
  return (
    <div className="nav-links">
      {whatlinks.map((whatlinks) => {
        const { text, path, icon } = useDashboardContext()

        return (
          <NavLink
            to={path}
            key={text}
            onClick={isBigSidebar ? null : toggleSidebar}
            className="nav-link"
            end
          >
            <span className="icon">{icon}</span>
          </NavLink>
        )
      })}
    </div>
  )
}
export default WhatNavLinks
