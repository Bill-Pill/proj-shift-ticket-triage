import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Main from './components/Main'
import TicketList from './components/TicketList'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/ticketlist" component={TicketList} />
        </Switch>
      </div>
    );
  }
}

export default App