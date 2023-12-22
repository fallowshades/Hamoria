import { useAllOrientationContext } from '../../../pages/handparts/AllOrientation'
import AddOrientation from './AddOrientation'
import { Orientation } from './mappedItems'
import Wrapper from '../../../assets/wrappers/handparts/OrientationContainer'
const HandOrientationContainer = () => {
  const { data } = useAllOrientationContext()

  const { orientations } = data

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
      <div className="orientations">
        {orientations.map((orientation) => {
          return <Orientation key={orientation._id} {...orientation} />
        })}
      </div>
    </>
  )
}
export default HandOrientationContainer
