import NavLinks from './NavLinks'
import { Logo } from '../components'
import Wrapper from '../assets/wrappers/BigWhatSidebar'
import { useDashboardContext } from '../pages/DashboardLayout'

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
        </div>
      </div>
    </Wrapper>
  )
}
export default WhatSidebarBig
