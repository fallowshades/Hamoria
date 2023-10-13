import { FormRow, FormRowSelect, SubmitBtn } from '.'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { Form, useSubmit, Link } from 'react-router-dom'
import {
  ACHIEVEMENT_TYPE,
  ACHIEVEMENT_STATUS,
  ACHIEVEMENT_SORT_BY,
} from '../../../utils/constants'
import { useAllAchievementsContext } from '../pages/AllAchievements'

const SearchContainer = () => {
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          {/* search position */}

          <FormRow type="search" name="search" defaultValue="a" />
          <FormRowSelect
            labelText="achievement status"
            name="achievementStatus"
            list={['all', ...Object.values(ACHIEVEMENT_STATUS)]}
            defaultValue="all"
          />
          <FormRowSelect
            labelText="achievements type"
            name="achievementType"
            list={['all', ...Object.values(ACHIEVEMENT_TYPE)]}
            defaultValue="all"
          />
          <FormRowSelect
            name="sort"
            defaultValue="newest"
            list={[...Object.values(ACHIEVEMENT_SORT_BY)]}
          />

          <Link
            to="/dashboard/all-achievements"
            className="btn form-btn delete-btn"
          >
            Reset Search Values
          </Link>
          {/* TEMP!!!! */}
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}

export default SearchContainer
