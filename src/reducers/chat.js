import * as chatTypes from "../ActionTypes/chatTypes";

const chatsReducer = (state = { chats: [], loading: true }, action) => {
  switch (action.type) {
    case chatTypes.FETCH_CHATS_REQUEST:
      return { ...state, loading: true };
    case chatTypes.FETCH_CHATS_SUCCESS:
      return { chats: action.payload.data, loading: false };

    default:
      return state;
  }
};

export default chatsReducer;
