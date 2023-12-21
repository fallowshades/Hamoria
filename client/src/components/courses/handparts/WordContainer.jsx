import AddWord from './AddWord'

import { useAllWordContext } from '../../../pages/handparts/AllWord'
import { Word } from './mappedItems'
import Wrapper from '../../../assets/wrappers/handparts/WordContainer'
import HandButtonContainer from './HandButtonContainer'

const WordContainer = () => {
  const { data } = useAllWordContext()
  const { words, totalWords, numOfPages } = data

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
        <h5>
          {totalWords} reference{words.length > 1 && 's'} found
        </h5>
        {words.map((word) => {
          return <Word key={word._id} {...word} />
        })}
      </div>
      {numOfPages > 1 && <HandButtonContainer dataContext="allWords" />}
    </Wrapper>
  )
}
export default WordContainer
