import React, { Component, Fragment } from 'react';
import compose from "recompose/compose";
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/";
import { purchasePlanValidation } from '../../util/validations';
import PurchaseComponent from '../../components/PurchasePlan/PurchaseComponent';
import FinanceComponent from '../../components/PurchasePlan/FinanceComponent';
import LeaseComponent from '../../components/PurchasePlan/LeaseComponent';
import ConfirmationDialog from '../ConfirmationDialog/ConfirmationDialog';
import { Redirect } from 'react-router-dom';
import { compareObjects } from '../../util/utility';
import { purchasePlanFields, purchasePlanDynamicFields } from '../../util/payload';
import { USERS, PROPOSALTYPE } from '../../constants/constants';

const styles = theme => ({
   container: {
      display: 'flex',
      flexWrap: 'wrap',
   },
   textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 240,
      paddingRight: 50,
   },
   dense: {
      marginTop: 19,
   },
   menu: {
      width: 200,
   },
});


class PurchasePlanComponent extends Component {
   constructor(props) {
      super(props);
      this.state = {
         fields: this._getInitialState(props.purchasePlanData ? props.purchasePlanData : props),
         prevObj: this._getInitialState(props.purchasePlanData ? props.purchasePlanData : props),
         errors: {},
         dynamicFieldData: props.purchasePlanData ? props.purchasePlanData : {},
         isFormValid: true,
         showPurchaseComponent: false,
         showLeaseComponent: false,
         showFinanceComponent: false,
         isShowDeclineModal: false,
         shouldRedirect: false
      };
  }

  _getInitialState = state => {
     const obj = {
      purchasePlanName: state.purchasePlanName || '',
      projectType: state.projectType || '',
      proposalType: state.proposalType || '',
      country: state.country || '',
      state: state.state || '',
      description: state.description || ''
     };
   return obj;
 }

 componentWillReceiveProps(nextProps) {
   const { purchasePlanData } = nextProps;
   this._getRenderChildComponent(purchasePlanData && purchasePlanData.proposalType);
 }

 _getRenderChildComponent = proposalType => {
   if(proposalType) {
      let showFinance = false, showLease = false, showPurchase = false;
      const { fields } = this.state;
      if(proposalType === PROPOSALTYPE.FINANCE) {
         showFinance = true;
      } else if(proposalType === PROPOSALTYPE.PURCHASE){
         showPurchase = true;
      } else {
         showLease = true;
      }
      this.setState({
        fields,
         showPurchaseComponent: showPurchase,
         showLeaseComponent: showLease,
         showFinanceComponent: showFinance,
         errors:{}
       });
   }
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

  _handleChange = e => {
   const { value, name } = e.currentTarget;
   const { fields } = this.state;
   fields[name]= value;
      this.setState({
         fields,
         errors:{}
      });
   };

   _changeSelectProposalType = e => {
      const { value, name } = e.currentTarget;
      const { fields } = this.state;
      fields[name]= value;
      let showFinance = false, showLease = false, showPurchase = false;
      if(value) {
         if(value === PROPOSALTYPE.FINANCE) {
            showFinance = true;
         } else if(value === PROPOSALTYPE.PURCHASE){
            showPurchase = true;
         } else {
            showLease = true;
         }
      } 
      this.setState({
        fields,
         showPurchaseComponent: showPurchase,
         showLeaseComponent: showLease,
         showFinanceComponent: showFinance,
         errors:{}
       });
   }
      

   _checkValidation = () => {
      const { fields, dynamicFieldData } = this.state;
      const formStatus = purchasePlanValidation(fields, dynamicFieldData);
      this.setState({
        errors: formStatus.errors,
        isFormValid: formStatus.formIsValid
      });
      return formStatus.status;
    };

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

    _submitForm = () => {
      let validationStatus = this._checkValidation();
      const { purchasePlanData } = this.props;
      const purchasePlanId = purchasePlanData && purchasePlanData.purchasePlanId ? purchasePlanData.purchasePlanId : null;
      const status = purchasePlanData && purchasePlanData.status ? purchasePlanData.status : null;
      const createdDateTime = purchasePlanData && purchasePlanData.createdDateTime ? purchasePlanData.createdDateTime : null;

      if(validationStatus) {
        let { fields, dynamicFieldData } = this.state;        
        fields = purchasePlanFields(fields);
        dynamicFieldData = purchasePlanDynamicFields(dynamicFieldData, fields.proposalType);
        if(purchasePlanId) {
          fields.purchasePlanId = purchasePlanId;
          fields.status = status;
          fields.createdDateTime = createdDateTime;
        }
        const dataObj = {
           ...fields,
           ...dynamicFieldData
        };
        this.props.submitForm(dataObj);
      }
  }

  _getChildComponentData = data => {
      this.setState({
         dynamicFieldData: data,
         pageType: ''
      });
  };

   render() {
      
      const { classes, staticData, purchasePlanData } = this.props;
      const { errors, isShowDeclineModal, shouldRedirect } = this.state;
      const { purchasePlanName, description, proposalType, projectType, country, state } = this.state.fields;
      const { errorPurchasePlanName, errorProjectType, errorProposalType, errorCountry, errorState, errorDescription, errorBallonPayment1DueMonth, errorBallonPayment1DueMonthMsg } = errors;
      const { showFinanceComponent, showLeaseComponent, showPurchaseComponent} = this.state;
      const planId = purchasePlanData && purchasePlanData.purchasePlanId ? purchasePlanData.purchasePlanId : null;

      if(shouldRedirect) {
         return <Redirect to={ '/app/PurchasePlan/ManagePurchase' } />;
       }

      const projectTypeData =  staticData && staticData.projectType && staticData.projectType.values;
      const proposalTypeData = staticData && staticData.projectType && staticData.proposalType.values;
      const projectTypeList =  projectTypeData && projectTypeData.map(project => {
         return {
            label: project,
            value: project
         }
      });
      const proposalTypeList =  proposalTypeData && proposalTypeData.map(proposal => {
         return {
            label: proposal,
            value: proposal
         }
      });
      const dynamicFields = 
         <div className="wrapper-dynamic">
            {    
               showPurchaseComponent ? 
                  <PurchaseComponent 
                     purchasePlanData={ purchasePlanData }
                     getChildComponentData={ this._getChildComponentData } 
                  /> : null
            }
            {  
               showLeaseComponent ? 
                 <LeaseComponent 
                     purchasePlanData={ purchasePlanData }
                     getChildComponentData={ this._getChildComponentData } 
                     errorBallonPayment1DueMonth= { errorBallonPayment1DueMonth }
                     errorBallonPayment1DueMonthMsg={ errorBallonPayment1DueMonthMsg}
                 /> : null
            }
            {
               showFinanceComponent ? 
                  <FinanceComponent 
                     purchasePlanData={ purchasePlanData }
                     getChildComponentData={ this._getChildComponentData } 
                     errorBallonPayment1DueMonth= { errorBallonPayment1DueMonth }
                     errorBallonPayment1DueMonthMsg={ errorBallonPayment1DueMonthMsg}
                  /> : null
            }
        </div>;   
   return (
      <Fragment>
      <div className="ecom-dashboard-wrapper">
      <div className="page-heading">
            <h1 className="inline-block-element">{ planId ? 'Edit Purchase Plan' : 'Add Purchase Plan' }</h1>
            { Object.getOwnPropertyNames(errors).length > 0 && 
               <div className="error generic-msg">{ USERS.FORM_MSG }</div>
            }
         </div>
         <div className="page-min-ht">
         <div className="rct-block ">
            <div className="rct-block-title ">
               <h4>Purchase Plan Information</h4>
            </div>
            <div className="collapse show">
               <div className="rct-block-content">
              
                  <TextField 
                     error={errorPurchasePlanName}
                     required 
                     name="purchasePlanName" 
                     label="Purchase Plan Name" 
                     className={classes.textField} 
                     margin="normal"
                     onChange={this._handleChange}
                     value= { purchasePlanName }
                     inputProps={{ maxLength: 30, autoComplete: "none" }}
                  />
                  
                  <TextField
                     select 
                     error={errorProjectType}
                     required
                     name="projectType" 
                     label="Select Project Type" 
                     margin="normal"
                     className={classes.textField}  
                     onChange={this._handleChange} 
                     value = { projectType }
                     InputLabelProps={{shrink:projectType ? true : false }}
                     SelectProps={{ native: true,
                        MenuProps: { className: classes.menu,
                        },
                     }}
                  >
                  <option key="" value=""></option>
                   {projectTypeList && projectTypeList.map(option => (
                     <option key={option.value} value={option.value}>
                        {option.label}
                     </option>
                  ))}
                  </TextField>

                  <TextField
                  select 
                  error={errorProposalType}                     
                  required
                  name="proposalType" 
                  label="Select Proposal Type" 
                  margin="normal" 
                  className={classes.textField}  
                  onChange={this._changeSelectProposalType}
                  value = { proposalType }
                  InputLabelProps={{shrink:proposalType ? true : false }}
                  SelectProps={{ native: true,
                     MenuProps: {
                        className: classes.menu,
                     },
                  }}
                  >
                  <option key="" value=""></option>
                  {proposalTypeList && proposalTypeList.map(option => (
                     <option key={option.value} value={option.value}>
                        {option.label}
                     </option>
                  ))}
                  </TextField>
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
                  <TextField 
                     error={errorState === true}
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
                     error={errorDescription}
                     required 
                     name="description" 
                     label="Description" 
                     multiline
                     className={classes.textField} 
                     margin="normal"
                     onChange={this._handleChange}
                     value= { description } 
                     inputProps={{ maxLength: 250, autoComplete: "none" }}
                  />
               
               </div>
            </div>
         </div>
         { dynamicFields }
         <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick= { this._pageContentChanged }>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={ this._submitForm }>Save</button>
         </div>
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

export default compose(withStyles(styles, { name: "PurchasePlanComponent" }),)(PurchasePlanComponent);