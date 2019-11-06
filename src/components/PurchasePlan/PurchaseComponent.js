import React, { Component } from 'react';
import compose from "recompose/compose";
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/";
import { styles } from '../../util/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { checkNumeric, validateNumeric } from '../../util/utility';
import { PROPOSALTYPE } from '../../constants/constants';

class PurchaseComponent extends Component {
   constructor(props) {
      super(props);
      this.state = {
         fields: this._getInitialState(props.purchasePlanData && props.purchasePlanData.proposalType === PROPOSALTYPE.PURCHASE ? props.purchasePlanData : props),
      };
  }

  _getInitialState = state => {
   const obj = {
      discountAsPerPlan: state.discountAsPerPlan || '',
      includeInProposal: state.includeInProposal || false,
      includeInCustomerPortal: state.includeInCustomerPortal || false,
   };
   return obj;
 }

_handleChange = e => {
   const { value, name } = e.currentTarget;
   const { fields } = this.state;
   let discountLength = '';
   if(name === 'discountAsPerPlan') {
      discountLength = validateNumeric(value);
      fields[name]= discountLength;
   }
   if(value && checkNumeric(value)) {
      fields[name] = parseFloat(value);
    } else {
      if(!value) {
        fields[name] = value;
      }
    }
    this._callSetState();
};

_onFieldChange = e => {
   const { name, type, checked, value } = e.target;
   const data = type === 'checkbox' ? checked : value;
   const { fields } = this.state;
   fields[name] = data;
   this._callSetState();
}

_callSetState = () => {
   const { fields } = this.state;
   this.setState({
     fields
   });
   this.props.getChildComponentData(fields);
 }
  
  render() {
    const { classes } = this.props;
    const { discountAsPerPlan, includeInProposal, includeInCustomerPortal} = this.state.fields;
    
    return (
      <div className="ecom-dashboard-wrapper">
      
         <div className="rct-block ">
         <div className="rct-block-title ">
               <h4>Purchase Details</h4>
            </div>
            <div className="collapse show">
               <div className="rct-block-content">
               
                  <TextField 
                     name="discountAsPerPlan" 
                     label="Discount As Per Plan" 
                     className={classes.textField} 
                     margin="normal"
                     onChange={this._handleChange}
                     value= { discountAsPerPlan } 
                     inputProps={{ maxLength: 5, autoComplete: "none" }}
                  />
                  <div>
                     <FormControlLabel
                        name="includeInProposal"
                        label="Include in Proposal"
                        labelPlacement="end"
                        className={classes.chekBox} 
                        control={<Checkbox 
                                    color="primary" 
                                    checked={ includeInProposal } 
                                    onChange={ this._onFieldChange } 
                                 />
                              }
                        />
                        <FormControlLabel
                           name="includeInCustomerPortal"
                           label="Include in Customer Portal"
                           labelPlacement="end"
                           control={<Checkbox 
                                      color="primary"  
                                      checked={ includeInCustomerPortal }
                                      onChange={ this._onFieldChange } 
                                    />
                                 }
                        />
                  </div>
               </div>
            </div>
         </div>
      </div>
    );  
  }
}

export default compose(withStyles(styles, { name: "PurchaseComponent" }),)(PurchaseComponent);