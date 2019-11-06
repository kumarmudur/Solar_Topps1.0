import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import IntlMessages from 'Util/IntlMessages';
import Footer from 'Components/Footer/Footer';
import { ALERT_MESSAGE } from '../../../../constants/constants';
import { connect } from 'react-redux';
import ManageWarehouseComponent from '../../../../components/InventoryManagement/Warehouse/ManageWarehouseComponent';
import { loadData } from '../../../../util/storage';
import { GET_WAREHOUSE_LIST, GET_WAREHOUSE_DATA, POST_SAVE_WAREHOUSE, POST_DELETE_WAREHOUSE } from '../../../../actions/InventoryManagement'

class ManageWarehouse extends Component {
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
         this.props.postSaveWarehouse();
      }
      if(deleteResult && deleteResult.code === 200) {
         this._callSetStateAlertMessage('DELETE', 'alert alert-success');
         this.props.postDeleteWarehouse();
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

   _openAddWarehousePage = () => {
      this.props.history.push("/app/Inventory/Warehouse/Warehouse");
      this.props.getWarehouseData();
      this.props.postSaveWarehouse();
   }

   _getData = data => {
      const authToken = loadData('authToken');
      data.authToken = authToken;
      this.props.getWarehouseList(data);
   }

   _getWarehouseData = id => {
      const authToken = loadData('authToken');
      const dataObj = {
        authToken,
        id
      }
      this.props.getWarehouseData(dataObj);
      this.props.history.push("/app/Inventory/Warehouse/WarehouseDetails");
   }

   _deleteWarehouse = ids => {
      if(ids === true) {
         this._callSetStateAlertMessage('DUPLICATE_DELETE', 'alert alert-danger');
      } else {
         const authToken = loadData('authToken');
         const dataObj = {
            authToken,
            ids
         }
         this.props.postDeleteWarehouse(dataObj);
      }
   }

   render() {
      
      const { match, warehouses } = this.props;
      const { showSucessMessage, alertMessage, alertClass } = this.state;

      return (
         <div className="ecom-dashboard-wrapper">
            <Helmet>
               <title>Manage Warehouse</title>
            </Helmet>
            <PageTitleBar title={<IntlMessages id="sidebar.manageWarehouse" />} match={match} />
            {
               showSucessMessage ? 
                  <div className={ alertClass } role="alert"> { alertMessage } </div> : null
            }
            <div className="add-button"> 
               <button type="button" className="btn btn-primary" onClick={ this._openAddWarehousePage }>Add Warehouse</button>
            </div>
            <div className="page-min-ht">
               <ManageWarehouseComponent
                  warehouses={ warehouses}
                  getWarehouseData={ this._getWarehouseData }
                  deleteWarehouse={ this._deleteWarehouse }
               />
            </div>
         <Footer />
         </div>
      )
   }
}
const mapStateToProps = state => {
   const { Warehouse } = state;
   const warehouses = Warehouse && Warehouse.warehouses;
   const saveResult = Warehouse && Warehouse.saveWarehouse;
   const deleteResult = Warehouse && Warehouse.deleteWarehouse;
   return {
      warehouses,
      saveResult,
      deleteResult
   }
 };

 const mapDispatchToProps = dispatch => {
    return {
      getWarehouseList: data => {
         return dispatch({ type: GET_WAREHOUSE_LIST, data});
      },
      getWarehouseData: data => {
         return dispatch({ type: GET_WAREHOUSE_DATA, data });
      },
      postSaveWarehouse: data => {
         return dispatch({ type: POST_SAVE_WAREHOUSE, data });
      },
      postDeleteWarehouse: data => {
         return dispatch({ type: POST_DELETE_WAREHOUSE, data });
      }
    }
 }

export default connect(mapStateToProps, mapDispatchToProps)(ManageWarehouse);

