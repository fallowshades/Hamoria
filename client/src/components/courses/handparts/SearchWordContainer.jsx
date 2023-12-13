import { FormRow, FormRowSelect, SubmitBtn } from '../../../components'
import Wrapper from '../../../assets/wrappers/DashboardFormPage'
import { Form, useSubmit, Link } from 'react-router-dom'

import { useAllWordContext } from '../../../pages/handparts/AllWord'
import { debounce } from '../../../utils/utils'
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
            onChange={debounce((form) => {
              submit(form)
            })}
          />
          <FormRow
            name="subgroup"
            labelText="subgroup"
            defaultValue={subgroup == '' ? 'horizontallevel' : subgroup}
            onChange={debounce((form) => {
              submit(form)
            })}
          />
          <FormRow
            name="subsection"
            labelText="subsection"
            defaultValue={subsection}
            onChange={debounce((form) => {
              submit(form)
            })}
          />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={['a-z', 'z-a']}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
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
