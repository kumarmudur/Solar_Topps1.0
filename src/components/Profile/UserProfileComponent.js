import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux';
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/";
import { styles } from '../../util/styles';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import MuiPhoneNumber from 'material-ui-phone-number';
import { compareObjects } from '../../util/utility';
import ConfirmationDialog from '../../components/ConfirmationDialog/ConfirmationDialog';
import { Redirect, NavLink } from 'react-router-dom';
import { USERS } from '../../constants/constants';
import { userProfileValidation, validateZipCode, contactPersonValidation } from '../../util/validations';
import DeleteIcon from '@material-ui/icons/Delete';

class UserProfileComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            fields: this.getInitialstate(props.userData && props.userData ? props.userData : props),
            prevObj: this.getInitialstate(props.userData && props.userData ? props.userData : props),
            errors: {},
            errorsContactPersons: {},
            isFormValid: true,
            isShowDeclineModal: false,
            shouldRedirect: false,
            contactName: '',
            contactEmail: '',
            contactPhone: ''
        };
    }

    getInitialstate = state => {
        const obj = {
            registerId:       state.registerId || '',  
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
            contactPersons:   state.contactPersons || []
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

    _checkValidation = () => {
        const { fields } = this.state;
        const formStatus = userProfileValidation(fields);
        this.setState({
          errors: formStatus.errors,
          isFormValid: formStatus.formIsValid
        });
        return formStatus.status;
      };

    _submitForm = () => {
        let status = this._checkValidation();
        if(status) {
          const dataObj = this.state.fields;
          this.props.submitForm(dataObj);
        }
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


render () {
    const { classes } = this.props;
    const { errors, isShowDeclineModal, shouldRedirect } = this.state;
    const phoneFieldStyle = 'MuiFormControl-marginNormal';
    const { errorsContactPersons, contactName, contactEmail, contactPhone } = this.state;
    const { errorContactName, errorContactEmail, errorContactPhone } = errorsContactPersons;
    const { firstName, lastName, email, phone, companyName, companyEin, companyRegistrationState, 
        houseBuilding, street, zipCode, city, county, country, state, contactPersons } = this.state.fields;
      const { errorFirstName, errorLastName, errorHouseBuilding, errorZipcode, errorCity, errorCountry, 
        errorState, errorCompanyEin, errorCompanyName, errorRegistrationState } = errors;
        const contactPersonFields = contactPersons && contactPersons.map((contact, index) => (
            <div>
                <TextField 
                    error={errorContactName}
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
                    error={errorContactEmail}
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
                    error={errorContactPhone}
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

        if(shouldRedirect) {
            return <Redirect to={ '/app/Profile/UserProfileDetails' } />;
        }
    return (
        <Fragment>
        <div className="ecom-dashboard-wrapper user-edit-profile">
        <div className="page-heading">
        <h1 className="inline-block-element">Edit Profile</h1>
            { (Object.getOwnPropertyNames(errors).length > 0 || Object.getOwnPropertyNames(errorsContactPersons).length > 0) && 
               <div className="error generic-msg">{ USERS.FORM_MSG }</div>
            }
         </div>
        <div className="rct-block ">
                <div className="collapse show">
                    <div className="rct-block-content">
                    <TextField
                    error={errorFirstName}  
                     required 
                     name="firstName" 
                     label="First Name"
                     className={classes.textField} 
                     margin="normal"
                     onChange={this._handleChange}
                     value= { firstName }
                     inputProps={{ maxLength: 20, autoComplete: "none" }}
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
                     inputProps={{ maxLength: 20, autoComplete: "none" }}
                  />
                    <TextField 
                        disabled
                        name="role" 
                        label="Role" 
                        className={classes.textField} 
                        margin="normal"
                        value= "Consultant" 
                        InputProps={{
                            readOnly: true,
                        }}
                    /> 
                    <TextField 
                        disabled
                        name="email" 
                        label="Email" 
                        className={classes.textField} 
                        margin="normal"
                        value= { email } 
                        InputProps={{
                            readOnly: true,
                        }}
                    /> 
                    <TextField 
                        disabled
                        name="phone" 
                        label="Phone" 
                        className={classes.textField} 
                        margin="normal"
                        value= { phone }
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    </div>
                </div>
            </div>
         <div className="rct-block ">
                <div className="rct-block-title ">
                    <h4>Company Details</h4>
                </div>
                <div className="collapse show">
                    <div className="rct-block-content">
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
                            label="Company EIN / SSN" 
                            className={classes.textField} 
                            margin="normal"
                            onChange={this._handleChange}
                            value= { companyEin }
                            inputProps={{ maxLength: 9, autoComplete: "none" }} 
                        />
                        <TextField 
                            error={errorRegistrationState}
                            name="companyRegistrationState"
                            required 
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
                            name="houseBuilding" 
                            required
                            label="Address 1" 
                            className={classes.textField} 
                            margin="normal"
                            onChange={this._handleChange}
                            value= { houseBuilding }
                            inputProps={{ maxLength: 20, autoComplete: "none" }}
                        />
                        <TextField 
                            name="street"                             
                            label="Address 2" 
                            className={classes.textField} 
                            margin="normal"
                            onChange={this._handleChange}
                            value= { street }
                            inputProps={{ maxLength: 20, autoComplete: "none" }}
                        />
                        <TextField 
                            error={errorZipcode}
                            name="zipCode" 
                            required
                            label="Zip Code" 
                            className={classes.textField} 
                            margin="normal"
                            onChange={this._handleChange}
                            inputProps={{ maxLength: 5, autoComplete: "none" }}
                            value= { zipCode }
                        />
                        <TextField 
                            error={errorCity}
                            name="city" 
                            required
                            label="City" 
                            className={classes.textField} 
                            margin="normal"
                            onChange={this._handleChange}
                            value= { city }
                            inputProps={{ maxLength: 15, autoComplete: "none" }}
                        />
                        <TextField 
                            name="county" 
                            label="County" 
                            className={classes.textField} 
                            margin="normal"
                            onChange={this._handleChange}
                            value= { county }
                            inputProps={{ maxLength: 15, autoComplete: "none" }}
                        />
                        <TextField 
                            error={errorState}
                            name="state" 
                            required
                            label="State" 
                            className={classes.textField} 
                            margin="normal"
                            onChange={this._handleChange}
                            value= { state }
                            inputProps={{ maxLength: 15, autoComplete: "none" }}
                        />
                        <TextField 
                            error={errorCountry}
                            name="country" 
                            required
                            label="Country" 
                            className={classes.textField} 
                            margin="normal"
                            onChange={this._handleChange}
                            value= { country }
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
                            error={errorContactName}
                            name="contactName" 
                            label="Name" 
                            className={classes.textField} 
                            margin="normal"
                            onChange={this._onContactPersonChange}
                            inputProps={{ maxLength: 20, autoComplete: "none" }}
                             value = { contactName }
                            
                        />
                        <TextField 
                            error={errorContactEmail}
                            name="contactEmail" 
                            label="Email" 
                            className={classes.textField} 
                            margin="normal"
                            onChange={this._onContactPersonChange}
                            inputProps={{ maxLength: 50, autoComplete: "none" }} 
                            value={ contactEmail }
                        />
                        <MuiPhoneNumber 
                            required
                            error={errorContactPhone}
                            name="contactPhone"
                            defaultCountry={'us'}
                            label="Phone Number"
                            onChange={ this._handlePhoneOnChange.bind(this, 'contactPhone') } 
                            inputClass={clsx(classes.textField, phoneFieldStyle)}
                            countryCodeEditable = { false }
                            margin="normal"
                            value={ contactPhone }
                        />
                        <div className="contact-add-delete">
                            <button type="button" className="btn btn-primary" onClick={this._addContactPerson}>Add</button>
                        </div>
                        { contactPersonFields }
                    </div>
                </div>
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
     </Fragment>
    );
}

}

export default compose(
    withStyles(styles, { name: "UserProfileComponent" }),
    connect(
      null,
      null
    )
  )(UserProfileComponent);