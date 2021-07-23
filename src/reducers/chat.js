import { FETCH_CHATS } from "../ActionTypes/chatTypes";

const chatsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_CHATS:
      return [...state, ...action.payload.data];

    default:
      return [...state];
  }
};

export default chatsReducer;
