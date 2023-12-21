import { FormRow, FormRowSelect, SubmitBtn } from '../../../components'
import Wrapper from '../../../assets/wrappers/DashboardFormPage'
import { Form, useSubmit, Link } from 'react-router-dom'
import { wordKeys } from '../../../../../utils/modelKeyConstants'
import { WORD_SUBGROUP, WORD_SUBSECTION } from '../../../../../utils/constants'
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
          {/* search word */}

          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <FormRowSelect
            labelText="subgroup"
            name={wordKeys[1]}
            defaultValue={subgroup}
            list={['all', ...Object.values(WORD_SUBGROUP)]}
            onChange={(e) => {
              submit(e.currentTarget.form)
            }}
          />
          <FormRowSelect
            labelText="subsection"
            name={wordKeys[2]}
            defaultValue={subsection}
            list={['all', ...Object.values(WORD_SUBSECTION)]}
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

          <Link to="/dashboard/word" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
          {/* TEMP!!!! */}
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}
export default SearchWordContainer
