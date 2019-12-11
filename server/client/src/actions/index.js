import axios from "axios";
const uuidv4 = require('uuid/v4')

export const FETCH_TICKETS= "fetch_tickets";
export const FETCH_TICKET_DETAILS= "fetch_ticket_details";
export const LOGIN = 'login'
export const LOGOUT = 'logout'
export const SUBMIT_TICKET = 'submit_ticket'
export const FETCH_CHATS = 'fetch_chats'

const ROOT_URL = "/api";

export const fetchChats = () => {
  const request = axios
    .get(`${ROOT_URL}/chats`)
    .catch(function(error) {
      console.log("error: ", error);
    });
  return {
    type: FETCH_CHATS,
    payload: request
  };
}

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

export const updateTicketStatus = (ticketid, newStatusCode) => {
  const request = axios
    .put(`${ROOT_URL}/ticket/${ticketid}`, {newStatusCode})
    .catch(function(error) {
      console.log("error: ", error);
    });
    return {
      type: FETCH_TICKET_DETAILS,
      payload: request
    };
}

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

// Actions for demo use
export const loginAsDemo = (callback) => {

  let demoObj = { username:uuidv4(), isAdmin: false, isDemo: true}

  localStorage.setItem('username', demoObj.username)
  localStorage.setItem('isDemo', true)
  callback()
  return {
    type: LOGIN,
    payload: demoObj
  }
}

export const fetchDemoTickets = (demoid) => {
  const request = axios
    .get(`${ROOT_URL}/tickets/${demoid}`)
    .catch(function(error) {
      console.log("error: ", error);
    });
  return {
    type: FETCH_TICKETS,
    payload: request
  };
};

export const submitDemoTicket = (values, user, callback) => {
  values.username = user;
  const request = axios
    .post(`${ROOT_URL}/ticket`, values)
    .catch(function(error) {
      console.log("error: ", error);
    });
    request.then(() => callback())
    return {
      type: SUBMIT_TICKET,
      payload: request
    };
}