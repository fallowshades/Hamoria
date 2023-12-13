import AddWord from './AddWord'

import { useAllWordContext } from '../../../pages/handparts/AllWord'
import { Word } from './mappedItems'
import Wrapper from '../../../assets/wrappers/handparts/WordContainer'

const WordContainer = () => {
  const { data } = useAllWordContext()
  const { words } = data

  if (words.length == 0) {
    return (
      <Wrapper>
        <h2>No words found</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <div className="words">
        <AddWord />
        {words.map((word) => {
          return <Word key={word._id} {...word} />
        })}
      </div>
    </Wrapper>
  )
}
export default WordContainer
