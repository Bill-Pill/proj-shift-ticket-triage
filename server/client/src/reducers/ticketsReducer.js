import { FETCH_TICKETS } from '../actions'

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_TICKETS:
      if(action.payload.data.tickets) {

        return action.payload.data;
      }
      return state;
    default:
      return state;
  }
}