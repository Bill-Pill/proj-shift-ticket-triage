import { FETCH_TICKETS } from '../actions'

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_TICKETS:
      return action.payload.data;
    default:
      return state;
  }
}