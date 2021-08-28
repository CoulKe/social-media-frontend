import axios from "axios";
import * as messageTypes from "../ActionTypes/messageTypes";

/**
 *Fetches messages sent or received by the authenticated user.
 * @param {string} authenticatedUser - logged  in user
 */
export const fetchMessages = (authenticatedUser) => async (dispatch) => {
  try {
    dispatch({ type: messageTypes.FETCH_MESSAGES_REQUEST });

    let url = window.location.pathname;
    const { data } = await axios(url, {
      params: {
        authenticatedUser,
      },
    });
    dispatch({
      type: messageTypes.FETCH_MESSAGES_SUCCESS,
      payload: {
        data: data,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getNewMessages = (recipient, lastId="") => async (dispatch) => {
  try {
   const {data} = await axios({
      url: `/messages/read-new/${recipient}`,
      method: "GET",
      params: {
        lastId
      }
    })

    dispatch({
      type: messageTypes.FETCH_NEW_MESSAGES_SUCCESS,
      payload: {
        data: data,
      },
    });
  } catch (error) {
    return null;
  }
}

/**
 * Sends message to a specific user.
 * @param {string} message - Message to be sent
 * @param {string} sender - The authenticated user
 * @param {string} recipient - Receiver of the message to be sent
 */
export const sendMessage = (message, sender, recipient) => async (dispatch) => {
  try {
    dispatch({ type: messageTypes.SEND_MESSAGE_REQUEST });
    const { data } = await axios({
      url: `/messages/${recipient}`,
      method: "POST",
      data: {
        message,
        sender,
      },
    });
    console.log({ data });
    dispatch({
      type: messageTypes.SEND_MESSAGE_SUCCESS,
      payload: {
        data: data.message,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

/**
 * Searches the database for users with names, including usernames.
 * @param {string} personToSearch - Person to compose a new message to.
 */
export const searchPersonTomessage = (personToSearch) => async (dispatch) => {
  try {
    dispatch({ type: messageTypes.SEARCH_PERSON_REQUEST });

    const { data } = await axios({
      url: `/messages/search/${personToSearch}`,
      method: "GET",
    });

    dispatch({
      type: messageTypes.SEARCH_PERSON_SUCCESS,
      payload: {
        data,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

/**
 * Resets the searched property of the message state.
 */
export const resetPersonSearch = () => async (dispatch) => {
  try {
    dispatch({ type: messageTypes.SEARCH_PERSON_RESET });
  } catch (err) {
    console.log(err);
  }
};
