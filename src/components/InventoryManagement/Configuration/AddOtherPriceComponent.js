import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import { styles } from '../../../util/styles';
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/";
import { Redirect } from 'react-router-dom';
import { USERS } from '../../../constants/constants';
import { compareObjects } from '../../../util/utility';
import ConfirmationDialog from '../../../components/ConfirmationDialog/ConfirmationDialog';


class AddOtherPriceComponent extends Component {
   constructor(props){
      super(props);
      this.state = {
          //fields: this.getInitialstate(props),
          //prevObj: this.getInitialstate(props),
          errors: {},
          isFormValid: true,
          isShowDeclineModal: false,
          shouldRedirect: false,
          otherPrice: {
            category: '',
            subCategories: [
                {
                    subCategory: '',
                    cost: [],
                    unit: '',
                    unitCost: ''
                }
            ]
        },
      };
  }

  componentWillReceiveProps(nextProps) {
      if(nextProps.otherPriceData) {
         this.setState({
            otherPrice: nextProps.otherPriceData
         });
      }
  }

  getInitialstate = state => {
   const obj = {
       category:        state.category || '',
       subCategories:   state.subCategories || '',
   };
   return obj;
 }

_callSetState = () => {
   const { otherPrice } = this.state;
   this.setState({
       otherPrice
   });
}

_addSubCategory = () => {
   const { otherPrice } = this.state;
   const { subCategories } = otherPrice;
   subCategories.push({ 
       subCategory: '',
       unit: '',
       unitCost: '',
       cost: []
   });
  this._callSetState();
}

_deleteSubCategory = indexValue => {
   const { otherPrice } = this.state;
   const { subCategories } = otherPrice;
   const filteredData =  subCategories.filter((subCat, index) => index !== parseInt(indexValue));
   otherPrice.subCategories = filteredData;
   this._callSetState();
}

_addUnits = indexValue => {
   const { otherPrice } = this.state;
   const { subCategories } = otherPrice;
   subCategories && subCategories.map((subCat, index) => {
       if(index === parseInt(indexValue)) {
           if(subCat.unit && subCat.unitCost) {
               subCat.cost.push({
                   unitCost: subCat.unitCost,
                   unit: subCat.unit
               });
               subCat.unit = '';
               subCat.unitCost = '';
           }
       }
   });
   this._callSetState();
}

_onDeleteCost = (id, name) => {
   const { otherPrice } = this.state;
   const { subCategories } = otherPrice;
   const filteredData = subCategories && subCategories.map((subCat, index) => {
       if(index === parseInt(name)) {
           const { cost } = subCat;
           const filteredCost = cost && cost.filter((cost, idx) => {
               return idx !== parseInt(id);
           });
           subCat.cost = filteredCost;
       }
       return subCat;
   });
   otherPrice.subCategories = filteredData;
   this._callSetState();
} 

_onFieldChange = e => {
   const { name, value } = e.currentTarget;
   const { otherPrice } = this.state;
   otherPrice[name] = value;
   this._callSetState();
}

_onFieldChangeSubCategory = e => {
   const { name, value } = e.currentTarget;
   const {  otherPrice } = this.state;
   const { subCategories } = otherPrice;
   let indexValue = name && name.split('-');
   let id = indexValue && indexValue[1];
   let namevalue = indexValue && indexValue[0];
   subCategories.map((subCat, index) => {
       if(index === parseInt(id)) {
           subCat[namevalue] = value;
       }
   });
   this._callSetState();
}

_onFieldChangeListCost = e => {
   const { name, value } = e.currentTarget;
   const { otherPrice } = this.state;
   const { subCategories } = otherPrice;
   let indexValue = name && name.split('-');
   let subCatIndex = indexValue && indexValue[1];
   let costIndex = indexValue && indexValue[2];
   let nameValue = indexValue && indexValue[0];
   subCategories.map((subCat, index) => {
       if(index === parseInt(subCatIndex)) {
           const { cost } = subCat;
           cost.map((cost, index) => {
               if(index === parseInt(costIndex)) {
                   cost[nameValue] = value;
               }
           });
       }
   });
   this._callSetState();
}

_submitForm = () => {
   let { otherPrice } = this.state;
   let { subCategories } = otherPrice;
   const status = this._checkValidation(otherPrice);
   if(status) {
       subCategories = subCategories.map(item => {
           return {
               subCategory: item.subCategory,
               cost: item.cost                
           };
       });
       const dataObj = {
           category: otherPrice.category,
           subCategories
       };
       this.props.submitForm(dataObj);
   }
}

_checkValidation = data => {
   const { otherPrice } = this.state;
   const { category, subCategories } = data;
   
   let formIsValid = true;
   const errors = {};
   subCategories && subCategories.map((subCat) => {
       if(!subCat.subCategory) {
           formIsValid = false;
           subCat.errorSubCategory = 'Sub category is required';
       } else {
           subCat.errorSubCategory = '';
       }
       return subCat;
   });
   otherPrice.subCategories = subCategories;
   if(!category) {
       formIsValid = false;
       errors.errorCategory = 'Category is required';
   }
   this.setState({
       otherPrice,
       errors
   });
   return formIsValid;
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


render () {
    const { classes } = this.props;
    const { otherPrice, errors, isShowDeclineModal, shouldRedirect } = this.state;
    const { errorCategory } = errors;
    const { category, subCategories } = otherPrice;
    if(shouldRedirect) {
      return <Redirect to={ '/app/Inventory/Configuration/ManageConfiguration' } />;
    }
    return (
        <div className="ecom-dashboard-wrapper add-other-price">
            <div className="page-heading">
            <h1 className="inline-block-element">Other Price</h1>
            { Object.getOwnPropertyNames(errors).length > 0 && 
               <div className="error generic-msg">{ USERS.FORM_MSG }</div>
            }
         </div>
         <div className="rct-block ">
            <div className="rct-block-title ">
               <h4>Add Other Price</h4>
            </div>
            <div className="collapse show">
               <div className="rct-block-content">
               
               <TextField 
                  error={errorCategory} 
                     required 
                     name="category" 
                     label="Category" 
                     className={classes.textField} 
                     margin="normal"
                     onChange={this._onFieldChange}
                     value= { category } 
                     inputProps={{ maxLength: 25, autoComplete: 'off' }}
                  />
                  <div className="manage-config-color">
                  {
                     subCategories && subCategories.map((subCat, index) => (
                        <Fragment>
                        <div>
                           <TextField 
                              error={ subCat.errorSubCategory } 
                              required 
                              name={ `subCategory-${index}` } 
                              label="Sub Category" 
                              className={classes.textField} 
                              margin="normal"
                              onChange={this._onFieldChangeSubCategory}
                              value= { subCat.subCategory } 
                              inputProps={{ maxLength: 25, autoComplete: 'off' }}
                           />
                           <div className="category-delete">
                           <button type="button" className="btn btn-danger" onClick={ () => this._deleteSubCategory(index) }>Delete</button>
                         </div>
                        </div>
                        <div>
                         <TextField 
                           name={ `unit-${index}` }
                           label="Unit" 
                           className={classes.textField} 
                           margin="normal"
                           value={ subCat.unit }
                           onChange={ this._onFieldChangeSubCategory } 
                           inputProps={{ maxLength: 8, autoComplete: 'off' }}
                        />
                        <TextField 
                           name={ `unitCost-${index}` }
                           label="Unit Cost" 
                           className={classes.textField} 
                           margin="normal"
                           value={ subCat.unitCost }
                           onChange={ this._onFieldChangeSubCategory }
                           inputProps={{ maxLength: 9, autoComplete: 'off' }}
                        />
                        <button type="button" className="btn btn-primary" onClick={ () => this._addUnits(index) }>Add</button>
                        </div>
                        {
                           subCat && subCat.cost && subCat.cost.map((cost, idx) => (
                              <div>
                                 <TextField 
                                    name={ `unit-${index}-${idx}` } 
                                    label="Unit" 
                                    className={classes.textField} 
                                    margin="normal"
                                    value={ cost.unit }
                                    onChange={this._onFieldChangeListCost } 
                                    inputProps={{ maxLength: 8, autoComplete: 'off' }}
                                 />
                                 <TextField 
                                    name={ `unitCost-${index}-${idx}` } 
                                    label="Unit Cost" 
                                    className={classes.textField} 
                                    margin="normal"
                                    value={ cost.unitCost }
                                    onChange={this._onFieldChangeListCost }
                                    inputProps={{ maxLength: 9, autoComplete: 'off' }}
                                 />
                                 <button type="button" className="btn btn-danger" onClick={ () => this._onDeleteCost(idx, index) }>Delete</button>
                              </div>
                           ))
                        }
                      </Fragment>
                     ))
                  }
                  <div className="add-sub-category">
                  <button type="button" className="btn btn-primary" onClick={ this._addSubCategory }>Add Sub category</button>
                  </div>
                  </div>
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

export default compose(withStyles(styles, { name: "AddOtherPriceComponent" }),)(AddOtherPriceComponent);