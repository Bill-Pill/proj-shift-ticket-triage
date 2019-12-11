import { FETCH_CHATS } from '../actions'

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CHATS:
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