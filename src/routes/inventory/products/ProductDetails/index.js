import React, { Component } from 'react';
import Footer from 'Components/Footer/Footer';
import { connect } from 'react-redux';
import ProductDetailsGeneralComponent from '../../../../components/InventoryManagement/Product/ProductDetailsGeneralComponent';
import ProductDetailsMappingComponent from '../../../../components/InventoryManagement/Product/ProductDetailsMappingComponent';
import { GET_PRODUCT_MODULE_MAPPING, GET_INVERTER_LIST, GET_OPTIMIZER_LIST, GET_PRODUCT_PART_LIST, POST_SAVE_MAPPING } from '../../../../actions/InventoryManagement';
import { loadData } from '../../../../util/storage';
import { VIEW_PRODUCT_TABS } from '../../../../constants/constants';

class ProductDetails extends Component {

constructor(props) {
     super(props);
     this.state = {
          showTab: true,
     };
}

_getData = data => {
     const authToken = loadData('authToken');
     data.authToken = authToken;
     this.props.getProductList(data);
}
     

_getMappingData = () => {
   const { id, getMappingData, getInverterList, getOptimizerList, getProductPartList } = this.props;
   const authToken = loadData('authToken');  
   getMappingData({ id, authToken });
   getInverterList({ authToken });
   getOptimizerList({ authToken });
   getProductPartList({ authToken });
}

_submitForm = data => {
     const authToken = loadData('authToken');  
     const dataObj = {
         authToken,
         data
     };
     this.props.saveMapping(dataObj);
     this.props.history.push("/app/Inventory/Products/ManageProduct");
 }

 _cancelForm = () => {
     this.props.setAlertStatus({ 'visible': false });
     this.props.navigate({ currentPage: 'MANAGE_PRODUCTS' });
 }

 _onClickTabChange = tabName => {
     let  showTab = false;

     if(tabName === VIEW_PRODUCT_TABS.GENERAL) {
         showTab = true;
     } else if (tabName === VIEW_PRODUCT_TABS.MAPPING) {
         showTab = false;
         this._getMappingData();
     }
     this.setState({
         showTab
     });
 }

 _openEditPage = data => {
     this.props.history.push("/app/Inventory/Products/Product");
}

render () {
    const { productData, productMappingData, inverterList, optimizerList, partsList  } = this.props;
    const isCategory = productData && productData.product && productData && productData.product.category;
    const { showTab } = this.state;
    return (
        <div className="ecom-dashboard-wrapper">
            <h1>Product Details</h1>
            <div className="multiple-btns">
               <div className="btn-left">
                    <span className="btn-mrgn"><button type="button" className="btn btn-primary" onClick={ () => this._onClickTabChange('general') }>General</button></span>
                    {
                         isCategory === 'Module' ? <span><button type="button" className="btn btn-secondary" onClick={() => this._onClickTabChange('mapping') }>Mapping</button></span> : ''
                    }
               </div>
               <div className="btn-right">
                    <span><button type="button" className="btn btn-primary" onClick={ this._openEditPage }>Edit</button></span>
               </div>   
            </div>
             {
               showTab ?  <ProductDetailsGeneralComponent 
                            productData={ productData && productData.product }   
                          /> :  <ProductDetailsMappingComponent 
                                   mappingData={ productMappingData && productMappingData.mapping }
                                   inverterList={ inverterList && inverterList.inverters }
                                   optimizerList={ optimizerList && optimizerList.optimizer }
                                   partList={ partsList && partsList.otherParts }
                                   submitForm={ this._submitForm }
                                   cancelForm={ this._cancelForm }
                                 />
             }
         <Footer />
         </div>
    );
  }
}

const mapStateToProps = state => {
     const { Product } = state;
     const productData = Product && Product.productData;
     const id = productData && productData.product && productData.product.productId;
     const productMappingData =  Product && Product.productMappingData;
     const inverterList =  Product && Product.inverters;
     const optimizerList = Product && Product.optimizers;
     const partsList = Product && Product.otherParts;
     return {
          productData,
          id,
          productMappingData,
          inverterList,
          optimizerList,
          partsList
     };
};

const mapDispatchToProps = dispatch => {
     return {  
          getMappingData: data => {
              return dispatch({ type: GET_PRODUCT_MODULE_MAPPING, data });
          },
          getInverterList: data => {
               return dispatch({ type: GET_INVERTER_LIST, data });
          },
          getOptimizerList: data => {
               return dispatch({ type: GET_OPTIMIZER_LIST, data });
          },
          getProductPartList: data => {
               return dispatch({ type: GET_PRODUCT_PART_LIST, data });
          },
          saveMapping: data => {
               return dispatch({ type: POST_SAVE_MAPPING, data });
          }
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);