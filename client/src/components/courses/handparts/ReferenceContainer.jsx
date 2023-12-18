import AddReference from './AddReference'

import { useAllReferenceContext } from '../../../pages/handparts/AllReference'
import { Reference } from './mappedItems'
import Wrapper from '../../../assets/wrappers/handparts/ReferenceContainer'
import HandButtonContainer from './HandButtonContainer'
const ReferenceContainer = () => {
  const { data } = useAllReferenceContext()
  console.log(data)
  const { references, totalReferences, numOfPages } = data

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
      <h5>
        {totalReferences} reference{references.length > 1 && 's'} found
      </h5>
      <div className="references">
        {references.map((reference) => {
          return <Reference key={reference._id} {...reference} />
        })}
      </div>

      {numOfPages > 1 && <HandButtonContainer />}
    </>
  )
}
export default ReferenceContainer
