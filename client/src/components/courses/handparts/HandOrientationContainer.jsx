import { useAllOrientationContext } from '../../../pages/handparts/AllOrientation'
import AddOrientation from './AddOrientation'
import { Orientation } from './mappedItems'
import Wrapper from '../../../assets/wrappers/handparts/OrientationContainer'
import HandButtonContainer from './HandButtonContainer'
const HandOrientationContainer = () => {
  const { data } = useAllOrientationContext()

  const { orientations, totalOrientations, numOfPages } = data

  if (orientations.length == 0) {
    return (
      <Wrapper>
        <h2>No orientations found</h2>
      </Wrapper>
    )
  }

  return (
    <>
      <AddOrientation />
      <h5>
        {totalOrientations} word{orientations.length > 1 && 's'} found
      </h5>
      <div className="orientations">
        {orientations.map((orientation) => {
          return <Orientation key={orientation._id} {...orientation} />
        })}
      </div>
      {numOfPages > 1 && <HandButtonContainer dataContext="allOrientations" />}
    </>
  )
}
export default HandOrientationContainer
