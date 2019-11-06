import React, { Component } from 'react';
import compose from "recompose/compose";
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { changePasswordValidation } from '../../util/validations';
import { CHANGE_PASSWORD_ERROR, INFO_PASSWORD } from '../../constants/constants';
import Tooltip from '@material-ui/core/Tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

class ChangePasswordComponent extends Component {
   constructor(props){
      super(props);
      this.state = {
         fields: this.getInitialstate(props),
         prevObj: this.getInitialstate(props),
         errors: {},
         isFormValid: true,
         toggleOldPassword: false,
         toggleNewPassword: false,
         isInvalidChangePassword: false,
         changePasswordErrorMessage: ''
      };
  }

  getInitialstate = state => {
   const obj = {
      oldPassword: state.oldPassword || '',
      newPassword: state.newPassword || '',
      confirmPassword: state.confirmPassword ||'',
   };
   return obj;
}

_handleChange = e => {
   const { value, name } = e.currentTarget;
   const { fields } = this.state;
   fields[name] = value;
   this.setState({
      fields,
      errors:{}
   });
};

_togglePassword = e => {
   const fieldName = e.currentTarget.name;
   let { toggleOldPassword, toggleNewPassword, toggleConfirmPassword } = this.state;
   if(fieldName === 'oldPassword') {
      toggleOldPassword = !toggleOldPassword;
   } else if(fieldName === 'newPassword'){
      toggleNewPassword = !toggleNewPassword;
   }
   else if(fieldName === 'confirmPassword'){
      toggleConfirmPassword = !toggleConfirmPassword;
   }
   this.setState({
       toggleOldPassword,
       toggleNewPassword,
       toggleConfirmPassword,
   });
}

_checkValidation = () => {
   const { fields } = this.state;
   let changePasswordErrorMessage = '';
   const formStatus = changePasswordValidation(fields);
   if(!formStatus.status) {
      changePasswordErrorMessage = CHANGE_PASSWORD_ERROR.FORM_MSG;
   }
   if(formStatus.errors.notMactchingPassword) {
      changePasswordErrorMessage = CHANGE_PASSWORD_ERROR.MATCH_CONFIRM_PASSWORD_MSG;
   }
   this.setState({
     errors: formStatus.errors,
     isFormValid: formStatus.status,
     changePasswordErrorMessage
   });
   return formStatus.status;
};

componentWillReceiveProps(nextProps) {
   const { changePassword } =  nextProps;
   let changePasswordErrorMessage = '';
   let invalidChangePassword = false;
   if(changePassword) {
      const changePasswordResponseMsg = changePassword && changePassword.message ? changePassword.message : '';
      const changePasswordSuccessCode = changePassword && changePassword.code ? changePassword.code : null;
      if(changePasswordSuccessCode === 400) {
         changePasswordErrorMessage = changePasswordResponseMsg;
         invalidChangePassword = true;
      }
      this.setState({
         changePasswordErrorMessage,
         isInvalidChangePassword: invalidChangePassword
      });
   }
}

_submitForm = () => {
   let status = this._checkValidation();
   if(status) {
      const dataObj = this.state.fields;
      this.props.submitForm(dataObj);
   }
}

render () {
   const { toggleOldPassword, toggleNewPassword, toggleConfirmPassword, oldPassword, newPassword, confirmPassword } = this.state;
   const { errors, changePasswordErrorMessage, isInvalidChangePassword } = this.state;
   let oldPasswordType = 'password';
   let newPasswordType = 'password';
   let confirmPasswordType = 'password';
   oldPasswordType = toggleOldPassword ? 'text' : 'password';
   newPasswordType = toggleNewPassword ? 'text' : 'password';
   confirmPasswordType = toggleConfirmPassword ? 'text' : 'password';
   return (
        <div className="ecom-dashboard-wrapper change-password-page">
            <div className="page-heading">
               <h1 className="inline-block-element">Change Password</h1>
               { (Object.getOwnPropertyNames(errors).length > 0 || isInvalidChangePassword ) && 
                  <div className="error generic-msg">{ changePasswordErrorMessage } </div>
               }
         </div>
         <div className="rct-block change-password-block">
            <div className="rct-block-title "></div>
            <div className="collapse show">
               <div className="rct-block-content password-block-contents">
                  <FormControl>
                     <InputLabel>Old Password </InputLabel>
                        <Input
                           name="oldPassword"
                           type={ oldPasswordType }
                            value={ oldPassword }
                           onChange={this._handleChange}
                           endAdornment={
                              <InputAdornment position="end">
                              <IconButton
                                 aria-label="toggle password visibility"
                                 onClick={this._togglePassword}
                                 name="oldPassword"
                              >
                              { toggleOldPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl>
                     <InputLabel>New Password </InputLabel>
                        <Input
                           name="newPassword"
                           type={ newPasswordType }
                            value={ newPassword }
                           onChange={this._handleChange}
                           endAdornment={
                              <InputAdornment position="end">
                              <Tooltip title={INFO_PASSWORD.FORM_MSG} placement="top">
                                 <span className="info-color"><InfoOutlinedIcon/></span>
                              </Tooltip>
                              <IconButton
                                 aria-label="toggle password visibility"
                                 onClick={this._togglePassword}
                                 name="newPassword"
                              >
                              { toggleNewPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                              
                            </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl>
                     <InputLabel>Confirm Password </InputLabel>
                        <Input
                           name="confirmPassword"
                           type={ confirmPasswordType }
                            value={ confirmPassword }
                           onChange={this._handleChange}
                           endAdornment={
                              <InputAdornment position="end">
                              <IconButton
                                 aria-label="toggle password visibility"
                                 onClick={this._togglePassword}
                                 name="confirmPassword"
                              >
                              { toggleConfirmPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                            }
                        />
                    </FormControl>
                     <div className="change-password-button">
                        <button type="button" className="btn btn-primary" onClick={ this._submitForm }>Save</button>
                     </div>
               </div>
            </div>
         </div>
      </div>
   );
   }
}

export default ChangePasswordComponent;