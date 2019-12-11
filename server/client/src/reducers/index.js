import { combineReducers } from "redux";
import TicketsReducer from './ticketsReducer'
import TicketDetailsReducer from './ticketDetailsReducer'
import LoginReducer from './loginReducer'
import ChatsReducer from './chatsReducer'

const rootReducer = combineReducers({
  details: TicketDetailsReducer,
  tickets: TicketsReducer,
  auth: LoginReducer,
  chats: ChatsReducer
});

export default rootReducer;