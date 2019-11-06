import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import IntlMessages from 'Util/IntlMessages';
import Footer from 'Components/Footer/Footer';
import ManageProductComponent from '../../../../components/InventoryManagement/Product/ManageProductComponent';
import { loadData } from '../../../../util/storage';
import { GET_PRODUCT_LIST, GET_PRODUCT_DATA, POST_DELETE_PRODUCT, POST_SAVE_MAPPING, POST_SAVE_PRODUCT } from '../../../../actions/InventoryManagement';
import { ALERT_MESSAGE } from '../../../../constants/constants';


class ManageProducts extends Component {
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
      const { deleteResult, saveResultMapping, saveResult } = nextProps;
      if(deleteResult && deleteResult.code === 200) {
        this._callSetStateAlertMessage('DELETE', 'alert alert-success');
        this.props.postDeleteProduct();
      }
      if(saveResultMapping && saveResultMapping.code === 200) {
        this._callSetStateAlertMessage('MAPPING', 'alert alert-success');
        this.props.saveMapping();
      }  
      if(saveResult && saveResult.code === 200) {
        this._callSetStateAlertMessage('SUCCESS', 'alert alert-success');
        this.props.postSaveProduct();
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
   
   _openAddProductPage = () => {
      this.props.history.push("/app/Inventory/Products/Product");
      this.props.getProductData();
      this.props.postSaveProduct();
   }

   _getData = data => {
      const authToken = loadData('authToken');
      data.authToken = authToken;
      this.props.getProductList(data);
   }

   _getProductData = id => {
      const authToken = loadData('authToken');
      const dataObj = {
        authToken: authToken,
        id
      }
      this.props.getProductData(dataObj);
      this.props.history.push("/app/Inventory/Products/ProductDetails");
   }

   _deleteProduct = ids => {
      if(ids === true) {
         this._callSetStateAlertMessage('DUPLICATE_DELETE', 'alert alert-danger');
      } else {
         const authToken = loadData('authToken');
         const dataObj = {
            authToken,
            ids
         }
         this.props.postDeleteProduct(dataObj);
      }
   }

   render() {
      const { match, products } = this.props;
      const { showSucessMessage, alertMessage, alertClass } = this.state;
      return (
         <div className="ecom-dashboard-wrapper">
            <Helmet>
               <title>Manage Products</title>
            </Helmet>
            <PageTitleBar title={<IntlMessages id="sidebar.manageProducts" />} match={match} />
            {
               showSucessMessage ? 
                  <div className={ alertClass } role="alert"> { alertMessage } </div> : null
            }
            <div className="add-button"> 
               <button type="button" className="btn btn-primary" onClick={ this._openAddProductPage }>Add Product</button>
            </div>
            <div className="page-min-ht">
               <ManageProductComponent 
                  products={ products }
                  getProductData={ this._getProductData }
                  deleteProduct={ this._deleteProduct }
               />
           </div>
         <Footer />
         </div>
      )
   }
}

const mapStateToProps = state => {
   const { Product } = state;
   const products = Product && Product.products;
   const deleteResult = Product && Product.deleteProduct;
   const saveResultMapping = Product && Product.saveMapping;
   const saveResult = Product && Product.saveProduct;
   return {
      products,
      deleteResult,
      saveResultMapping,
      saveResult
   }
};

const mapDispatchToProps = dispatch => {
    return {
      getProductList: data => {
         return dispatch({ type: GET_PRODUCT_LIST, data });
      },
      getProductData: data => {
         return dispatch({ type: GET_PRODUCT_DATA, data });
      },
      postDeleteProduct: data => {
         return dispatch({ type: POST_DELETE_PRODUCT, data });
      },
      saveMapping: data => {
         return dispatch({ type: POST_SAVE_MAPPING, data });
      },
      postSaveProduct: data => {
         return dispatch({ type: POST_SAVE_PRODUCT, data });
      },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageProducts);
