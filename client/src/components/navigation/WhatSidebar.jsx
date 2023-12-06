import { FaTimes } from 'react-icons/fa'
import WhatNavLinks from './WhatNavLinks'
import Logo from '../Logo'
import Wrapper from '../../assets/wrappers/smallWhatSidebar'
import { useDashboardContext } from '../../pages/DashboardLayout'
import HandPartContainer from './HandPartContainer'
import CurriculumContainer from './CurriculumContainer'
const WhatSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext()
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
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
              <CurriculumContainer />
              <HandPartContainer />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
export default WhatSidebar
