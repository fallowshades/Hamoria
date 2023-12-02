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
          <div className="content">
            <div className="link-column">
              <WeLinks startIndex={0} endIndex={2} />
            </div>
            <div className="link-column">
              <WeLinks startIndex={3} endIndex={6} />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
export default Footer
