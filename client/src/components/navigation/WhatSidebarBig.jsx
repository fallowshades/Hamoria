import WhatNavLinks from './WhatNavLinks'
import { Logo } from '..'
import Wrapper from '../../assets/wrappers/BigWhatSidebar'
import { useDashboardContext } from '../../pages/DashboardLayout'
import HandPartContainer from './HandPartContainer'
import CurriculumContainer from './CurriculumContainer'
import CurriculumContainerButton from './CurriculumContainerButton'
const WhatSidebarBig = () => {
  const { showSidebar, showCurriculum } = useDashboardContext()
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <WhatNavLinks isBigSidebar />
          <div className="col2">
            <CurriculumContainerButton />

            <div
              className={showCurriculum ? 'dropdown show-dropdown' : 'dropdown'}
            >
              <CurriculumContainer />
            </div>

            <HandPartContainer />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
export default WhatSidebarBig
