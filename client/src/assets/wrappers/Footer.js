import styled from 'styled-components'

const Wrapper = styled.footer`
  background: var(--background-secondary-color);


  width: 100%;
  .content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    gap: 2em;
  }

   display: flex;
    align-items: center;
    color: var(--text-secondary-color);
    padding: 1rem 0;
    padding-left: 2.5rem;
    text-transform: capitalize;
    transition: color 0.3s ease-in-out;
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: var(--text-secondary-color);
    padding: 1rem 0;
    padding-left: 2.5rem;
    text-transform: capitalize;
    transition: color 0.3s ease-in-out;
  }
  .nav-link:hover {
    color: var(--primary-500);
    transition: var(--transition);
  }
`

export default Wrapper
