import * as notificationTypes from "../ActionTypes/notificationTypes";

const notificationsReducer = (
  state = { notifications: [], loading: true, hasNew: false },
  action
) => {
  switch (action.type) {
    case notificationTypes.RESET_HAS_NEW:
      return { ...state, hasNew: false};
    case notificationTypes.FETCH_NOTIFICATIONS_REQUEST:
      return { ...state, loading: true};
    case notificationTypes.FETCH_NOTIFICATIONS_SUCCESS:
      return { ...state, notifications: action.payload.data.reverse(), loading: false };
    case notificationTypes.FETCH_NEW_NOTIFICATIONS_SUCCESS:
      return { ...state, notifications: [...action.payload.data.reverse(), ...state.notifications], loading: false };
    case notificationTypes.READ_ONE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.map((state) =>
          state._id === action.payload.data ? { ...state, viewed: true } : state
        ),
      };

    case notificationTypes.READ_ALL_NOTIFICATIONS:
      return {
        ...state,
        notifications: state.notifications.map((state) =>
          state.viewed ? state : { ...state, viewed: true }
        ),
      };
    case notificationTypes.CHECK_NEW_NOTIFICATION:
      return {...state, hasNew: action.payload.data};
    default:
      return state;
  }
};

export default notificationsReducer;
