import FooterAddPrefix from './AddPrefix'
import Prefix from './mappedItems/Prefix'
import { useAllPrefixContext } from '../../../pages/handparts/AllPrefix'
import Wrapper from '../../../assets/wrappers/handparts/PrefixContainer'
import HandButtonContainer from './HandButtonContainer'

const PrefixContainer = () => {
  const { data } = useAllPrefixContext()

  if (!data) {
    return <h2>No prefixes found</h2>
  }

  const { prefixes, totalPrefixes, numOfPages } = data

  if (prefixes.length == 0) {
    return (
      <Wrapper>
        <h2>No Prefixes to display...</h2>
      </Wrapper>
    )
  }

  return (
    <>
      <Wrapper>
        <h5>
          {totalPrefixes} prefix{prefixes.length > 1 && 's'} found
        </h5>
        <div>to be toggle</div>
        <FooterAddPrefix />

        <div className="prefixes">
          {prefixes.map((prefix) => {
            //console.log(prefix)
            return <Prefix key={prefix._id} {...prefix}></Prefix>
          })}
        </div>
        {numOfPages > 1 && <HandButtonContainer dataContext="allPrefix" />}
      </Wrapper>
    </>
  )
}
export default PrefixContainer
