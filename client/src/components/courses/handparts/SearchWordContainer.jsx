import { FormRow, FormRowSelect, SubmitBtn } from '../../../components'
import Wrapper from '../../../assets/wrappers/DashboardFormPage'
import { Form, useSubmit, Link } from 'react-router-dom'

import { useAllWordContext } from '../../../pages/handparts/AllWord'

const SearchWordContainer = () => {
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          {/* search position */}

          <FormRow type="search" name="search" defaultValue="a" />
          <FormRow name="subgroup" labelText="subgroup" />
          <FormRow name="subsection" labelText="subsection" />
          <FormRowSelect name="sort" defaultValue="a-z" list={['a-z', 'z-a']} />

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
