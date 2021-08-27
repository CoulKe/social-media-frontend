import axios from "axios";
import * as chatTypes from "../ActionTypes/chatTypes";

/**Fetches all messages thread overview for a single user.*/
export const fetchChats = () => async (dispatch) => {
  try {
    dispatch({
      type: chatTypes.FETCH_CHATS_REQUEST,
    });
    const { data } = await axios("/chats");

    dispatch({
      type: chatTypes.FETCH_CHATS_SUCCESS,
      payload: {
        data,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
export const checkNewChat = () => async (dispatch) => {
  try {
    dispatch({
      type: chatTypes.FETCH_CHATS_REQUEST,
    });
    const { data } = await axios("/chats/check-new");
    dispatch({
      type: chatTypes.CHECK_NEW_CHAT,
      payload: {
        data: data.hasNew,
      },
    });

  } catch (error) {
    console.log(error);
  }
};
