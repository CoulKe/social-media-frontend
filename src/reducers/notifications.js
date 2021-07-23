import {
  FETCH_NOTIFICATIONS,
  READ_ALL_NOTIFICATIONS,
  READ_ONE_NOTIFICATION,
} from "../ActionTypes/notificationTypes";

const notificationsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS:
      return [...action.payload.data];
    case READ_ONE_NOTIFICATION:
      return state.map((state) =>
        state._id === action.payload.data ? { ...state, viewed: true } : state
      );

    case READ_ALL_NOTIFICATIONS:
      return state.map((state) =>
        state.viewed ? state : { ...state, viewed: true }
      );
    default:
      return [...state];
  }
};

export default notificationsReducer;
