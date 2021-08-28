import styled from "styled-components";

export const CommentsBlock = styled.div`
  position: relative;
  margin-bottom: 120px;
  &::before {
    content: " ";
    display: block;
    width: 10px;
    height: 100%;
    position: absolute;
    background: aquamarine;
    left: 16px;
    border-left: 2px solid black;
    border-radius: 22px;
  }

  .comment-box {
    position: fixed;
    margin-bottom: 50px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    border: 1px solid #000;
    textarea {
      border: 2px soild red;
      width: 90%;
      &:focus {
        border: 2px soild green;
      }
    }
    button {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #000000;
    }
  }
  @media (min-width: 700px) {
    & {
      min-height: 100vh;
    }
    .comment-box {
      position: sticky;
      right: 0px;
      left: 0px;
      margin-top: 30px;
    }
  }
`;
export const SingleComment = styled.div`
  form {
    width: fit-content;

    button: {
      background: transparent;
      padding: 4px;
    }
  }
`;
