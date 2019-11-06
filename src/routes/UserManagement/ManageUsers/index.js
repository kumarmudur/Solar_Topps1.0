import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import IntlMessages from 'Util/IntlMessages';
import Footer from 'Components/Footer/Footer';
import { getUserList, getUserData, postAddUser, postDeleteUser } from '../../../actions/UserManagement/userManagement';
import ManageUserComponent from '../../../components/UserManagement/Users/ManageUserComponent';
import { loadData } from '../../../util/storage';
import { ALERT_MESSAGE } from '../../../constants/constants';

class UserManagement extends Component {
   constructor(props){
      super(props);
      this.state= {
         showSucessMessage: false,
         alertMessage: '',
         alertClass: 'alert alert-success'
      }
   }

   componentDidMount() {
      this._getData(
         {
             pageNumber: 0,
             pageSize: 10
         }
     );
   }

   componentWillReceiveProps(nextProps) {
      const { submitResult, deleteResult } = nextProps;
      if(submitResult && submitResult.code === 200) {
         this._callSetStateAlertMessage('SUCCESS', 'alert alert-success');
         this.props.postAddUser();
      }
      if(deleteResult && deleteResult.code === 200) {
         this._callSetStateAlertMessage('DELETE', 'alert alert-success');
         this.props.postDeleteUser();
      }
   }

   _callSetStateAlertMessage = (alert, alertClass) => {
      if(alert === 'DELETE' || alert === 'DUPLICATE_DELETE') {
         this._getData(
            {
                pageNumber: 0,
                pageSize: 10
            }
         );
      }
      this.setState ({
         showSucessMessage: true,
         alertMessage: ALERT_MESSAGE[alert],
         alertClass
      })
      setTimeout(() => {
         this.setState({
            showSucessMessage: false,
            alertMessage: ''
         })
      }, 2000);
   }

   _getData = data => {
      const authToken = loadData('authToken');
      data.authToken = authToken;
      this.props.getUserList(data);
    }

    _openAddNewUserPage = () => {
       this.props.history.push("/app/UserManagement/Users");
       this.props.getUserData();
       this.props.postAddUser();
    }

    _getUserData = id => {
         const authToken = loadData('authToken');
         const dataObj = {
            authToken,
            id
         }
         this.props.getUserData(dataObj);
         this.props.history.push("/app/UserManagement/UserDetails");
    }

    _deleteUser = ids => {
       if(ids === true) {
         this._callSetStateAlertMessage('DUPLICATE_DELETE', 'alert alert-danger');
      } else {
         const authToken = loadData('authToken');
         const dataObj = {
            authToken,
            ids
         }
         this.props.postDeleteUser(dataObj);
      }
    }

   render() {
      const { match, users } = this.props;
      const { showSucessMessage, alertMessage, alertClass} = this.state;    
      return (
         <div className="ecom-dashboard-wrapper">
            <Helmet>
               <title>Manage Users</title>
               <meta name="description" content="User Management - Manage Users" />
            </Helmet>
            <PageTitleBar title={<IntlMessages id="sidebar.manageuser" />} match={match} />
            {
               showSucessMessage ? 
                  <div className={ alertClass } role="alert"> { alertMessage }</div> : null
            }
            <div className="add-button"> 
               <button type="button" className="btn btn-primary" onClick={ this._openAddNewUserPage }>Add New User</button>
            </div>
            <div className="page-min-ht">
               <ManageUserComponent 
                  users={ users }
                  getUserData={ this._getUserData }
                  deleteUser={ this._deleteUser }
               />     
            </div>
         <Footer />
         </div>
      )
   }
}

const mapStateToProps = state => {
   const { UserManagement } = state;

   const users = UserManagement && UserManagement.users;
   const submitResult = UserManagement && UserManagement.submitUser;
   const deleteResult = UserManagement && UserManagement.deleteUser;
   return {
      submitResult,
      users,
      deleteResult
   }
 };

 const mapDispatchToProps = dispatch => {
    return {
      getUserList: data => {
         return dispatch(getUserList(data))
      },
      getUserData: data => {
         return dispatch(getUserData(data))
      },
      postAddUser: data => {
         return dispatch(postAddUser(data))
      },
      postDeleteUser: data => {
         return dispatch(postDeleteUser(data));
      }
    }
 }

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
