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

### footer layout

Footer.jsx

```js
const Footer = () => {
  return (
    <div className="content">
      <div className="link-column">
        <WeLinks startIndex={0} endIndex={2} />
      </div>
      <div className="link-column">
        <WeLinks startIndex={3} endIndex={6} />
      </div>
    </div>
  )
}
```

Welinks.jsx

```js
const WeLinks = ({ startIndex, endIndex }) => {
  const linksInRange = footerLinks.slice(startIndex, endIndex + 1)

   {linksInRange.map((link) => {...})}
}
```

## Fix dashboard

## sidebar with parts linked to

-- div is not the appropriate method

/pages/DashboardLayout.jsx

```js
{
  activeLeftSidebar ? (
    <>
      <SmallSidebar />
      <BigSidebar />
    </>
  ) : null
}
```

### links

/utils/links

```js
import { SiSemanticweb } from 'react-icons/si'
import { VscReferences } from 'react-icons/vsc'
import { PiHandEye } from 'react-icons/pi'
import { FaHandPointer } from 'react-icons/fa'

export const partLinks = [
  { id: 1, path: 'reference', text: 'reference', icon: <VscReferences /> },
  { id: 2, path: 'word', text: 'word', icon: <SiSemanticweb /> },
  { id: 3, path: 'orientation', text: 'orientation', icon: <FaHandPointer /> },
  {
    id: 4,
    path: 'hand-status',
    text: 'hand status',
    icon: <PiHandEye />,
  },
  {
    id: 5,
    path: 'prefix',
    text: 'terms and conditions',
    icon: <GoCodeOfConduct />,
  },
]
```

### containers to fill up multiple

#### the sidebars

components/WhatSidebarBig and components/WhatSidebar

```js
import HandPartContainer from './HandPartContainer'
;<HandPartContainer />
```

#### toggle in sidebar

HandPartContainer.jsx

```js
import { useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { FaHandScissors } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/SidebarContainer'
import { NavLinksNested } from './NavLinksNested'
const HandPartContainer = () => {
  const [showParts, setShowPart] = useState(false)
  const [handform, setHandform] = useState('v' === 'j')
  return (
    <Wrapper className="nav-link">
      <button
        type="button"
        className="toggle-btn"
        onClick={() => setShowPart(!showParts)}
      >
        {handform ? <FaHandScissors /> : <FaHandScissors />}
        handparts
      </button>
      <div className={showParts ? 'dropdown show-dropdown' : 'dropdown'}>
        <NavLinksNested />
      </div>
      <FaCaretDown />
    </Wrapper>
  )
}
export default HandPartContainer
```

NavLinksNested.jsx

```js
import { NavLink } from 'react-router-dom'
import { partLinks } from '../utils/links'
const NavLinksNested = () => {
  return (
    <>
      {partLinks.map((link) => {
        const { id, text, path, icon } = link
        return (
          <div key={id} className="dropdown-item">
            <NavLink
              to={path}
              key={id}
              className="nav-link"
              // will discuss in a second
              end
            >
              <span className="icon">{icon}</span>
              {text}
            </NavLink>
            {id}
          </div>
        )
      })}
    </>
  )
}
export default NavLinksNested
```

#### non toggle in logoutcontainer in navbar (why need fragment)

LogoutContainer.jsx

```js
import NavLinksNested from './NavLinksNested'

const LogoutContainer = () => {
  ;<NavLinksNested />
}
```

#### css HandPartContainer

```js
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;

  .logout-btn {
    display: flex;

    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
  }
  .img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
  .dropdown {
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    box-shadow: var(--shadow-2);
    visibility: hidden;
    border-radius: var(--border-radius);
  }
  .show-dropdown {
    visibility: visible;
  }

  .toggle-btn {
    flex: 0.6; /* Adjust the value as needed */
  }
  .dropdown {
    flex: 1; /* Adjust the value as needed */
  }

  .dropdown-item {
    border-radius: var(--border-radius);
    background: transparent;
    border-color: transparent;
    color: var(--white);
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
`

export default Wrapper
```
