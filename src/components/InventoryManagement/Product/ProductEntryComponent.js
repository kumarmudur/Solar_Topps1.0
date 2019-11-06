import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/";
import { styles } from '../../../util/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const ProductEntryComponent = props => {
    const { warehouseList, uomTypeList , productEntries, addProductEntry, onFieldChange, onFieldChangeNumeric, onFieldChangeAlphaNumeric,
      onChangeSelectProductEntry, onDeleteProductEntry, classes } = props;
    const warehouseTypeList = warehouseList && warehouseList.map(warehouse => {
        return  {
            label: warehouse,
            value: warehouse
        }
    });
    const uomList = uomTypeList && uomTypeList.fieldValues && uomTypeList.fieldValues.map(uom => {
        return  {
            label: uom,
            value: uom
        }
    });
    return (
        <Fragment>
            <div className="row">
                <FormControlLabel
                    name="dimension"
                    control={<Checkbox color="primary" />}
                    label="Product has serial number"
                    labelPlacement="end"
                />
                <div className='btn-footer-group'>
                    <button type="button" className="btn btn-primary" onClick={ addProductEntry }>Add Item</button>
                </div>
            </div>
            <div className="product-grid">
                <div className="table-heading">
                    <div className="grid-row">
                        <div className="header">Serial Number</div>
                        <div className="header">Warehouse</div>
                        <div className="header">Shelf #</div>
                        <div className="header">Bin #</div>
                        <div className="header">UOM</div>
                        <div className="header">Qty</div>
                        <div className="header">Actions</div>
                    </div>
                </div>
                <div className="grid-body">
                        {
                            productEntries && productEntries.map((entry, index) => (
                                <div className="grid-row">
                                    <div className="grid-cell">
                                        <TextField 
                                            name={ `serialNumber-${ index }` }
                                            className={classes.textField} 
                                            margin="normal"
                                            value= { entry.serialNumber }
                                            maxLength="20"
                                            onChange={ onFieldChange }
                                            inputProps={{ autoComplete: "none" }}
                                        />  
                                    </div>
                                    <div className="grid-cell warehouse-cell">
                                       <TextField
                                            select 
                                            name={ `warehouse-${ index }` }
                                            margin="normal"
                                            className={classes.textField}  
                                            onChange={ onChangeSelectProductEntry } 
                                            value = { entry.warehouse }
                                            inputProps={{
                                                disabled: entry.serialNumber ? false : true
                                            }}
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
                                    </div>
                                    <div className="grid-cell">
                                        <TextField 
                                            name={ `shelf-${ index }` }
                                            className={classes.textField} 
                                            margin="normal"
                                            value= { entry.shelf }
                                            maxLength="10"
                                            onChange={ onFieldChangeAlphaNumeric }
                                            inputProps={{ 
                                                autoComplete: "none",
                                                readOnly: entry.warehouse ? false : true
                                            }}
                                        />                                              
                                    </div>
                                    <div className="grid-cell">
                                        <TextField 
                                            name={ `bin-${ index }` }
                                            className={classes.textField} 
                                            margin="normal"
                                            value= { entry.bin }
                                            maxLength="10"
                                            onChange={ onFieldChangeAlphaNumeric }
                                            inputProps={{ 
                                                autoComplete: "none",
                                                readOnly: entry.shelf ? false : true
                                            }}
                                        />                                              
                                    </div>
                                    <div className="grid-cell">
                                        <TextField
                                            select 
                                            name={ `uom-${ index }` }
                                            margin="normal"
                                            className={classes.textField}  
                                            onChange={ value => onChangeSelectProductEntry(value, `uom-${ index }`) } // eslint-disable-line
                                            value = { entry.uom }
                                            inputProps={{
                                                disabled: entry.bin ? false : true
                                            }}
                                            SelectProps={{ 
                                                native: true,
                                                MenuProps: { 
                                                    className: classes.menu,
                                                }
                                            }}
                                        >
                                        <option key="" value=""></option>
                                        {uomList && uomList.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                        </TextField>
                                    </div>
                                    <div className="grid-cell">
                                        <TextField 
                                            name={ `qty-${ index }` }
                                            className={classes.textField} 
                                            margin="normal"
                                            value= { entry.qty }
                                            maxLength="10"
                                            onChange={ onFieldChangeNumeric }
                                            inputProps={{ 
                                                autoComplete: "none",
                                                readOnly: entry.uom && entry.uom === 'Box' ? false : true
                                            }}
                                        />       
                                    </div>
                                   <div className="grid-cell grid-delete-cell">
                                     <span>
                                       <NavLink to="#delete_product_entry"><DeleteIcon id={ index } className="imgIconCurosr" onClick={ onDeleteProductEntry }/></NavLink>
                                     </span>
                                   </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
        </Fragment>
    );
};

export default withStyles(styles, { name: "ProductEntryComponent" })(ProductEntryComponent);
