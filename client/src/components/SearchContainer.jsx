import { FormRow, FormRowSelect, SubmitBtn } from '.'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { Form, useSubmit, Link } from 'react-router-dom'
import {
  ACHIEVEMENT_TYPE,
  ACHIEVEMENT_STATUS,
  ACHIEVEMENT_SORT_BY,
} from '../../../utils/constants'
import { useAllAchievementsContext } from '../pages/AllAchievements'

const debounce = (onChange) => {
  let timeout
  return (e) => {
    const form = e.currentTarget.form
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      onChange(form), 2000
    })
  }
}

const SearchContainer = () => {
  const { searchValues } = useAllAchievementsContext()
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
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form)
            })}
          />
          <FormRowSelect
            labelText="achievement status"
            name="status"
            list={['all', ...Object.values(ACHIEVEMENT_STATUS)]}
            defaultValue={status}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <FormRowSelect
            labelText="achievements type"
            name="type"
            list={['all', ...Object.values(ACHIEVEMENT_TYPE)]}
            defaultValue={type}
          />
          <FormRowSelect
            name="sort"
            defaultValue={sort}
            list={[...Object.values(ACHIEVEMENT_SORT_BY)]}
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
          {/* TEMP!!!! */}
        </div>
      </Form>
    </Wrapper>
  )
}

export default SearchContainer
