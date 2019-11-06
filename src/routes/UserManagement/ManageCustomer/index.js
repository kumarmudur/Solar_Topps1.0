import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import IntlMessages from 'Util/IntlMessages';
import Footer from 'Components/Footer/Footer';
import { getCustomerList, getUserData, postAddUser, postDeleteUser  } from '../../../actions/UserManagement/userManagement';
import ManageCustomerComponent from '../../../components/UserManagement/Users/ManageCustomerComponent';
import { loadData } from '../../../util/storage';
import { ALERT_MESSAGE } from '../../../constants/constants';

class CustomerManagement extends Component {

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
      this.props.getCustomerList(data);
   }

   _openAddNewCustomerPage = () => {
      window.open( 'https://cp.solartopps.us/signup', '_blank' );
      // this.props.getUserData();
      // this.props.postAddUser();
   }

   _getUserData = id => {
        const authToken = loadData('authToken');
        const dataObj = {
           authToken,
           id
        }
        this.props.getUserData(dataObj);
        this.props.history.push("/app/UserManagement/CustomerDetails");
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
      const { showSucessMessage, alertMessage, alertClass } = this.state;    

      return (
         <div className="ecom-dashboard-wrapper">
            <Helmet> <title>Manage Customers</title> </Helmet>
            <PageTitleBar title={<IntlMessages id="sidebar.manageCustomers" />} match={match} />
            
            {
               showSucessMessage ? 
                  <div className={ alertClass } role="alert"> { alertMessage }</div> : null
            }
            <div className="add-button"> 
               <button type="button" className="btn btn-primary" onClick={ this._openAddNewCustomerPage }>Add New Customer</button>
            </div>
            <div className="page-min-ht">
               <ManageCustomerComponent 
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
   const { CustomerManagement, UserManagement } = state;
   const users = CustomerManagement && CustomerManagement.users;
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
      getCustomerList: data => {
         return dispatch(getCustomerList(data))
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerManagement )