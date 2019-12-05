import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../actions"

class Main extends Component {

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
      <div>
        Hi I'm the main component. Ticket data below:
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

export default connect(mapStateToProps, actions)(Main);