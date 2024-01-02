import Wrapper from '../../../assets/wrappers/DashboardFormPage'
import { useAllPrefixContext } from '../../../pages/handparts/AllPrefix'
import { Form, useSubmit, Link } from 'react-router-dom'
import { KeysToMapFormRows } from './mappedItems'
import { FormRowSelect } from '../../../components'

const SearchPrefixContainer = () => {
  const { searchValues } = useAllPrefixContext()
  const { position, hand, sort } = searchValues
  const defaults = [null, position, hand, sort]
  const submit = useSubmit()

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <KeysToMapFormRows event={submit} defaultList={defaults} />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={['a-z', 'z-a']}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <Link to="/dashboard/prefix" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  )
}
export default SearchPrefixContainer
