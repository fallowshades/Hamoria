//Dynamically render keys frontend and backend
import Wrapper from '../../../assets/wrappers/DashboardFormPage'
import { Form } from 'react-router-dom'
import { FormRow, SectionTitle, FormRowSelect } from '../../../components'
import { prefixKeys } from '../../../../../utils/modelKeyConstants'
//network submission

import customFetch from '../../../utils/customFetch'
import { useNavigation } from 'react-router-dom'
import { toast } from 'react-toastify'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  console.log(data)
  toast.success('prefix added successfully')
  try {
    await customFetch.post('/prefixes', data)
    return null
  } catch (error) {
    toast.error(error?.response?.data?.mst)
    return error
  }
}

const FooterAddPrefix = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
      <Form method="post" className="form">
        <SectionTitle text="add prefix" />
        {prefixKeys.map((constant) => {
          //console.log(constant.hasOwnProperty('default'))
          const renderDefault = constant
          console.log()
          if (!constant.hasOwnProperty('default')) {
            return (
              <FormRow
                key={constant.identifier}
                type="text"
                name={constant.field}
              />
            )
          } else {
            return (
              <FormRowSelect
                key={constant.identifier}
                type="text"
                name={constant.field}
                defaultValue={constant?.default}
                list={Object.values(constant?.list)}
              />
            )
          }
        })}
        <button
          type="submit"
          className="btn btn-block form-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
      </Form>
    </Wrapper>
  )
}
export default FooterAddPrefix
