import { useLoaderData } from 'react-router-dom'
import {
  PrefixContainer,
  FilterPrefix,
} from '../../components/courses/handparts'

const AllPrefixContext = createContext()

const AllPrefix = () => {
  const { data } = useLoaderData()
  return (
    <AllPrefixContext.Provider value={{ data }}>
      <PrefixContainer />
      <FilterPrefix />
    </AllPrefixContext.Provider>
  )
}
export const useAllPrefixContext = () => useContext(AllPrefixContext)
export default AllPrefix
