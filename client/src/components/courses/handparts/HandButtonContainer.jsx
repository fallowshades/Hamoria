import Wrapper from '../../../assets/wrappers/handparts/HandButtonContainer'
import { FaHandPointLeft, FaHandPointRight } from 'react-icons/fa6'
import { useAllReferenceContext } from '../../../pages/handparts/AllReference'
import { useLocation, useNavigate } from 'react-router-dom'
const HandButtonContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllReferenceContext()

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1
  })

  const { search, pathname } = useLocation()
  const navigate = useNavigate()
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search)
    searchParams.set('page', pageNumber)
    navigate(`${pathname}?${searchParams.toString()}`)
  }

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage + 1
          if (prevPage < numOfPages) prevPage = numOfPages
          handlePageChange(prevPage)
        }}
      >
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
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          )
        })}
      </div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1
          if (nextPage > numOfPages) nextPage = 1
          handlePageChange(nextPage)
        }}
      >
        next
        <FaHandPointRight />
      </button>
    </Wrapper>
  )
}
export default HandButtonContainer
