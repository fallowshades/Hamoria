import Wrapper from '../../../../assets/wrappers/handparts/Prefix'
import { SectionTitle } from '../../../../components'
import SignInfo from './SignInfo'
import { svgCrossProductr } from '../../../common'
import { EditOrientation } from '../mappedItems'
import { Form } from 'react-router-dom'
import { useState } from 'react'
const Orientation = ({
  _id,
  orderid,
  fingerdirection,
  fingerdirection2,
  palmdirection,
  palmdirection2,
}) => {
  const [isEdit, setIsEdit] = useState(false)
  return (
    <Wrapper>
      <SectionTitle text={orderid + ' orientation'} AddclassName="text-black" />
      <div className="content">
        <div className="content-center">
          {isEdit ? (
            <EditOrientation _id={_id} />
          ) : (
            <>
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
          {isEdit ? 'orientation' : ' Edit'}
        </button>
        <Form method="post" action={`../delete-orientation/${_id}`}>
          <button type="submit" className="btn delete-btn">
            Delete
          </button>
        </Form>
      </footer>
    </Wrapper>
  )
}
export default Orientation
