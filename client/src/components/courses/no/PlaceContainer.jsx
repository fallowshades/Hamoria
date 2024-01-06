import Place from './Place'
import Wrapper from '../../../assets/wrappers/courses/no/PlaceContainer'

import { useAllPlaceContext } from '../../../pages/courses/no/AllPlace'

const PlaceContainer = () => {
  const { data } = useAllPlaceContext()

  const { categorizedPlaceData } = data

  if (categorizedPlaceData.length === 0) {
    return (
      <Wrapper>
        <h2>No Item to display ...</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <div className="template-grid">
        {categorizedPlaceData.map((category) => (
          <div key={category._id}>
            <h2>{category._id}</h2> {/* Display category name or identifier */}
            {category.items.map((item) => (
              <Place key={item._id} {...item} />
            ))}
          </div>
        ))}
      </div>
    </Wrapper>
  )
}
export default PlaceContainer
