import { FETCH_MESSAGES, SEND_MESSAGE } from "../ActionTypes/messageTypes";

const messagesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_MESSAGES:
      return [...state, ...action.payload.data];
    case SEND_MESSAGE:
      return [...state];

    default:
      return [...state];
  }
};

export default messagesReducer;
