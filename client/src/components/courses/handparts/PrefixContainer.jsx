import FooterAddPrefix from './FooterAddPrefix'
import Prefix from './mappedItems/Prefix'
import { useAllPrefixContext } from '../../../pages/handparts/AllPrefix'
import Wrapper from '../../../assets/wrappers/handparts/PrefixContainer'
const PrefixContainer = () => {
  const { data } = useAllPrefixContext()
  if (!data) {
    return <h2>No prefixes found</h2>
  }

  const { prefixes } = data.data

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
        <div>to be toggle</div>
        <FooterAddPrefix />

        <div className="prefixes">
          {prefixes.map((prefix) => {
            return <Prefix key={prefix._id} {...prefixes}></Prefix>
          })}
        </div>
      </Wrapper>
    </>
  )
}
export default PrefixContainer
