import React, { Component, Fragment } from 'react';
import compose from "recompose/compose";
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/";
import { styles } from '../../../util/styles';

class SupplierDetailsComponent extends Component {

    _openEditPage = () => {
        this.props.openEditPage();
    }   
    
    render () {
        const { classes, supplierData } = this.props;
        const contactDetails = supplierData && supplierData.contacts.map(contact => (
            <div className="rct-block-content">
            {
                contact.isPrimary ? <Fragment> 
                <TextField 
                    name="contactName" 
                    label="Contact Person" 
                    className={classes.textField} 
                    margin="normal"
                    value={ contact.conactPerson }
                    InputLabelProps={{shrink:true }}
                    InputProps={{
                                readOnly: true,
                            }}
                />
                <TextField 
                    name="contactEmail" 
                    label="Email" 
                    className={classes.textField} 
                    margin="normal"
                    value={ contact.contactEmail }
                    InputLabelProps={{shrink:true }}
                    InputProps={{
                                readOnly: true,
                            }}
                />
                <TextField 
                    name="contactPhone" 
                    label="Phone" 
                    className={classes.textField} 
                    margin="normal"
                    value={ contact.phone }
                    InputLabelProps={{shrink:true }}
                    InputProps={{
                                readOnly: true,
                            }}
                /> </Fragment> : ''
            }
          </div>
        ));

        return (
            <div className="ecom-dashboard-wrapper page-readonly-view">
                <h1>Supplier Details</h1>
                <div className="add-button"> 
                  <button type="button" className="btn btn-primary" onClick={ this._openEditPage }>Edit</button>
                </div>

                <div className="rct-block ">
                    <div className="rct-block-title ">
                        <h4>Supplier Information</h4>
                    </div>
                    <div className="collapse show">
                        <div className="rct-block-content">
                            <TextField 
                                name="organizationName" 
                                label="Organization Name" 
                                className={classes.textField} 
                                margin="normal"
                                value={ supplierData ? supplierData.organizationName : '' }
                                InputLabelProps={{shrink:true }}
                                InputProps={{
                                readOnly: true,
                            }}
                            />
                            <TextField 
                                name="supplierNo" 
                                label="Supplier No" 
                                className={classes.textField} 
                                margin="normal"
                                value={ supplierData ? supplierData.supplierNo : '' }
                                InputLabelProps={{shrink:true }}
                                InputProps={{
                                readOnly: true,
                            }}
                            />
                            <TextField 
                                name="registrationNo" 
                                label="Registration No" 
                                className={classes.textField} 
                                margin="normal"
                                value={ supplierData ? supplierData.registrationNo : '' }
                                InputLabelProps={{shrink:true }}
                                InputProps={{
                                readOnly: true,
                            }}
                            />
                            <TextField 
                                name="taxPayerId" 
                                label="Taxpayer ID" 
                                className={classes.textField} 
                                margin="normal"
                                value={ supplierData ? supplierData.taxPayerId : '' }
                                InputLabelProps={{shrink:true }}
                                InputProps={{
                                readOnly: true,
                            }}
                            />  
                        </div>
                    </div>
                </div>
                
                {/* Address */}
    
                <div className="rct-block ">
                    <div className="rct-block-title ">
                    <h4>Address</h4>
                    </div>
                    <div className="collapse show">
                        <div className="rct-block-content">
                            <TextField 
                                name="address1" 
                                label="Address 1" 
                                className={classes.textField} 
                                margin="normal"
                                value={ supplierData ? supplierData.address1 : '' }
                                InputLabelProps={{shrink:true }}
                                InputProps={{
                                readOnly: true,
                            }}
                            />
                            <TextField 
                                name="address2" 
                                label="Address 2" 
                                className={classes.textField} 
                                margin="normal"
                                value={ supplierData ? supplierData.address2 : '' }
                                InputLabelProps={{shrink:true }}
                                InputProps={{
                                readOnly: true,
                            }}
                            />
                            <TextField 
                                name="zipCode" 
                                label="Zip Code" 
                                className={classes.textField} 
                                margin="normal"
                                value={ supplierData ? supplierData.zipCode : '' }
                                InputLabelProps={{shrink:true }}
                                InputProps={{
                                readOnly: true,
                            }}
                            />
                            <TextField 
                                name="city" 
                                label="City" 
                                className={classes.textField} 
                                margin="normal"
                                value={ supplierData ? supplierData.city : '' }
                                InputLabelProps={{shrink:true }}
                                InputProps={{
                                readOnly: true,
                            }}
                            />
                            <TextField 
                                name="county" 
                                label="County" 
                                className={classes.textField} 
                                margin="normal"
                                value={ supplierData ? supplierData.county : '' }
                                InputLabelProps={{shrink:true }}
                                InputProps={{
                                readOnly: true,
                            }}
                            />
                            <TextField 
                                name="state" 
                                label="State" 
                                className={classes.textField} 
                                margin="normal"
                                value={ supplierData ? supplierData.state : '' }
                                InputLabelProps={{shrink:true }}
                                InputProps={{
                                readOnly: true,
                            }}
                            />
                            <TextField 
                                name="country" 
                                label="Country" 
                                className={classes.textField} 
                                margin="normal"
                                value={ supplierData ? supplierData.country : '' }
                                InputLabelProps={{shrink:true }}
                                InputProps={{
                                readOnly: true,
                            }}
                            />
                        </div>
                    </div>
                </div>
    
                <div className="rct-block ">
                    <div className="rct-block-title ">
                    <h4>Primary Contact</h4>
                    </div>
                    <div className="collapse show">
                        { contactDetails }
                    </div>
                </div>
                
            </div>
        );
    }
}
   
export default compose(withStyles(styles, { name: "SupplierDetailsComponent" }),)(SupplierDetailsComponent);