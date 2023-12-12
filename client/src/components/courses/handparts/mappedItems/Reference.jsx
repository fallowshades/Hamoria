import Wrapper from '../../../../assets/wrappers/handparts/Prefix'
import { SectionTitle } from '../../../../components'
import SignInfo from './SignInfo'
import { FaLocationArrow } from 'react-icons/fa'
const Reference = ({
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
        </div>
      </div>
    </Wrapper>
  )
}
export default Reference
