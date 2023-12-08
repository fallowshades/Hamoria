import { useState } from 'react'
import { FaCaretDown } from 'react-icons/fa'
import { FaHandScissors } from 'react-icons/fa'
import Wrapper from '../../assets/wrappers/SidebarContainer'
import { useDashboardContext } from '../../pages/DashboardLayout'
const HandPartContainer = () => {
  const { showParts, setShowPart } = useDashboardContext()

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

      <FaCaretDown />
    </Wrapper>
  )
}
export default HandPartContainer
