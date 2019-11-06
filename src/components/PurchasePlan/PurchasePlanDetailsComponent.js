import React, { Component } from 'react';
import compose from "recompose/compose";
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/";
import { styles } from '../../util/styles';
import PurchaseDetailsComponent from '../../components/PurchasePlan/PurchaseDetailsComponent';
import FinanceDetailsComponent from '../../components/PurchasePlan/FinanceDetailsComponent';
import LeaseDetailsComponent from '../../components/PurchasePlan/LeaseDetailsComponent';
import { PROPOSALTYPE } from '../../constants/constants';

class PurchasePlanDetailsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPurchaseComponent: false,
            showFinanceComponent: false,
            showLeaseComponent: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.proposalType) {
            this._getChildComponent(nextProps.proposalType);
        }
    }

    _getChildComponent = proposalType => {
        let showFinance = false, showLease = false, showPurchase = false;
        if(proposalType === PROPOSALTYPE.FINANCE) {
          showFinance = true;
          showLease = false;
          showPurchase = false;
        } else if (proposalType === PROPOSALTYPE.PURCHASE) {
          showFinance = false;
          showLease = false;
          showPurchase = true;
        } else {
          showFinance = false;
          showLease = true;
          showPurchase = false;
        }
        this.setState({
          showFinanceComponent: showFinance,
          showLeaseComponent: showLease,
          showPurchaseComponent: showPurchase,
        });
    }

    _openEditPage = () => {
        this.props.openEditPage();
    }

  render () {
    const { classes, purchasePlanData } = this.props;
    const { showFinanceComponent, showLeaseComponent, showPurchaseComponent } = this.state;
        const dynamicFields = <div className="wrapper-dynamic">
        {
          showPurchaseComponent ? <PurchaseDetailsComponent data={ purchasePlanData} /> : null
        }
        {
            showFinanceComponent ? <FinanceDetailsComponent data={ purchasePlanData} /> : null
        }
        {
            showLeaseComponent ? <LeaseDetailsComponent data={ purchasePlanData } /> : null
        }
    </div>;
    return (
        <div className="ecom-dashboard-wrapper page-readonly-view">
            <h1>Purchase Plan Details</h1>
            <div className="add-button"> 
                <button type="button" className="btn btn-primary" onClick={ this._openEditPage }>Edit</button>
            </div>

            {/* Personal Information */}
            <div className="rct-block ">
                <div className="rct-block-title ">
                    <h4>Purchase Plan Information</h4>
                </div>
                <div className="collapse show">
                    <div className="rct-block-content">
                        <TextField 
                            name="purchasePlanName" 
                            label="Plan Name" 
                            className={classes.textField} 
                            margin="normal"
                            value= { purchasePlanData ? purchasePlanData.purchasePlanName : '' }
                            InputLabelProps={{shrink:true }} 
                            InputProps={{
                                 readOnly: true,
                            }}
                        />
                        <TextField 
                            name="projectType" 
                            label="Project Type" 
                            className={classes.textField} 
                            margin="normal"
                            value= { purchasePlanData ? purchasePlanData.projectType : '' } 
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                 readOnly: true,
                            }}
                        />
                        <TextField 
                            name="proposalType" 
                            label="Proposal Type" 
                            className={classes.textField} 
                            margin="normal"
                            value= { purchasePlanData ? purchasePlanData.proposalType : '' } 
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
                            value= { purchasePlanData ? purchasePlanData.country : '' } 
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                 readOnly: true,
                            }}
                        />
                        <TextField 
                            disabled
                            name="state" 
                            label="State" 
                            className={classes.textField} 
                            margin="normal"
                            value= { purchasePlanData ? purchasePlanData.state : '' } 
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                 readOnly: true,
                            }}
                        />
                        <TextField 
                            disabled
                            name="description" 
                            label="Description" 
                            className={classes.textField} 
                            margin="normal"
                            value= { purchasePlanData ? purchasePlanData.description : '' } 
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                 readOnly: true,
                            }}
                        />
                    </div>
                </div>
            </div>
            { dynamicFields }
        </div>
    );
  }
}

export default compose(withStyles(styles, { name: "PurchasePlanDetailsComponent" }),)(PurchasePlanDetailsComponent);