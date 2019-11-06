import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/";
import { styles } from '../../../util/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const ProductAssemblyComponent = props => {
    const { productAssemblyModule, modules, inverters, optimizers, onFieldChange, onChangeSelect, 
      onChangeSelectOptimizer, onChangeSelectInverter,
      grandTotalAssemblyResidential, grandTotalAssemblyCommercial, grandTotalAssemblyNonProfit, 
      grandTotalAssemblyIndustrial, productAssemblyOptimizer, productAssemblyInverter, onClearProductAssembly, classes } = props;
    const moduleList = modules && modules.map(module => {
      return {
        label: module.productName,
        value: `${module.productName}-${module.productId}`
      };
    });
    const invertersList = inverters && inverters.map(inverter => {
      return  {
        label: inverter.productName,
        value: `${inverter.productName}-${inverter.productId}`
      };
    });
    const optimizersList = optimizers && optimizers.map(optimizer => {
      return {
        label: optimizer.productName,
        value: `${optimizer.productName}-${optimizer.productId}`
      };
    });
    return (
        <Fragment>
            <div className="product-grid">
                <div className="table-heading">
                    <div className="grid-row">
                        <div className="header">Item</div>
                        <div className="header">Watt</div>
                        <div className="header">Quantity</div>
                        <div className="header">Residential</div>
                        <div className="header">Commercial</div>
                        <div className="header">Non Profit</div>
                        <div className="header">Industrial</div>
                        <div className="header">Actions</div>
                    </div>
                </div>
                <div className="grid-body">
                    <div className="grid-row">
                        <div className="grid-cell warehouse-cell">
                            <TextField
                                select 
                                name="moduleItem"
                                margin="normal"
                                label="Module" 
                                className={classes.textField}  
                                onChange={ onChangeSelect } // eslint-disable-line
                                value = { productAssemblyModule.productName }
                                SelectProps={{ 
                                    native: true,
                                    MenuProps: { 
                                        className: classes.menu,
                                    }
                                }}
                            >
                            <option key="" value=""></option>
                            {moduleList && moduleList.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                            </TextField>
                        </div>
                        <div className="grid-cell">
                            <TextField 
                                name="moduleWatt"
                                className={classes.textField} 
                                margin="normal"
                                value= { productAssemblyModule.power }
                                inputProps={{
                                    autoComplete: "none",
                                    readOnly: true
                                }}
                            />         
                        </div>
                        <div className="grid-cell">
                            <TextField 
                                name="moduleQuantity"
                                className={classes.textField} 
                                margin="normal"
                                value= { productAssemblyModule.quantity }
                                onChange={ onFieldChange }
                                autoComplete= "none"
                                maxLength="5"
                                inputProps={{
                                    maxLength: 5,
                                    readOnly: productAssemblyModule.productName ? false : true,
                                }}
                            />    
                        </div>
                        <div className="grid-cell">
                            <TextField 
                                name="moduleResidential"
                                className={classes.textField} 
                                margin="normal"
                                value= { productAssemblyModule.residential }
                                inputProps={{
                                    autoComplete: "none",
                                    readOnly: true
                                }}
                            />   
                        </div>
                        <div className="grid-cell">
                            <TextField 
                                name="moduleCommercial"
                                className={classes.textField} 
                                margin="normal"
                                value= { productAssemblyModule.commercial }
                                inputProps={{
                                    autoComplete: "none",
                                    readOnly: true
                                }}
                            />   
                        </div>
                        <div className="grid-cell">
                            <TextField 
                                name="moduleNonProfit"
                                className={classes.textField} 
                                margin="normal"
                                value= { productAssemblyModule.nonProfit }
                                InputProps={{
                                    autoComplete: "none",
                                    readOnly: true
                                }}
                            />    
                        </div>
                        <div className="grid-cell">
                            <TextField 
                                name="moduleIndustrial"
                                className={classes.textField} 
                                margin="normal"
                                value= { productAssemblyModule.industrial }
                                inputProps={{
                                    autoComplete: "none",
                                    readOnly: true
                                }}
                            />    
                        </div>
                        <div className="grid-cell grid-delete-cell">
                                <span>
                                <NavLink to="#delete_product_specification"><DeleteIcon id='module' className="imgIconCurosr" alt="delete" onClick={ onClearProductAssembly }/></NavLink>
                                </span>
                        </div>
                    </div>  

                    <div className="grid-row">
                        <div className="grid-cell warehouse-cell">
                            <TextField
                                select 
                                name="productName"
                                label="Optimizer" 
                                margin="normal"
                                className={classes.textField}  
                                onChange={ onChangeSelectOptimizer } // eslint-disable-line
                                value = { productAssemblyOptimizer.productName }
                                SelectProps={{ 
                                    native: true,
                                    MenuProps: { 
                                        className: classes.menu
                                    }
                                }}
                            >
                                {/* { optimizersList ? optimizersList : [] } */}
                                <option key="" value=""></option>
                                {optimizersList && optimizersList.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>    
                            
                        </div>
                        <div className="grid-cell">
                            <TextField 
                                name="optimizerWatt"
                                className={classes.textField} 
                                margin="normal"
                                value= { productAssemblyOptimizer.power }
                                inputProps={{
                                    autoComplete: "none",
                                    readOnly: true
                                }}
                            />        
                        </div>
                        <div className="grid-cell">
                            <TextField 
                                name="optimizerQuantity"
                                className={classes.textField} 
                                margin="normal"
                                value={ productAssemblyOptimizer.quantity }
                                onChange={ onFieldChange }
                                inputProps={{
                                    autoComplete: "none",
                                    readOnly: productAssemblyOptimizer.productName ? false : true,
                                    maxLength: 5,
                                }}
                            />    
                        </div>
                        <div className="grid-cell">
                            <TextField 
                                name="optimizerResidential"
                                className={classes.textField} 
                                margin="normal"
                                value={ productAssemblyOptimizer.residential }
                                inputProps={{
                                    autoComplete: "none",
                                    readOnly: true
                                }}
                            />    
                        </div>
                        <div className="grid-cell">
                            <TextField 
                                name="optimizerCommercial"
                                className={classes.textField} 
                                margin="normal"
                                value={ productAssemblyOptimizer.commercial }
                                inputProps={{
                                    autoComplete: "none",
                                    readOnly: true
                                }}
                            />    
                        </div>
                        <div className="grid-cell">
                            <TextField 
                                name="optimizerNonProfit"
                                className={classes.textField} 
                                margin="normal"
                                value={ productAssemblyOptimizer.nonProfit }
                                inputProps={{
                                    autoComplete: "none",
                                    readOnly: true
                                }}
                            />         
                        </div>
                        <div className="grid-cell">
                            <TextField 
                                name="optimizerIndustrial"
                                className={classes.textField} 
                                margin="normal"
                                value={ productAssemblyOptimizer.industrial }
                                inputProps={{
                                    autoComplete: "none",
                                    readOnly: true
                                }}
                            />    
                        </div>
                        <div className="grid-cell grid-delete-cell">
                                <span>
                                <NavLink to="#delete_product_specification"><DeleteIcon id="optimizer" className="imgIconCurosr" alt="delete" onClick={ onClearProductAssembly }/></NavLink>
                                </span>
                        </div>
                    </div>  

                    <div className="grid-row">
                        <div className="grid-cell warehouse-cell">
                            <TextField
                                select 
                                name="productName"
                                label="Inverter" 
                                margin="normal"
                                className={classes.textField}  
                                onChange={ onChangeSelectInverter } // eslint-disable-line
                                value = { productAssemblyInverter.productName }
                                SelectProps={{ 
                                    native: true,
                                    MenuProps: { 
                                        className: classes.menu
                                    }
                                }}
                            >
                                <option key="" value=""></option>
                                {invertersList && invertersList.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </TextField>    
                        </div>
                        <div className="grid-cell">
                            <TextField 
                                name="inverterWatt"
                                className={classes.textField} 
                                margin="normal"
                                value={ productAssemblyInverter.power }
                                inputProps={{
                                    autoComplete: "none",
                                    readOnly: true
                                }}
                            />        
                        </div>
                        <div className="grid-cell">
                            <TextField 
                                name="inverterQuantity"
                                className={classes.textField} 
                                margin="normal"
                                value={ productAssemblyInverter.quantity }
                                onChange={ onFieldChange }
                                inputProps={{
                                    autoComplete: "none",
                                    readOnly: productAssemblyInverter.productName ? false : true,
                                    maxLength: 5,
                                }}
                            />     
                        </div>
                        <div className="grid-cell">
                            <TextField 
                                name="inverterResidential"
                                className={classes.textField} 
                                margin="normal"
                                value={ productAssemblyInverter.residential }
                                InputProps={{
                                    autoComplete: "none",
                                    readOnly: true
                                }}
                            />    
                        </div>
                        <div className="grid-cell">
                            <TextField 
                                name="inverterCommercial"
                                className={classes.textField} 
                                margin="normal"
                                value={ productAssemblyInverter.commercial }
                                inputProps={{
                                    autoComplete: "none",
                                    readOnly: true
                                }}
                            />     
                        </div>
                        <div className="grid-cell">
                            <TextField 
                                name="inverterNonProfit"
                                className={classes.textField} 
                                margin="normal"
                                value={ productAssemblyInverter.nonProfit }
                                inputProps={{
                                    autoComplete: "none",
                                    readOnly: true
                                }}
                            />    
                        </div>
                        <div className="grid-cell">
                            <TextField 
                                name="inverterIndustrial"
                                className={classes.textField} 
                                margin="normal"
                                value={ productAssemblyInverter.industrial }
                                inputProps={{
                                    autoComplete: "none",
                                    readOnly: true
                                }}
                            />     
                        </div>
                        <div className="grid-cell grid-delete-cell">
                            <span>
                                <NavLink to="#delete_product_specification"><DeleteIcon id="inverter" className="imgIconCurosr" alt="delete" onClick={ onClearProductAssembly }/></NavLink>
                            </span>
                        </div>
                    </div>  
                </div>

                <div className="table-heading grand-total-assembly">
                    <div className="grid-row">
                        <div className="header">Grand Total</div>
                        <div className="header no-border"></div>
                        <div className="header no-border"></div>
                        <div className="header">{ grandTotalAssemblyResidential }</div>
                        <div className="header">{ grandTotalAssemblyCommercial }</div>
                        <div className="header">{ grandTotalAssemblyNonProfit }</div>
                        <div className="header">{ grandTotalAssemblyIndustrial }</div>
                        <div className="header"></div>
                    </div>
                </div>

            </div>
        </Fragment>
    );
};

export default withStyles(styles, { name: "ProductAssemblyComponent" })(ProductAssemblyComponent);