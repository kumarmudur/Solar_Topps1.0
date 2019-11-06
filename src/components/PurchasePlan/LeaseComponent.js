import React, { Component } from 'react';
import compose from "recompose/compose";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from "@material-ui/core/";
import { styles } from '../../util/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { checkNumeric, validateNumeric } from '../../util/utility';
import { PROPOSALTYPE } from '../../constants/constants';

class LeaseComponent extends Component {
   constructor(props) {
      super(props);
      this.state = {
         fields: this._getInitialState((props.purchasePlanData && props.purchasePlanData && props.purchasePlanData.proposalType !== PROPOSALTYPE.FINANCE || props.purchasePlanData && props.purchasePlanData.proposalType !== PROPOSALTYPE.PURCHASE) ? props.purchasePlanData : props),
      };
      this.disabledBalloonPayment = props.purchasePlanData && props.purchasePlanData.balloonPayment1DueMonth ? false : true;
  }

  _getInitialState = state => {
   const obj = {
      termMonth: state.termMonth || '',
      minimumCost: state.minimumCost || '',
      escalationRate: state.escalationRate || '',
      planDownPayment: state.planDownPayment || '',
      discountAsPerPlan: state.discountAsPerPlan || '',
      interestRate: state.interestRate || '',
      depreciation: state.depreciation || '',
      balloonPayment1: state.balloonPayment1 || '',
      balloonPayment1DueMonth: state.balloonPayment1DueMonth || '',
      finInterestRate: state.finInterestRate || '',
      balloonPayment2: state.balloonPayment2 || '',
      buyoutYear: state.buyoutYear || '',
      residualValue: state.residualValue || '',
      includeInProposal: state.includeInProposal || false,
      includeInCustomerPortal: state.includeInCustomerPortal || false,
      optionToBuy: state.optionToBuy || false
   };
   return obj;
}

_onFieldChange = e => {
   const { fields } = this.state;
   const { name, type, checked, value } = e.target;
   const data = type === 'checkbox' ? checked : value;
   if(name === 'balloonPayment1') {
     if(value === 'Yes') {
       this.disabledBalloonPayment = false;
     } else if(value === 'No') {
       this.disabledBalloonPayment = true;
       fields['balloonPayment1DueMonth'] = '';
     }
   }
   fields[name] = data;
   this._callSetState();
}

_onFieldChangeNumeric = e => {
   const { value, name } = e.currentTarget;
   const { fields } = this.state;
   if(value && checkNumeric(value)) {
     fields[name] = parseFloat(value);
   } else {
     if(!value) {
       fields[name] = value;
     } else {
       fields[name] = null;
     }
   }
   this._callSetState();
 }

 _onFieldChangeNumericInt = e => {
   const { value, name } = e.currentTarget;
   const { fields } = this.state;
   if(name === 'termMonth' || name === 'finInterestRate' || name === 'balloonPayment1DueMonth' ||
   name === 'minimumCost' || name === 'escalationRate' || name === 'planDownPayment' || name === 'discountAsPerPlan'
   || name === 'interestRate' || name === 'buyoutYear' || name === 'residualValue') {
      fields[name]= validateNumeric(value);
   }
   if(value && checkNumeric(value)) {
     fields[name] = parseInt(value);
   } else {
     if(!value) {
       fields[name] = value;
     }
   }
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
    const { classes, errorBallonPayment1DueMonth, errorBallonPayment1DueMonthMsg } = this.props;
    const { termMonth, minimumCost, escalationRate, includeInProposal, includeInCustomerPortal, optionToBuy,
      planDownPayment, discountAsPerPlan, interestRate, balloonPayment1DueMonth,
      finInterestRate, buyoutYear, residualValue, depreciation, balloonPayment1, balloonPayment2 } = this.state.fields;
    
    return (
      <div className="ecom-dashboard-wrapper">
      
         <div className="rct-block ">
         <div className="rct-block-title ">
               <h4>Lease Details</h4>
            </div>
            <div className="collapse show">
               <div className="rct-block-content">
                  <TextField 
                     name="termMonth" 
                     label="Term Month" 
                     className={classes.textField} 
                     margin="normal"
                     onChange={this._onFieldChangeNumericInt}
                     value= { termMonth }
                     inputProps={{ maxLength: 6, autoComplete: "none" }} 
                  />
                  <TextField 
                     name="minimumCost" 
                     label="Minimum Cost kWh" 
                     className={classes.textField} 
                     margin="normal"
                     onChange={this._onFieldChangeNumericInt}
                     value= { minimumCost } 
                     inputProps={{ maxLength: 6, autoComplete: "none" }} 
                  />
                  <TextField 
                     name="escalationRate" 
                     label="Escalation Rate" 
                     className={classes.textField} 
                     margin="normal"
                     onChange={this._onFieldChangeNumericInt}
                     value= { escalationRate } 
                     onInput = {(e) =>{
                        e.target.value = Math.max(0, parseInt(e.target.value, 10) ).toString().slice(0,6)
                     }}
                     InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                     }}
                  />
                   <TextField 
                     name="planDownPayment" 
                     label="Plan Down Payment" 
                     className={classes.textField} 
                     margin="normal"
                     onChange={this._onFieldChangeNumericInt}
                     value= { planDownPayment } 
                     inputProps={{ maxLength: 6, autoComplete: "none" }}
                  />
                  <TextField 
                     name="discountAsPerPlan" 
                     label="Discount As Per Plan" 
                     className={classes.textField} 
                     margin="normal"
                     onChange={this._onFieldChangeNumericInt}
                     value= { discountAsPerPlan } 
                     inputProps={{ maxLength: 6, autoComplete: "none" }}
                  />
                  <TextField 
                     name="interestRate" 
                     label="Interest Rate" 
                     className={classes.textField} 
                     margin="normal"
                     onChange={this._onFieldChangeNumericInt}
                     value= { interestRate } 
                     onInput = {(e) =>{
                        e.target.value = Math.max(0, parseInt(e.target.value, 10) ).toString().slice(0,6)
                     }}
                     InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                     }}
                  />
                  <div className="radio-group-align" onChange={this._onFieldChange}>
                     <FormLabel component="legend">Depreciation</FormLabel>
                     <RadioGroup aria-label="gender" name="gender1" >
                        <FormControlLabel 
                           label="Yes" 
                           labelPlacement="end"
                           control={<Radio  
                                       color="primary"
                                       name="depreciation" 
                                       value="Yes" 
                                       checked={ depreciation === 'Yes' ? true : false }
                                    />
                                 }
                        />
                        <FormControlLabel 
                           label="No" 
                           labelPlacement="end"
                           control={<Radio 
                                       color="primary"
                                       name="depreciation" 
                                       value="No" 
                                       checked={ depreciation === 'No' ? true : false }
                                    />
                              } 
                        />
                     </RadioGroup>
                  </div>
                  <div className="radio-group-align" onChange={this._onFieldChange}>
                  <FormLabel component="legend">Ballon Payment 1</FormLabel>
                     <RadioGroup aria-label="gender" name="gender1" >
                        <FormControlLabel 
                           label="Yes" 
                           labelPlacement="end"
                           control={<Radio 
                                       color="primary"
                                       name="balloonPayment1" 
                                       value="Yes" 
                                       checked={ balloonPayment1 === 'Yes' ? true : false }
                                    />
                                 } 
                        />
                        <FormControlLabel 
                           label="No" 
                           labelPlacement="end"
                           control={<Radio
                                       color="primary"
                                       name="balloonPayment1" 
                                       value="No" 
                                       checked={ balloonPayment1 === 'No' ? true : false }
                                    />
                                 } 
                        />
                     </RadioGroup>
                  </div>
                  <FormControl>
                     <TextField 
                        error={ errorBallonPayment1DueMonth }
                        name="balloonPayment1DueMonth" 
                        label="Balloon Payment 1 Due Month" 
                        className={classes.textField} 
                        margin="normal"
                        onChange={this._onFieldChangeNumericInt}
                        value= { balloonPayment1DueMonth }
                        InputProps={{
                           readOnly: this.disabledBalloonPayment,
                           maxLength: 6
                        }} 
                     />
                     <FormHelperText class="error-text">{ errorBallonPayment1DueMonthMsg }</FormHelperText>
                  </FormControl>
                  <TextField 
                     name="finInterestRate" 
                     label="Fin Interest Rate" 
                     className={classes.textField} 
                     margin="normal"
                     onChange={this._onFieldChangeNumericInt}
                     value= { finInterestRate } 
                     onInput = {(e) =>{
                        e.target.value = Math.max(0, parseInt(e.target.value, 10) ).toString().slice(0,6)
                     }}
                     InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                     }}
                  />
                   <TextField 
                     name="buyoutYear" 
                     label="Buy Out Year" 
                     className={classes.textField} 
                     margin="normal"
                     onChange={this._onFieldChange}
                     value= { buyoutYear } 
                     inputProps={{ maxLength: 6, autoComplete: "none" }}
                  />

                  <div className="radio-group-align" onChange={this._onFieldChange}>
                   <FormLabel component="legend">Ballon Payment 2</FormLabel>
                     <RadioGroup aria-label="gender" name="gender1" >
                        <FormControlLabel 
                           label="Yes" 
                           labelPlacement="end"
                           control={<Radio 
                                       color="primary"
                                       name="balloonPayment2" 
                                       value="Yes" 
                                       checked={ balloonPayment2 === 'Yes' ? true : false }
                                     />
                                 } 
                        />
                        <FormControlLabel 
                           label="No" 
                           labelPlacement="end"
                           control={<Radio 
                                       color="primary"
                                       name="balloonPayment2" 
                                       value="No" 
                                       checked={ balloonPayment2 === 'No' ? true : false }
                                    />
                                 }
                        />
                     </RadioGroup>
                  </div>
               
                  <TextField 
                     name="residualValue" 
                     label="Residual Value" 
                     className={classes.textField} 
                     margin="normal"
                     onChange={this._onFieldChangeNumericInt}
                     value= { residualValue }
                     onInput = {(e) =>{
                        e.target.value = Math.max(0, parseInt(e.target.value, 10) ).toString().slice(0,6)
                     }} 
                     InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                     }}
                  />

                  <div>
                     <FormControlLabel
                       name="includeInProposal"
                       label="Include in Proposal"
                       labelPlacement="end"
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
                     <FormControlLabel
                        name="optionToBuy"
                        labelPlacement="end"
                        label="Option To Buy"
                        control={<Checkbox 
                                    color="primary" 
                                    checked={ optionToBuy }  
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

export default compose(withStyles(styles, { name: "LeaseComponent" }),)(LeaseComponent);