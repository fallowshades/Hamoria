import { useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { FaHandScissors } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/SidebarContainer'

import NavLinksNested from './NavLinksNested'
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
