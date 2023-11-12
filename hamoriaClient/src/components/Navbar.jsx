import Wrapper from '../assets/wrappers/Navbar'
import { FaAlignLeft, FaAlignRight } from 'react-icons/fa'
import Logo from './Logo'
import LogoutContainer from './LogoutContainer'
import ThemeToggle from './ThemeToggle'

import { useDashboardContext } from '../pages/DashboardLayout'
const Navbar = () => {
  const { toggleSidebar } = useDashboardContext()
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>
        <div className="btn-container">
          <LogoutContainer />
          <ThemeToggle />
        </div>
      </div>
      <button type="button" className="toggle-btn" onClick={toggleSidebar}>
        <FaAlignRight />
      </button>
    </Wrapper>
  )
}

export default Navbar
