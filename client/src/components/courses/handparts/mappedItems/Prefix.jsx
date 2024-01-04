import Wrapper from '../../../../assets/wrappers/handparts/Prefix'
import { SectionTitle } from '../../../../components'
import SignInfo from './SignInfo'
import { svgTeenBoyBody } from '../../../common'
import { EditPrefix } from '../mappedItems'
import { Form } from 'react-router-dom'
import { useState } from 'react'

const Prefix = ({ _id, Connectionid, position, hand }) => {
  const [isEdit, setIsEdit] = useState(false)
  return (
    <Wrapper>
      <SectionTitle text={Connectionid} AddclassName="text-black" />

      <div className="content">
        <div className="content-center">
          {isEdit ? (
            <EditPrefix _id={_id} />
          ) : (
            <>
              {' '}
              <SignInfo icon={svgTeenBoyBody} text={position} />
              <SignInfo icon={svgTeenBoyBody} text={hand} />
            </>
          )}
        </div>
      </div>
      <footer className="actions">
        <button
          className="btn edit-btn"
          onClick={() => {
            setIsEdit(!isEdit)
          }}
        >
          {' '}
          {isEdit ? 'prefix' : ' Edit'}
        </button>
        <Form method="post" action={`../delete-prefix/${_id}`}>
          <button type="submit" className="btn delete-btn">
            Delete
          </button>
        </Form>
      </footer>
    </Wrapper>
  )
}
export default Prefix
