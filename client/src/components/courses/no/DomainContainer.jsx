import Domain from './Domain'
import Wrapper from '../../../assets/wrappers/courses/no/DomainContainer'

import { useAllDomainContext } from '../../../pages/courses/no/AllDomain'

const DomainContainer = () => {
  const { data } = useAllDomainContext()
  const { categorizedDomainData } = data
  console.log(categorizedDomainData)
  if (categorizedDomainData === 0) {
    return (
      <Wrapper>
        <h2>No Domain to display</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div className="template-grid">
        {categorizedDomainData.map((category) => (
          <div key={category._id}>
            <h2>{category._id}</h2> {/* Display category name or identifier */}
            {category.items.map((crud) => (
              <Domain key={crud._id} {...crud} />
            ))}
          </div>
        ))}
      </div>
    </Wrapper>
  )
}
export default DomainContainer
