import { useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import Wrapper from '../../assets/wrappers/SidebarContainer'
import CourseContainer from './CourseContainer'
import { useDashboardContext } from '../../pages/DashboardLayout'
import { curriculumLinks } from '../../utils/links'
import React from 'react'

const CourseContainerButton = () => {
  const { showCourses, toggleCourses } = useDashboardContext()

  return curriculumLinks.map((button) => {
    const { id, text, icon, activeIcon, fragmentId } = button
    return (
      <React.Fragment key={fragmentId}>
        <Wrapper key={id} className="nav-link">
          <button
            value={text}
            type="button"
            className="toggle-btn"
            onClick={(e) => toggleCourses(e.target.value)}
          >
            {showCourses.text ? <span>{icon}</span> : <span>{activeIcon}</span>}
            {text}
          </button>
          <FaCaretDown />
        </Wrapper>

        <div
          key={fragmentId}
          className={showCourses[text] ? 'dropdown show-dropdown' : 'dropdown'}
        >
          <CourseContainer course={text} />
        </div>
      </React.Fragment>
    )
  })
}

export default CourseContainerButton
