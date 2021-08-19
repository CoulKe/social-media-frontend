import { createGlobalStyle } from "styled-components";
import colors from "./variables";

export const GlobalStyles = createGlobalStyle`

body{
  background: ${colors.light};
  max-width: 100vw;
  font-weight: 500;
  overflow-x: hidden;
}
a{
  color: ${colors.darkerBlue};
}
nav a{
  color: ${colors.darkerBlue};
  font-weight: bold;
}
.username{
  font-weight: 500;
  color: #383b3f;
  &:hover{
    text-decoration: underline;
  }
}
.resize-none{
  resize: none;
}
.offline-error-block{
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 99999;
    color: #fff;
    background: #000;
    right: 0px;
    left: 0px;
    top: 0px;
    text-align: center;
    padding: 14px;
    p{
      border: none;
      font-weight: 800;
      margin: 0px;
      padding: 5px 12px;
      border-radius: 4px;
    }
    div{
      display: flex;
    width: 50%;
    justify-content: space-evenly;
    button{
      width: fit-content;
    border: none;
    font-weight: 700;
    display: block;
    }
    }
}
.image-text{
    display: flex;
    justify-content: center;
    align-items: center;
    background: aliceblue;
    border-radius: 50%;
    margin: auto;
  }
.big-image-text{
    border: 17px solid ${colors.pink};
    font-size: 130px;
    max-width: 250px;
    height: 250px;
}

.previous-comments{
  width: 100%;
  background: #fff;
  color: ${colors.darkerBlue};
  box-shadow: 1px 0px 6px 0px;
  border: 1px dotted ${colors.darkerBlue};
  border-radius: 16px;
}
.border-pink{
  border: 2px solid ${colors.pink};
}
.cursor-pointer{
  cursor: pointer;
}
.invalid{
  color: red;
}
pre{
 max-width: 100%;
 overflow: hidden;
 font-family: inherit;
 font-size: inherit;
 white-space: pre-wrap; /* css-3 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}
.pink-button {
    background: ${colors.pink};
    border: none;
    border-radius: 6px;
    font-weight: 700;
    border: none;
    width: 100%;
  }
.comment-preview{
    resize: none;
  }
  ::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f0f8ff;
}

::-webkit-scrollbar-thumb {
  background: ${colors.mediumvioletred};
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
  background: blue;
}
`;
