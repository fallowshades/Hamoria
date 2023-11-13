import Wrapper from '../assets/wrappers/FeatureHome'
import { Hero } from '../components'

import { convenientFetch } from '../utils/corsFetch'
const url = 'products?featured=true'

export const loader = async () => {
  const response = await convenientFetch(url)
  const convenient = response.data.data
  return { convenient }

  return null
}
const FeatureHome = () => {
  return (
    <Wrapper>
      <Hero />
      <div>FeatureHome</div>
    </Wrapper>
  )
}
export default FeatureHome
