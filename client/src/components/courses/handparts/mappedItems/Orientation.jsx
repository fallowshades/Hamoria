import Wrapper from '../../../../assets/wrappers/handparts/Prefix'
import { SectionTitle } from '../../../../components'
import SignInfo from './SignInfo'
import { svgCrossProductr } from '../../../common'
import { EditOrientation } from '../mappedItems'
import { Form } from 'react-router-dom'

const Orientation = ({
  orderid,
  fingerdirection,
  fingerdirection2,
  palmdirection,
  palmdirection2,
}) => {
  return (
    <Wrapper>
      <SectionTitle text={orderid + ' orientation'} AddclassName="text-black" />
      <div className="content">
        <div className="content-center">
          <div>
            <h4>hand one</h4>
            <SignInfo icon={svgCrossProductr} text={fingerdirection} />
            <SignInfo icon={svgCrossProductr} text={palmdirection} />
          </div>
          {fingerdirection2 && (
            <div>
              <h4>hand two</h4>
              <SignInfo icon={svgCrossProductr} text={palmdirection2} />
              <SignInfo icon={svgCrossProductr} text={fingerdirection2} />
            </div>
          )}
        </div>
        <footer className="actions">
          <EditOrientation />
          <Form>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  )
}
export default Orientation
