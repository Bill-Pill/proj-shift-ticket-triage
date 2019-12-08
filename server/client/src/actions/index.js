import axios from "axios";

export const FETCH_TICKETS= "fetch_tickets";
export const FETCH_TICKET_DETAILS= "fetch_ticket_details";

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