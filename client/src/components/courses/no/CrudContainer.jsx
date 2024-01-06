import Crud from './Crud'
import Wrapper from '../../../assets/wrappers/courses/no/CrudContainer'

import { useAllAchievementsContext } from '../../../pages/AllAchievements'
import { useAllCrudContext } from '../../../pages/courses/no/AllCrud'

const CrudContainer = () => {
  const { data } = useAllCrudContext()
  const { sortedCategorizedCrudData } = data

  if (sortedCategorizedCrudData === 0) {
    return (
      <Wrapper>
        <h2>No Crud to display...</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <div className="grid-template">
        {sortedCategorizedCrudData.map((category) => (
          <div key={category._id}>
            <h2>{category._id}</h2> {/* Display category name or identifier */}
            {category.items.map((crud) => (
              <Crud key={crud._id} {...crud} />
            ))}
          </div>
        ))}
      </div>
    </Wrapper>
  )
}
export default CrudContainer
