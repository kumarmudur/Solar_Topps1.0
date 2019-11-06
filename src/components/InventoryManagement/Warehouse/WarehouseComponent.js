import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/";
import TextField from '@material-ui/core/TextField';
import { styles } from '../../../util/styles';
import compose from "recompose/compose";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiPhoneNumber from 'material-ui-phone-number';
import { warehouseValidation, validateZipCode } from '../../../util/validations';
import { Redirect } from 'react-router-dom';
import { compareObjects } from '../../../util/utility';
import ConfirmationDialog from '../../ConfirmationDialog/ConfirmationDialog'
import { USERS } from '../../../constants/constants';

class WarehouseComponent extends Component {
   constructor(props) {
      super(props);
      this.state = {
         fields: this._getInitialstate(props.warehouseData ? props.warehouseData : props),
         prevObj: this._getInitialstate(props.warehouseData ? props.warehouseData : props),
         errors: {},
         isFormValid: true,
         isShowDeclineModal: false,
         shouldRedirect: false
      };
  }

  _getInitialstate = state => {
     const obj = {
      warehouseName: state.warehouseName || '', 
      shelf: state.shelf || false, 
      bin: state.bin || false,
      active: state.active || false,
      managerName: state.managerName || '',
      managerEmail: state.managerEmail || '',
      managerPhone: state.managerPhone || '',
      address1: state.address1 || '',
      address2: state.address2 || '',
      zipCode: state.zipCode || '',
      city: state.city || '', 
      state: state.state || '',
      county: state.county || '', 
      country: state.country || ''
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

   _handlePhoneOnChange = (name, value) => {
      const { fields } = this.state;
      fields[name] = value;
      this.setState({
         fields
      });
   };

   _handleWarehouseFeature = e => {
      const { checked, name } = e.target;
      const { fields } = this.state;
      fields[name] = checked;
      this.setState({
        fields
      });
      
    }

   _checkValidation = () => {
      const { fields } = this.state;
      const formStatus = warehouseValidation(fields);
      this.setState({
        errors: formStatus.errors,
        isFormValid: formStatus.formIsValid
      });
      return formStatus.status;
    };

    _submitForm = () => {
      let validationStatus = this._checkValidation();
      const { warehouseData } = this.props;
      const warehouseId = warehouseData && warehouseData.warehouseId ? warehouseData.warehouseId : null;
      const status = warehouseData && warehouseData.status ? warehouseData.status : null;
      const createdDateTime = warehouseData && warehouseData.createdDateTime ? warehouseData.createdDateTime : null;
      if(validationStatus) {
         const dataObj = this.state.fields;
        if(warehouseId) {
          dataObj.warehouseId = warehouseId;
          dataObj.status = status;
          dataObj.createdDateTime = createdDateTime;
        }
        this.props.submitForm(dataObj);
      }
  }

render () {
    const { classes, warehouseData } = this.props;
    const { errors, isShowDeclineModal, shouldRedirect } = this.state;
    const { warehouseName, shelf, bin, active, managerName, managerEmail, managerPhone, address1, address2,
       zipCode, city, state, county, country } = this.state.fields;;
    const {errorWarehouseName, errorManagerName, errorManagerEmail, errorManagerPhone, errorHouseNumber, 
      errorZipCode, errorCity, errorState, errorCountry } = errors;
   const phoneFieldStyle = 'MuiFormControl-marginNormal';
   const warehouseId = warehouseData && warehouseData.warehouseId ? warehouseData.warehouseId : null;

   if(shouldRedirect) {
    return <Redirect to={ '/app/Inventory/Warehouse/ManageWarehouse' } />;
   }
    
    return (
        <div className="ecom-dashboard-wrapper">
        <div className="page-heading">
            <h1 className="inline-block-element">{ warehouseId ? 'Edit Warehouse' : 'Add Warehouse' }</h1>
            { Object.getOwnPropertyNames(errors).length > 0 && 
               <div className="error generic-msg">{ USERS.FORM_MSG }</div>
            }
         </div>
         <div className="rct-block ">
            <div className="rct-block-title ">
               <h4>Warehouse Information</h4>
            </div>
            <div className="collapse show">
               <div className="rct-block-content">
               <form className={classes.container} noValidate autoComplete="off">
                  <TextField 
                     error={errorWarehouseName} 
                     required 
                     name="warehouseName" 
                     label="Warehouse Name" 
                     className={classes.textField} 
                     margin="normal"
                     onChange={this._handleChange}
                     value= { warehouseName } 
                     autoComplete="none"
                     inputProps={{ maxLength: 50, autoComplete: "none" }}
                  />
                   <FormControlLabel
                     control={
                        <Checkbox 
                          color="primary" 
                          name="shelf" 
                          checked={shelf} 
                          onChange={ this._handleWarehouseFeature }  
                        />
                     }
                     label="Shelf"
                     labelPlacement="end"
                    />
                    <FormControlLabel
                     control={
                        <Checkbox 
                          color="primary" 
                          name="bin" 
                          checked={bin} 
                          onChange={ this._handleWarehouseFeature }  
                        />
                     }
                     label="Bin"
                     labelPlacement="end"
                    />
                    <FormControlLabel
                     control={
                        <Checkbox 
                          color="primary" 
                          name="active" 
                          checked={active} 
                          onChange={ this._handleWarehouseFeature }  
                        />
                     }
                     label="Active"
                     labelPlacement="end"
                    />
               </form>
               </div>
            </div>
         </div>
         <div className="rct-block ">
            <div className="rct-block-title ">
               <h4>Manager Details</h4>
            </div>
            <div className="collapse show">
               <div className="rct-block-content">
               <form className={classes.container} noValidate autoComplete="off">
                  <TextField
                     error={errorManagerName} 
                     required 
                     name="managerName" 
                     label="Manager Name" 
                     className={classes.textField} 
                     margin="normal"
                     value= { managerName }
                     onChange={this._handleChange}
                     inputProps={{ maxLength: 30, autoComplete: "none" }}
                  />
                  <TextField 
                     error={errorManagerEmail}
                     required 
                     name="managerEmail" 
                     label="Manager Email" 
                     className={classes.textField} 
                     margin="normal"
                     value= { managerEmail }
                     onChange={this._handleChange}
                     inputProps={{ maxLength: 30, autoComplete: "none" }}
                  />
                  <MuiPhoneNumber 
                     error={errorManagerPhone}
                     required
                     name="managerPhone"
                     defaultCountry={'us'}
                     label="Phone Number"
                     inputClass={`${phoneFieldStyle}`}
                     countryCodeEditable = { false }
                     value = { managerPhone }
                     onChange={ this._handlePhoneOnChange.bind(this, 'managerPhone') } // eslint-disable-line
                     margin="normal"
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
                     error={errorHouseNumber} 
                     required 
                     name="address1" 
                     label="Address 1" 
                     className={classes.textField} 
                     margin="normal"
                     value= { address1 }
                     onChange={this._handleChange}
                     inputProps={{ maxLength: 5, autoComplete: "none" }}
                  />
                  <TextField  
                     name="address2" 
                     label="Address 2" 
                     className={classes.textField} 
                     margin="normal"
                     value= { address2 }
                     onChange={this._handleChange}
                     inputProps={{ maxLength: 15, autoComplete: "none" }}
                  />
                  <TextField 
                     error={errorZipCode}
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
               </form>
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
    );
   }
}

export default compose(withStyles(styles, { name: "WarehouseComponent" }),)(WarehouseComponent);