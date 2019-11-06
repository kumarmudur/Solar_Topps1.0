import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from "@material-ui/core/";
import { styles } from '../../../util/styles';

const ProductPriceComponent = props => {
    const { productCost, residential, commercial, nonProfit, industrial, sellingPrice, priceTypeList, 
      onFieldChange, onChangeSelectPriceType, errorProductCost, errorResidential, errorCommercial,
    errorNonProfit, errorIndustrial, classes } = props;
    const priceList = priceTypeList && priceTypeList.fieldValues && priceTypeList.fieldValues.map(price => {
        return {
            label: price,
            value: price
        }
    });
    return (
        <Fragment>
            <div className="row">
                <TextField 
                    error={errorProductCost === true}
                    required 
                    name="productCost" 
                    label="Product Cost ($)" 
                    className={classes.textField} 
                    margin="normal"
                    onChange={ onFieldChange }
                    value= { productCost } 
                    maxLength="10"
                    autoComplete="none"
                />   
            </div>             
              
            <div className="selling-price">
                <div className="row">
                    <TextField
                        select 
                        name="sellingPrice" 
                        label="Selling Price" 
                        margin="normal"
                        className={classes.textField}  
                        onChange={ onChangeSelectPriceType } 
                        value = { sellingPrice }
                        // InputProps={{
                        //     startAdornment: <InputAdornment position="start">%</InputAdornment>
                        // }}
                        SelectProps={{ 
                            native: true,
                            MenuProps: { 
                                className: classes.menu,
                            }
                        }}
                    >
                    <option key="" value=""></option>
                    { priceList && priceList.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                    </TextField>
                </div>
               
                <div className="row">
                    <TextField 
                        error={errorResidential === true}
                        required 
                        name="residential" 
                        label="Residential" 
                        className={classes.textField} 
                        margin="normal"
                        onChange={ onFieldChange }
                        value= { residential } 
                        maxLength="10"
                        autoComplete="none"
                    /> 
                    <TextField 
                        error={errorCommercial === true}
                        required 
                        name="commercial" 
                        label="Commercial" 
                        className={classes.textField} 
                        margin="normal"
                        onChange={ onFieldChange }
                        value= { commercial } 
                        maxLength="10"
                        autoComplete="none"
                    />
                    <TextField 
                        error={errorNonProfit === true}
                        required 
                        name="nonProfit" 
                        label="Non Profit" 
                        className={classes.textField} 
                        margin="normal"
                        onChange={ onFieldChange }
                        value= { nonProfit } 
                        maxLength="10"
                        autoComplete="none"
                    />
                    <TextField 
                        error={errorIndustrial === true}
                        required 
                        name="industrial" 
                        label="Industrial" 
                        className={classes.textField} 
                        margin="normal"
                        onChange={ onFieldChange }
                        value= { industrial } 
                        maxLength="10"
                        autoComplete="none"
                    />                            
                </div>
            </div>
        </Fragment>
    );
};

export default withStyles(styles, { name: "ProductPriceComponent" })(ProductPriceComponent);
