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

const SearchReferenceContainer = () => {
  const { searchValues } = useAllReferenceContext()
  const { search, status, type, sort } = searchValues

  const submit = useSubmit()
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          {/* search position */}

          <FormRow
            type="search"
            name={referenceKeys[4].field}
            defaultValue="a"
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <FormRowSelect
            labelText="position"
            name={referenceKeys[0].field}
            list={['all', ...Object.values(POSITION)]}
            defaultValue="all"
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <FormRowSelect
            labelText="bodycontact"
            name={referenceKeys[1].field}
            list={['all', ...Object.values(POSITION)]}
            defaultValue="all"
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <FormRowSelect
            labelText="touchtype type"
            name={referenceKeys[2].field}
            list={['all', ...Object.values(TOUCH_TYPE)]}
            defaultValue="all"
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <FormRowSelect
            labelText="faceexpresion type"
            name={referenceKeys[3].field}
            list={['all', ...Object.values(FACE_EXPRESSION)]}
            defaultValue="all"
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <FormRowSelect
            name="sort"
            defaultValue="newest"
            list={['a-z', 'z-a']}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />

          <Link to="/dashboard/reference" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
          {/* TEMP!!!! */}
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}
export default SearchReferenceContainer
