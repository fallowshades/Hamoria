import styled from 'styled-components'

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: block;
    box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
    .sidebar-container {
      background: var(--background-secondary-color);
      min-height: 100vh;
      height: 100%;
      width: 250px;
      margin-right: -250px;
      transition: margin-left 0.3s ease-in-out;

      padding-bottom: 13vh;
    }
    .content {
      position: sticky;
      top: 0;
      display: flex;
      flex-direction: column;
      
    }

    .content > div{
      flex:   1;
      
    }

    .show-sidebar {
      margin-right 0;
    }
    header {
      height: 6rem;
      display: flex;
      align-items: center;
      padding-left: 2.5rem;
    }
    .nav-links {
      padding-top: 2rem;
      display: flex;
      flex-direction: column;
    }
    .nav-link {
      display: flex;
      align-items: center;
      color: var(--text-secondary-color);
      padding: 1rem 0;
      padding-left: 2.5rem;
      text-transform: capitalize;
      transition: padding-left 0.3s ease-in-out;
    }
    .nav-link:hover {
      padding-left: 3rem;
      color: var(--primary-500);
      transition: var(--transition);
    }
    .icon {
      font-size: 1.5rem;
      margin-right: 1rem;
      display: grid;
      place-items: center;
    }
    .active {
      color: var(--primary-500);
    }
    .pending {
      background: var(--background-color);
    }
  }

  .dropdown {
    width: 100%;

    text-align: center;
  display:none;
  
  }

  .show-dropdown {
    visibility: visible;
    display:block

  }
  .dropdown-btn {
    border-radius: var(--border-radius);
    padding: 0.5rem;

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
