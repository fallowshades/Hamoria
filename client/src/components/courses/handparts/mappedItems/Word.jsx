import Wrapper from '../../../../assets/wrappers/handparts/Word'
import SignInfo from './SignInfo'
import { FaLocationArrow, FaCalendarAlt } from 'react-icons/fa'
import { EditWord } from '../mappedItems'
import { Form } from 'react-router-dom'
import { useState } from 'react'
const Word = ({ word, subgroup, subsection, prefixid }) => {
  const [isEdit, setIsEdit] = useState(false)

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{word.charAt(0)}</div>
        <div className="info">
          <h5>{word}</h5>
          <p>{prefixid}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          {isEdit ? (
            <div>
              <EditWord />
            </div>
          ) : (
            <div>
              {' '}
              <SignInfo icon={<FaLocationArrow />} text={subgroup} />
              <SignInfo icon={<FaCalendarAlt />} text={subsection} />
            </div>
          )}
        </div>

        <footer className="actions">
          <button
            className="btn edit-btn"
            onClick={() => {
              setIsEdit(!isEdit)
            }}
          >
            {isEdit ? 'word' : ' Edit'}
          </button>
          <Form>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  )
}
export default Word
