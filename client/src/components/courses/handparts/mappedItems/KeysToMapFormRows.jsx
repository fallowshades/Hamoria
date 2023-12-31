import {
  prefixKeys,
  orientationKeys,
  referenceKeys,
} from '../../../../../../utils/modelKeyConstants'
import { FormRow, FormRowSelect } from '../../..'

const KeysToMapFormRows = ({ isOrientation, mapKey, event, defaultList }) => {
  {
    let mappedKeys = isOrientation ? orientationKeys : prefixKeys

    if (mapKey) {
      mappedKeys = referenceKeys
    }
    return (
      <>
        {mappedKeys.map((constant, index) => {
          if (!constant.hasOwnProperty('default')) {
            if (
              constant.field == 'orderid' ||
              constant.field == 'Connectionid'
            ) {
              return null
            }
            return (
              <FormRow
                key={constant.identifier}
                type="text"
                name={constant.field}
              />
            )
          } else {
            return defaultList ? (
              <FormRowSelect
                key={constant.identifier}
                type="text"
                name={constant.field}
                defaultValue={defaultList[index] || constant?.default}
                list={Object.values(constant?.list)}
                onChange={(e) => {
                  if (event) {
                    event(e.currentTarget.form)
                  }
                }}
              />
            ) : (
              <FormRowSelect
                key={constant.identifier}
                type="text"
                name={constant.field}
                defaultValue={constant?.default}
                list={Object.values(constant?.list)}
                onChange={(e) => {
                  if (event) {
                    event(e.currentTarget.form)
                  }
                }}
              />
            )
          }
        })}
      </>
    )
  }
}
export default KeysToMapFormRows
