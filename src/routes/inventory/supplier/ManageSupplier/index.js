import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import IntlMessages from 'Util/IntlMessages';
import Footer from 'Components/Footer/Footer';
import { ALERT_MESSAGE } from '../../../../constants/constants';
import { GET_SUPPLIER_LIST, GET_SUPPLIER_DATA, POST_SAVE_SUPPLIER, POST_DELETE_SUPPLIER } from '../../../../actions/InventoryManagement';
import ManageSupplierComponent from '../../../../components/InventoryManagement/Supplier/ManageSupplierComponent';
import { loadData } from '../../../../util/storage';

class ManageSupplier extends Component {
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
         this.props.postSaveSupplier();
      }
      if(deleteResult && deleteResult.code === 200) {
         this._callSetStateAlertMessage('DELETE', 'alert alert-success');
         this.props.postDeleteSupplier();
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
   
   _openAddSupplierPage = () => {
      this.props.history.push("/app/Inventory/Supplier/Supplier");
      this.props.getSupplierData();
      this.props.postSaveSupplier();
   }

   _getData = data => {
      const authToken = loadData('authToken');
      data.authToken = authToken;
      this.props.getSupplierList(data);
   }

   _getSupplierData = id => {
      const authToken = loadData('authToken');
      const dataObj = {
        authToken: authToken,
        id
      }
      this.props.getSupplierData(dataObj);
      this.props.history.push("/app/Inventory/Supplier/SupplierDetails");
   }

   _deleteSupplier = ids => {
      if(ids === true) {
         this._callSetStateAlertMessage('DUPLICATE_DELETE', 'alert alert-danger');
      } else {
         const authToken = loadData('authToken');
         const dataObj = {
            authToken,
            ids
         }
         this.props.postDeleteSupplier(dataObj);
      }
   }

   render() {
      const { match, suppliersList } = this.props;
      const { showSucessMessage, alertMessage, alertClass } = this.state;
      return (
         <div className="ecom-dashboard-wrapper">
            <Helmet>
               <title>Manage Suppliers</title>
            </Helmet>
            <PageTitleBar title={<IntlMessages id="sidebar.manageSupplier" />} match={match} />
            {
               showSucessMessage ? 
                  <div className={ alertClass } role="alert"> { alertMessage } </div> : null
            }
            <div className="add-button"> 
               <button type="button" className="btn btn-primary" onClick={ this._openAddSupplierPage }>Add Supplier</button>
            </div>
            <div className="page-min-ht">
               <ManageSupplierComponent 
                  suppliers={ suppliersList }
                  getSupplierData={ this._getSupplierData }
                  deleteSupplier={ this._deleteSupplier }
               />
            </div>
         <Footer />
         </div>
      )
   }
}

const mapStateToProps = state => {
   const { Supplier } = state;
   const suppliersList = Supplier && Supplier.suppliers;
   const saveResult = Supplier && Supplier.saveSupplier;
   const deleteResult = Supplier && Supplier.deleteSupplier;
   return {
      suppliersList,
      saveResult,
      deleteResult
   }
 };

 const mapDispatchToProps = dispatch => {
    return {
      getSupplierList: data => {
         return dispatch({ type: GET_SUPPLIER_LIST, data });
      },
      getSupplierData: data => {
         return dispatch({ type: GET_SUPPLIER_DATA, data });
      },
      postSaveSupplier: data => {
         return dispatch({ type: POST_SAVE_SUPPLIER, data });
      },
      postDeleteSupplier: data => {
         return dispatch({ type: POST_DELETE_SUPPLIER, data });
      }
    }
 }

export default connect(mapStateToProps, mapDispatchToProps)(ManageSupplier);
