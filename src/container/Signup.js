/**
 * Sign Up
 */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input } from 'reactstrap';
import LinearProgress from '@material-ui/core/LinearProgress';
import MuiPhoneNumber from 'material-ui-phone-number';
import QueueAnim from 'rc-queue-anim';
import { signupFormValidation } from '../util/validations';
import { LOGIN_REGISTER_ERROR, INFO_PASSWORD } from '../constants/constants'
import { postRegister } from '../actions/UserManagement/userManagement';
import Tooltip from '@material-ui/core/Tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

class SignupForm extends Component {

   constructor(props){
      super(props);
      this.state = {
         fields: this.getInitialstate(props),
         errors: {},
         isFormValid: true,
         isInvalidRegister: false,
         registerErrorMessage: ''
      }
      this._onKeyPress = this._onKeyPress.bind();
   }
   
   getInitialstate = state => {
      const obj = {
         firstName:  state.firstName || '',
         lastName:   state.lastName || '',
         email:      state.email || '',
         phone:      state.phone || '',
         password:   state.password || '',
         userType:   'Associate'
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
      let registerErrorMessage = '';
      const formStatus = signupFormValidation(fields);
      if(!formStatus.status) {
         registerErrorMessage = LOGIN_REGISTER_ERROR.FORM_MSG;
      }
      this.setState({
         errors: formStatus.errors,
         isFormValid: formStatus.status,
         registerErrorMessage
      });
      return formStatus.status;
   };

   componentWillReceiveProps(nextProps) {
      const { register } =  nextProps;
      let registerErrorMessage = '';
      let InvalidRegister = false;
      if(register) {
         const registerResponseMsg = register && register.message ? register.message : '';
         const registerSuccessCode = register && register.code ? register.code : null;
         if(registerSuccessCode === 200) {
            registerErrorMessage = '';
            InvalidRegister = false;
            this.props.history.push("/activate");
         }
         if(registerSuccessCode === 401) {
            registerErrorMessage = registerResponseMsg;
            InvalidRegister = true;
         }
         this.setState({
            registerErrorMessage,
            isInvalidRegister: InvalidRegister
         });
      }
   }

   _handleChange = e => {
      const { value, name } = e.currentTarget;
      const { fields } = this.state;
      fields[name]= value;
      this.setState({
         fields,
         errors:{}
      });
   };

   _handlePhoneOnChange = (name, value) => {
      const { fields } = this.state;
      fields[name] = value;
      this.setState({
         fields
      });
   };

   _submitForm = () => {
      let status = this._checkValidation();
      if(status) {
         const dataObj = this.state.fields;
         this.props.postRegister(dataObj);
      }
  }

   render() {
      const { firstName, lastName, email, phone, password } = this.state.fields;
      const { errors, registerErrorMessage, isInvalidRegister } = this.state;
      const { loading } = this.props;
      return (
         <QueueAnim type="bottom" duration={2000}>
            <div className="rct-session-wrapper sign-up-page">
               {loading &&
                  <LinearProgress />
               }
               <AppBar position="static" className="session-header">
                  <Toolbar>
                     <div className="container">
                        <div className="d-flex justify-content-between">
                           <div className="session-logo">
                              <Link to="/">
                                 <img src={require('Assets/img/st-logo.png')} alt="session-logo" width="100%" />
                              </Link>
                           </div>
                           <div>
                              <Link to="/signin" className="mr-15 text-white">Already have an account?</Link>
                              <Button
                                 component={Link}
                                 to="/signin"
                                 variant="contained"
                                 className="btn-light"
                              >
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
                           <div className="session-body text-center">
                              <div className="session-head mb-15">
                                 <h2>Get started with SolarTopps - Sign Up</h2>
                                 { (Object.getOwnPropertyNames(errors).length > 0 || isInvalidRegister) && 
                                   <div className="error generic-msg"> { registerErrorMessage } </div>
                                 }
                              </div>
                              <Form>
                                 <FormGroup className="has-wrapper">
                                    <Input
                                       type="text"
                                       value={firstName}
                                       name="firstName"
                                       id="firstName"
                                       className="has-input input-lg"
                                       placeholder="First Name"
                                       onKeyPress={this._onKeyPress}
                                       onChange={this._handleChange}
                                       maxLength="30"
                                    />
                                    <span className="has-icon"><i className="ti-user"></i></span>
                                 </FormGroup>
                                 <FormGroup className="has-wrapper">
                                    <Input
                                       type="text"
                                       value={lastName}
                                       name="lastName"
                                       id="lastName"
                                       className="has-input input-lg"
                                       placeholder="Last Name"
                                       onKeyPress={this._onKeyPress}
                                       onChange={this._handleChange}
                                       maxLength="30"
                                    />
                                    <span className="has-icon"><i className="ti-user"></i></span>
                                 </FormGroup>
                                 <FormGroup className="has-wrapper">
                                    <Input
                                       type="mail"
                                       value={email}
                                       name="email"
                                       id="email"
                                       className="has-input input-lg"
                                       placeholder="Email Address"
                                       onKeyPress={this._onKeyPress}
                                       onChange={this._handleChange}
                                       maxLength="50"
                                    />
                                    <span className="has-icon"><i className="ti-email"></i></span>
                                 </FormGroup>
                                 <FormGroup className="has-wrapper signup-phone">
                                 <span className="has-icon"><i className="ti-mobile"></i></span>
                                    <MuiPhoneNumber 
                                       name="phone"
                                       defaultCountry={'us'}
                                       label=""
                                       placeholder="Telephone Number"
                                       inputClass="has-input input-lg form-control"
                                       countryCodeEditable = { false }
                                       value={ phone }
                                       onKeyPress={this._onKeyPress}
                                       onChange={ this._handlePhoneOnChange.bind(this, 'phone') } // eslint-disable-line
                                       margin="normal"
                                    />
                                    <span className="has-icon"><i className="ti-mobile"></i></span>
                                 </FormGroup>
                                 <FormGroup className="has-wrapper">
                                    <Input
                                       value={password}
                                       type="Password"
                                       name="password"
                                       id="password"
                                       className="has-input input-lg"
                                       placeholder="Password"
                                       onKeyPress={this._onKeyPress}
                                       onChange={this._handleChange}
                                       maxLength="15"
                                    />
                                   <Tooltip title={INFO_PASSWORD.FORM_MSG} placement="top">
                                       <span className="password-info"><InfoOutlinedIcon/></span>
                                    </Tooltip>
                                   
                                    <span className="has-icon"><i className="ti-lock"></i>
                                    
                                    </span>
                                    
                                 </FormGroup>
                                 <FormGroup className="mb-15">
                                    <Button
                                       className="btn-primary text-white btn-block w-100"
                                       variant="contained"
                                       size="large"
                                       onClick={ this._submitForm }>
                                       Sign Up
                            			</Button>
                                 </FormGroup>
                              </Form>
                              
                              <p className="text-muted">By signing up you agree to SolarTopps</p>
                              <p>
                                 <a target="_blank" rel="noopener noreferrer" href="https://solartopps.com/privacy#privacy" className="text-muted">Privacy Policy</a>&nbsp; &nbsp; &nbsp;
                                 <a target="_blank" rel="noopener noreferrer" href="https://solartopps.com/termsConditions#Terms" className="text-muted">Terms & Conditions</a>
                              </p>
                           </div>
                        </div>
                        <div className="col-sm-5 col-md-5 col-lg-4">
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
   const register = UserManagement && UserManagement.register;
   const loading = authUser && authUser.loading;
   return {
      register,
      loading
   };
};

const mapDispatchToProps = dispatch => {
   return {
      postRegister: data => {
         return dispatch(postRegister(data))
      }
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);

