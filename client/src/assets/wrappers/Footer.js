import styled from 'styled-components'

const Wrapper = styled.footer`
  background: var(--background-secondary-color);

  bottom: 0;
  width: 100%;
  .content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 2em;
  }
`

export default Wrapper
