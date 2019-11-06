import React, { Component } from 'react';
import Footer from 'Components/Footer/Footer';
import { connect } from 'react-redux';
import WarehouseDetailsComponent from '../../../../components/InventoryManagement/Warehouse/WarehouseDetailsComponent';

class WarehouseDetails extends Component {
  
    _openEditPage = data => {
      this.props.history.push("/app/Inventory/Warehouse/Warehouse");
    }
  
     render() {
        const { warehouseData } = this.props;
        return (
           <div className="ecom-dashboard-wrapper">
           <div className="view-page-min-ht">
              <WarehouseDetailsComponent 
                 submitForm = { this._submitForm }
                 warehouseData={ warehouseData && warehouseData.warehouse }
                 openEditPage={ this._openEditPage }
              />
            </div>
              <Footer />
           </div>
        );
     }
  }
  
const mapStateToProps = state => {
   const { Warehouse } = state;
   const warehouseData = Warehouse && Warehouse.warehouseData;
   return {
      warehouseData
   };
};
  
 

export default connect(mapStateToProps, null)(WarehouseDetails);