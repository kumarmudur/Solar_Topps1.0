import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from 'Components/Footer/Footer';
import PurchaseplanComponent from '../../../components/PurchasePlan/PurchasePlanComponent';
import { GET_STATIC_DATA_PURCHASE_PLAN, POST_SAVE_PURCHASE_PLAN} from '../../../actions/PurchasePlan';
import { GET_COUNTRY_LIST } from '../../../actions/Common';
import { loadData } from '../../../util/storage';
class purchase extends Component {
  constructor(props) {
     super(props);
     this.state = {
     };
 }

 componentDidMount() {
   const authToken = loadData('authToken');
   this.props.getStaticData({ authToken });
   this.props.getCountryList();
 }

 componentWillReceiveProps(nextProps) {
   const { saveResult } = nextProps;
   if(saveResult && saveResult.code === 200) {
       this.props.history.push('/app/PurchasePlan/ManagePurchase');
   }
 }

 _submitForm = data => {
      const authToken = loadData('authToken');
      const dataObj = {
         data,
         authToken
      };
      this.props.postSavePurchasePlan(dataObj);
 }
  render() {
     const { staticData, purchasePlanData } = this.props;
     return (
        <div className="ecom-dashboard-wrapper">
           <PurchaseplanComponent
              submitForm = { this._submitForm }
              staticData={ staticData && staticData.metaData }
              purchasePlanData={ purchasePlanData && purchasePlanData.purchasePlan }
           />
           <Footer />
        </div>
     );
  }
}
const mapStateToProps = state => {
   const { PurchasePlan } = state;
   const staticData = PurchasePlan && PurchasePlan.staticData;
   const saveResult = PurchasePlan && PurchasePlan.savePurchasePlan;
   const purchasePlanData = PurchasePlan && PurchasePlan.purchasePlanData;
   return {
     staticData,
     saveResult,
     purchasePlanData
   };
};

const mapDispatchToProps = dispatch => {
  return {
      getStaticData: data => {
         return dispatch({ type: GET_STATIC_DATA_PURCHASE_PLAN, data });
      },
      getCountryList: () => {
         return dispatch({ type: GET_COUNTRY_LIST });
      },
      postSavePurchasePlan: data => {
         return dispatch({ type: POST_SAVE_PURCHASE_PLAN, data });
      },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(purchase);