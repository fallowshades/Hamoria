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
        <Achievement
          _id="123"
          description="Example Achievement"
          status="completed"
          points={100}
          type="progressive"
          dateOfCompletion="2023-10-07"
          createdBy="User123"
          createdAt="2023-10-06T14:30:00Z"
        />

        {achievements.map((achievement) => {
          console.log(achievement)
          return <Achievement key={achievement._id} {...achievement} />
        })}
      </div>
    </Wrapper>
  )
}
export default AchievementsContainer
