import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from 'Components/Footer/Footer';
import AddOtherPriceComponent from '../../../../components/InventoryManagement/Configuration/AddOtherPriceComponent';
import { POST_SAVE_CONFIG_FIELDS } from '../../../../actions/InventoryManagement';
import { loadData } from '../../../../util/storage';


class AddOtherPrice extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }
  
    _submitForm = data => {
       const authToken = loadData('authToken');
       const dataObj = {
          data,
          authToken
       };
       this.props.postSaveConfigFields(dataObj);
    }
  
     render() {
        return (
           <div className="ecom-dashboard-wrapper">
              <AddOtherPriceComponent 
                 submitForm = { this._submitForm }
              />
              <Footer />
           </div>
        );
     }
  }
  
  const mapStateToProps = () => {
     return {
     };
  };
  
  const mapDispatchToProps = dispatch => {
     return {
         postSaveConfigFields: data => {
            return dispatch({ type: POST_SAVE_CONFIG_FIELDS, data });
         },
     };
  };
  
   export default connect(mapStateToProps, mapDispatchToProps)(AddOtherPrice);