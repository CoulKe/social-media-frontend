import styled from "styled-components";

export const Wrapper = styled.section`
  min-height: 80vh;

  .search-options {
    width: 100%;
    button{
      border: none;
      font-weight: 700;
      background: #ffe4ee;
      text-transform: uppercase;
      border-bottom: 2px solid #c2185b;
      width: 50%;
    }
  }
  .users-result{
    box-shadow: 0px 0px 20px 0px #d7d7d7;
    padding: 8px;
    border-radius: 8px;
  }
`;
