import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from 'Components/Footer/Footer';
import WarehouseComponent from '../../../../components/InventoryManagement/Warehouse/WarehouseComponent';
import { loadData } from '../../../../util/storage';
import { POST_SAVE_WAREHOUSE } from '../../../../actions/InventoryManagement'


class Warehouse extends Component {

  componentWillReceiveProps(nextProps) {
   const { saveResult } = nextProps;
   if(saveResult && saveResult.code === 200) {
       this.props.history.push('/app/Inventory/Warehouse/ManageWarehouse');
   }
 }

  _submitForm = data => {
      const authToken = loadData('authToken');
      const dataObj = {
         data,
         authToken
      };
      this.props.postSaveWarehouse(dataObj);
  }

   render() {
      const { warehouseData } = this.props;
      return (
         <div className="ecom-dashboard-wrapper">
            <WarehouseComponent 
               submitForm = { this._submitForm }
               warehouseData={ warehouseData && warehouseData.warehouse }
            />
            <Footer />
         </div>
      );
   }
}

const mapStateToProps = state => {
   const { Warehouse } = state;
   const saveResult = Warehouse && Warehouse.saveWarehouse;
   const warehouseData = Warehouse && Warehouse.warehouseData;
   return {
      saveResult,
      warehouseData
   };
};

const mapDispatchToProps = dispatch => {
   return {
      postSaveWarehouse: data => {
         return dispatch({ type: POST_SAVE_WAREHOUSE, data });
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Warehouse);