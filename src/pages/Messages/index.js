import React, { useEffect } from "react";
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Wrapper, { MessageWrapper, MessagesView } from "./style";
import { fetchChats } from "../../actions/chatActions";
import Meta from "../../Components/Meta";

dayjs.extend(relativeTime);

export default function Chats() {
  const dispatch = useDispatch();
  const chats = useSelector(state => state.chats);
  const loggedUser = localStorage.getItem('loggedUser')

  useEffect(() => {
    if(!chats.length){
      dispatch(fetchChats())
    }
  }, [chats.length, dispatch]);

  function personToMessage(chatName){
    return chatName.split("@").filter(user => user !== loggedUser)[0];
  }
 
  return (
    <Wrapper>
    <Meta title="Chats" />
      <MessagesView id="chats-view">
        {chats &&
          chats.map((message, index) => (
            <Link className="thread-overview" to={`messages/${personToMessage(message.chat_name)}`} key={index}>
              <p>
                <b>{message.sender}</b>
              </p>
              <MessageWrapper>
                {message.chat_snippet}
                <span>
                  {dayjs().to(dayjs(message.date_updated))}
                </span>
              </MessageWrapper>
            </Link>
          ))}
      </MessagesView>
    </Wrapper>
  );
}
