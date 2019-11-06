import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from 'Components/Footer/Footer';
import UserComponent from '../../../components/UserManagement/Users/UserComponent';
import { postAddUser } from '../../../actions/UserManagement/userManagement';
import { getUserTypeList, getRoleList, getOfficeList, getDepartmentList } from '../../../actions/Common';
import { loadData } from '../../../util/storage';

class Users extends Component {
   constructor(props) {
      super(props);
      this.state = {
         userSubmitMessage: ''
      };
      this.contentEditFlag = false;
   }

   componentDidMount() {
      const authToken = loadData('authToken');
      const { getUserTypeList, getRoleList, getOfficeList, getDepartmentList, userData } = this.props;
      const registerId = userData && userData.user && userData.user.registerId ? userData.user.registerId : null;
      getUserTypeList({ authToken });
      getRoleList({ authToken });
      getOfficeList({ authToken });
      if(registerId) {
         const dataObj = {
            authToken,
            id: userData.user.officeId 
         };
         getDepartmentList(dataObj);
      }
   }

    _getSelectedOffice = id => {
      const authToken = loadData('authToken');
      const { getDepartmentList } = this.props;
      const dataObj = {
         authToken,
         id
      };
      getDepartmentList(dataObj);
   }

   componentWillReceiveProps(nextProps) {
     const { submitResult } = nextProps;
     if(submitResult && submitResult.code === 200 && this.contentEditFlag === true) {
         this.props.history.push('/app/UserManagement/ManageUsers');
     }
     if(submitResult && submitResult.code === 401) {
         this.setState({
            userSubmitMessage: submitResult.message 
         });  
     }
   }

   _submitForm = data => {
      const authToken = loadData('authToken');
      this.contentEditFlag = true; 
      const dataObj = {
         data,
         authToken
      };
      this.props.postAddUser(dataObj);
   }

   render() {
      const { userData, userTypeList, rolesList, officeList, departmentList } = this.props;
      const { userSubmitMessage } = this.state;
      
      return (
         <div className="ecom-dashboard-wrapper">
            <UserComponent 
               submitForm = { this._submitForm }
               userData={ userData && userData.user }
               userTypeList={ userTypeList }
               rolesList={ rolesList }
               officeList={ officeList }
               departmentList={ departmentList }
               getSelectedOffice = { this._getSelectedOffice }
               userSubmitMessage = { userSubmitMessage }
            />
            <Footer />
         </div>
      );
   }
}

const mapStateToProps = state => {
   const { UserManagement, Common  } = state;
   const userData = UserManagement && UserManagement.userData;
   const submitResult = UserManagement && UserManagement.submitUser;
   const userTypeList= Common && Common.userTypeList && Common.userTypeList.userTypes ? Common.userTypeList.userTypes : [];
   const rolesList= Common && Common.roleList && Common.roleList.roleList ? Common.roleList.roleList : [];
   const officeList= Common && Common.officeList && Common.officeList.offices ? Common.officeList.offices : [];
   const departmentList= Common && Common.departmentList && Common.departmentList.departments ? Common.departmentList.departments : [];

   return {
      submitResult,
      userData,
      userTypeList,
      rolesList,
      officeList,
      departmentList
   };
};

const mapDispatchToProps = dispatch => {
   return {
      postAddUser: data => {
         return dispatch(postAddUser(data))
      },
      getUserTypeList: data => {
         return dispatch(getUserTypeList(data))
      },
      getRoleList: data => {
         return dispatch(getRoleList(data))
      },
      getOfficeList: data => {
         return dispatch(getOfficeList(data))
      },
      getDepartmentList: data => {
         return dispatch(getDepartmentList(data))
      }
   };
};

 export default connect(mapStateToProps, mapDispatchToProps)(Users);