import styled from "styled-components";
import colors from "../../styles/variables";

export const WideEditOrDelete = styled.div`
  position: fixed;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: 1;
  background: #000;
  opacity: 0.1;
`;
export const EditOrDeleteNav = styled.nav`
  padding: 4px;
  width: 150px;
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 2;
  a,
  button {
    color: blue;
    padding: 8px;
    font-weight: bold;
    display: inline-block;
    text-align: left;
    width: 100%;
    border: none;
  }
`;

export const SingleComment = styled.div`
  form {
    width: fit-content;

    button: {
      background: transparent;
      padding: 4px;
    }
    svg {
      width: 18px;
      height: 18px;
    }
    .has-liked {
      fill: ${colors.pink};
    }
    .not-liked {
      fill: ${colors.darkslategrey};
    }
  }
`;
