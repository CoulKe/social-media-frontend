import styled from "styled-components";
import colors from "../../styles/variables";

export const Wrapper = styled.div`
  a {
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }
  a,
  button {
    cursor: pointer;
    color: inherit;
    background: ${({ hasViewed }) =>
      hasViewed ? "inherit" : colors.pinkNotification};
    border: none;
    border-bottom: 1px solid #000;
    font-size: inherit;
    font-weight: inherit;
  }
`;
