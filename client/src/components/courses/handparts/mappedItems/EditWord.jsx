import Wrapper from '../../../../assets/wrappers/DashboardFormPage'
import { Form } from 'react-router-dom'
import { FormRow, FormRowSelect } from '../../../../components'
import {
  WORD_SUBGROUP,
  WORD_SUBSECTION,
} from '../../../../../../utils/constants'

import { useNavigation } from 'react-router-dom'
const EditWord = ({ _id }) => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const identifyAction = `patch ${_id}`
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit prefix</h4>
        <div className="form-center">
          <input name="form-id" hidden defaultValue={identifyAction} />

          <FormRow type="text" name="word"></FormRow>
          <FormRowSelect
            type="text"
            name="subgroup"
            defaultValue={WORD_SUBGROUP.ACCUMULATION}
            list={['all', ...Object.values(WORD_SUBGROUP)]}
          />
          <FormRowSelect
            type="text"
            name="subsection"
            defaultValue={WORD_SUBSECTION.INTRO_1}
            list={['all', ...Object.values(WORD_SUBSECTION)]}
          />
          <FormRow type="text" name="prefixid"></FormRow>
          <button
            type="submit"
            className="btn btn-block form-btn "
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  )
}
export default EditWord
