import React, { Component } from 'react';
import { connect } from "react-redux";

import CustomTable from '../components/CustomTable';
import { getUserList } from '../actions/User.action';
import userData from './../DummyData/TableData.json';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      userList: [],
      paging: {},
      pageSize: 5
    }
  }

  componentDidMount() {
    this.getUserList();
  }

  getUserList = async () => {
    const { getUserList } = this.props;
    const { pageSize } = this.state;
    // get userlist on page mount
    // let userListResponse = await getUserList({ pageNumber: 1, pageSize });

    // data from dummy JSON
    const userListResponse = userData;
    const columns = [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Designation',
        accessor: 'designation',
      },
      {
        Header: 'Department Name',
        accessor: 'departmentName',
      },
      {
        Header: 'Status',
        accessor: 'active',
      }
    ];
    this.setState({ columns, userList: userListResponse.user, paging: userListResponse.paging });
  }

  nextPage = async () => {
    const { getUserList } = this.props;
    const { paging: { pageIndex }, pageSize } = this.state;
    let userListResponse = await getUserList({ pageNumber: pageIndex + 1, pageSize });
    this.setState({ userList: userListResponse.user, paging: userListResponse.paging });
  }

  previousPage = async () => {
    const { getUserList } = this.props;
    const { paging: { pageIndex }, pageSize } = this.state;
    let userListResponse = await getUserList({ pageNumber: pageIndex - 1, pageSize });
    this.setState({ userList: userListResponse.user, paging: userListResponse.paging });
  }

  gotoPage = async (page) => {
    const { getUserList } = this.props;
    const { pageSize } = this.state;
    let userListResponse = await getUserList({ pageNumber: page, pageSize });
    this.setState({ userList: userListResponse.user, paging: userListResponse.paging });
  }

  setPageSize = async (pageSize) => {
    const { getUserList } = this.props;
    const { paging: { pageIndex } } = this.state;
    let userListResponse = await getUserList({ pageNumber: pageIndex, pageSize });
    this.setState({ userList: userListResponse.user, paging: userListResponse.paging, pageSize });

  }
  render() {
    const { columns, userList, paging } = this.state;
    return (
      <CustomTable columns={columns} data={userList} paging={paging}
        nextPage={this.nextPage} previousPage={this.previousPage} gotoPage={this.gotoPage}
        setPageSize={this.setPageSize} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.user.userList
  }
};

const mapDispatchToProps = (dispatch) => ({
  getUserList: ({ ...rest }) => dispatch(getUserList(rest))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
