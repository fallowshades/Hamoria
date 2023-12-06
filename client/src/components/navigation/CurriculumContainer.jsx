import { useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import Wrapper from '../../assets/wrappers/SidebarContainer'
import { FaPeopleRoof } from 'react-icons/fa6'
import NavLinksNested from './NavLinksNested'

import { useEffect } from 'react'

const CurriculumContainer = () => {
  const [showCourses, setShowCourses] = useState(false)

  const [dropdownHeight, setDropdownHeight] = useState('auto') // Set initial height to auto

  useEffect(() => {
    // Calculate the height of the dropdown based on the number of items
    const numItems = 5 // Replace with the actual number of items
    console.log(showCourses)
    const calculatedHeight = numItems * 40 + 'px' // Adjust 40 based on your item height
    setDropdownHeight(showCourses ? calculatedHeight : 'auto')
  }, [showCourses])

  return (
    <Wrapper className="nav-link" style={{ hight: dropdownHeight }}>
      <button
        type="button"
        className="toggle-btn"
        onClick={() => setShowCourses(!showCourses)}
      >
        {showCourses ? <FaPeopleRoof /> : <FaPeopleRoof />}
        Courses
      </button>

      <div
        className={showCourses ? 'dropdown show-dropdown' : 'dropdown'}
      ></div>
      <FaCaretDown />
    </Wrapper>
  )
}
export default CurriculumContainer
