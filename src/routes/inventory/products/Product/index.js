import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from 'Components/Footer/Footer';
import ProductComponent from '../../../../components/InventoryManagement/Product/ProductComponent';
import { GET_WAREHOUSE_LIST, GET_STATIC_DATA_PRODUCT, GET_CONFIG_FIELDS_LIST, GET_MODULE_LIST, GET_MODULE_MAPPING_DATA, POST_SAVE_PRODUCT, POST_PRODUCT_IMAGE_UPLOAD } from '../../../../actions/InventoryManagement';
import { warehouseFilteredList } from '../../../../util/utility';
import { loadData } from '../../../../util/storage';
import { setProductPayload } from '../../../../util/payload';

class Product extends Component {
   constructor(props) {
      super(props);
      this.state = {
         
      };
      this._getStaticData();
      this._getWarehouseList();
      this._getConfigFieldList();
  }

  componentWillReceiveProps(nextProps) {
   const { saveResult } = nextProps;
   if(saveResult && saveResult.code === 200) {
       this.props.history.push('/app/Inventory/Products/ManageProduct');
   }
  }

  _getStaticData = () => {
   const authToken = loadData('authToken');  
   this.props.getStaticData({ authToken });
  }

  _getWarehouseList = () => {
   const authToken = loadData('authToken');
   this.props.getWarehouseList({ authToken });
  }

  _getConfigFieldList = () => {
   const authToken = loadData('authToken');
   this.props.getConfigFieldList({ authToken });
  }

  _getModuleList = () => {
   const authToken = loadData('authToken');
   this.props.getModuleList({ authToken });
 }

 _getModuleMappingData = id => {
   const authToken = loadData('authToken');
   this.props.getModuleMappingData({ id, authToken });
 }

 _productImageUpload = file => {
   const authToken = loadData('authToken');
   const dataObj = {
     authToken,
     file
   };
   this.props.postUploadImage(dataObj);
 }

 _cancelForm = () => {
   this.props.history.push("/app/Inventory/Products/ManageProduct");
 }

  _submitForm = data => {
     const authToken = loadData('authToken');
     data = setProductPayload(data);
     const dataObj = {
         data,
         authToken
     };
     this.props.postSaveProduct(dataObj);
     //this.props.history.push("/app/Inventory/Products/ManageProduct");
  }

   render() {
   const { staticData, warehouseList, configurations, modules, inverterList, optimizerList, productParts, productData, saveImageResult } = this.props;
   const warehouses = warehouseList && warehouseFilteredList(warehouseList && warehouseList.warehouses);

      return (
         <div className="ecom-dashboard-wrapper">
            <ProductComponent 
                // id={ id }
                staticData={ staticData && staticData.metaData }
                submitForm={ this._submitForm }
                cancelForm={ this._cancelForm }
                warehouseList={ warehouses }
                productData={ productData && productData.product }
                productImageUpload={ this._productImageUpload }
                imageUploadResponse={ saveImageResult }
                getModuleList={ this._getModuleList }
                modules={ modules && modules.products }
                getModuleMappingData={ this._getModuleMappingData }
                inverters={ inverterList && inverterList.inverters }
                optimizers={ optimizerList && optimizerList.optimizers }
                // getProductParts={ this._getProductParts }
                productPartsList={ productParts && productParts.otherParts }
                configurationsList={ configurations && configurations.configurations }
                // page={ page }
            />
            <Footer />
         </div>
      );
   }
}

const mapStateToProps = state => {
   const { Product, Warehouse } = state;
   const staticData = Product && Product.productStaticData;
   const warehouseList = Warehouse && Warehouse.warehouses;
   const configurations = Product && Product.configList;
   const modules = Product && Product.moduleList;
   const inverterList = Product && Product.moduleMappingData;
   const optimizerList = Product && Product.moduleMappingData;
   const productParts = Product && Product.moduleMappingData;
   const productData = Product && Product.productData;
   const saveImageResult = Product && Product.saveProductImage;
   const saveResult = Product && Product.saveProduct;
   return {
      staticData,
      warehouseList,
      configurations,
      modules,
      inverterList,
      optimizerList,
      productParts,
      productData,
      saveImageResult,
      saveResult
   };
};

const mapDispatchToProps = dispatch => {
   return {
      getStaticData: data => {
         return dispatch({ type: GET_STATIC_DATA_PRODUCT, data });
      },
      getWarehouseList: data => {
         return dispatch({ type: GET_WAREHOUSE_LIST, data });
      },
      getConfigFieldList: data => {
         return dispatch({ type: GET_CONFIG_FIELDS_LIST, data });
      },
      getModuleList: data => {
         return dispatch({ type: GET_MODULE_LIST, data });
      },
      getModuleMappingData: data => {
         return dispatch({ type: GET_MODULE_MAPPING_DATA, data });
      },
      postSaveProduct: data => {
         return dispatch({ type: POST_SAVE_PRODUCT, data });
      },
      postUploadImage: data => {
         return dispatch({ type: POST_PRODUCT_IMAGE_UPLOAD, data });
      }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);