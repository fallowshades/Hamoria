import WeLinks from './WeLinks'
import Wrapper from '../assets/wrappers/Footer'
import Logo from './Logo'
import { useState } from 'react'

const Footer = () => {
  const [showFooter, setShowFooter] = useState(true)
  return (
    <Wrapper>
      <div
        className={
          showFooter ? 'footer-container' : 'footer-container show-footer'
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <WeLinks />
        </div>
      </div>
    </Wrapper>
  )
}
export default Footer
