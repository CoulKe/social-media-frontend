import styled from "styled-components";
import colors from "../../styles/variables";

const Wrapper = styled.section`
  display: block;
`;

export const LoadMore = styled.div`
  width: 100%;
  border: none;
  text-align: center;
  background: transparent;
  .post-button {
    font-size: 18px;
  }
  button {
    color: #fff;
    font-weight: bold;
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
    background: ${colors.pink};
  }
`;


export default Wrapper;
