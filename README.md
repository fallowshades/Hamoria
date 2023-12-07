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

### course container with cirrculum links

#### links to courses

```js
import { GiMaterialsScience } from 'react-icons/gi'
import { GiHumanPyramid } from 'react-icons/gi'

export const curriculumLinks = [
  { id: 1, path: 'no', text: 'no', icon: <GiMaterialsScience /> },
  { id: 2, path: 'so', text: 'so', icon: <GiHumanPyramid /> },
]
export const noLinks = [
  { id: 1, path: 'crud', text: 'crud', icon: <GiMaterialsScience /> },
  { id: 2, path: 'domain', text: 'domain', icon: <GiHumanPyramid /> },
  { id: 2, path: 'tuple', text: 'tuple', icon: <GiHumanPyramid /> },
  { id: 2, path: 'place', text: 'place', icon: <GiHumanPyramid /> },
  { id: 2, path: 'item', text: 'item', icon: <GiHumanPyramid /> },
]
export const soLinks = [
  { id: 1, path: 'shock', text: 'shock', icon: <GiMaterialsScience /> },
  { id: 2, path: 'denial', text: 'denial', icon: <GiHumanPyramid /> },
  { id: 2, path: 'anger', text: 'anger', icon: <GiHumanPyramid /> },
  { id: 2, path: 'bargain', text: 'bargain', icon: <GiHumanPyramid /> },
  { id: 2, path: 'depression', text: 'depression', icon: <GiHumanPyramid /> },
  { id: 2, path: 'testing', text: 'testing', icon: <GiHumanPyramid /> },
  { id: 2, path: 'acceptance', text: 'acceptance', icon: <GiHumanPyramid /> },
]
```

#### course container

```js
const CoursesContainer = () => {
  const [showCourses, setShowCourses] = useState(false)
  return (
    <Wrapper className="nav-link">
      <button
        type="button"
        className="toggle-btn"
        onClick={() => setShowCourses(!showCourses)}
      >
        {showCourses ? <FaPeopleRoof /> : <FaPeopleRoof />}
        Courses
      </button>
      <div className={showCourses ? 'dropdown show-dropdown' : 'dropdown'}>
        <NavLinksNested coursesLinks />
      </div>
      <FaCaretDown />
    </Wrapper>
  )
}
export default CoursesContainer
```

NavLinksNested.jsx

```js
import { partLinks, curriculumLinks } from '../utils/links'

const NavLinksNested = ({ coursesLinks }) => {
  const linkesToMap = coursesLinks ? curriculumLinks : partLinks
  {
    linkesToMap.map((link) => {...})
  }
}
```

#### connect to sidebar

WhatSidebar.jsx and WhatSidebarBig.jsx

```js

import CoursesContainer from './CoursesContainer'

const whatSidebar(){
  return(<div className="col2">
              <HandPartContainer />
              <CoursesContainer />
            </div>)
}
```

### Refracture

navigational folder in /components

## setup pages for courses and parts

create

- ./pages/courses/no
- ./pages/courses/no
- ./pages/footReference

### toogle container with curriculum

#### basic container to be nested

#### setup curriculum to setup courses

package.json

```js
"nanoid": "^5.0.4",
```

- update all id

links.jsx

```js
import { nanoid } from 'nanoid'
```

#### refracture to toggle in dashboard

DashboardLayout

````js
  const [showCourses, setShowCourses] = useState(false)
  const toggleCourses = () => {
    setShowCourses(!showCourses)
    console.log(showCourses)

     <DashboardContext.Provider
      value={{
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
        toggleCourses,
        showCourses,
      }}
    >
  }```
````

whatSidebar.jsx

```js
import CurriculumContainerButton from './CurriculumContainerButton'
const { showCourses } = useDashboardContext()


return<>...
            <div className="col2">
              <CurriculumContainer />
              <CurriculumContainerButton />
              <div
                className={showCourses ? 'dropdown show-dropdown' : 'dropdown'}
              >
                <CurriculumContainer />
              </div>
              <>
```

CurriculumContainerButton.jsx

```js
import { useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import Wrapper from '../../assets/wrappers/SidebarContainer'
import { FaPeopleRoof } from 'react-icons/fa6'
import NavLinksNested from './NavLinksNested'
import CourseContainer from './CourseContainer'
import { useEffect } from 'react'
import { useDashboardContext } from '../../pages/DashboardLayout'
const CurriculumContainer = () => {
  const [dropdownHeight, setDropdownHeight] = useState('auto') // Set initial height to auto
  const { showCourses, toggleCourses } = useDashboardContext()
  return (
    <Wrapper className="nav-link">
      <button
        type="button"
        className="toggle-btn"
        onClick={() => toggleCourses()}
      >
        {showCourses ? <FaPeopleRoof /> : <FaPeopleRoof />}
        Courses
      </button>
      <FaCaretDown />
    </Wrapper>
  )
}
export default CurriculumContainer
```

#### prepare for future

- create course container

```js
import { curriculumLinks } from '../../utils/links'
import { useState } from 'react'
import Wrapper from '../../assets/wrappers/SidebarContainer'
import { FaCaretDown } from 'react-icons/fa'
const CourseContainer = () => {
  const [showCourses, setShowCourses] = useState(false)

  return (
    <div className="nav-links">
      {curriculumLinks.map((link) => {
        const { id, text, path, icon } = link

        return (
          <Wrapper key={id} className="nav-link">
            <button
              type="button"
              className="toggle-btn"
              onClick={() => setShowCourses(!showCourses)}
            >
              {showCourses ? <i>{link.icon}</i> : <i>{link.icon}</i>}
              Courses
            </button>

            <div
              className={showCourses ? 'dropdown show-dropdown' : 'dropdown'}
            >
              <p>{link.text}</p>
            </div>
            <FaCaretDown />
          </Wrapper>
        )
      })}
    </div>
  )
}
export default CourseContainer
```

### nested collapse

#### toggleble icons and future fragment application

links.js

```js
import { LuBoxes, LuPersonStanding } from 'react-icons/lu'
export const curriculumLinks = [
  {
    id: nanoid(),
    fragmentId: nanoid(),
    path: 'no',
    text: 'no',
    icon: <GiMaterialsScience />,
    activeIcon: <LuBoxes />,
  },
  {
    id: nanoid(),
    fragmentId: nanoid(),
    path: 'so',
    text: 'so',
    icon: <GiHumanPyramid />,
    activeIcon: <LuPersonStanding />,
  },
]
```

#### cascade delete when close parent

DashboardLayout.jsx

````js
 const [showCurriculum, setShowCurriculum] = useState(false)
  const [showCourses, setShowCourses] = useState({ no: false, so: false })
  const toggleCourses = (course) => {
    setShowCourses((prevState) => ({
      ...prevState,
      [course]: !showCourses[course],
    }))
    console.log(showCourses[course])
  }
  const resetCourses = () => {
    setShowCourses((prevState) => {
      // Create a new object with the same keys as showCourses
      const resetState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false
        return acc
      }, {})
      return resetState
    })
  }
  const toggleCurriculum = () => {
    setShowCurriculum(!showCurriculum)
       if (showCurriculum) resetCourses()
  }
    ```
````

#### --!update misstake of using showCourse instead of show circulum

whatSidebar.jsx

```js
const { showCourses, showCurriculum } = useDashboardContext()

 <div

                className={
                  showCurriculum ? 'dropdown show-dropdown' : 'dropdown'
                }
              >
                <CurriculumContainer />
              </div>
```

#### give curriculumbutton toggle icons depend on show

CurriculumContainerButton

--update onClick onClick={() => toggleCurriculum()}

```js
import { FaPeopleRoof, FaPeopleLine } from 'react-icons/fa6'

const CurriculumContainerButton = () => {
  const { showCurriculum, toggleCurriculum } = useDashboardContext()
}
```

#### fragments such utelize space in parent div

curriculumContainer.jsx

```js
import CourseContainerButton from './CourseContainerButton'
const CurriculumContainer = () => {
  return <NavLinksNested coursesLinks />
  return (
    <>
      <CourseContainerButton />
    </>
  )
}
```

```js
import { useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import Wrapper from '../../assets/wrappers/SidebarContainer'
import CourseContainer from './CourseContainer'
import { useDashboardContext } from '../../pages/DashboardLayout'
import { curriculumLinks } from '../../utils/links'
import React from 'react'

const CourseContainerButton = () => {
  const { showCourses, toggleCourses } = useDashboardContext()

  return curriculumLinks.map((button) => {
    const { id, text, icon, activeIcon, fragmentId } = button
    return (
      <React.Fragment key={fragmentId}>
        <Wrapper key={id} className="nav-link">
          <button
            value={text}
            type="button"
            className="toggle-btn"
            onClick={(e) => toggleCourses(e.target.value)}
          >
            {showCourses.text ? <span>{icon}</span> : <span>{activeIcon}</span>}
            {text}
          </button>
          <FaCaretDown />
        </Wrapper>

        <div
          key={fragmentId}
          className={showCourses[text] ? 'dropdown show-dropdown' : 'dropdown'}
        >
          <CourseContainer course={text} />
        </div>
      </React.Fragment>
    )
  })
}

export default CourseContainerButton
```

CourseContainer

```js
import NavLinksNested from './NavLinksNested'
const CourseContainer = ({ course }) => {
  return <NavLinksNested course={course} />
}
```

### fix

#### nested links icon

links.jsx

```js
import { GiMaterialsScience, GiFamilyTree } from 'react-icons/gi'
import { GiHumanPyramid, GiMisdirection, GiEvilMinion } from 'react-icons/gi'

import { LuBoxes, LuBox, LuPersonStanding, LuReplaceAll } from 'react-icons/lu'
import { FaSitemap } from 'react-icons/fa'
import { ImShocked } from 'react-icons/im'
import { TfiHandStop } from 'react-icons/tfi'
import { TbMoneybag } from 'react-icons/tb'
import { SiCodeproject, SiTestinglibrary } from 'react-icons/si'
import { MdSwitchAccessShortcut } from 'react-icons/md'
```

#### nested map conditional access

--save my self from unnecessary refracture

whatBigSidebar.jsx

```js
import CurriculumContainerButton from './CurriculumContainerButton'

const { showSidebar, showCurriculum } = useDashboardContext()

 () =>{...
  <div className="col2">
            <CurriculumContainerButton />
          <CurriculumContainer />
            <div
              className={showCurriculum ? 'dropdown show-dropdown' : 'dropdown'}
            >
              <CurriculumContainer />
            </div>
          <HandPartContainer />
            <HandPartContainer />
          </div>
 }
```

wrappers\whatBigSidbarCss.js

```js
const Wrapper = styled.aside`
  .dropdown {
    width: 100%;
    text-align: center;
    visibility: hidden;
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    border-radius: var(--border-radius);
    padding: 0.5rem;
    border-color: transparent;
    color: var(--white);
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
`
```
