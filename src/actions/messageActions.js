import axios from "axios";
import { FETCH_MESSAGES, SEND_MESSAGE } from "../ActionTypes/messageTypes";

/**
 *Fetches messages sent or received by the authenticated user.
 * @param {string} authenticatedUser - logged  in user
 */
 export const fetchMessages = (authenticatedUser) => async (dispatch) => {
    try {
      let url = window.location.pathname;
      const { data } = await axios(url, {
        params: {
          authenticatedUser,
        },
      });
  
      dispatch({
        type: FETCH_MESSAGES,
        payload: {
          data: data.messages,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  /**
   * Sends message to a specific user.
   * @param {string} message - Message to be sent
   * @param {string} sender - The authenticated user
   * @param {string} recipient - Receiver of the message to be sent
   */
  export const sendMessage = (message, sender, recipient) => async (dispatch) => {
    await axios({
      url: `/messages/${recipient}`,
      method: "POST",
      data: {
        message,
        sender,
      },
    });
  
    dispatch({
      type: SEND_MESSAGE,
      payload: {
        data: [],
      },
    });
  };