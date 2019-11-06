/**
 * Forgot Password
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
import { forgotPasswordFormValidation } from '../util/validations';
import { EMAIL_ERROR } from '../constants/constants'
import { postForgotPassword } from '../actions/UserManagement/userManagement';


class ForgotPassword extends Component {

   constructor(props){
      super(props);
      this.state = {
         fields: this.getInitialstate(props),
         errors: {},
         isFormValid: true,
         isInvalidForgotPassword: false,
         forgotErrorMessage: '',
         showSucessMessage: false
      }
      this._onKeyPress = this._onKeyPress.bind();
   }
   
   getInitialstate = state => {
      const obj = {
         email: state.email || ''
      };
         return obj;
   }

   _onKeyPress = (e) => {
      if (e.key === 'Enter') {
        this._submitForm();
      }
    }

   _checkValidation = () => {
      const { fields } = this.state;
      let forgotErrorMessage = '';
      const formStatus = forgotPasswordFormValidation(fields);
      if(!formStatus.status) {
         forgotErrorMessage = EMAIL_ERROR.FORM_MSG;
      }
      this.setState({
         errors: formStatus.errors,
         isFormValid: formStatus.status,
         forgotErrorMessage
      });
      return formStatus.status;
   };

   componentWillReceiveProps(nextProps) {
      const { forgotPassword } =  nextProps;
      let forgotErrorMessage = '';
      let invalidForgotPassword = false;
      if(forgotPassword) {
         const forgotPasswordResponseMsg = forgotPassword && forgotPassword.message ? forgotPassword.message : '';
         const forgotPasswordSuccessCode = forgotPassword && forgotPassword.code ? forgotPassword.code : null;
         if(forgotPasswordSuccessCode === 403) {
            forgotErrorMessage = forgotPasswordResponseMsg;
            invalidForgotPassword = true;
         }
         if(forgotPasswordSuccessCode === 200) {
            forgotErrorMessage = forgotPasswordResponseMsg;
            invalidForgotPassword = false;
            this._showSuccessNotification(forgotPasswordSuccessCode);
         }
         this.setState({
            forgotErrorMessage,
            isInvalidForgotPassword: invalidForgotPassword
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
         forgotErrorMessage: ''
      });
   };

   _submitForm = () => {
      let status = this._checkValidation();
      if(status) {
         const dataObj = this.state.fields;
         dataObj.originApp= 'adminApp';
        this.props.postForgotPassword(dataObj);
      }
  }


   render() {
      const { loading } = this.props;
      const { email } = this.state.fields;
      const { errors, showSucessMessage, isInvalidForgotPassword, forgotErrorMessage } = this.state;
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
                           <div>
                              <Link to="/signin" className="mr-15 text-white">Back to</Link>
                              <Button component={Link} to="/signin" variant="contained" className="btn-light" >
                                 Sign In
							         </Button>
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
                              { forgotErrorMessage } </div> : null
                           }
                           <div className="session-body text-center">
                              <div className="session-head mb-30">
                                 <h2 className="font-weight-bold">Forgot Password</h2>
                                 { (Object.getOwnPropertyNames(errors).length > 0 || isInvalidForgotPassword) && 
                                   <div className="error generic-msg"> { forgotErrorMessage } </div>
                                 }
                              </div>
                              <Form>
                                    <FormGroup className="has-wrapper">
                                    <Input
                                       type="mail"
                                       value={email}
                                       name="email"
                                       maxLength="50"
                                       className="has-input input-lg"
                                       placeholder="Enter Email Address"
                                       onKeyPress={this._onKeyPress}
                                       onChange={this._handleChange}
                                    />
                                    <span className="has-icon"><i className="ti-email"></i></span>
                                 </FormGroup>

                                    <FormGroup className="mb-15">
                                    <Button
                                       className="btn-primary text-white btn-block w-100"
                                       variant="contained"
                                       size="large"
                                       onClick={ this._submitForm }>
                                       Forgot Password
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
   const forgotPassword = UserManagement && UserManagement.forgotPassword;
   const loading = authUser && authUser.loading;
   return {
      forgotPassword,
      loading
   };
};

const mapDispatchToProps = dispatch => {
   return {
      postForgotPassword: data => {
         return dispatch(postForgotPassword(data))
      }
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
