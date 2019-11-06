import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import IntlMessages from 'Util/IntlMessages';
import Footer from 'Components/Footer/Footer';
import { ALERT_MESSAGE } from '../../../constants/constants';
import { GET_PURCHASE_PLAN_LIST, GET_PURCHASE_PLAN_DATA, POST_SAVE_PURCHASE_PLAN, POST_DELETE_PURCHASE_PLAN } from '../../../actions/PurchasePlan';
import ManagePurchasePlanComponent from '../../../components/PurchasePlan/ManagePurchasePlanComponent';
import { loadData } from '../../../util/storage';

class ManagePurchasePlan extends Component {
   constructor(props){
      super(props);
      this.state= {
         showSucessMessage: false,
         alertMessage: '',
         alertClass: 'alert alert-success'
      }
   }

   componentDidMount() {
      this._getData(
         {
             pageNumber: 0,
             pageSize: 10
         }
     );
   }

   componentWillReceiveProps(nextProps) {
      const { saveResult, deleteResult } = nextProps;
      if(saveResult && saveResult.code === 200) {
         this._callSetStateAlertMessage('SUCCESS', 'alert alert-success');
         this.props.postSavePurchasePlan();
      }
      if(deleteResult && deleteResult.code === 200) {
         this._callSetStateAlertMessage('DELETE', 'alert alert-success');
         this.props.postDeletePurchasePlan();
      }
   }

   _callSetStateAlertMessage = (alert, alertClass) => {
      if(alert === 'DELETE' || alert === 'DUPLICATE_DELETE') {
         this._getData(
            {
                pageNumber: 0,
                pageSize: 10
            }
         );
      }
      this.setState ({
         showSucessMessage: true,
         alertMessage: ALERT_MESSAGE[alert],
         alertClass
      })
      setTimeout(() => {
         this.setState({
            showSucessMessage: false,
            alertMessage: ''
         })
      }, 2000);
   }

   _openAddPurchasePlanPage = () => {
      this.props.history.push("/app/PurchasePlan/Purchase/");
      this.props.getPurchasePlanData();
      this.props.postSavePurchasePlan();
   }

   _getData = data => {
      const authToken = loadData('authToken');
      data.authToken = authToken;
      this.props.getPurchasePlanList(data);
   }

   _getPurchasePlanData = id => {
      const authToken = loadData('authToken');
      const dataObj = {
        authToken,
        id
      }
      this.props.getPurchasePlanData(dataObj);
      this.props.history.push("/app/PurchasePlan/PurchaseDetails");
   }

   _deletePurchasePlan = ids => {
      if(ids === true) {
         this._callSetStateAlertMessage('DUPLICATE_DELETE', 'alert alert-danger');
      } else {
         const authToken = loadData('authToken');
         const dataObj = {
            authToken,
            ids
         }
         this.props.postDeletePurchasePlan(dataObj);
      }
   }


   render() {
      const { match, purchasePlans } = this.props;
      const { showSucessMessage, alertMessage, alertClass } = this.state;
      return (
         <div className="ecom-dashboard-wrapper">
            <Helmet>
               <title>Manage Purchase Plan</title>
            </Helmet>
            <PageTitleBar title={<IntlMessages id="sidebar.managePurchasePlan" />} match={match} />
            {
               showSucessMessage ? 
                  <div className={ alertClass } role="alert"> { alertMessage } </div> : null
            }
            <div className="add-button"> 
             <button type="button" className="btn btn-primary" onClick={ this._openAddPurchasePlanPage }>Add Purchase Plan</button>
            </div>
            <div className="page-min-ht">
               <ManagePurchasePlanComponent 
                  purchasePlans={ purchasePlans }
                  getPurchasePlanData={ this._getPurchasePlanData }
                  deletePurchasePlan={ this._deletePurchasePlan }
               />
           </div>
         <Footer />
         </div>
      )
   }
}

const mapStateToProps = state => {
   const { PurchasePlan } = state;
   const purchasePlans = PurchasePlan && PurchasePlan.purchasePlans;
   const saveResult = PurchasePlan && PurchasePlan.savePurchasePlan;
   const deleteResult = PurchasePlan && PurchasePlan.deletePurchasePlan;
   return {
      purchasePlans,
      saveResult,
      deleteResult
   }
 };

 const mapDispatchToProps = dispatch => {
    return {
      getPurchasePlanList: data => {
         return dispatch({ type: GET_PURCHASE_PLAN_LIST, data });
      },
      getPurchasePlanData: data => {
         return dispatch({ type: GET_PURCHASE_PLAN_DATA, data });
      },
      postSavePurchasePlan: data => {
         return dispatch({ type: POST_SAVE_PURCHASE_PLAN, data });
      },
      postDeletePurchasePlan: data => {
         return dispatch({ type: POST_DELETE_PURCHASE_PLAN, data });
      }
    }
 }

export default connect(mapStateToProps, mapDispatchToProps)(ManagePurchasePlan);
