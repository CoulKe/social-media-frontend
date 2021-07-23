import styled from "styled-components";

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
  a{
    margin: 4px;
    padding: 2px;
  }
  @media (min-width: 769px) {
    & {
      display: block;
    }
  }
`;
