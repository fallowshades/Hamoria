import Wrapper from '../../../../assets/wrappers/handparts/Prefix'
import { SectionTitle } from '../../../../components'
import SignInfo from './SignInfo'
import { FaLocationArrow } from 'react-icons/fa'

import { EditReference } from '../mappedItems'
import { Form } from 'react-router-dom'

const Reference = ({
  _id,
  position,
  bodycontact,
  touchtype,
  faceexpression,
  link,
}) => {
  return (
    <Wrapper>
      <SectionTitle text={link} AddclassName="text-black" link />

      <div className="content">
        <div className="content-center">
          <div>
            <SignInfo
              icon={<FaLocationArrow />}
              text={'position: ' + (position ?? '')}
            />
            <SignInfo
              icon={<FaLocationArrow />}
              text={'face expression: ' + (faceexpression ?? '')}
            />
          </div>

          <div>
            <SignInfo
              icon={<FaLocationArrow />}
              text={'touchtype: ' + (touchtype ?? '')}
            />
            <SignInfo
              icon={<FaLocationArrow />}
              text={'bodyContact: ' + (bodycontact ?? '')}
            />
          </div>
          <footer className="actions">
            <EditReference _id={_id} />
            <Form>
              <button type="submit" className="btn delete-btn">
                Delete
              </button>
            </Form>
          </footer>
        </div>
      </div>
    </Wrapper>
  )
}
export default Reference
