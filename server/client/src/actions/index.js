import axios from "axios";

export const FETCH_TICKETS= "fetch_tickets";

// const ROOT_URL = "/api";

export const fetchTickets = () => {
  const request = axios
    .get(`http://localhost:5000/tickets`)
    .catch(function(error) {
      console.log("error: ", error);
    });
  return {
    type: FETCH_TICKETS,
    payload: request
  };
};
