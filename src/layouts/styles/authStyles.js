import styled from "styled-components";
import colors from "../../styles/variables";

// const gradient = "linear-gradient()";

const AuthWrapper = styled.div`
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-x: hidden;

  form {
    max-width: 400px;
    margin: auto;
    border-radius: 8px;

    span {
      display: inline-block;
      text-align: center;
      background: #fff;
      font-weight: bold;
      border: 1px solid #808080;
      padding: 8px;
      width: 100%;
      margin: 12px 0px;
    }
    .controls_wrapper {
      background: #fff;
    }
    .button-wrapper {
      display: flex;
      margin: auto;
      padding: 0.5rem;
    }
    input {
      background: ${colors.light};
    }
  }
  @media (min-width: 1024px) {
    & {
      background-image: linear-gradient(#aaadff, #f88bff);
    }
    form {
      background: #fff;
      box-shadow: 0px 17px 6px -8px #8d5cfd;
      span {
        border: none;
      }
    }
  }
`;

export default AuthWrapper;
