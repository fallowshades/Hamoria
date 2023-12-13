import { FormRow, FormRowSelect, SubmitBtn } from '../../../components'
import Wrapper from '../../../assets/wrappers/DashboardFormPage'
import { Form, useSubmit, Link } from 'react-router-dom'

import { useAllWordContext } from '../../../pages/handparts/AllWord'

const SearchWordContainer = () => {
  const { searchValues } = useAllWordContext()
  const { search, subgroup, subsection, sort } = searchValues

  const submit = useSubmit()
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          {/* search position */}

          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <FormRow
            name="subgroup"
            labelText="subgroup"
            defaultValue={subgroup}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <FormRow
            name="subsection"
            labelText="subsection"
            defaultValue={subsection}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={['a-z', 'z-a']}
          />

          <Link to="/dashboard/word" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  )
}
export default SearchWordContainer
