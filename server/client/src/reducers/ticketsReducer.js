import { FETCH_TICKETS } from '../actions'

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_TICKETS:
      if (!action.payload) {
        return state;
      }
      if(action.payload.data[0]) {
        return action.payload.data;
      }
      return state;
    default:
      return state;
  }
}