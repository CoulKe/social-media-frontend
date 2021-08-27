import * as messageTypes from "../ActionTypes/messageTypes";

const messagesReducer = (
  state = { messages: [], personSearch: [], userToMessage: "", loading: true, loadingPersonSearch: true},
  action
) => {
  switch (action.type) {
    case messageTypes.FETCH_MESSAGES_REQUEST:
      return { ...state, loading: true };
    case messageTypes.FETCH_MESSAGES_SUCCESS:
      return { messages: [...action.payload.data.messages], userToMessage: action.payload.data.user,loading: false };
    case messageTypes.FETCH_NEW_MESSAGES_SUCCESS:
      return { ...state,messages: [...state.messages, ...action.payload.data], loading: false };
    case messageTypes.SEND_MESSAGE_REQUEST:
      return { ...state };
    case messageTypes.SEND_MESSAGE_SUCCESS:
      return {
        loading: false,
        ...state
      };
      // return {
      //   messages: [...state.messages, action.payload.data],
      //   loading: false,
      // };
    case messageTypes.SEARCH_PERSON_REQUEST:
      return {
        ...state,
        loadingPersonSearch: true,
      };
    case messageTypes.SEARCH_PERSON_SUCCESS:
      return {
        ...state,
        personSearch: action.payload.data,
        loadingPersonSearch: false,
      };
    case messageTypes.SEARCH_PERSON_RESET:
      return {
        ...state,
        personSearch: [],
        loadingPersonSearch: false,
      };

    default:
      return state;
  }
};

export default messagesReducer;
