import { useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import Wrapper from '../../assets/wrappers/SidebarContainer'
import { FaPeopleRoof } from 'react-icons/fa6'
import NavLinksNested from './NavLinksNested'
import CourseContainer from './CourseContainer'
import { useEffect } from 'react'
import { useDashboardContext } from '../../pages/DashboardLayout'

const CurriculumContainer = () => {
  const [dropdownHeight, setDropdownHeight] = useState('auto') // Set initial height to auto
  const { showCourses, toggleCourses } = useDashboardContext()

  return (
    <Wrapper className="nav-link">
      <button
        type="button"
        className="toggle-btn"
        onClick={() => toggleCourses()}
      >
        {showCourses ? <FaPeopleRoof /> : <FaPeopleRoof />}
        Courses
      </button>

      <FaCaretDown />
    </Wrapper>
  )
}
export default CurriculumContainer
