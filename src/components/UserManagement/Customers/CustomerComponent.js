import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import compose from "recompose/compose";
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import MuiPhoneNumber from 'material-ui-phone-number';
import { withStyles } from "@material-ui/core/";
import { addCustomerValidation } from '../../../util/validations';
import { compareObjects } from '../../../util/utility';
import { styles } from '../../../util/styles';
import ConfirmationDialog from '../../../components/ConfirmationDialog/ConfirmationDialog';
import { USERS } from '../../../constants/constants';

class UserComponent extends Component {
   constructor(props) {
      super(props);
      this.state = {
         fields: this.getInitialstate(props.userData ? props.userData : props),
         prevObj: this.getInitialstate(props.userData ? props.userData : props),
         errors: {},
         isFormValid: true,
         isShowDeclineModal: false,
         shouldRedirect: false,
         userTypeListoptions: [],
        //  roleListOptions: [],
        //  officeListOptions: [],
        //  departmentListOptions: [],
        //  selectedOffice: ''
      };
    //   this.changeOfficeFlag = false;
  }

  getInitialstate = state => {
      const obj = {
         firstName:        state.firstName || '',
         lastName:         state.lastName || '',
         phone:            state.phone || '',
         alternativePhone: state.alternativePhone || '',
         email:            state.email || '',
         userType:         state.userType || 'Customer',
        //  role:             state.role || '',
        //  houseBuilding:    state.houseBuilding || '',
        //  street:           state.street || '',
        //  zipCode:          state.zipCode || '',
        //  city:             state.city || '',
        //  county:           state.county || '',
        //  country:          state.country || '',
        //  state:            state.state || '',
        //  officeId:         state.officeId || '',
        //  office:           state.office || '',
        //  department:       state.department || ''
      };
      return obj;
   }

   _closeDeclineFormModal = () => {
      this.setState({
         isShowDeclineModal: false,
         shouldRedirect: false
      });
   }

   _modalClickHandler = () => {
      this.setState({
         shouldRedirect: true
      });
   }

   componentWillReceiveProps(nextProps) {
     //let selectedOffice = '';
     const registerId = nextProps && nextProps.userData && nextProps.userData.registerId;
    //  if(registerId) {
    //     const officeId = nextProps.userData.officeId;
    //     const office = nextProps.userData.office;
    //     selectedOffice = `${officeId}-${office}`;
    //  }
   
    //  if(nextProps) {
    //      this.setState({
    //         userTypeListoptions: nextProps.userTypeList || [],
    //         roleListOptions: nextProps.rolesList || [],
    //         officeListOptions: nextProps.officeList || [],
    //         departmentListOptions: nextProps.departmentList || [],
    //         selectedOffice
    //      });
    //   }
   }

   _pageContentChanged = () => {
      const { prevObj, fields } = this.state;
      const stateDataChanged = compareObjects(prevObj, fields);
      let enableDeclineModal = false;
      let shouldRedirectFlag = false;
      if(!stateDataChanged) {
         // show decline modal if data changed
         enableDeclineModal = true;
         shouldRedirectFlag = false;
      }
      else {
         enableDeclineModal = false;
         shouldRedirectFlag = true;
      }
      this.setState({
         isShowDeclineModal: enableDeclineModal,
         shouldRedirect: shouldRedirectFlag
      });
      this.props.history.push('/app/UserManagement/ManageCustomer');
   }

  _handleChange = e => {
      const { value, name } = e.currentTarget;
      const { fields } = this.state;
      fields[name]= value;
    //   let formattedZipCode = '';
    //   if(name === 'zipCode') {
    //      formattedZipCode = validateZipCode(value);
    //      fields[name]= formattedZipCode;
    //   }
    //   if(name === 'office') {
    //      this._onChangeSelectOffice(value);
    //   }
      this.setState({
         fields,
         errors:{}
      });
   };
   
//    _onChangeSelectOffice = value => {
//       const { fields } = this.state;
//       this.changeOfficeFlag = true;
//       let selectedOffice = '';
//       const selectedValue = value;
//       const indexValue = selectedValue && selectedValue.split('-');
//       const officeId = indexValue && indexValue[0];
//       const officeName = indexValue && indexValue[1];
//       fields['officeId'] = officeId;
//       fields['office'] = officeName;
//       fields['department'] = '';
//       if(officeId) {
//          selectedOffice = `${officeId}-${officeName}`;
//          this.props.getSelectedOffice(officeId);
//       }

//       this.setState({
//          fields,
//          selectedOffice,
//          departmentListOptions: []
//       });
//    }

   _handlePhoneOnChange = (name, value) => {
      const { fields } = this.state;
      fields[name] = value;
      this.setState({
         fields
      });
   };

   _checkValidation = () => {
      const { fields } = this.state;
      const formStatus = addCustomerValidation(fields);
      this.setState({
        errors: formStatus.errors,
        isFormValid: formStatus.formIsValid
      });
      return formStatus.status;
    };

    _submitForm = () => {
      let status = this._checkValidation();
      const registerId = this.props && this.props.userData && this.props.userData.registerId ? this.props.userData.registerId : null;
      if(status) {
         const dataObj = this.state.fields;
        if(registerId) {
          dataObj.registerId = registerId;
        }
        this.props.submitForm(dataObj);
      }
  }

   render() {
      const { classes, userSubmitMessage } = this.props;
      const { errors, isShowDeclineModal, shouldRedirect, userTypeListoptions } = this.state;
      const { firstName, lastName, phone, email, alternativePhone, userType } = this.state.fields;
      const { errorFirstName, errorLastName, errorEmail, errorPhone, errorAlternative, errorUserType } = errors;
      const phoneFieldStyle = 'MuiFormControl-marginNormal';
    //   let { selectedOffice } = this.state;
      let pageReadOnlyFlag = false;
      const registerId = this.props && this.props.userData && this.props.userData.registerId ? this.props.userData.registerId : null;
      const userTypeListObj =  userTypeListoptions && userTypeListoptions.length > 0 && userTypeListoptions.map(userType => {
         return {
            label: userType,
            value: userType
         }
      });
    //   const rolesListObj =  roleListOptions && roleListOptions.length > 0 && roleListOptions.map(role => {
    //      return {
    //         label: role.value,
    //         value: role.value
    //      }
    //   });

    //   const officeListObj =  officeListOptions && officeListOptions.length > 0 && officeListOptions.map(office => {
    //      return {
    //         label: office.value,
    //         value: `${office.id}-${office.value}`
    //      }
    //   });

    //   const departmentListObj =  departmentListOptions && departmentListOptions.length > 0 && departmentListOptions.map(department => {
    //      return {
    //         label: department.value,
    //         value: department.value
    //      }
    //   });
    //   if(office && officeId) {
    //      selectedOffice = `${officeId}-${office}`;
    //   }

      if(shouldRedirect) {
         return <Redirect to={ '/app/UserManagement/ManageCustomer' } />;
       }
       if(registerId) {
         pageReadOnlyFlag = true;
       }
      
   return (
    <Fragment>
         <div className="page-heading">
            <h1 className="inline-block-element">{ registerId ? 'Edit Customer' : 'Add Customer' }</h1>
            { (Object.getOwnPropertyNames(errors).length > 0 || userSubmitMessage ) && 
               <div className="error generic-msg">{  userSubmitMessage ? userSubmitMessage : USERS.FORM_MSG }</div>
            }
         </div>
         <div className="page-min-ht">
         {/* Personal Information */}
            <div className="rct-block ">
               <div className="rct-block-title ">
                  <h4>Personal Information</h4>
               </div>
               <div className="collapse show">
                  <div className="rct-block-content">
                  <form className={classes.container} noValidate autoComplete="off">
                     <TextField 
                        error={errorFirstName}
                        required 
                        name="firstName" 
                        label="First Name" 
                        className={classes.textField} 
                        margin="normal"
                        onChange={this._handleChange}
                        value= { firstName } 
                        autoComplete="none"
                        inputProps={{ maxLength: 30, autoComplete: "none" }}
                     />
                     <TextField 
                        error={errorLastName}
                        required 
                        name="lastName" 
                        label="Last Name" 
                        className={classes.textField} 
                        margin="normal"
                        onChange={this._handleChange}
                        value= { lastName }
                        autoComplete="none"
                        inputProps={{ maxLength: 30, autoComplete: "none" }}
                     />
                     <MuiPhoneNumber 
                        error={errorPhone}
                        required
                        name="phone"
                        defaultCountry={'us'}
                        label="Phone Number"
                        inputClass={clsx(classes.textField, phoneFieldStyle)}
                        countryCodeEditable = { false }
                        value = { phone }
                        onChange={ this._handlePhoneOnChange.bind(this, 'phone') } // eslint-disable-line
                        margin="normal"
                        InputProps= {{
                           disabled: registerId ? true : false
                        }}
                     />
                     <MuiPhoneNumber 
                        error={errorAlternative}
                        name="alternativePhone"
                        defaultCountry={'us'}
                        label="Alternate Phone Number"
                        inputClass={clsx(classes.textField, phoneFieldStyle)}
                        countryCodeEditable = { false }
                        value = { alternativePhone }
                        onChange={ this._handlePhoneOnChange.bind(this, 'alternativePhone') } // eslint-disable-line
                        margin="normal"
                     />
                     <TextField
                        error={errorEmail}
                        required 
                        name="email" 
                        label="Email" 
                        type="email" 
                        className={classes.textField} 
                        margin="normal"
                        onChange={this._handleChange}
                        value= { email }
                        autoComplete="off"
                        InputProps={{
                           maxLength: 50,
                           // readOnly: pageReadOnlyFlag ? true : false,
                           disabled: registerId ? true : false,
                        }}
                     />
                     <TextField
                        error={errorUserType}
                        select 
                        required
                        name="userType" 
                        label="User Type" 
                        margin="normal"
                        className={classes.textField}  
                        onChange={this._handleChange} 
                        value = { userType }
                        InputLabelProps={{shrink:userType ? true : false }}
                        SelectProps={{ native: true,
                           MenuProps: { className: classes.menu,
                           },
                        }}
                        InputProps={{ 
                           disabled: registerId ? true : false,
                        }}
                     >
                     <option key="usertype" value='Customer'>Customer</option>
                     </TextField>
                  </form>
                  </div>
               </div>
            </div>
         
         
            <div className="modal-footer">
               <button type="button" className="btn btn-secondary" onClick= { this._pageContentChanged }>Cancel</button>
               <button type="button" className="btn btn-primary" onClick={ this._submitForm }>Save</button>
            </div>
         </div>
         <ConfirmationDialog 
            isShowModal= { isShowDeclineModal }
            closeModal={ this._closeDeclineFormModal }
            confirmModal={ this._modalClickHandler }
            title= { USERS.TITLE }
            message = { USERS.DECLINE_FORM_MSG }
         />                        
    </Fragment>
   );
   }
}

export default compose(
   withStyles(styles, { name: "UserComponent" }),
 )(UserComponent);