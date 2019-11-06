/**
 * Signin
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
import { signinFormValidation } from '../util/validations';
import { LOGIN_REGISTER_ERROR } from '../constants/constants';
import { postLogin } from '../actions/UserManagement/userManagement';
import { saveData } from '../util/storage';

class Signin extends Component {

   constructor(props){
      super(props);
      this.state = {
         fields: this.getInitialstate(props),
         errors: {},
         isFormValid: true,
         isInvalidLogin: false,
         loginErrorMessage: ''
      }
      this._onKeyPress = this._onKeyPress.bind();
   }

  getInitialstate = state => {
      const obj = {
         email:            state.email || '',
         password:         state.password || '',
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
      let loginErrorMessage = '';
      const formStatus = signinFormValidation(fields);
      if(!formStatus.status) {
         loginErrorMessage = LOGIN_REGISTER_ERROR.FORM_MSG;
      }
      this.setState({
        errors: formStatus.errors,
        isFormValid: formStatus.status,
        loginErrorMessage
      });
      return formStatus.status;
    };


   componentWillReceiveProps(nextProps) {
      const { login } =  nextProps;
      let loginErrorMessage = '';
      let invalidLogin = false;
      if(login) {
         const loginResponseMsg = login && login.message ? login.message : '';
         const loginSuccessCode = login && login.code ? login.code : null;
         const authToken = login && login.authToken ? login.authToken : '';
         const registerId = login && login.registerId ? login.registerId : null;
         const userType = login && login.userType ? login.userType : '';
         const status = login && login.status ? login.status : '';
         if(loginSuccessCode === 200) {
            loginErrorMessage = '';
            invalidLogin = false;
            saveData('authToken', authToken);
            saveData('registerId', registerId);
            saveData('userType', userType);
            if(userType === 'Associate' && status !== 'Pending For Verification') {
               this.props.history.push("/associate/generalInfo");
            }
            else if(status !== 'Pending For Verification') {
               this.props.history.push("/app/home/landing-page");
            }
            else if(status === 'Pending For Verification') {
               invalidLogin = true;
               loginErrorMessage = LOGIN_REGISTER_ERROR.ACCOUNT_NOT_ACTIVATED;
            }
         }
         else {
            loginErrorMessage = loginResponseMsg;
            invalidLogin = true;
         }
         this.setState({
            loginErrorMessage,
            isInvalidLogin: invalidLogin
         });
      }
   }

   _handleChange = e => {
      const { value, name } = e.currentTarget;
      const { fields } = this.state;
      fields[name]= value;
      this.setState({
         fields,
         errors:{},
         loginErrorMessage: ''
      });
   };

   _submitForm = () => {
      let status = this._checkValidation();
      const { fields } = this.state;
      if(status) {
         const dataObj = {
            userName: fields.email,
            password: fields.password
         };
         this.props.postLogin(dataObj);
      }
   }

   render() {
      const { email, password } = this.state.fields;
      const { errors, loginErrorMessage, isInvalidLogin } = this.state;
      const { errorEmail, errorPassword } = errors;
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
                           <div>
                              <Link to="/signup" className="mr-15 text-white">Create new account?</Link>
                              <Button variant="contained" className="btn-light" component={Link} to="/signup" >Sign Up</Button>
                           </div>
                        </div>
                     </div>
                  </Toolbar>
               </AppBar>
               <div className="session-inner-wrapper">
                  <div className="container">
                     <div className="row row-eq-height">
                        <div className="col-sm-7 col-md-7 col-lg-8">
                           <div className="session-body text-center">
                              <div className="session-head mb-30">
                                 <h2 className="font-weight-bold">Get started with SolarTopps - Sign In</h2>
                                 { (Object.getOwnPropertyNames(errors).length > 0 || isInvalidLogin ) && 
                                    <div className="error generic-msg">{ loginErrorMessage } </div>
                                 }
                              </div>
                              <Form>
                                 <FormGroup className="has-wrapper">
                                    <Input
                                       type="mail"
                                       value={email}
                                       name="email"
                                       id="email"
                                       className="has-input input-lg"
                                       placeholder="Email Address"
                                       maxLength="50"
                                       onKeyPress={this._onKeyPress} 
                                       onChange={this._handleChange}
                                    />
                                    <span className="has-icon"><i className="ti-email"></i></span>
                                 </FormGroup>
                                 <FormGroup className="has-wrapper">
                                    <Input
                                       value={password}
                                       type="Password"
                                       name="password"
                                       id="password"
                                       className="has-input input-lg"
                                       placeholder="Password"
                                       maxLength="15"
                                       onKeyPress={this._onKeyPress} 
                                       onChange={this._handleChange}
                                    />
                                    <span className="has-icon"><i className="ti-lock"></i></span>
                                 </FormGroup>
                                 <FormGroup className="mb-15">
                                    <Button
                                       color="primary"
                                       className="btn-primary text-white w-100"
                                       variant="contained"
                                       size="large"
                                       onClick={ this._submitForm}
                                    >
                                       Sign In
                            			</Button>
                                 </FormGroup>
                              </Form>

                              <div className="login-links">
                                 {/* <div className="remember">
                                    <FormControlLabel
                                       value=""
                                       control={<Checkbox color="primary" />}
                                       label="Remember Me"
                                       labelPlacement="end"
                                       name="Remember"
                                    />
                                 </div> */}
                                 <div className="forgot-pwd"> 
                                    <Link to="/forgotpassword" className="text-muted">Forgot Password</Link> 
                                 </div>
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
   const login = UserManagement && UserManagement.login;
   const loading = authUser && authUser.loading;
   return {
      login,
      loading
   };
};

const mapDispatchToProps = dispatch => {
   return {
      postLogin: data => {
         return dispatch(postLogin(data))
      }
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
