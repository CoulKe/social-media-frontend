import React, { useEffect, useRef, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import colors from "../../styles/variables";
import { Form } from "react-bootstrap";
import Wrapper, { MessagesView, MessageBox, SingleMessage } from "./style";

//Icons
import SendIcon from "../../icons/send.svg";
import { fetchMessages, getNewMessages, sendMessage } from "../../actions/messageActions";
import Meta from "../../Components/Meta";
import { Linkify } from "../../utils";
import { Link, useHistory } from "react-router-dom";
import LoadingBlock from "../../Components/LoadingBlock";
<<<<<<< HEAD
=======
import axios from "axios";
>>>>>>> fc7e827a2753cddf3744fde5cb17aec225f50347
// import Read from "../../assets/images/read.png";
// import Unread from "../../assets/images/unread.png";

dayjs.extend(relativeTime);

export default function Compose({ match, location }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [newMessage, setNewMessage] = useState("");
  const composeForm = useRef(null);
  const messagesBlock = useRef(null);
  
  const pathname = match.url.split("/");
  const recipient = pathname[pathname.length - 1];
  const {messages, userToMessage,loading} = useSelector(state => state.messages)
  let authenticatedUser=localStorage.getItem("loggedUser");
  let lastId = messages[messages?.length - 1]?._id || "";

  useEffect(() => {
    scrollToBottom();
    dispatch(fetchMessages(authenticatedUser));

  }, [authenticatedUser, dispatch]);

  useEffect(() => {
    const newMessageHandler = setInterval(() => {
      dispatch(getNewMessages(recipient, lastId));
    }, 1000);

    return () => {
      clearInterval(newMessageHandler);
    }
  }, [authenticatedUser, dispatch, lastId, messages, recipient]);

  /**Scrolls messages view area to bottom */
  function scrollToBottom() {
    //scroll to bottom
    messagesBlock.current.lastChild?.scrollIntoView();
  }
  
  function handleSendMessage(e) {
    e.preventDefault();

    if (newMessage !== "") {
      dispatch(sendMessage(newMessage, authenticatedUser, recipient))
      composeForm.current.reset();
      scrollToBottom();
    }
  }
  return (
    <Wrapper>
    <Meta title="Message" />
      <MessagesView ref={messagesBlock} id="testThis">
      <div className="recipient-name bg-light">
      <div><button onClick={()=>{
        // Check if it was open from the same page
        location?.state?.from ? history.goBack() : history.push("/messages");
      }}>Back</button>
         <Link to={`/profile?username=${recipient}`}>
           {userToMessage && !loading ? `${userToMessage.first_name}  ${userToMessage.last_name}` : `@${recipient}`}
         </Link>
        </div>
      </div>
      {loading ? <LoadingBlock text="Getting messages..."/> : ""}
        {messages.map((message, index) => (
          <div className="single-message-wrapper" key={index} style={message.sender === recipient ? {textAlign: 'left'} : {textAlign: 'right'}}>
          <SingleMessage style={message.sender === recipient ? {backgroundColor: colors.grey} : {backgroundColor: colors.lightMaroon}}>
          <Linkify key={index} text={message.message} linkStyles={{color: colors.midYellow}}/>
          {/* {message.sender !== recipient && (
            <img src={Read} className="d-inline" alt="read"/>
          )} */}
          <span>{dayjs(message.date_created).format('MMM D, h:m a')}</span>
          </SingleMessage>
          </div>
        ))}
        {/* Keep this to work on firefox */}
        <p style={{ visibility: "hidden" }}>Padding</p>
      </MessagesView>
      <Form
        action=""
        method="POST"
        ref={composeForm}
        onSubmit={handleSendMessage}
        className="mx-auto fixed-bottom"
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
