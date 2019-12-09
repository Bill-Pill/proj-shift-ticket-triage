import { LOGIN } from '../actions'

const DEFAULT_STATE = {
  username: localStorage.getItem('username') || ''
}

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    default:
      return state;
  }
}