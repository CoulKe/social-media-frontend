import styled from "styled-components";

const Wrapper = styled.main`
  display: block;
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
export const MessagesView = styled.div`
  height: 300px;
  font-size: 18px;
  p {
    margin: 0px;
  }
  .single-message-wrapper {
    margin: 4px;
  }
  .thread-overview{
    color: #282828;
    display: block;
    border-bottom: 1px solid #e8e8e8;
  }
  .thread-overview:hover{
    text-decoration: none;
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
  span{
    display: block;
    text-align: right;
    color: #d8d8d8;
    font-size: 0.8rem;
  }
`;

export default Wrapper;
