import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useHistory } from "react-router-dom";
import queryString from "query-string";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Wrapper, { MessageWrapper, ChatsBlock } from "./style";
import { fetchChats } from "../../actions/chatActions";
import { searchPersonTomessage, resetPersonSearch } from "../../actions/messageActions";
import Meta from "../../Components/Meta";
import { Form } from "react-bootstrap";

dayjs.extend(relativeTime);

export default function Chats({ location }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { chats, loading } = useSelector((state) => state.chats);
  const { personSearch, loadingPersonSearch } = useSelector((state) => state.messages);
  const loggedUser = localStorage.getItem("loggedUser");
  const [searchValue, setSearchValue] = useState("");
  const { view } = queryString.parse(location.search);

  useEffect(() => {
<<<<<<< HEAD
      dispatch(fetchChats());
=======
    if (!chats.length) {
      dispatch(fetchChats());
    }
>>>>>>> fc7e827a2753cddf3744fde5cb17aec225f50347
  }, [chats.length, dispatch]);

  // Reset search data on unmount
  useEffect(() => {
    return () => {
      dispatch(resetPersonSearch())
    };
  }, [dispatch]);

  /**
   * Derives recipient of the message from the chat name.
   * @param {string} chatName - Chat name of the message thread
   * @returns recipient.
   */
  function personToMessage(chatName) {
    return chatName.split("@").filter((user) => user !== loggedUser)[0];
  }

  return (
    <Wrapper>
      <Meta title="Chats" />
      {!view ? (
        <button
          className="mb-2"
          onClick={() => history.push("/messages?view=newMessage")}
        >
          Create new message
        </button>
      ) : (
        ""
      )}
      {view ? (
        <div>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(searchPersonTomessage(searchValue));
          }}
        >
          <Form.Label>Person to message: </Form.Label>
          <div className="d-flex">
          <Form.Control
            onChange={(e) => setSearchValue(e.target.value)}
            defaultValue={searchValue}
          />
          <button type="submit">Search</button>
          </div>
        </Form>
        {!loadingPersonSearch && personSearch ? <div>
         {personSearch.map((person, index) => (
           <Link key={index} to={`/messages/${person.username}`}>
           <p>{person.first_name} {person.last_name} <span className="username">@{person.username}</span></p>
           </Link>
         ))}
        </div> : ""}
        </div>
      ) : (
        <ChatsBlock>
          {loading ? <Skeleton height={55} count={10} /> : ""}
          {chats &&
            chats.map((message, index) => (
              <Link
                className="thread-overview"
                to={{
                  pathname: `messages/${personToMessage(message.chat_name)}`,
                  state: {
                    from: "messages",
                  },
                }}
                key={index}
              >
                <p>
                  <b>{message.user.first_name} {message.user.last_name}</b>
                </p>
                <MessageWrapper>
<<<<<<< HEAD
                {loggedUser === message.user.username ? <p><b className="text-danger">You:</b> {message.chat_snippet}</p> : <p>{message.chat_snippet}</p>}
=======
                  {message.chat_snippet}
>>>>>>> fc7e827a2753cddf3744fde5cb17aec225f50347
                  <span>{dayjs().to(dayjs(message.date_updated))}</span>
                </MessageWrapper>
              </Link>
            ))}
        </ChatsBlock>
      )}
    </Wrapper>
  );
}
