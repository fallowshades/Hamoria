import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useAllAchievementsContext } from '../pages/AllAchievements'
//import { isButtonElement } from 'react-router-dom/dist/dom'

const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllAchievementsContext()

  const pages = Array.from({ length: numOfPages }, (_, index) => index + 1)

  return (
    <Wrapper>
      <div className="btn-container">
        {pages.map((pageNumber) => (
          <button
            className={`btn page-btn ${pageNumber === currentPage && 'active'}`}
            key={pageNumber}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </Wrapper>
  )
}
export default PageBtnContainer
