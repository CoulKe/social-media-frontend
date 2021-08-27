import styled from "styled-components";
import colors from "../../styles/variables";

export const PostsButtons = styled.div`
  display: flex;
  justify-content: space-around;
  border-radius: 12px;
  color: blue;

  form,
  div {
    border-radius: 12px;
    background: #f5fafd;
    padding: 8px 30px;
    margin: 4px;
    cursor: pointer;
  }
  .like-button {
    background: transparent;
    &:hover {
      background: transparent;
    }
    &:focus,
    &:active {
      background: transparent;
    }
    svg {
      fill: ${(prop) => (prop.hasLiked ? colors.pink : colors.darkslategrey)};
    }
  }
  button,
  a {
    border-radius: 8px;
  }
  svg {
    width: 20px;
    height: 20px;
  }

  @media (min-width: 500px) {
    justify-content: flex-start;
    form,
    div {
      margin-right: 60px;
    }
  }
`;
export const LoadMore = styled.div`
  width: 100%;
  border: none;
  text-align: center;
  background: transparent;
<<<<<<< HEAD
  margin-bottom: 52px;
=======
>>>>>>> fc7e827a2753cddf3744fde5cb17aec225f50347
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

export const PostControlsOverlay = styled.div`
  position: fixed;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: 1;
  background: #000;
  opacity: 0.1;
`;
export const PostControlsNav = styled.nav`
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
  }
  a,
  form,
  button,
  div {
    border: none;
  }
`;
export const HiddenInput = styled.input`
  position: absolute;
  right: 900px;
  opacity: 0;
`;
