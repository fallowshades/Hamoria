import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useAllAchievementsContext } from '../pages/AllAchievements'

const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllAchievementsContext()

  return <div>PageBtnContainer</div>
}
export default PageBtnContainer
