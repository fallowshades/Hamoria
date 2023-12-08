import { useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import Wrapper from '../../assets/wrappers/SidebarContainer'
import { FaPeopleRoof, FaPeopleLine } from 'react-icons/fa6'
import NavLinksNested from './NavLinksNested'
import CourseContainer from './CourseContainer'
import { useEffect } from 'react'
import { useDashboardContext } from '../../pages/DashboardLayout'

const CurriculumContainerButton = () => {
  const [dropdownHeight, setDropdownHeight] = useState('auto') // Set initial height to auto
  const { showCurriculum, toggleCurriculum } = useDashboardContext()

  return (
    <Wrapper className="nav-link">
      <button
        type="button"
        className="toggle-btn"
        onClick={() => toggleCurriculum()}
      >
        {showCurriculum ? <FaPeopleLine /> : <FaPeopleRoof />}
        Courses
      </button>
      <FaCaretDown />
    </Wrapper>
  )
}

export default CurriculumContainerButton
