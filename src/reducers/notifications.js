import * as notificationTypes from "../ActionTypes/notificationTypes";

const notificationsReducer = (
  state = { notifications: [], loading: true },
  action
) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default notificationsReducer;
