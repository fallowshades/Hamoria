import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;

  .logout-btn {
    display: flex;

    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
  }
  .img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
  .dropdown {
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    box-shadow: var(--shadow-2);
    visibility: hidden;
    border-radius: var(--border-radius);
  }
  .show-dropdown {
    visibility: visible;
  }

  .toggle-btn {
    flex: 0.6; /* Adjust the value as needed */
  }
  .dropdown {
    flex: 1; /* Adjust the value as needed */
  }

  .dropdown-item {
    border-radius: var(--border-radius);
    background: transparent;
    border-color: transparent;
    color: var(--white);
    letter-spacing: var(--letter-spacing);
    text-transform: capitalize;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
`

export default Wrapper
