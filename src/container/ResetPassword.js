/**
 * Reset Password
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input } from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import QueueAnim from 'rc-queue-anim';
import { resetPasswordValidation } from '../util/validations';
import { RESET_PASSWORD_ERROR, INFO_PASSWORD } from '../constants/constants'
import { postResetPassword } from '../actions/UserManagement/userManagement';
import { deleteLocalData } from '../util/storage';
import Tooltip from '@material-ui/core/Tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
class ResetPassword extends Component {

   constructor(props){
      super(props);
      this.state = {
         resetPasswordToken: this._getResetPasswordToken(props),
         fields: this.getInitialstate(props),
         errors: {},
         isFormValid: true,
         enterPassword: '',
         confirmPassword: '', 
         togglePassword: false,
         toggleConfirmPassword: false,
         resetErrorMessage: '',
         showSucessMessage: false
      }
      this._onKeyPress = this._onKeyPress.bind();
   }

   _onKeyPress = (e) => {
      if (e.key === 'Enter') {
        this._submitForm();
      }
    }

   _getResetPasswordToken = props => {
      let forgotToken = '';
      const urlParams = new URLSearchParams(props.location.search);
      if(urlParams) {
          forgotToken = urlParams.get('forgotToken');
      }
      return forgotToken;
   }

   getInitialstate = state => {
      const obj = {
         password:            state.password || '',
         confirmPassword:     state.confirmPassword || '',
      };
      return obj;
   }

   _togglePassword = e => {
      const fieldName = e.currentTarget.id;
      
      let { togglePassword, toggleConfirmPassword } = this.state;
      if(fieldName === 'enterPassword') {
         togglePassword = !togglePassword;
      } else if(fieldName === 'confirmPassword'){
         toggleConfirmPassword = !toggleConfirmPassword;
      }
      this.setState({
         togglePassword,
         toggleConfirmPassword,
      });
   }

   _checkValidation = () => {
      const { fields } = this.state;
      let resetErrorMessage = '';
      const formStatus = resetPasswordValidation(fields);
      if(!formStatus.status) {
         resetErrorMessage = RESET_PASSWORD_ERROR.FORM_MSG;
      }
      if(formStatus.errors.notMactchingPassword) {
         resetErrorMessage = RESET_PASSWORD_ERROR.MATCH_CONFIRM_PASSWORD_MSG;
      }
      this.setState({
        errors: formStatus.errors,
        isFormValid: formStatus.status,
        resetErrorMessage
      });
      return formStatus.status;
   };

   _removeUserToken() {
      deleteLocalData('authToken');
      deleteLocalData('registerId');
      deleteLocalData('userType');
   }

   componentWillReceiveProps(nextProps) {
      const { resetPassword } =  nextProps;
      let resetErrorMessage = '';
      if(resetPassword) {
         const resetPasswordResponseMsg = resetPassword && resetPassword.message ? resetPassword.message : '';
         const resetPasswordSuccessCode = resetPassword && resetPassword.code ? resetPassword.code : null;
         if(resetPasswordSuccessCode === 200) {
            resetErrorMessage = resetPasswordResponseMsg;
            this._showSuccessNotification(resetPasswordSuccessCode);
         }
         this.setState({
            resetErrorMessage
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
            this._removeUserToken();
            this.props.history.push("/signin");
         }, 2000);
      }
   }

   _handleChange = e => {
      const { value, name } = e.currentTarget;
      const { fields } = this.state;
      fields[name]= value;
      this.setState({
         fields,
         errors:{},
         resetErrorMessage: ''
      });
   };


   _submitForm = () => {
      let status = this._checkValidation();
      const { resetPasswordToken } = this.state;
      if(status && resetPasswordToken) {
         const dataObj = this.state.fields;
         dataObj.forgotToken = resetPasswordToken;
         this.props.postResetPassword(dataObj);
      }
   }

   render() {
      const { password, confirmPassword } = this.state.fields;
      const { errors, togglePassword, toggleConfirmPassword, showSucessMessage, resetErrorMessage } = this.state;
      let PasswordType = 'password';
      let confirmPasswordType = 'password';
      PasswordType = togglePassword ? 'text' : 'password';
      confirmPasswordType = toggleConfirmPassword ? 'text' : 'password';
      const { loading } = this.props;
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
                              { resetErrorMessage } </div> : null
                           }
                           <div className="session-body text-center">
                              <div className="session-head mb-30">
                                 <h2 className="font-weight-bold">Reset Password</h2>
                                 { Object.getOwnPropertyNames(errors).length > 0 && 
                                   <div className="error generic-msg"> { resetErrorMessage } </div>
                                 }
                              </div>
                              <Form>
                                 <FormGroup className="has-wrapper">
                                    <Input
                                       type={ PasswordType }
                                       value={ password }
                                       name="password"
                                       className="has-input input-lg"
                                       placeholder="Enter New Password"
                                       maxLength="15"
                                       onKeyPress={this._onKeyPress}
                                       onChange={this._handleChange}
                                    />
                                    <Tooltip title={INFO_PASSWORD.FORM_MSG} placement="top">
                                       <span className="password-info"><InfoOutlinedIcon/></span>
                                    </Tooltip>
                                    <span onClick={this._togglePassword} id="enterPassword" className="has-icon">
                                    { togglePassword ? <i className="ti-unlock"></i> : <i className="ti-lock"></i>}
                                    </span>
                                    
                                 </FormGroup>
                                 <FormGroup className="has-wrapper">
                                    <Input
                                       value={ confirmPassword }
                                       type={ confirmPasswordType }
                                       name="confirmPassword"
                                       className="has-input input-lg"
                                       placeholder="Confirm Password"
                                       maxLength="15"
                                       onKeyPress={this._onKeyPress}
                                       onChange={this._handleChange}
                                    />
                                    <span onClick={this._togglePassword} id="confirmPassword" className="has-icon">
                                    { toggleConfirmPassword ? <i className="ti-unlock"></i> : <i className="ti-lock"></i>}
                                    </span>
                                 </FormGroup>
                                 <FormGroup className="mb-15">
                                    <Button
                                       color="primary"
                                       className="btn-primary text-white w-100"
                                       variant="contained"
                                       size="large"
                                       onClick={ this._submitForm}
                                    >
                                       Reset Password
                            			</Button>
                                 </FormGroup>
                              </Form>
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
   const resetPassword = UserManagement && UserManagement.resetPassword;
   const loading = authUser && authUser.loading;
   return {
      resetPassword,
      loading
   };
};

const mapDispatchToProps = dispatch => {
   return {
      postResetPassword: data => {
         return dispatch(postResetPassword(data))
      }
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);