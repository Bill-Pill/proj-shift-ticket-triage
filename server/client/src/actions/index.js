import axios from "axios";

export const FETCH_TICKETS= "fetch_tickets";
export const FETCH_TICKET_DETAILS= "fetch_ticket_details";
export const LOGIN = 'login'
export const LOGOUT = 'logout'

const ROOT_URL = "/api";

export const fetchTickets = () => {
  const request = axios
    .get(`${ROOT_URL}/tickets`)
    .catch(function(error) {
      console.log("error: ", error);
    });
  return {
    type: FETCH_TICKETS,
    payload: request
  };
};

export const fetchTicketDetails = (ticketid) => {
  const request = axios
    .get(`${ROOT_URL}/ticket/${ticketid}`)
    .catch(function(error) {
      console.log("error: ", error);
    });
  return {
    type: FETCH_TICKET_DETAILS,
    payload: request
  };
};

// Normally there'd be some kind of auth here - due
// to time constraints, currently using a hacky and
// definitely unsecure storing of login info
// without password use
export const loginToStore = (username) => {
  let userObj = { username, isAdmin: false }

  if (username === 'admin') {
    userObj.isAdmin = true;
  }
  // Ghetto localStorage to persist login. Would obviously change
  localStorage.setItem('username', username)

  return {
    type: LOGIN,
    payload: userObj
  }
}

export const logOutOfStore = (callback) => {
  localStorage.removeItem('username')
  callback()
  return {
    type: LOGOUT,
    payload: ''
  }
}