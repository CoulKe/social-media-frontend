import styled from "styled-components";
import colors from "../../styles/variables";

export const Wrapper = styled.section`
  position: relative;
  min-height: 80vh;
`;
export const TitleWrapper = styled.div`
  position: sticky;
  top: 0;
  text-align: center;
  width: 100%;
  padding: 8px;
  font-weight: bold;
  height: 44px;
  a {
    margin: auto;
    font-weight: bold;
    border: none;
    padding: 6px;

    &:hover, &:focus{
      text-decoration: none;
      background: pink;
      color: #000;
    }
  }
  .active-border {
    border-bottom: 2px solid ${colors.mediumvioletred};
  }
`;
