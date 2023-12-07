import { curriculumLinks } from '../../utils/links'
import { useState } from 'react'
import Wrapper from '../../assets/wrappers/SidebarContainer'
import { FaCaretDown } from 'react-icons/fa'
const CourseContainer = () => {
  const [showCourses, setShowCourses] = useState(false)

  return (
    <div className="nav-links">
      {curriculumLinks.map((link) => {
        const { id, text, path, icon } = link

        return (
          <Wrapper key={id} className="nav-link">
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setShowCourses(!showCourses)}
            >
              {showCourses ? <i>{link.icon}</i> : <i>{link.icon}</i>}
              Courses
            </button>

            <div
              className={showCourses ? 'dropdown show-dropdown' : 'dropdown'}
            >
              <p>{link.text}</p>
            </div>
            <FaCaretDown />
          </Wrapper>
        )
      })}
    </div>
  )
}
export default CourseContainer
