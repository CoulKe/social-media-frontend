import * as chatTypes from "../ActionTypes/chatTypes";

const chatsReducer = (state = { chats: [], loading: true, hasNew: false }, action) => {
  switch (action.type) {
    case chatTypes.FETCH_CHATS_REQUEST:
      return { ...state, loading: true };
    case chatTypes.FETCH_CHATS_SUCCESS:
      return { ...state, chats: action.payload.data, loading: false };
    case chatTypes.CHECK_NEW_CHAT:
      return { ...state, hasNew: action.payload.data};

    default:
      return state;
  }
};

export default chatsReducer;
