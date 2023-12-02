# v0.5.6

## footer element

### links

#### create footer links

```js
//we
import { MdOutlineEventNote } from 'react-icons/md'
import { FcAbout } from 'react-icons/fc'
import { RiNewspaperLine } from 'react-icons/ri'
import { IoIosHelpCircleOutline } from 'react-icons/io'
import { GoCodeOfConduct } from 'react-icons/go'
import { LiaCookieBiteSolid } from 'react-icons/lia'

export const footerLinks = [
  { id: 1, path: 'about-us', text: 'about', icon: <FcAbout /> },
  { id: 2, path: 'events', text: 'events', icon: <MdOutlineEventNote /> },
  { id: 3, path: 'news', text: 'news', icon: <RiNewspaperLine /> },
  { id: 4, path: 'help', text: 'help', icon: <IoIosHelpCircleOutline /> },
  {
    id: 5,
    path: 'terms-and-conditions',
    text: 'terms and conditions',
    icon: <GoCodeOfConduct />,
  },
  {
    id: 6,
    path: 'cookie-setting',
    text: 'cookie setting',
    icon: <LiaCookieBiteSolid />,
  },
]
```

#### weLink

```js
import { footerLinks } from '../utils/links'
import { NavLink } from 'react-router-dom'
const WeLinks = () => {
  return (
    <div className="nav-links">
      {footerLinks.map((link) => {
        const { text, path, icon } = link
        return (
          <NavLink to={path} key={text} className="nav-link" end>
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        )
      })}
    </div>
  )
}
export default WeLinks
```

### footer

####

Footer.jsx

```js
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
```

index.js

```js
export { default as Footer } from './Footer'
```

DashboardLayout

```js
import { Loading, Footer } from '../components'

<div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
            <Footer />
```

#### Footer css

Footer.js

```js
import styled from 'styled-components'
const Wrapper = styled.footer`
  background: var(--background-secondary-color);
  .content {
    display: flex;
    flex-direction: row;
  }
`
export default Wrapper
```

##
