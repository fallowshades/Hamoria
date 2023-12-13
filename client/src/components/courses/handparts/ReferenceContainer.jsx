import AddReference from './AddReference'

import { useAllReferenceContext } from '../../../pages/handparts/AllReference'
import { Reference } from './mappedItems'
import Wrapper from '../../../assets/wrappers/handparts/ReferenceContainer'

const ReferenceContainer = () => {
  const { data } = useAllReferenceContext()

  const { references } = data

  if (references == 0) {
    return (
      <Wrapper>
        <h2>No references found</h2>
      </Wrapper>
    )
  }
  return (
    <>
      <AddReference />

      <div className="references">
        {references.map((reference) => {
          return <Reference key={reference._id} {...reference} />
        })}
      </div>
    </>
  )
}
export default ReferenceContainer
