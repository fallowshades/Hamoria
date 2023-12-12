import {
  prefixKeys,
  orientationKeys,
  referenceKeys,
} from '../../../../../../utils/modelKeyConstants'
import { FormRow, FormRowSelect } from '../../..'

const KeysToMapFormRows = ({ isOrientation, mapKey }) => {
  {
    let mappedKeys = isOrientation ? orientationKeys : prefixKeys

    if (mapKey) {
      mappedKeys = referenceKeys
    }
    return (
      <>
        {mappedKeys.map((constant) => {
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
