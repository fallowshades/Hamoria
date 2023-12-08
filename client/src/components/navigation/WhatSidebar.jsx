import { FaTimes } from 'react-icons/fa'
import WhatNavLinks from './WhatNavLinks'
import Logo from '../Logo'
import Wrapper from '../../assets/wrappers/smallWhatSidebar'
import { useDashboardContext } from '../../pages/DashboardLayout'
import HandPartContainer from './HandPartContainer'
import HandPartButton from './HandPartButton'
import CurriculumContainerButton from './CurriculumContainerButton'
import CurriculumContainer from './CurriculumContainer'
const WhatSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext()
  const { showCourses, showCurriculum, showParts } = useDashboardContext()

  const handleRightButtonClick = () => {
    toggleSidebar('rightButton')
  }

  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className="content">
          <button
            type="button"
            className="close-btn"
            onClick={handleRightButtonClick}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>

          <div className="columns">
            <div className="col1">
              <WhatNavLinks />
            </div>

            <div className="col2">
              <CurriculumContainerButton />

              <div
                className={
                  showCurriculum ? 'dropdown show-dropdown' : 'dropdown'
                }
              >
                <CurriculumContainer />
              </div>

              <HandPartButton />
              <div
                className={showParts ? 'dropdown show-dropdown' : 'dropdown'}
              >
                <HandPartContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
export default WhatSidebar
