import WhatNavLinks from './WhatNavLinks'
import { Logo } from '../components'
import Wrapper from '../assets/wrappers/BigWhatSidebar'
import { useDashboardContext } from '../pages/DashboardLayout'
import HandPartContainer from './HandPartContainer'
import CoursesContainer from './CoursesContainer'
const WhatSidebarBig = () => {
  const { showSidebar } = useDashboardContext()
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
          <HandPartContainer />
          <CoursesContainer />
        </div>
      </div>
    </Wrapper>
  )
}
export default WhatSidebarBig
