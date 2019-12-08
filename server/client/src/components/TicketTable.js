import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { fetchTickets } from "../actions"
import { Table} from 'antd';

// Schema used for Ticket Table component w/ Ant Design
const columns = [
  {
    title: 'Ticket ID',
    dataIndex: 'ticketid',
    key: 'ticketid'
  },
  {
    title: 'Status',
    dataIndex: 'statuscode',
    key: 'statuscode'
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (text, record) => <Link to={'ticket/' + record.ticketid}>{text}</Link>
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Department',
    dataIndex: 'department',
    key: 'department'
  },
  {
    title: 'Ticket Submit Date',
    dataIndex: 'date',
    key: 'date'
  },
]

class TicketTable extends Component {

  componentDidMount() {
    this.props.fetchTickets()
  }

  HandleRowClick(ticketid) {
    console.log(ticketid)
  }

  render() {
    return (
      <Table dataSource={this.props.tickets} columns={columns}
        rowKey="ticketid">
      </Table>
    )
  }
}

const mapStateToProps = state => {
  return {
   tickets: state.tickets
  };
};

export default connect(mapStateToProps, { fetchTickets })(TicketTable);
