const Place = ({ word, subgroup }) => {
  return (
    <div>
      {' '}
      <p style={{ whiteSpace: 'pre' }}>
        {`word: ${word} \t subgroup: ${subgroup} `}
      </p>
    </div>
  )
}
export default Place
