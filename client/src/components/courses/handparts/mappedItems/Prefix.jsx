import Wrapper from '../../../../assets/wrappers/handparts/Prefix'
import { SectionTitle } from '../../../../components'
import SignInfo from './SignInfo'
import { svgTeenBoyBody, svgAdultManBody } from '../../../common'
import { EditPrefix } from '../mappedItems'
import { Form } from 'react-router-dom'

const Prefix = ({ Connectionid, position, hand }) => {
  return (
    <Wrapper>
      <SectionTitle text={Connectionid} AddclassName="text-black" />
      <div className="content">
        <div className="content-center">
          <SignInfo icon={svgAdultManBody} text={position} />
          <SignInfo icon={svgTeenBoyBody} text={hand} />
        </div>
      </div>
      <footer className="actions">
        <EditPrefix />
        <Form>
          <button type="submit" className="btn delete-btn">
            Delete
          </button>
        </Form>
      </footer>
    </Wrapper>
  )
}
export default Prefix
