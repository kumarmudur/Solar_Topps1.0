import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from 'Components/Footer/Footer';
import SupplierComponent from '../../../../components/InventoryManagement/Supplier/SupplierComponent';
import { POST_SAVE_SUPPLIER } from '../../../../actions/InventoryManagement';
import { loadData } from '../../../../util/storage';


class Supplier extends Component {

  componentWillReceiveProps(nextProps) {
   const { saveResult } = nextProps;
   if(saveResult && saveResult.code === 200) {
       this.props.history.push('/app/Inventory/Supplier/ManageSupplier');
   }
 }

 _submitForm = data => {
   const authToken = loadData('authToken');
   const dataObj = {
      data,
      authToken
   };
   this.props.postSaveSupplier(dataObj);
}


render() {
   const { supplierData } = this.props;
      return (
         <div className="ecom-dashboard-wrapper">
            <SupplierComponent 
               submitForm = { this._submitForm }
               supplierData={ supplierData && supplierData.supplier }
            />
            <Footer />
         </div>
      );
   }
}

const mapStateToProps = state => {
   const { Supplier } = state;
   const saveResult = Supplier && Supplier.saveSupplier;
   const supplierData = Supplier && Supplier.supplierData;
   return {
      saveResult,
      supplierData
   };
};

const mapDispatchToProps = dispatch => {
   return {
      postSaveSupplier: data => {
         return dispatch({ type: POST_SAVE_SUPPLIER, data });
      },
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Supplier);