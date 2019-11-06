/**
 * Activate User
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';
import { postResendActivationEmail } from '../actions/UserManagement/userManagement';
import { USERS } from '../constants/constants';

class ActivateUser extends Component {
   constructor(props) {
      super(props);
      this.state = {
          activateUserPayload: this._getRegisterData(props),
          showSucessMessage: false
      };
   }

   componentWillReceiveProps(nextProps) {
      const sucessCode = nextProps && nextProps.userActivation && nextProps.userActivation.code;
      if(nextProps && sucessCode === 200 ) {
         this.setState ({
            showSucessMessage: true
         })
         setTimeout(() => {
            this.setState({
               showSucessMessage: false
            })
         }, 2000);
         this.props.postResendActivationEmail();
      }
   }

   _getRegisterData = props => {
      const { registerDetails } = props;
      const activateUserPayload = {};
      if(registerDetails && registerDetails.registerId) {
          activateUserPayload.email = registerDetails.email;
          activateUserPayload.inviteToken = registerDetails.inviteToken;
          activateUserPayload.firstName = registerDetails.firstName;
      }
      return activateUserPayload;
   }

   _resendUserActivationEmail = () => {
      const { activateUserPayload } = this.state;
      if(activateUserPayload) {
          const dataObj = {
              data: activateUserPayload,
              authToken: activateUserPayload.inviteToken
          };
          this.props.postResendActivationEmail(dataObj);
      }
   }


   render() {
      const { loading, registerDetails } = this.props;
      const { showSucessMessage} = this.state;
      const userEmail = registerDetails && registerDetails ? registerDetails && registerDetails.email : '';
      return (
         <QueueAnim type="bottom" duration={2000}>
            <div className="rct-session-wrapper">
               {loading &&
                  <LinearProgress />
               }
               <AppBar position="static" className="session-header">
                  <Toolbar>
                     <div className="container">
                        <div className="d-flex justify-content-between">
                           <div className="session-logo">
                              <Link to="/">
                                 <img src={require('Assets/img/st-logo.png')} alt="session-logo" className="img-fluid" width="100%" height="35" />
                              </Link>
                           </div>
                         
                        </div>
                     </div>
                  </Toolbar>
               </AppBar>
               <div className="session-inner-wrapper">
                  <div className="container">
                     <div className="row row-eq-height">
                        <div className="col-sm-7 col-md-7 col-lg-8">
                           {
                              showSucessMessage ? <div className="alert alert-success" role="alert">
                              { USERS.RESEND_USER_ACTIVATION_EMAIL_MSG } </div> : null
                           }
                           <div className="session-body text-center">
                              <div className="session-head mb-30">
                                 <h2 className="font-weight-bold">Activate Your Account</h2>
                              </div>
                              <div>
                                 { USERS.REGISTER_SUCCESS_MSG }
                              </div><br /><br />
                              <div> { USERS.ACTIVATE_USER_EMAIL_MSG1 } { userEmail }. { USERS.ACTIVATE_USER_EMAIL_MSG2 } 
                                 <Link className="text-muted click-here-link" onClick={ this._resendUserActivationEmail }>&nbsp; &nbsp;Click here</Link>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </QueueAnim>
      );
   }
}

// map state to props
const mapStateToProps = state => {
   const { UserManagement, authUser  } = state;
   const registerDetails = UserManagement && UserManagement.register && UserManagement.register.userDetails;
   const userActivation = UserManagement && UserManagement.userActivation;
   const loading = authUser && authUser.loading;
   return {
      registerDetails,
      loading,
      userActivation
   };
};

const mapDispatchToProps = dispatch => {
   return {
      postResendActivationEmail: data => {
         return dispatch(postResendActivationEmail(data))
      }
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivateUser);
