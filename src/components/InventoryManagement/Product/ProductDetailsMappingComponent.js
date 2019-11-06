import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/";
import { styles } from '../../../util/styles';
import compose from "recompose/compose";

class ProductDetailsMappingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          inverters: [],
          optimizers: [],
          otherParts: [],
          useFor: {
            residential: false,
            commercial: false,
            nonProfit: false,
            industrial: false
          }
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.mappingData) {
          this._getModifyMappingData(nextProps);
        }
    }
    
    _getModifyMappingData = data => {
        const { mappingData, inverterList, optimizerList, partList   } = data;
        this._setUseFor(mappingData);
        this._getInverterMappingData(mappingData, inverterList);
        this._getOptimizerMappingData(mappingData, optimizerList);
        this._getPartsMappingData(mappingData, partList);
    }
    
    _setUseFor = data => {
        const { useFor } = this.state;
        if(data.useFor) {
          useFor.residential = data && data.useFor.residential;
          useFor.commercial = data && data.useFor.commercial;
          useFor.nonProfit = data && data.useFor.nonProfit;
          useFor.industrial = data && data.useFor.industrial;
          this.setState({
            useFor
          });
        }
    }
    
    _getInverterMappingData = (mappingData, inverterList) => {
        let modifiedInverterData = [];
        if(mappingData.length === 0) {
          modifiedInverterData = inverterList;
        } else {
          modifiedInverterData = inverterList && inverterList.map(inverter => {
            mappingData && mappingData.inverters && mappingData.inverters.map(inv => {
               if(inverter.productId === inv.productId) {
                 inverter.checked = true;
               }
           });
           return inverter;
         });
        }
        this.setState({
          inverters: modifiedInverterData
        });
    }
    
    _getOptimizerMappingData = (mappingData, optimizerList) => {
        let modifiedOptimizerData = [];
        if(mappingData.length === 0) {
          modifiedOptimizerData = optimizerList;
        } else {
           modifiedOptimizerData = optimizerList && optimizerList.map(optimizer => {
            mappingData && mappingData.optimizers && mappingData.optimizers.map(opt => {
               if(optimizer.productId === opt.productId) {
                 optimizer.checked = opt.checked;
               }
           });
           return optimizer;
         });
       } 
       this.setState({
          optimizers: modifiedOptimizerData
        });
    }
    
    _getPartsMappingData = (mappingData, partList) => {
        let modifiedPartsData = [];
        if(mappingData.length === 0) {
          modifiedPartsData = partList;
        } else {
           modifiedPartsData = partList && partList.map(part => {
            mappingData && mappingData.otherParts && mappingData.otherParts.map(otherPart => {
              if(part.productId === otherPart.productId) {
                part.checked = otherPart.checked;
              }
            });
            return part;
          });
        }
        this.setState({
          otherParts: modifiedPartsData
        });
    }
    
    _onFieldChangeUseFor = e => {
        const { name, checked } = e.currentTarget;
        const { useFor } = this.state;
        useFor[name] = checked;
        this.setState({
          useFor
        });
    }
    
    _onFieldChangeInverter = e => {
        const { name, checked } = e.currentTarget;
        const { inverters } = this.state;
        inverters.map(inverter => {
          if(inverter.productId === parseInt(name)) {
            inverter.checked = checked;
          }
        });
        this.setState({
          inverters
        });
    }
    
    _onFieldChangeOptimizer = e => {
        const { name, checked } = e.currentTarget;
        const { optimizers } = this.state;
        optimizers.map(opt => {
          if(opt.productId === parseInt(name)) {
            opt.checked = checked;
          }
        });
        this.setState({
          optimizers
        });
    }
    
    _onFieldChangeParts = e => {
        const { name, checked } = e.currentTarget;
        const { otherParts } = this.state;
        otherParts.map(part => {
          if(part.productId === parseInt(name)) {
            part.checked = checked;
          }
        });
        this.setState({
          otherParts
        });
    }
    
    _submitForm = () => {
        const { mappingData } = this.props;
        const { moduleName, moduleId, mappingId } = mappingData;
        let { useFor, inverters, optimizers, otherParts } = this.state;
        inverters = inverters && inverters.filter(inv => {
          return inv.checked === true;
        });
        optimizers = optimizers && optimizers.filter(opt => {
          return opt.checked === true;
        });
        otherParts = otherParts && otherParts.filter(part => {
          return part.checked === true;
        });
        const dataObj = {
          moduleName,
          moduleId,
          mappingId,
          useFor,
          inverters,
          optimizers,
          otherParts
        };
        this.props.submitForm(dataObj);
    }
    
    _cancelForm = () => {
        this.props.cancelForm();
    }

    render() {
      const { classes } = this.props;
        const { mappingData } = this.props;
        const { inverters, optimizers, otherParts, useFor } = this.state;
        const { residential, commercial, nonProfit, industrial } = useFor;
        return (
          <div className="ecom-dashboard-wrapper page-readonly-view product-mapping">
          <div className="rct-block ">
              <div className="rct-block-title ">
                  <h4>Module Name</h4>
              </div>
              <div className="collapse show">
                  <div className="rct-block-content">
                  <TextField 
                  name="moduleName" 
                  label="Module Name" 
                  className={classes.textField} 
                  margin="normal"
                  value={ mappingData && mappingData.moduleName ? mappingData.moduleName : '' }
                  InputLabelProps={{shrink:true }}
                  InputProps={{
                    readOnly: true,
                  }}
                  />
                  </div>
              </div>
          </div>
          
          <div className="rct-block ">
              <div className="rct-block-title ">
                  <h4>Use For</h4>
              </div>
              <div className="collapse show">
                  <div className="rct-block-content">
                  <FormControlLabel
                    control={
                       <Checkbox 
                          color="primary" 
                          name="residential" 
                          checked={residential} 
                          onChange={ this._onFieldChangeUseFor }  
                        />
                    }
                    label="Residential"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    control={
                       <Checkbox 
                          color="primary" 
                          name="commercial" 
                          checked={commercial} 
                          onChange={ this._onFieldChangeUseFor }  
                        />
                     }
                     label="commercial"
                     labelPlacement="end"
                  />
                  <FormControlLabel
                    control={
                       <Checkbox 
                          color="primary" 
                          name="nonProfit" 
                          checked={nonProfit} 
                          onChange={ this._onFieldChangeUseFor }  
                        />
                     }
                     label="Non Profit"
                     labelPlacement="end"
                    />
                     <FormControlLabel
                    control={
                       <Checkbox 
                          color="primary" 
                          name="industrial" 
                          checked={industrial} 
                          onChange={ this._onFieldChangeUseFor }  
                        />
                     }
                     label="Industrial"
                     labelPlacement="end"
                    />
                  </div>
              </div>
          </div>
          
          {/* Inverter */}
          <div className="rct-block ">
              <div className="rct-block-title ">
              <h4>Inverter</h4>
              </div>
              <div className="collapse show">
                  <div className="rct-block-content">
                  {
                    inverters && inverters.map(inverter => (
                      <FormControlLabel
                        control={
                            <Checkbox 
                                color="primary" 
                                name={ inverter.productId } 
                                checked={ inverter.checked } 
                                onChange={ this._onFieldChangeInverter }  
                              />
                          }
                          label={ inverter.productName }
                          labelPlacement="end"
                          />
                    ))
                  }  
                </div>
              </div>
          </div>

          {/* Optimizer */}
          <div className="rct-block ">
              <div className="rct-block-title ">
              <h4>Optimizer</h4>
              </div>
              <div className="collapse show">
                  <div className="rct-block-content">
                  {
                    optimizers && optimizers.map(optimizer => (
                      <FormControlLabel
                        control={
                            <Checkbox 
                                color="primary" 
                                name={ optimizer.productId } 
                                checked={ optimizer.checked } 
                                onChange={ this._onFieldChangeOptimizer }  
                              />
                          }
                          label={ optimizer.productName }
                          labelPlacement="end"
                          />
                    ))
                  }  
                  </div>
              </div>
          </div>

          <div className="rct-block ">
              <div className="rct-block-title ">
              <h4>Other Parts</h4>
              </div>
              <div className="collapse show">
                  <div className="rct-block-content">
                  {
                    otherParts && otherParts.map(part => (
                      <FormControlLabel
                        control={
                            <Checkbox 
                                color="primary" 
                                name={ part.productId } 
                                checked={ part.checked } 
                                onChange={ this._onFieldChangeParts }  
                              />
                          }
                          label={ part.productName }
                          labelPlacement="end"
                          />
                    ))
                  }  
                  </div>
              </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={ this._cancelForm }>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={ this._submitForm }>Submit</button>
         </div>
          {/* <Footer /> */}
      </div>
        )
    }
}

export default compose(withStyles(styles, { name: "ProductDetailsMappingComponent" }),)(ProductDetailsMappingComponent);
