import styled from "styled-components";
import colors from "../../styles/variables";

const Wrapper = styled.section`
  display: block;
  min-height: 80vh;
  background: #fff;

  form {
    max-width: 42rem;
    margin-bottom: 8px;
    padding-top: 32px;
    input,
    button {
      border-radius: unset;
    }
    button {
      width: 100px;
      color: #fff;
      background: ${colors.pink};
      border: unset;
      font-weight: 600;
      text-transform: uppercase;
    }
  }
`;
export const MessageBox = styled.div`
  display: flex;
  height: 42px;
  border: 2px solid #111;
  border-radius: 4px;
  background: #fff;
  margin: 0px 16px;
  #message-input,
  #submit {
    display: inline;
    border: none;
  }
  #message-input {
    width: 90%;
  }
  #submit {
    width: 10%;
    background: inherit;
    padding: 0px;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;
export const ChatsBlock = styled.div`
  .thread-overview {
    color: #282828;
    display: block;
    border-bottom: 1px solid #e8e8e8;
    &:hover {
      text-decoration: none;
    }
  }
`;
export const MessagesView = styled.div`
  margin: 60px auto 32px auto;
  font-size: 18px;
  position: relative;
  max-width: 42rem;
  .recipient-name {
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      max-width: 42rem;
      margin: auto;
      box-shadow: 0px 7px 6px -7px #646464;
      padding: 4px;
      button {
        border: none;
        padding: 8px 4px;
        background: ${colors.pink};
        color: #fff;
        font-weight: bold;
        letter-spacing: 3px;
        border-radius: 4px;
      }
      a {
        padding: 2px;
        font-size: 18px;
        display: block;
        margin: auto;
        text-transform: capitalize;
        color: inherit;
        font-weight: bold;
      }
    }
  }
  p {
    margin: 0px;
  }
  .single-message-wrapper {
    margin: 4px;
  }
`;
export const MessageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    display: inline-block;
  }
`;
export const SingleMessage = styled.div`
  color: #fff;
  border-radius: 8px;
  padding: 8px;
  max-width: 250px;
  display: inline-block;
  span {
    display: block;
    text-align: right;
    color: #d8d8d8;
    font-size: 0.8rem;
  }
`;

export default Wrapper;
