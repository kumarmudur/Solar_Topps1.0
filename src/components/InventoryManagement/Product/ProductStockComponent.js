import React, { Fragment} from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from "@material-ui/core/";
import { styles } from '../../../util/styles';


const ProductStockComponent = props => {
    const { quantity, threshold, quantityInBox, warehouseList, quantityTypeList, stockAvailabilityList, sku, onFieldChangeNumeric, onFieldChangeAlphaNumeric,
      onChangeSelectQuantityType, onChangeSelectStockAvailability, onChangeSelectWarehouse, quantityType, warehouse, stockAvailability, onFieldBlur, 
      errorQuantity, errorThreshold, errorQunatityBox, classes, errorThresholdMessage } = props;
    const quantityList = quantityTypeList && quantityTypeList.fieldValues && quantityTypeList.fieldValues.map(quantity => {
        return {
            label: quantity,
            value: quantity
        }
    });
    const stockAvailabilityType = stockAvailabilityList && stockAvailabilityList.fieldValues && stockAvailabilityList.fieldValues.map(stock => {
        return {
            label: stock,
            value: stock
        }
    });

    const warehouseTypeList = warehouseList && warehouseList.map(warehouse => {
        return  {
            label: warehouse,
            value: warehouse
        }
    });

    return (
        <Fragment>
            <TextField 
                error={errorQuantity === true}
                required 
                name="quantity" 
                label="Quantity" 
                className={classes.textField} 
                margin="normal"
                maxLength="10"
                value= { quantity }
                onChange={ onFieldChangeNumeric }
                onBlur={ onFieldBlur }
                inputProps={{ autoComplete: "none" }}
            /> 
            <FormControl>
            <TextField 
                error={errorThreshold === true}
                required 
                name="threshold" 
                label="Only X left Threshold (Min Qty)" 
                className={classes.textField} 
                margin="normal"
                maxLength="10"
                value= { threshold }
                onChange={ onFieldChangeNumeric }
                onBlur={ onFieldBlur }
                inputProps={{ autoComplete: "none" }}
            />
            <FormHelperText class="error-text">{ errorThresholdMessage }</FormHelperText>
            </FormControl>
           

            <TextField
                select 
                name="quantityType"
                label="Quantity Type" 
                margin="normal"
                className={classes.textField}  
                onChange={ onChangeSelectQuantityType }
                value = { quantityType }
                SelectProps={{ 
                    native: true,
                    MenuProps: { 
                        className: classes.menu,
                    }
                }}
            >
            <option key="" value=""></option>
            {quantityList && quantityList.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
            </TextField>  
            <TextField 
                error={errorQunatityBox === true}
                name="quantityInBox" 
                label="Quantity in Box" 
                className={classes.textField} 
                margin="normal"
                maxLength="10"
                value= { quantityInBox }
                onChange={ onFieldChangeNumeric }
                inputProps={{ 
                    autoComplete: "none",
                    readOnly: quantityType === 'Each'
                 }}
            />
            <TextField
                select 
                name="warehouse"
                label="Warehouse" 
                margin="normal"
                className={classes.textField}  
                onChange={ onChangeSelectWarehouse }
                value = { warehouse }
                SelectProps={{ 
                    native: true,
                    MenuProps: { 
                        className: classes.menu,
                    }
                }}
            >
            <option key="" value=""></option>
            {warehouseTypeList && warehouseTypeList.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
            </TextField>
            <TextField
                select 
                name="stockAvailability"
                label="Stock Availability" 
                margin="normal"
                className={classes.textField}  
                onChange={ onChangeSelectStockAvailability }
                value = { stockAvailability }
                SelectProps={{ 
                    native: true,
                    MenuProps: { 
                        className: classes.menu,
                    }
                }}
            >
            <option key="" value=""></option>
            {stockAvailabilityType && stockAvailabilityType.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
            </TextField>    
            <TextField 
                name="sku" 
                label="SKU" 
                className={classes.textField} 
                margin="normal"
                maxLength="10"
                value= { sku }
                onChange={ onFieldChangeAlphaNumeric }
                inputProps={{ 
                    autoComplete: "none"
                 }}
            />                
        </Fragment>
    );
};

export default withStyles(styles, { name: "ProductStockComponent" })(ProductStockComponent);

