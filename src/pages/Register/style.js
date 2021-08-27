import styled from "styled-components";
import colors from "../../styles/variables";

export const RegisterWrapper = styled.div`
  label::before {
    content: "*";
    color: red;
  }
`;
export const StepsWrapper = styled.div`
  text-align: center;
  .step {
    display: inline-block;
    background: ${colors.pink};
    cursor: pointer;
    border: none;
    width: 1px;
    height: 1px;
    border-radius: 50%;
    margin: 4px;
  }
`;
