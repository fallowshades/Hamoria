import Item from './Item'
import Wrapper from '../../../assets/wrappers/courses/no/ItemContainer'

import { useAllItemContext } from '../../../pages/courses/no/AllItem'

const ItemContainer = () => {
  const { data } = useAllItemContext()

  const { categorizedItemData } = data

  if (categorizedItemData.length === 0) {
    return (
      <Wrapper>
        <h2>No Item to display ...</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <div className="template-grid">
        {categorizedItemData.map((category) => (
          <div key={category._id}>
            <h2>{category._id}</h2> {/* Display category name or identifier */}
            {category.items.map((crud) => (
              <Item key={crud._id} {...crud} />
            ))}
          </div>
        ))}
      </div>
    </Wrapper>
  )
}
export default ItemContainer
