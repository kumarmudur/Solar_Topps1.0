import React, { Fragment } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from '@material-ui/core/Checkbox';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
  } from '@material-ui/pickers';
import { withStyles } from "@material-ui/core/";
import { styles } from '../../../util/styles';
import ProductImageUpload from './ProductImageUpload';
import { getDateTime } from '../../../util/utility';
import Calendar from '../../Calendar';


const ProductGeneralComponent = props => {
    const { productName, categoryList, category, manufacturerList, promotionList, manufacturer, modelNumber, promotion, warrantyType, warrantyYear, power,
      description, manufactureDate, isShowWarranty, warrantyTypeList, warrantyYearList, errorProductName, errorCategory, warrantyExpiry,
        errorManufacturer, errorModelNumber, onFieldChange, onChangeSelectCategory, onChangeSelectManufacurer, errorPower,
        onChangeSelectPromotion, handleChangeWarrent, onChangeSelectWarrantyType, onChangeSelectWarrantyYear, 
        fileChange, uploadImages, onDeleteProductImage, assemblyWatt, isAssembly, onDateChange, onFieldChangeNumeric, classes } = props;
        const formattedManufactureDate = manufactureDate && getDateTime('date', manufactureDate);
        const formattedWarrantyExpiry = warrantyExpiry && getDateTime('date', warrantyExpiry);
        const categoryTypeList = categoryList && categoryList.fieldValues && categoryList.fieldValues.map(category => {
            return {
                label: category,
                value: category
            }
        });

        const manufacturerTypeList = manufacturerList && manufacturerList.fieldValues && manufacturerList.fieldValues.map(manufacturer => {
            return {
                label: manufacturer,
                value: manufacturer
            }
        });

        const promotionTypeList = promotionList && promotionList.fieldValues && promotionList.fieldValues.map(promotion => {
            return {
                label: promotion,
                value: promotion
            }
        });

        const warrantyList = warrantyTypeList && warrantyTypeList.fieldValues && warrantyTypeList.fieldValues.map(warranty => {
            return {
                label: warranty,
                value: warranty
            }
        });

        const warrantyYearTypeList = warrantyYearList && warrantyYearList.fieldValues && warrantyYearList.fieldValues.map(warrantyYear => {
            return {
                label: warrantyYear,
                value: warrantyYear
            }
        });
        return (
        <Fragment>
            <TextField 
                error={errorProductName}
                required 
                name="productName" 
                label="Product Name" 
                className={classes.textField} 
                margin="normal"
                onChange={ onFieldChange }
                value= { productName } 
                autoComplete="none"
                inputProps={{
                    maxLength: 50,
                }}
            />
            <TextField
                select 
                error={errorCategory}
                required
                name="category" 
                label="Category" 
                margin="normal"
                className={classes.textField}  
                onChange={ onChangeSelectCategory } 
                value = { category }
                InputLabelProps={{shrink:category ? true : false }}
                SelectProps={{ 
                    native: true,
                    MenuProps: { 
                        className: classes.menu,
                    }
                }}
            >
            <option key="" value=""></option>
            {categoryTypeList && categoryTypeList.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
            </TextField>
        
             {/* to do next phase add */}
            {/* { isAssembly ? <TextField 
               name="assemblyWatt" 
               label="Assembly Watt" 
               className={classes.textField} 
               margin="normal"
               onChange={ onFieldChange }
               value= { assemblyWatt } 
               autoComplete="none"
               inputProps={{
                    maxLength: 50,
               }}
           /> : <TextField
                select 
                error={errorManufacturer === true}
                required
                name="manufacturer" 
                label="Manufacturer" 
                margin="normal"
                className={classes.textField}  
                onChange={ onChangeSelectManufacurer } 
                value = { manufacturer }
                SelectProps={{
                    native: true, 
                    MenuProps: { 
                        className: classes.menu,
                    }
                }}
            >
            <option key="" value=""></option>
            {manufacturerTypeList && manufacturerTypeList.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
            </TextField>
            } */}
            <TextField
                select 
                error={errorManufacturer === true}
                required
                name="manufacturer" 
                label="Manufacturer" 
                margin="normal"
                className={classes.textField}  
                onChange={ onChangeSelectManufacurer } 
                value = { manufacturer }
                SelectProps={{
                    native: true, 
                    MenuProps: { 
                        className: classes.menu,
                    }
                }}
            >
            <option key="" value=""></option>
            {manufacturerTypeList && manufacturerTypeList.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
            </TextField>
            { !isAssembly ? <TextField 
                error={errorModelNumber === true}
                required
                name="modelNumber" 
                label="Model Number" 
                className={classes.textField} 
                margin="normal"
                onChange={ onFieldChange }
                value= { modelNumber } 
                autoComplete="none"
                inputProps={{
                    maxLength: 50,
                }}
            /> : ''
            }
            { !isAssembly ? <Calendar
                    onDateChange={ onDateChange }
                    name="manufactureDate"
                    date={ formattedManufactureDate }
                    placeholder="Manufacture Date (MM/DD/YYYY)"
                  /> : ''
            }
            
            { !isAssembly ? <TextField
                select 
                error={errorManufacturer}
                required
                name="promotion" 
                label="Promotion" 
                margin="normal"
                className={classes.textField}  
                onChange={ onChangeSelectPromotion } 
                value = { promotion }
                SelectProps={{ 
                    native: true,
                    MenuProps: { 
                        className: classes.menu,
                    }
                }}
            >
            <option key="" value=""></option>
            {promotionTypeList && promotionTypeList.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
            </TextField> : ''
            }
            { !isAssembly ? <TextField 
                error={errorPower === true}
                required 
                name="power" 
                label="Power(Watt)" 
                className={classes.textField} 
                margin="normal"
                onChange={ onFieldChangeNumeric }
                value= { power } 
                autoComplete="none"
                inputProps={{
                    maxLength: 5,
                }}
            /> : ''
            }
            <TextField 
                name="description" 
                label="Description" 
                className={classes.textField} 
                margin="normal"
                onChange={ onFieldChange }
                value= { description } 
                autoComplete="none"
                inputProps={{
                    maxLength: 250,
                }}
            />
            <ProductImageUpload 
                fileChange={ fileChange }
                uploadImages={ uploadImages }
                onDeleteProductImage={ onDeleteProductImage }
            />
            
            { !isAssembly ? <div className="row warrant">
                    <label className="checkbox-label">
                        <FormControlLabel
                            name="checked"
                            value={ isShowWarranty}
                            control={<Checkbox color="primary" checked={ isShowWarranty } onChange={ handleChangeWarrent } />}
                            label="Product has warranty"
                            labelPlacement="end"
                        />
                    </label>
                </div> : ''
            }
            {
                isShowWarranty ? <Fragment> 
                <TextField
                    select 
                    error={errorManufacturer}
                    required
                    name="warrantyType" 
                    label="Warranty Type" 
                    margin="normal"
                    className={classes.textField}  
                    onChange={ onChangeSelectWarrantyType } 
                    value = { warrantyType }
                    SelectProps={{ 
                        native: true,
                        MenuProps: { 
                            className: classes.menu,
                        }
                    }}
                >
                <option key="" value=""></option>
                {warrantyList && warrantyList.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
                </TextField>
                <TextField
                    select 
                    error={errorManufacturer}
                    required
                    name="warrantyYear" 
                    label="Warranty Period (Year)" 
                    margin="normal"
                    className={classes.textField}  
                    onChange={ onChangeSelectWarrantyYear } 
                    value = { warrantyYear }
                    SelectProps={{ 
                        native: true,
                        MenuProps: { 
                            className: classes.menu,
                        }
                    }}
                >
                <option key="" value=""></option>
                {warrantyYearTypeList && warrantyYearTypeList.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
                </TextField>
                <TextField 
                    name="warrantyExpires" 
                    label="Warranty Expires" 
                    className={classes.textField} 
                    margin="normal"
                    value= { formattedWarrantyExpiry } 
                    autoComplete="none"
                    InputProps={{
                        readOnly: true,
                    }}
                />
              </Fragment> : ''
            }
        </Fragment>
    );
};

export default withStyles(styles, { name: "ProductGeneralComponent" })(ProductGeneralComponent);
