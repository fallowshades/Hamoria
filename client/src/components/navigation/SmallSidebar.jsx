import Wrapper from '../../assets/wrappers/SmallSidebar'
import { FaTimes } from 'react-icons/fa'

import Logo from '../Logo'
import NavLinks from './NavLinks'
import { links } from '../../utils/links'
import { useDashboardContext } from '../../pages/DashboardLayout'

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext()

  const handleLeftButtonClick = () => {
    toggleSidebar('leftButton')
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
            onClick={handleLeftButtonClick}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className="nav-links">
            <NavLinks />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar
