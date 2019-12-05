import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "./actions"

class App extends Component {

  componentDidMount() {
    this.props.fetchTickets()
  }

  renderTickets() {
    const items = []
    const { tickets } = this.props;
    tickets.forEach(t => {
      items.push(<div key={t.ticketid}>{t.title}</div>)
    })

    return items
  }

  render() {
    return (
      <div className="App">
        Hi I'm the app. Ticket data below:
        {this.renderTickets()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
   tickets: state.tickets
  };
};

export default connect(mapStateToProps, actions)(App);