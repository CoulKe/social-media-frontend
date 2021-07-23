import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import colors from "../../styles/variables";
import { Form } from "react-bootstrap";
import Wrapper, { MessagesView, MessageBox, SingleMessage } from "./style";

//Icons
import SendIcon from "../../icons/send.svg";
import { fetchMessages, sendMessage } from "../../actions/messageActions";
import Meta from "../../Components/Meta";
// import Read from "../../assets/images/read.png";
// import Unread from "../../assets/images/unread.png";

dayjs.extend(relativeTime);

export default function Compose({ match }) {
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState("");

  const pathname = match.url.split("/");
  const recipient = pathname[pathname.length - 1];
  const messages = useSelector(state => state.messages)
  let authenticatedUser=localStorage.getItem("loggedUser");

  useEffect(() => {
    scrollToBottom();
    dispatch(fetchMessages(authenticatedUser));

  }, [authenticatedUser, dispatch]);
  /**Scrolls messages view area to bottom */
  function scrollToBottom() {
    let messagesView = document.querySelector("#messages-view");
    //scroll to bottom
    // messagesView.scrollTo(0, messagesView.scrollHeight);
    messagesView.lastChild.scrollIntoView();
  }
  
  function handleSendMessage(e) {
    e.preventDefault();
    let form = document.querySelector("form");

    if (newMessage !== "") {
      dispatch(sendMessage(newMessage, authenticatedUser, recipient))
      form.reset()
    }
  }
  return (
    <Wrapper>
    <Meta title="Message" />
      <MessagesView id="messages-view">
      <p>{recipient}</p>
        {messages.map((message, index) => (
          <div className="single-message-wrapper" key={index} style={message.sender === recipient ? {textAlign: 'left'} : {textAlign: 'right'}}>
          <SingleMessage style={message.sender === recipient ? {backgroundColor: colors.grey} : {backgroundColor: colors.lightMaroon}}>
          <p>{message.message}</p>
          {/* {message.sender !== recipient && (
            <img src={Read} className="d-inline" alt="read"/>
          )} */}
          <span>{dayjs(message.date_created).format('h:m a')}</span>
          </SingleMessage>
          </div>
        ))}
        {/* Keep this to work on firefox */}
        <p style={{ visibility: "hidden" }}>Padding</p>
      </MessagesView>
      <Form
        action=""
        method="get"
        onSubmit={handleSendMessage}
        className="mx-auto mb-5 fixed-bottom"
      >
        <MessageBox>
          <Form.Label className="sr-only">Enter message</Form.Label>
          <input type="text" name="message" id="message-input" onChange={(e) => setNewMessage(e.target.value)} />
          <button type="submit" id="submit">
            <img alt="send" src={SendIcon} />
          </button>
        </MessageBox>
      </Form>
    </Wrapper>
  );
}
