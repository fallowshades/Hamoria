import Achievement from './Achievement'
import Wrapper from '../assets/wrappers/AchievementsContainer'

import { useAllAchievementsContext } from '../pages/AllAchievements'

const AchievementsContainer = () => {
  const { data } = useAllAchievementsContext()
  const { achievements } = data
  if (achievements.length === 0) {
    return (
      <Wrapper>
        <h2>No Achievements to display...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div className="achievements">
        {achievements.map((achievement) => {
          return <Achievement key={achievement._id} {...Achievement} />
        })}
      </div>
    </Wrapper>
  )
}
export default AchievementsContainer
