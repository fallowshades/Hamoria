import styled from 'styled-components'
const Logo = () => {
  return (
    <Wrapper>
      <h3 className="logo">
        <span className="color">H</span>amoria
      </h3>
    </Wrapper>
  )
}
export default Logo

const Wrapper = styled.div`
  span {
    color: var(--primary-500);
  }
`
