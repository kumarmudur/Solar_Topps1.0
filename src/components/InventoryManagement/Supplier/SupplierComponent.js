import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { styles } from '../../../util/styles';
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/";
import MuiPhoneNumber from 'material-ui-phone-number';
import { supplierValidation, validateZipCode, contactSupplierValidation } from '../../../util/validations';
import Radio from '@material-ui/core/Radio';
import { Redirect } from 'react-router-dom';
import { compareObjects } from '../../../util/utility';
import ConfirmationDialog from '../../ConfirmationDialog/ConfirmationDialog'
import { USERS } from '../../../constants/constants';

class SupplierComponent extends Component {
   constructor(props) {
      super(props);
      this.state = {
         fields: this._getInitialstate(props.supplierData ? props.supplierData : props),
         prevObj: this._getInitialstate(props.supplierData ? props.supplierData : props),
         errors: {},
         contactName: '',
         contactEmail: '',
         contactPhone: '',
         isPrimaryContact: false,
         contact_errors: {},
         isFormValid: true,
         isShowDeclineModal: false,
         shouldRedirect: false
      };
  }

  _getInitialstate = state => {
   const obj = {
      organizationName: state.organizationName || '',
      supplierNo: state.supplierNo || '',
      registrationNo: state.registrationNo || '',
      taxPayerId: state.taxPayerId || '',
      status: state.status || '',
      address1: state.address1 || '',
      address2: state.address2 || '',
      zipCode: state.zipCode || '',
      city: state.city || '',
      county: state.county || '',
      state: state.state || '',
      country: state.country || '',
      contacts: state.contacts || [],
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
}

_handleChange = e => {
   const { value, name } = e.currentTarget;
   const { fields } = this.state;
   fields[name]= value;
   let formattedZipCode = '';
   if(name === 'zipCode') {
      formattedZipCode = validateZipCode(value);
      fields[name]= formattedZipCode;
   }
   this.setState({
      fields,
      errors:{}
   });
};

_checkValidation = () => {
   const { fields } = this.state;
   const formStatus = supplierValidation(fields);
   this.setState({
     errors: formStatus.errors,
     isFormValid: formStatus.formIsValid
   });
   return formStatus.status;
 };

 _checkContactSupplierValidation = () => {
   const { fields } = this.state;
   const { contactName, contactEmail, contactPhone } = this.state;
    const dataObj = {
       contactName,
       contactEmail,
       contactPhone
    };
   const formStatus = contactSupplierValidation(dataObj);
   this.setState({
      contact_errors: formStatus.errors,
      isFormValid: formStatus.formIsValid
   });
   return formStatus.status;
 }

 _addContact = () => {
   const { contactName, contactEmail, contactPhone, isPrimaryContact, fields } = this.state;
   const { contacts } = fields;
    let statusContact = this._checkContactSupplierValidation();
    if(statusContact) {
      const isOnTheList = contacts.some(list => list.conactPerson === contactName);
      if(isPrimaryContact) {
        fields.contacts && fields.contacts.map(contact => {
          return contact.isPrimary = false;
        });
      }
      if(!isOnTheList) {
          const contactPersonsFields = contacts.concat([ { conactPerson: contactName, contactEmail: contactEmail, phone: contactPhone, isPrimary: isPrimaryContact }]);
          fields.contacts = contactPersonsFields;
          this.setState({
              fields,
              contactName: '',
              contactEmail: '',
              contactPhone:'',
              isPrimaryContact: false
          });
      }
   }
 }

 _handlePhoneOnChange = (name, value) => {
   this.setState({
      [name]: value,
      contact_errors: {}
   });
};

_onFieldContactChange = e => {
   let { name } = e.target;
   const target = e.target;
   const value = target.type === 'radio' ? target.checked : target.value;
  this.setState({
      [name]: value,
      contact_errors: {}
   });
 }

_submitForm = () => {
   let validationStatus = this._checkValidation();
   const { supplierData } = this.props;
   const supplierId = supplierData && supplierData.supplierId ? supplierData.supplierId : null;
   const status = supplierData && supplierData.status ? supplierData.status : null;
   const createdDateTime = supplierData && supplierData.createdDateTime ? supplierData.createdDateTime : null;
   if(validationStatus) {
      const dataObj = this.state.fields;
     if(supplierId) {
       dataObj.supplierId = supplierId;
       dataObj.status = status;
       dataObj.createdDateTime = createdDateTime;
     }
     this.props.submitForm(dataObj);
   }
}

_deleteContact = e => {
   let { fields } = this.state;
   const { contacts } = fields;
   const { id } = e.currentTarget;
   const filteredData = contacts.filter((s, index) => parseInt(id) !== index);
   fields.contacts = filteredData;
   this.setState({
       fields
   });
}

_onFieldChangeContactList = e => { 
   let { value, name, type, checked } = e.currentTarget;
   let indexValue = name && name.split('-');
   let fieldName = indexValue && indexValue[0];
   let index = indexValue && indexValue[1];
   value = type === 'radio' ? checked : value;
   let { fields } = this.state;
   const { contacts } = fields;
   index = parseInt(index);
   contacts && contacts.map((item, i) => {
       if(i === index) {
          item[fieldName] = value;
       } else {
         if(fieldName === 'isPrimary') {
           item['isPrimary'] = false;
         }
       }
   });  
   fields.contacts = contacts;
   this.setState({
       fields,
       contact_errors: {}
   });
}

_onFieldChangeContactListPhone = (name, value) => {
   let indexValue = name && name.split('-');
   let fieldName = indexValue && indexValue[0];
   let index = indexValue && indexValue[1];
   let { fields } = this.state;
   const { contacts } = fields;
   contacts && contacts.map((item, i) => {
      if(i === parseInt(index)) {
         item[fieldName] = value;
      }
   });
   fields.contacts = contacts;
   this.setState({
      fields,
      contact_errors: {}
  });
}

render () {
    const { classes } = this.props;
    const { errors, isShowDeclineModal, shouldRedirect, contactName, contactEmail, contactPhone, isPrimaryContact, fields } = this.state;
    const { contact_errors } = this.state;
    const { organizationName, supplierNo, registrationNo, taxPayerId, address1, address2, city, country, county, state, zipCode, contacts } = fields;
    const { errorOrganizationName, errorSupplierNo, errorRegistrationNo } = errors;
    const { errorContactName, errorContactEmail, errorContactPhone } = contact_errors;
    const { supplierData } = this.props;
    const supplierId = supplierData && supplierData.supplierId ? supplierData.supplierId : null;
    const phoneFieldStyle = 'MuiFormControl-marginNormal';
    if(shouldRedirect) {
      return <Redirect to={ '/app/Inventory/Supplier/ManageSupplier' } />;
    }
    const contactPersonFields = contacts && contacts.map((item, index) => (
      <div className="collapse show">
      <div className="rct-block-content">
         <TextField
            error={errorContactName} 
            name={ `conactPerson-${ index }` }
            label="Contact Person" 
            className={classes.textField} 
            margin="normal"
            value= { item.conactPerson }
            onChange={this._onFieldChangeContactList}
            inputProps={{ maxLength: 25, autoComplete: "none" }}
         />
         <TextField 
            error={errorContactEmail}
            name={ `contactEmail-${ index }` }
            label="Contact Email" 
            className={classes.textField} 
            margin="normal"
            value= { item.contactEmail }
            onChange={this._onFieldChangeContactList}
            inputProps={{ maxLength: 30, autoComplete: "none" }}
         />
         <MuiPhoneNumber 
            error={errorContactPhone}
            name={ `phone-${ index }` }
            defaultCountry={'us'}
            label="Contact Phone"
            inputClass={`${phoneFieldStyle}`}
            countryCodeEditable = { false }
            value = { item.phone }
            onChange={ this._onFieldChangeContactListPhone.bind(this, `phone-${ index }`) } 
            margin="normal"
            inputProps={{ autoComplete: "none" }}
         />
         <Radio
            checked={item.isPrimary}
            color="default"
            type="radio"
            name={ `isPrimary-${ index}` } 
            onChange={ this._onFieldChangeContactList }
         />Primary Contact
          <div className="modal-footer">
            <button type="button" id={ index } className="btn btn-danger" onClick={ this._deleteContact }>Delete</button>
         </div>
      </div>
     </div>
    ));
    return (
        <div className="ecom-dashboard-wrapper">
            <div className="page-heading">
            <h1 className="inline-block-element">{ supplierId ? 'Edit Supplier' : 'Add Supplier' }</h1>
            { (Object.getOwnPropertyNames(errors).length > 0 || Object.getOwnPropertyNames(contact_errors).length > 0) && 
               <div className="error generic-msg">{ USERS.FORM_MSG }</div>
            }
         </div>
         <div className="rct-block ">
            <div className="rct-block-title ">
               <h4>Supplier Details</h4>
            </div>
            <div className="collapse show">
               <div className="rct-block-content">
               <form className={classes.container} noValidate autoComplete="off">
               <TextField 
                     error={errorOrganizationName} 
                     required 
                     name="organizationName" 
                     label="Organization Name" 
                     className={classes.textField} 
                     margin="normal"
                     onChange={this._handleChange}
                     value= { organizationName } 
                     inputProps={{ maxLength: 50, autoComplete: "none" }}
                  />
                  <TextField
                     error={errorSupplierNo} 
                     required 
                     name="supplierNo" 
                     label="Supplier No" 
                     className={classes.textField} 
                     margin="normal"
                     value= { supplierNo }
                     onChange={this._handleChange}
                     inputProps={{ maxLength: 30, autoComplete: "none" }}
                  />
                  <TextField 
                     error={errorRegistrationNo}
                     required 
                     name="registrationNo" 
                     label="Registration No" 
                     className={classes.textField} 
                     margin="normal"
                     value= { registrationNo }
                     onChange={this._handleChange}
                     inputProps={{ maxLength: 30, autoComplete: "none" }}
                  />
                  <TextField 
                     name="taxPayerId" 
                     label="Tax Payer ID" 
                     className={classes.textField} 
                     margin="normal"
                     value= { taxPayerId }
                     onChange={this._handleChange}
                     inputProps={{ maxLength: 30, autoComplete: "none" }}
                  />
               </form>
               </div>
            </div>
            
         </div>
         <div className="rct-block ">
            <div className="rct-block-title ">
               <h4>Address</h4>
            </div>
            <div className="collapse show">
               <div className="rct-block-content">
               <form className={classes.container} noValidate autoComplete="off">
                  <TextField
                     name="address1" 
                     label="Address 1" 
                     className={classes.textField} 
                     margin="normal"
                     value= { address1 }
                     onChange={this._handleChange}
                     inputProps={{ maxLength: 20, autoComplete: "none" }}
                  />
                  <TextField 
                     name="address2" 
                     label="Address 2" 
                     className={classes.textField} 
                     margin="normal"
                     value= { address2 }
                     onChange={this._handleChange}
                     inputProps={{ maxLength: 20, autoComplete: "none" }}
                  />
                  <TextField 
                     name="zipCode" 
                     label="Zip Code" 
                     className={classes.textField} 
                     margin="normal"
                     value= { zipCode }
                     onChange={this._handleChange}
                     inputProps={{ maxLength: 5, autoComplete: "none" }}
                  />
                  <TextField
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
                     name="state" 
                     label="State" 
                     className={classes.textField} 
                     margin="normal"
                     value= { state }
                     onChange={this._handleChange}
                     inputProps={{ maxLength: 15, autoComplete: "none" }}
                  />

                  <TextField 
                     name="country" 
                     label="Country" 
                     className={classes.textField} 
                     margin="normal"
                     value= { country }
                     onChange={this._handleChange}
                     inputProps={{ maxLength: 15, autoComplete: "none" }}
                  />
               </form>
               </div>
            </div>
         </div>
         <div className="rct-block ">
            <div className="rct-block-title ">
               <h4>Contact</h4>
            </div>
            <div className="collapse show">
               <div className="rct-block-content">
                  <TextField
                     error={errorContactName} 
                     required
                     name="contactName" 
                     label="Contact Person" 
                     className={classes.textField} 
                     margin="normal"
                     value= { contactName }
                     onChange={this._onFieldContactChange}
                     inputProps={{ maxLength: 20, autoComplete: "none" }}
                  />
                  <TextField 
                     error={errorContactEmail}
                     required
                     name="contactEmail" 
                     label="Contact Email" 
                     className={classes.textField} 
                     margin="normal"
                     value= { contactEmail }
                     onChange={this._onFieldContactChange}
                     inputProps={{ maxLength: 50, autoComplete: "none" }}
                  />
                  <MuiPhoneNumber 
                     error={errorContactPhone}
                     required
                     name="contactPhone"
                     defaultCountry={'us'}
                     label="Contact Phone"
                     inputClass={`${phoneFieldStyle}`}
                     countryCodeEditable = { false }
                     value = { contactPhone }
                     onChange={ this._handlePhoneOnChange.bind(this, 'contactPhone') } 
                     margin="normal"
                     inputProps={{ autoComplete: "none" }}
                  />
                  <Radio
                     checked={isPrimaryContact}
                     color="default"
                     type="radio"
                     name="isPrimaryContact"
                     onChange={ this._onFieldContactChange }
                  />Primary Contact
                   <div className="modal-footer">
                     <button type="button" className="btn btn-secondary">Clear</button>
                     <button type="button" className="btn btn-primary" onClick={ this._addContact }>Add Contact</button>
                  </div>
               </div>
            </div>
            
         </div>

         <div className="rct-block ">
            { contactPersonFields }
         </div>
         <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick= { this._pageContentChanged }>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={ this._submitForm }>Save</button>
         </div>
         <ConfirmationDialog 
            isShowModal= { isShowDeclineModal }
            closeModal={ this._closeDeclineFormModal }
            confirmModal={ this._modalClickHandler }
            title= { USERS.TITLE }
            message = { USERS.DECLINE_FORM_MSG }
         />     
         </div>
    );
   }
}

export default compose(withStyles(styles, { name: "SupplierComponent" }),)(SupplierComponent);