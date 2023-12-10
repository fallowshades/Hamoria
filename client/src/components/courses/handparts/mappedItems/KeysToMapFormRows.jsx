import { prefixKeys } from '../../../../../../utils/modelKeyConstants'
import { FormRow, FormRowSelect } from '../../..'

const KeysToMapFormRows = () => {
  {
    console.log(prefixKeys)
    return (
      <>
        {prefixKeys.map((constant) => {
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
      </>
    )
  }
}
export default KeysToMapFormRows
