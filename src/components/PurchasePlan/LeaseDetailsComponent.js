import React, { Component } from 'react';
import compose from "recompose/compose";
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/";
import { styles } from '../../util/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class LeaseDetailsComponent extends Component {

render () {
    const { classes, data } = this.props;
    return (
        <div className="ecom-dashboard-wrapper page-readonly-view">
            
            {/* Personal Information */}
            <div className="rct-block ">
                <div className="rct-block-title ">
                <h4>Lease Details</h4>
                </div>
                <div className="collapse show">
                    <div className="rct-block-content">
                        <TextField 
                            InputLabelProps={{shrink:true }}
                            name="termMonth" 
                            label="Term" 
                            className={classes.textField} 
                            margin="normal"
                            value= { data ? data.termMonth : '' } 
                            InputProps={{
                                 readOnly: true,
                            }}
                        />
                        <TextField 
                            InputLabelProps={{shrink:true }}
                            name="minimumCost"
                            label="Minimum Cost kWh" 
                            className={classes.textField} 
                            margin="normal"
                            value= { data ? data.minimumCost : '' } 
                            InputProps={{
                                 readOnly: true,
                            }}
                        />
                        <TextField 
                            InputLabelProps={{shrink:true }}
                            name="escalationRate"
                            label="Escalation Rate" 
                            className={classes.textField} 
                            margin="normal"
                            value= { data && data.escalationRate ? `${data.escalationRate}%` : '' } 
                            InputProps={{
                                 readOnly: true,
                            }}
                        />
                        <TextField 
                            InputLabelProps={{shrink:true }}
                            name="planDownPayment"
                            label="Plan Down Payment" 
                            className={classes.textField} 
                            margin="normal"
                            value= { data ? data.planDownPayment : '' } 
                            InputProps={{
                                 readOnly: true,
                            }}
                        />
                        <TextField
                            InputLabelProps={{shrink:true }} 
                            name="discountAsPerPlan"
                            label="Discount As Per Plan" 
                            className={classes.textField} 
                            margin="normal"
                            value= { data ? data.discountAsPerPlan : '' } 
                            InputProps={{
                                 readOnly: true,
                            }}
                        />
                        <TextField 
                            InputLabelProps={{shrink:true }}
                            name="interestRate"
                            label="Interest Rate" 
                            className={classes.textField} 
                            margin="normal"
                            value= { data && data.interestRate ? `${data.interestRate}%` : '' } 
                            InputProps={{
                                 readOnly: true,
                            }}
                        />
                        <TextField 
                            InputLabelProps={{shrink:true }}
                            name="depreciation"
                            label="Depreciation" 
                            className={classes.textField} 
                            margin="normal"
                            value= { data ? data.depreciation : '' } 
                            InputProps={{
                                 readOnly: true,
                            }}
                        />
                        <TextField 
                            InputLabelProps={{shrink:true }}
                            name="ballonpayment1"
                            label="Ballon Payment 1" 
                            className={classes.textField} 
                            margin="normal"
                            value= { data ? data.balloonPayment1 : '' } 
                            InputProps={{
                                 readOnly: true,
                            }}
                        />
                        <TextField
                            InputLabelProps={{shrink:true }}
                            name="ballonpayment1duemonth"
                            label="Ballon Payment 1 Due Month" 
                            className={classes.textField} 
                            margin="normal"
                            value= { data ? data.balloonPayment1DueMonth : '' } 
                            InputProps={{
                                 readOnly: true,
                            }}
                        />
                        <TextField 
                            InputLabelProps={{shrink:true }}
                            name="finInterestRate"
                            label="Fin Interest Rate" 
                            className={classes.textField} 
                            margin="normal"
                            value= { data && data.finInterestRate ? `${data.finInterestRate}%` : '' } 
                            InputProps={{
                                 readOnly: true,
                            }}
                        />
                        <TextField 
                            InputLabelProps={{shrink:true }}
                            name="ballonpayment2"
                            label="Ballon Payment 2" 
                            className={classes.textField} 
                            margin="normal"
                            value= { data ? data.balloonPayment2 : '' } 
                            InputProps={{
                                 readOnly: true,
                            }}
                        />
                        <TextField 
                            InputLabelProps={{shrink:true }}
                            name="buyoutYear"
                            label="Buyout Year" 
                            className={classes.textField} 
                            margin="normal"
                            value= { data ? data.buyoutYear : '' } 
                            InputProps={{
                                 readOnly: true,
                            }}
                        />
                        <TextField 
                            InputLabelProps={{shrink:true }}
                            name="residualValue"
                            label="Residual Value" 
                            className={classes.textField} 
                            margin="normal"
                            value= { data ? data.residualValue : '' } 
                            InputProps={{
                                 readOnly: true,
                            }}
                        />
                        <div>
                        <FormControlLabel
                                    disabled
                                    name="includeInProposal"
                                    label="Include in Proposal"
                                    labelPlacement="end"
                                    className={classes.chekBox} 
                                    control={ <Checkbox 
                                                color="primary" 
                                                checked={ data ? data.includeInProposal : false} 
                                                />
                                            }
                                    
                                />
                                <FormControlLabel
                                    disabled
                                    name="includeInCustomerPortal"
                                    label="Include in Customer Portal"
                                    labelPlacement="end"
                                    control={ <Checkbox 
                                                color="primary"
                                                checked={ data ? data.includeInCustomerPortal : false} 
                                            />
                                            }
                                
                                />
                                <FormControlLabel
                                    disabled
                                    name="optiontobuy"
                                    label="Option to Buy"
                                    labelPlacement="end"
                                    control={ <Checkbox 
                                                color="primary" 
                                                checked={ data ? data.optionToBuy : false} 
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

export default compose(withStyles(styles, { name: "LeaseDetailsComponent" }),)(LeaseDetailsComponent);