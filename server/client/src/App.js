import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Main from './components/Main'
import SubmitTicket from './components/TicketForm';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/ticketform" component={SubmitTicket} />
        </Switch>
      </div>
    );
  }
}

export default App