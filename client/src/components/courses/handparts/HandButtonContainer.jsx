import Wrapper from '../../../assets/wrappers/handparts/HandButtonContainer'
import { FaHandPointLeft, FaHandPointRight } from 'react-icons/fa6'
import { useAllReferenceContext } from '../../../pages/handparts/AllReference'

const HandButtonContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllReferenceContext()

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1
  })
  console.log(pages)
  return (
    <Wrapper>
      <button className="btn prev-btn">
        <FaHandPointLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              className={`btn page-btn ${
                pageNumber === currentPage && 'active'
              }`}
            >
              {pageNumber}
            </button>
          )
        })}
      </div>
      <button className="btn next-btn">
        next
        <FaHandPointRight />
      </button>
    </Wrapper>
  )
}
export default HandButtonContainer
