import styled from "styled-components";

export const Main = styled.main`
  margin: 58px auto 0px auto;
  background: #fff;
  max-width: 42rem;
  padding: 0px 16px;

  @media (min-width: 769px) {
    margin: 70px auto 70px auto;
  }
`;
export const CustomNavbar = styled.nav`
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  z-index: 200;
  .auth-button{
    font-weight: 600;
    color: #fff;
    background: #c2185b;
    border-radius: 2px;
    padding: 4px;
    font-size: 1.06rem;
    text-decoration: none;
    button{
      border: none;
      background: transparent;
      font-family: inherit;
      color: inherit;
      font-weight: inherit;
    }
    &:hover,&:focus{
      text-decoration: none;
    }
  }
`;
export const MobileSettings = styled.div`
  svg {
    width: 35px;
    height: 35px;
  }
  @media (min-width: 769px) {
    & {
      svg {
        display: none;
      }
    }
  }
`;
export const MobileMenu = styled.div`
  display: flex;
  padding: 0.5rem;
  height: 45px;
  justify-content: space-between;
  @supports (justify-content: space-around) {
    justify-content: space-around;
  }
  a {
    padding: 0.5rem;
  }
  svg {
    width: 20px;
    height: 20px;
  }
  @media (min-width: 400px) {
    & {
      svg {
        width: 30px;
        height: 30px;
      }
    }
  }
  @media (min-width: 769px) {
    & {
      display: none;
    }
  }
`;
export const BigMenu = styled.nav`
  display: none;
  a {
    margin: 4px;
    padding: 2px;
  }
  @media (min-width: 769px) {
    & {
      display: block;
    }
  }
`;
export const Logout = styled.div`
  position: fixed;
  background: aliceblue;
  top: 0px;
  bottom: 0px;
  z-index: 9999;
  left: 0px;
  right: 0px;
  display: flex;
  flex-direction: column;
  z-index: 9999;
  justify-content: center;
  align-items: center;
`;
