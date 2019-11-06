import React, { Component } from 'react';
import { connect } from 'react-redux';
import GeneralInfoComponent from '../../components/Associate/GeneralInfoComponent'
import GeneralInfoDetailsComponent from '../../components/Associate/GeneralInfoDetailsComponent'
import { getUserData, postAssociateGeneralInfo, postAssociateDocumentUpload } from '../../actions/UserManagement/userManagement';
import { loadData } from '../../util/storage';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

class GeneralInfo extends Component {
   constructor(props) {
      super(props);
      this.state = {
         associateResponseMessage: '',
         showSucessMessage: false
      };
      this._getUserData(props);
   }

   componentWillReceiveProps(nextProps) {
      const { associateGeneralInfo, associateDocumentUpload } =  nextProps;
      let associateResponseMessage = '';
      if(nextProps) {
         if(associateGeneralInfo) {
            const associateResponseMsg = associateGeneralInfo && associateGeneralInfo.message ? associateGeneralInfo.message : '';
            const associateSuccessCode = associateGeneralInfo && associateGeneralInfo.code ? associateGeneralInfo.code : null;
            if(associateSuccessCode === 200) {
               associateResponseMessage = associateResponseMsg;
               this._showSuccessNotification(associateSuccessCode);
            }
         }
         if(associateDocumentUpload) {
            const associateResponseMsg = associateDocumentUpload && associateDocumentUpload.message ? associateDocumentUpload.message : '';
            const associateSuccessCode = associateDocumentUpload && associateDocumentUpload.code ? associateDocumentUpload.code : null;
            if(associateSuccessCode === 200) {
               associateResponseMessage = associateResponseMsg;
               this._showSuccessNotification(associateSuccessCode);
            }
         }
         this.setState({
            associateResponseMessage
         });
      }
   }

   _showSuccessNotification = successCode => {
      if(successCode === 200) {
         this.setState ({
            showSucessMessage: true
         })
         setTimeout(() => {
            this.setState({
               showSucessMessage: false
            })
         }, 2000);
         this.props.postAssociateGeneralInfo();
         this.props.postAssociateDocumentUpload();
         this._getUserData(this.props);
      }
   }

   _submitForm = data => {
      const authToken = loadData('authToken');
      const dataObj = {
         data,
         authToken
      };
      this.props.postAssociateGeneralInfo(dataObj);
   }

   _getUserData = (props) => {
      const { login } = props;
      let id = login && login.registerId ? login.registerId : null;
      let authToken = login && login.authToken ? login.authToken : '';
      if(!id) {
          id = loadData('registerId');
          authToken = loadData('authToken');
      }
      const dataObj = {
         authToken,
         id
      }
      if(id) {
          this.props.getUserData(dataObj);
      }
   }

   _submitFiles = files => {
      const authToken = loadData('authToken');
      const registerId = loadData('registerId');
      const dataObj = {
         files,
         authToken,
         registerId
      }
      if(files) {
          this.props.postAssociateDocumentUpload(dataObj);
      }
   }

   render () {
      const userData = this.props && this.props.users ? this.props.users : null;
      const userStatus = userData && userData.status;
      const userFirstName = userData && userData.firstName;
      const { associateResponseMessage, showSucessMessage } = this.state;
      return (
         <div className="ecom-dashboard-wrapper">
            <div className="associate-header">
               <div className="logo">
                  <img src={require('Assets/img/st-logo.png')} alt="Logo" />
               </div>
               
               <div className="associate-log-out">
                  <span className="associate-icon"><AccountCircleIcon/></span>
                  <span className="user-name">{ userFirstName } </span>
                  <span className="vr-line"> | </span>
                  <span className="user-log-out"><a href="/signin">Log-Out</a></span>
               </div>

            </div>
            
            {
               showSucessMessage ? <div className="alert alert-success" role="alert">
               { associateResponseMessage } </div> : null
            }
            { userStatus === 'Confirmed' &&  
               <GeneralInfoComponent 
                  userData = { userData } 
                  submitForm={ this._submitForm } 
               />
            }
            { (userStatus === 'Genreal Info Submitted' || userStatus === 'Documents Submitted' || userStatus === 'Documents Requested' 
               || userStatus === 'Rejected' || userStatus === 'Agreement Sent' || userStatus === 'Agreement Esigned') && userData && 
               <GeneralInfoDetailsComponent 
                  userData = { userData } 
                  submitFiles={ this._submitFiles }
               />
            }
         </div>
      );
   }
}

// map state to props
const mapStateToProps = state => {
   const { UserManagement  } = state;
   const login = UserManagement && UserManagement.login;
   const users = UserManagement && UserManagement.userData && UserManagement.userData.user;
   const associateGeneralInfo = UserManagement && UserManagement.associateGeneralInfo;
   const associateDocumentUpload = UserManagement && UserManagement.associateDocumentUpload;
   return {
      login,
      users,
      associateGeneralInfo,
      associateDocumentUpload
   };
};

const mapDispatchToProps = dispatch => {
   return {
      getUserData: data => {
         return dispatch(getUserData(data))
      },
      postAssociateGeneralInfo: data => {
         return dispatch(postAssociateGeneralInfo(data))
      },
      postAssociateDocumentUpload: data => {
         return dispatch(postAssociateDocumentUpload(data))
      }
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralInfo);
