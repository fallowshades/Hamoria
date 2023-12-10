import Wrapper from '../../../../assets/wrappers/handparts/Prefix'
import { SectionTitle } from '../../../../components'
import SignInfo from './SignInfo'
import { svgTeenBoyBody, svgAdultManBody } from '../../../common'

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
    </Wrapper>
  )
}
export default Prefix
