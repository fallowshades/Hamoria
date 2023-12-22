import Wrapper from '../../../assets/wrappers/DashboardFormPage'
import { useAllOrientationContext } from '../../../pages/handparts/AllOrientation'
import { Form, useSubmit, Link } from 'react-router-dom'
import { KeysToMapFormRows } from './mappedItems'
import { FormRowSelect } from '../../../components'
const SearchOrientationContainer = () => {
  const { searchValues } = useAllOrientationContext()
  const { search, status, type, sort } = searchValues

  const submit = useSubmit()
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <KeysToMapFormRows isOrientation event={submit} />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={['a-z', 'z-a']}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <Link
            to="/dashboard/all-achievements"
            className="btn form-btn delete-btn"
          >
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  )
}
export default SearchOrientationContainer
