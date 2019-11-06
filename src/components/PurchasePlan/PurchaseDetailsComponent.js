import React, { Component } from 'react';
import compose from "recompose/compose";
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/";
import { styles } from '../../util/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class PurchaseDetailsComponent extends Component {

render () {
    const { classes, data } = this.props;
    return (
        <div className="ecom-dashboard-wrapper page-readonly-view">
            
            <div className="rct-block ">
                <div className="rct-block-title ">
                <h4>Purchase Details</h4>
                </div>
                <div className="collapse show">
                    <div className="rct-block-content">
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
                                            checked={ data ? data.includeInCustomerPortal : false }
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

export default compose(withStyles(styles, { name: "PurchaseDetailsComponent" }),)(PurchaseDetailsComponent);