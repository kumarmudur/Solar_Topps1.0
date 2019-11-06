import React, { Component } from 'react';
import Footer from 'Components/Footer/Footer';
import { connect } from 'react-redux';
import PurchasePlanDetailsComponent from '../../../components/PurchasePlan/PurchasePlanDetailsComponent';
import {  POST_SAVE_PURCHASE_PLAN} from '../../../actions/PurchasePlan';

class PurchasePlanDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }
  
    _openEditPage = data => {
      this.props.history.push("/app/PurchasePlan/Purchase");
      this.props.postSavePurchase();
    }
  
     render() {
        const { purchasePlanData, proposalType } = this.props;
        return (
           <div className="ecom-dashboard-wrapper">
           <div className="view-page-min-ht">
              <PurchasePlanDetailsComponent 
                 submitForm = { this._submitForm }
                 purchasePlanData={ purchasePlanData && purchasePlanData.purchasePlan }
                 openEditPage={ this._openEditPage }
                 proposalType={ proposalType }

              />
            </div>
              <Footer />
           </div>
        );
     }
  }
  
  const mapStateToProps = state => {
   const { PurchasePlan } = state;
   const purchasePlanData = PurchasePlan && PurchasePlan.purchasePlanData;
   let proposalType =  purchasePlanData && purchasePlanData.purchasePlan && purchasePlanData.purchasePlan.proposalType;
   return {
      purchasePlanData,
      proposalType
     };
  };

  const mapDispatchToProps = dispatch => {
   return {
       postSavePurchase: data => {
          return dispatch({ type: POST_SAVE_PURCHASE_PLAN, data });
       },
   };
 };




export default connect(mapStateToProps, mapDispatchToProps)(PurchasePlanDetails);