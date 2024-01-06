import Tuple from './Tuple'
import Wrapper from '../../../assets/wrappers/courses/no/TupleContainer'

import { useAllTupleContext } from '../../../pages/courses/no/AllTuple'

const TupleContainer = () => {
  const { data } = useAllTupleContext()
  const { categorizedTupleData } = data

  if (categorizedTupleData === 0) {
    return (
      <Wrapper>
        <h2>No Tuples to display...</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <div className="template-grid">
        {categorizedTupleData.map((category) => (
          <div key={category._id}>
            <h2>{category._id}</h2> {/* Display category name or identifier */}
            {category.items.map((item) => (
              <Tuple key={item._id} {...item} />
            ))}
          </div>
        ))}
      </div>
    </Wrapper>
  )
}
export default TupleContainer
