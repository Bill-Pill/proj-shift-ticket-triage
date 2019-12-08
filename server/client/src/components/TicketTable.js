import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchTickets } from "../actions"
import { Table, Divider, Tag } from 'antd';

const { Column } = Table;

const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];


class TicketTable extends Component {

  componentDidMount() {
    this.props.fetchTickets()
  }


  render() {
    return (
      <Table dataSource={this.props.tickets}>
        <Column title="Ticket ID" dataIndex="ticketid" key="ticketid" />
        <Column title="Status" dataIndex="statuscode" key="statuscode" />
        <Column title="Title" dataIndex="title" key="title" />
        <Column title="Category" dataIndex="category" key="category" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Department" dataIndex="department" key="department" />
        <Column title="Date Submitted" dataIndex="added" key="added" />
      </Table>
      // <Table dataSource={data}>
      //     <Column title="First Name" dataIndex="firstName" key="firstName" />
      //     <Column title="Last Name" dataIndex="lastName" key="lastName" />
      //   <Column title="Age" dataIndex="age" key="age" />
      //   <Column title="Address" dataIndex="address" key="address" />
      //   <Column
      //     title="Tags"
      //     dataIndex="tags"
      //     key="tags"
      //     render={tags => (
      //       <span>
      //         {tags.map(tag => (
      //           <Tag color="blue" key={tag}>
      //             {tag}
      //           </Tag>
      //         ))}
      //       </span>
      //     )}
      //   />
      //   <Column
      //     title="Action"
      //     key="action"
      //     render={(text, record) => (
      //       <span>
      //         <a>Invite {record.lastName}</a>
      //         <Divider type="vertical" />
      //         <a>Delete</a>
      //       </span>
      //     )}
      //   />
      // </Table>
    )
  }
}

const mapStateToProps = state => {
  return {
   tickets: state.tickets
  };
};

export default connect(mapStateToProps, { fetchTickets })(TicketTable);
