import Wrapper from '../../../../assets/wrappers/handparts/Prefix'
import { SectionTitle } from '../../../../components'
import SignInfo from './SignInfo'
import { FaLocationArrow } from 'react-icons/fa'

import { EditReference } from '../mappedItems'
import { Form } from 'react-router-dom'

import { useState } from 'react'

const Reference = ({
  _id,
  position,
  bodycontact,
  touchtype,
  faceexpression,
  link,
}) => {
  const [isEdit, setIsEdit] = useState(false)
  return (
    <Wrapper>
      <SectionTitle text={link} AddclassName="text-black" link />

      <div className="content">
        <div className="content-center">
          {isEdit ? (
            <EditReference _id={_id} />
          ) : (
            <>
              {' '}
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
            </>
          )}
        </div>
        <footer className="actions">
          <button
            className="btn edit-btn"
            onClick={() => {
              setIsEdit(!isEdit)
            }}
          >
            {isEdit ? 'reference' : ' Edit'}
          </button>

          <Form method="post" action={`../delete-reference/${_id}`}>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  )
}
export default Reference
