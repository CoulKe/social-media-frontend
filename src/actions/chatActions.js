import axios from "axios";
import { FETCH_CHATS } from "../ActionTypes/chatTypes";

/**Fetches all messages thread overview for a single user.*/
export const fetchChats = () => async (dispatch) => {
    try {
      const { data } = await axios("/chats");
  
      dispatch({
        type: FETCH_CHATS,
        payload: {
          data,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };