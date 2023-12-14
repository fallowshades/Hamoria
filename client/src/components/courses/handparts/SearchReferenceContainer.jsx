import { FormRow, FormRowSelect, SubmitBtn } from '../../../components'
import Wrapper from '../../../assets/wrappers/handparts/ReferenceContainer'
import { Form, useSubmit, Link } from 'react-router-dom'
import {
  POSITION,
  TOUCH_TYPE,
  FACE_EXPRESSION,
} from '../../../../../utils/constants'
import { referenceKeys } from '../../../../../utils/modelKeyConstants'
import { useAllReferenceContext } from '../../../pages/handparts/AllReference'
import { debounce } from '../../../utils/utillity'

const SearchReferenceContainer = () => {
  const { searchValues } = useAllReferenceContext()
  const { search, position, bodycontact, touchtype, faceexpression, sort } =
    searchValues

  const submit = useSubmit()
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          {/* search position */}

          <FormRow //link
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form)
            })}
          />
          <FormRowSelect
            labelText="position"
            name={referenceKeys[0].field}
            list={['all', ...Object.values(POSITION)]}
            defaultValue={position}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <FormRowSelect
            labelText="bodycontact"
            name={referenceKeys[1].field}
            list={['all', ...Object.values(POSITION)]}
            defaultValue={bodycontact}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <FormRowSelect
            labelText="touchtype type"
            name={referenceKeys[2].field}
            list={['all', ...Object.values(TOUCH_TYPE)]}
            defaultValue={touchtype}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <FormRowSelect
            labelText="faceexpresion type"
            name={referenceKeys[3].field}
            list={['all', ...Object.values(FACE_EXPRESSION)]}
            defaultValue={faceexpression}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={['a-z', 'z-a']}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />

          <Link to="/dashboard/reference" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  )
}
export default SearchReferenceContainer
