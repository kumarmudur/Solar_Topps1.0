import React, { Component } from 'react';
import Footer from 'Components/Footer/Footer';
import { connect } from 'react-redux';
import SupplierDetailsComponent from '../../../../components/InventoryManagement/Supplier/SupplierDetailsComponent';

class SupplierDetails extends Component {
   
    _openEditPage = data => {
      this.props.history.push("/app/Inventory/Supplier/Supplier");
    }
  
     render() {
        const {supplierData } = this.props;
        return (
           <div className="ecom-dashboard-wrapper">
              <SupplierDetailsComponent 
                 submitForm = { this._submitForm }
                 supplierData={ supplierData && supplierData.supplier }
                 openEditPage={ this._openEditPage }
              />
              <Footer />
           </div>
        );
     }
  }
  
const mapStateToProps = state => {
   const { Supplier } = state;
   const supplierData = Supplier && Supplier.supplierData;
   return {
      supplierData
   };
};
  


export default connect(mapStateToProps, null)(SupplierDetails);