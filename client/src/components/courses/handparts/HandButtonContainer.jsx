import Wrapper from '../../../assets/wrappers/handparts/HandButtonContainer'
import { FaHandPointLeft, FaHandPointRight } from 'react-icons/fa6'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  useAllReferenceContext,
  useAllWordContext,
  useAllOrientationContext,
  useAllPrefixContext,
} from '../../../pages/handparts'

const HandButtonContainer = ({ dataContext }) => {
  let numOfPages, currentPage
  switch (dataContext) {
    case 'allWords':
      ;({ numOfPages, currentPage } = useAllWordContext().data)
      break

    case 'allOrientation':
      ;({ numOfPages, currentPage } = useAllOrientationContext().data)
      break
    case 'allPrefix':
      ;({ numOfPages, currentPage } = useAllPrefixContext().data)

      break
    default:
      ;({ numOfPages, currentPage } = useAllReferenceContext()?.data || {})

      break
  }

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

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        className={`btn page-btn ${activeClass && 'active'}`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    )
  }

  const renderPageButtons = () => {
    const pageButtons = []

    // Add the first page button
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    )
    // Add the dots before the current page if there are more than 3 pages
    if (currentPage > 3) {
      pageButtons.push(
        <span className="page-btn dots" key="dots-1">
          ....
        </span>
      )
    }
    // one before current page
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage - 1, activeClass: false })
      )
    }

    // Add the current page button
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage, activeClass: true })
      )
    }

    // one after current page
    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageButtons.push(
        addPageButton({ pageNumber: currentPage + 1, activeClass: false })
      )
    }
    if (currentPage < numOfPages - 2) {
      pageButtons.push(
        <span className=" page-btn dots" key="dots+1">
          ....
        </span>
      )
    }

    // Add the last page button
    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    )

    return pageButtons
  }

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1
          if (prevPage < numOfPages) prevPage = numOfPages
          handlePageChange(prevPage)
        }}
      >
        <FaHandPointLeft />
        prev
      </button>
      <div className="btn-container">
        {numOfPages > 30 && renderPageButtons()}
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
