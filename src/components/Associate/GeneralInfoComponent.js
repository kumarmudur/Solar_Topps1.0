import React, { Component } from  'react';
import { withStyles } from "@material-ui/core/";
import TextField from '@material-ui/core/TextField';
import { styles } from '../../util/styles';
import clsx from 'clsx';
import compose from "recompose/compose";
import MuiPhoneNumber from 'material-ui-phone-number';
import { associateValidation, contactPersonValidation, validateZipCode } from '../../util/validations';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { NavLink } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { radioStyles } from '../../util/styles';
import { USERS } from '../../constants/constants';

class GeneralInfoComponent extends Component {

   constructor(props){
      super(props);
      this.state = {
         fields: this.getInitialstate(props.userData ? props.userData : props),
         errors: {},
         isFormValid: true,
         errorsContactPersons: {},
         contactName: '',
         contactEmail: '',
         contactPhone: ''
      };
  }

   getInitialstate = state => {
      const obj = {
         registerId:       state.registerId,
         firstName:        state.firstName || '',
         lastName:         state.lastName || '',
         phone:            state.phone || '',
         email:            state.email || '',
         companyName:      state.companyName || '',
         companyEin:       state.companyEin || '',
         companyRegistrationState: state.companyRegistrationState || '',
         houseBuilding:    state.houseBuilding || '',
         street:           state.street || '',
         zipCode:          state.zipCode || '',
         city:             state.city || '',
         county:           state.county || '',
         country:          state.country || '',
         state:            state.state || '',
         contactPersons:   state.contactPersons || [],
         companyRequired: state.companyRequired || 'Company',
         representativeFirstName: state.representativeFirstName || '',
         representativeLastName: state.representativeLastName || '',
         driverLicenseNumber: state.driverLicenseNumber || '',
         ssn: state.ssn || ''
      };
      return obj;
   }

   _checkContactPersonValidation = type => {
      let formStatus = '';
      if(type === 'main') {
      const { contactEmail, contactPhone } = this.state;
      formStatus = contactPersonValidation( { contactEmail, contactPhone, type });
      }
      else {
      const { contactPersons } = this.state.fields;
      formStatus = contactPersonValidation( { contactPersons, type });
      }
      this.setState({
         errorsContactPersons: formStatus.errors,
         isFormValid: formStatus.formIsValid
      });
      return formStatus.status;
   };

   _addContactPerson = () => {
      const { contactName, contactEmail, contactPhone } = this.state;
      const status = this._checkContactPersonValidation('main');
      if(status) {
         let { fields } = this.state;
         const { contactPersons } = fields;
         if(contactName) {
            const isOnTheList = contactPersons.some(list => list.contactName === contactName);
            if(!isOnTheList) {
                  const contactPersonsFields = contactPersons.concat([ { name: contactName, email: contactEmail, phone: contactPhone }]);
                  fields.contactPersons = contactPersonsFields;
                  this.setState({
                     fields,
                     contactName: '',
                     contactEmail: '',
                     contactPhone:''
                  });
            }
         }
      }
   }

   _deleteContactPerson = e => {
      let { fields } = this.state;
      const { contactPersons } = fields;
      const { id } = e.currentTarget;
      const filteredData = contactPersons.filter((s, index) => parseInt(id) !== index);
      fields.contactPersons = filteredData;
      this.setState({
         fields
      });
   }

   _handlePhoneOnChange = (name, value) => {
      const { fields } = this.state;
      const { contactPersons } = fields;
      if(name.includes('phone-') === true) {
         let indexValue = name && name.split('-');
         let fieldName = indexValue && indexValue[0];
         let index = indexValue && indexValue[1];
         if(index) {
               index = parseInt(index);
               contactPersons && contactPersons.map((item, i) => {
                  if(i === index) {
                     item[fieldName] = value;
                  }
               });
               fields.contactPersons = contactPersons;
         }
      } 
      this.setState({
         [name]: value,
         fields
      });
   };

   _handleChange = e => {
      const { value, name } = e.currentTarget;
      let indexValue = name && name.split('-');
      let fieldName = indexValue && indexValue[0];
      let index = indexValue && indexValue[1];
      let { fields } = this.state;
      const { contactPersons } = fields;
      if(name.includes('-') === false) {
         fields[name]= value;
      }
      let formattedZipCode = '';
      if(name === 'zipCode') {
         formattedZipCode = validateZipCode(value);
         fields[name]= formattedZipCode;
      }

      if(index) {
         index = parseInt(index);
         contactPersons && contactPersons.map((item, i) => {
             if(i === index) {
                 item[fieldName] = value;
             }
         });
         fields.contactPersons = contactPersons;
     }

      this.setState({
         fields,
         errors:{},
         errorsContactPersons: {}
      });
   };

   _onContactPersonChange = e => {
      const { value, name } = e.currentTarget;
      this.setState({
          [name]: value,
          errorsContactPersons: {}
       });
   }

   _checkValidation = () => {
      const { fields } = this.state;
      const formStatus = associateValidation(fields);
      this.setState({
        errors: formStatus.errors,
        isFormValid: formStatus.formIsValid
      });
      return formStatus.status;
   };

   _submitForm = () => {
      let status = this._checkValidation();
      const contactPersonStatus = this._checkContactPersonValidation('sub');   
      if(status && contactPersonStatus) {
         const dataObj = this.state.fields;

         this.props.submitForm(dataObj);
      }
   }

    render () {
        const { classes } = this.props;
        const { errors } = this.state;
        const { errorsContactPersons } = this.state;
        const { firstName, lastName, phone, email, companyName, companyEin, companyRegistrationState, houseBuilding, street, zipCode, city, county, country, state, contactPersons, 
         companyRequired, representativeFirstName, representativeLastName, driverLicenseNumber, ssn } = this.state.fields;
         const { errorHouseBuilding, errorZipcode, errorCity, errorCountry, 
            errorState, errorCompanyEin, errorSSN, errorCompanyName, errorRegistrationState, errorDriverLicenseNumber, errorRepresentLastName, errorRepresentFirstName } = errors;
         const { errorContactName, errorContactEmail, errorContactPhone } = errorsContactPersons;
         const { contactName, contactEmail, contactPhone } = this.state;
         const phoneFieldStyle = 'MuiFormControl-marginNormal';

         const contactPersonFields = contactPersons && contactPersons.map((contact, index) => (
            <div>
                <TextField 
                  //   error={errorContactName}
                    name={ `name-${ index }` }
                    label="Name"
                    key={ `keyName-${ index }` }
                    className={classes.textField} 
                    margin="normal"
                    onChange={this._handleChange}
                    inputProps={{ maxLength: 20, autoComplete: "none" }}
                    value = { contact.name }
                    
                />
                <TextField 
                    error={errorsContactPersons[`errorEmail-${ index }`]}
                    name={ `email-${ index }` }
                    label="Email" 
                    key={ `keyEmail-${ index }` }
                    className={classes.textField} 
                    margin="normal"
                    onChange={this._handleChange}
                    inputProps={{ maxLength: 50, autoComplete: "none" }} 
                    value={ contact.email }
                />
                <MuiPhoneNumber 
                    required
                    error={errorsContactPersons[`errorPhone-${ index }`]}
                    name={ `phone-${ index }` }
                    defaultCountry={'us'}
                    label="Phone Number"
                    key={ `keyPhone-${ index }` }
                    onChange={ this._handlePhoneOnChange.bind(this, `phone-${ index }`) } 
                    inputClass={clsx(classes.textField, phoneFieldStyle)}
                    countryCodeEditable = { false }
                    margin="normal"
                    value={ contact.phone }
                />
                <div className="contact-add-delete">
                    <NavLink to="#delete_contactPersons"><DeleteIcon id={ index } className="imgIconCurosr" alt="delete" onClick={ this._deleteContactPerson }/></NavLink>
                </div>
            </div>
        ));

        return(
            <div className="ecom-dashboard-wrapper general-info-page">
               
      
               <div className="rct-block bottom-margin">
                  <div className="general-tabs">
                     <div className="heading-generalInfo">
                           <p title='General'><i><CheckCircleIcon className="step-completed"/></i><span className="tab-text">General Info</span></p>
                     </div>
                     <div className="heading-documents">
                           <p title='Documents' className="inactive-tabText"><i><CheckCircleOutlineIcon className="step-inactive"/></i><span className="tab-text">Documents</span></p>
                     </div>
                     <div className="heading-agreement">
                           <p title='Agreement' className="inactive-tabText"><i><CheckCircleOutlineIcon className="step-inactive"/></i><span className="tab-text">Agreement</span></p>
                     </div>
                     <div className="clear"></div>
                  </div>
               </div>
                <div className="rct-block page-readonly-view">
                <div className="rct-block-title ">
                <div className="page-heading">
                <h4 className="inline-block-element">General Information</h4>
            { (Object.getOwnPropertyNames(errors).length > 0 || Object.getOwnPropertyNames(errorsContactPersons).length > 0)&& 
               <div className="error generic-msg">{ USERS.FORM_MSG }</div>
            }
            </div>
                </div>
                <div className="collapse show">
                    <div className="rct-block-content">
                        <TextField 
                            name="name" 
                            label="Name" 
                            className={classes.textField} 
                            margin="normal"
                            value= {`${firstName} ${lastName}`}
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            name="email" 
                            label="Email" 
                            className={classes.textField} 
                            margin="normal"
                            value= { email } 
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            name="mobile" 
                            label="Mobile" 
                            className={classes.textField} 
                            margin="normal"
                            value= { phone }
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <FormControl component="fieldset" className={clsx(classes.formControl, 'block-element')}>
                            <RadioGroup
                                aria-label="mode-option"
                                className="MuiFormGroup-row"
                                name="companyRequired"
                                value={ companyRequired }
                                onChange={ this._handleChange }
                              >
                                <FormControlLabel value="Company" control={<Radio />} label="Company" />
                                <FormControlLabel value="Vendor" control={<Radio />} label="Vendor" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
            </div>
            <div className="rct-block ">
            <div className="rct-block-title ">
               <h4>Company Representative</h4>
            </div>
            <div className="collapse show">
               <div className="rct-block-content">
                  <TextField 
                     error={errorRepresentFirstName} 
                     required 
                     name="representativeFirstName" 
                     label="First Name" 
                     className={classes.textField} 
                     margin="normal"
                     onChange={this._handleChange}
                     value={ representativeFirstName } 
                     inputProps={{ maxLength: 20, autoComplete: "none" }}
                  />
                   <TextField 
                     error={errorRepresentLastName} 
                     required 
                     name="representativeLastName" 
                     label="Last Name" 
                     className={classes.textField} 
                     margin="normal"
                     onChange={this._handleChange}
                     value= { representativeLastName } 
                     inputProps={{ maxLength: 20, autoComplete: "none" }}
                  />
                    <TextField 
                     error={errorCompanyName} 
                     required 
                     name="companyName" 
                     label="Company Name" 
                     className={classes.textField} 
                     margin="normal"
                     onChange={this._handleChange}
                     value= { companyName } 
                     inputProps={{ maxLength: 30, autoComplete: "none" }}
                  />
                  <TextField 
                     error={errorCompanyEin} 
                     required 
                     name="companyEin" 
                     label="Company FEIN" 
                     className={classes.textField} 
                     margin="normal"
                     onChange={this._handleChange}
                     value= { companyEin } 
                     inputProps={{ maxLength: 9, autoComplete: "none" }}
                  />
                    <TextField 
                     error={errorSSN} 
                     required 
                     name="ssn" 
                     label="SSN" 
                     className={classes.textField} 
                     margin="normal"
                     onChange={this._handleChange}
                     value= { ssn } 
                     inputProps={{ maxLength: 9, autoComplete: "none" }}
                  />
                  <TextField 
                     error={errorDriverLicenseNumber} 
                     required 
                     name="driverLicenseNumber" 
                     label="Driving licence Number" 
                     className={classes.textField} 
                     margin="normal"
                     onChange={this._handleChange}
                     value= { driverLicenseNumber } 
                     inputProps={{ maxLength: 15, autoComplete: "none" }}
                  />
                  <TextField 
                     error={errorRegistrationState} 
                     required 
                     name="companyRegistrationState" 
                     label="Company Registration State" 
                     className={classes.textField} 
                     margin="normal"
                     onChange={this._handleChange}
                     value= { companyRegistrationState } 
                     inputProps={{ maxLength: 30, autoComplete: "none" }}
                  />
               </div>
            </div>
         </div>
         <div className="rct-block ">
            <div className="rct-block-title ">
               <h4>Address</h4>
            </div>
            <div className="collapse show">
               <div className="rct-block-content">
                  <TextField
                     error={errorHouseBuilding} 
                     required 
                     name="houseBuilding" 
                     label="Address 1" 
                     className={classes.textField} 
                     margin="normal"
                     value= { houseBuilding }
                     onChange={this._handleChange}
                     inputProps={{ maxLength: 20, autoComplete: "none" }}
                  />
                  <TextField 
                     name="street" 
                     label="Address 2" 
                     className={classes.textField} 
                     margin="normal"
                     value= { street }
                     onChange={this._handleChange}
                     inputProps={{ maxLength: 20, autoComplete: "none" }}
                  />
                  <TextField 
                    error={errorZipcode}
                     required 
                     name="zipCode" 
                     label="Zip Code" 
                     className={classes.textField} 
                     margin="normal"
                     value= { zipCode }
                     onChange={this._handleChange}
                     inputProps={{ maxLength: 5, autoComplete: "none" }}
                  />
                  <TextField
                     error={errorCity} 
                     required 
                     name="city" 
                     label="City" 
                     className={classes.textField} 
                     margin="normal"
                     value= { city }
                     onChange={this._handleChange}
                     inputProps={{ maxLength: 15, autoComplete: "none" }}
                  />
                  <TextField 
                     name="county" 
                     label="County" 
                     className={classes.textField} 
                     margin="normal"
                     value= { county }
                     onChange={this._handleChange}
                     inputProps={{ maxLength: 15, autoComplete: "none" }}
                  />
                  <TextField 
                    error={errorState}
                     required 
                     name="state" 
                     label="State" 
                     className={classes.textField} 
                     margin="normal"
                     value= { state }
                     onChange={this._handleChange}
                     inputProps={{ maxLength: 15, autoComplete: "none" }}
                  />
                  <TextField 
                    error={errorCountry}
                     required 
                     name="country" 
                     label="Country" 
                     className={classes.textField} 
                     margin="normal"
                     value= { country }
                     onChange={this._handleChange}
                     inputProps={{ maxLength: 15, autoComplete: "none" }}
                  />
               </div>
            </div>
         </div>
         <div className="rct-block ">
            <div className="rct-block-title ">
               <h4>Contact Person</h4>
            </div>
            <div className="collapse show">
               <div className="rct-block-content">
                  <TextField
                     required
                     error={errorContactName} 
                     name="contactName" 
                     label="Name" 
                     className={classes.textField} 
                     margin="normal"
                     value= { contactName }
                     onChange={this._onContactPersonChange}
                     inputProps={{ maxLength: 20, autoComplete: "none" }}
                  />
                  <TextField 
                     required
                     error={errorContactEmail}
                     name="contactEmail" 
                     label="Email" 
                     className={classes.textField} 
                     margin="normal"
                     value= { contactEmail }
                     onChange={this._onContactPersonChange}
                     inputProps={{ maxLength: 30, autoComplete: "none" }}
                  />
                  <MuiPhoneNumber 
                     required
                     error={errorContactPhone}
                     name="contactPhone"
                     defaultCountry={'us'}
                     label="Phone"
                     inputClass={clsx(classes.textField, phoneFieldStyle)}
                     countryCodeEditable = { false }
                     value = { contactPhone }
                     onChange={ this._handlePhoneOnChange.bind(this, 'contactPhone') } 
                     margin="normal"
                     inputProps={{ autoComplete: "none" }}
                  />
                  <div className="contact-add-delete">
                     <button type="button" className="btn btn-primary" onClick={ this._addContactPerson }>Add</button>
                  </div>
                  { contactPersonFields }
               </div>
            </div>
            
         </div>
        
         <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={ this._submitForm }>Submit</button>
         </div>
      </div>

        );
    }
}

export default compose(withStyles(styles,radioStyles, 
    { name: "GeneralInfoComponent" }),)(GeneralInfoComponent);