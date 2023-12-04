import { useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/SidebarContainer'
import { FaPeopleRoof } from 'react-icons/fa6'
import NavLinksNested from './NavLinksNested'

const CoursesContainer = () => {
  const [showCourses, setShowCourses] = useState(false)

  return (
    <Wrapper className="nav-link">
      <button
        type="button"
        className="toggle-btn"
        onClick={() => setShowCourses(!showCourses)}
      >
        {showCourses ? <FaPeopleRoof /> : <FaPeopleRoof />}
        Courses
      </button>

      <div className={showCourses ? 'dropdown show-dropdown' : 'dropdown'}>
        <NavLinksNested coursesLinks />
      </div>
      <FaCaretDown />
    </Wrapper>
  )
}
export default CoursesContainer
