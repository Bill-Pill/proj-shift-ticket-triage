import { FETCH_TICKET_DETAILS } from '../actions'

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_TICKET_DETAILS:
      return action.payload.data;
    default:
      return state;
  }
}