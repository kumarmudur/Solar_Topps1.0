
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/";
import { styles } from '../../../util/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const ProductPartsComponent = props => {
    const { productParts, productPartsList, onFieldChange, onChangeSelectParts, onDeleteProductPart, addProductParts,
      grandTotalPartsResidential, grandTotalPartsCommercial, grandTotalPartsNonProfit, grandTotalPartsIndustrial, classes } = props;
    const partsList = productPartsList && productPartsList.map(parts => {
      return {
        label: parts.productName,
        value: `${parts.productName}-${parts.productId}`
      };
    });
    return (
        <Fragment>
            <div className='btn-footer-group'>
                <button type="button" className="btn btn-primary" onClick={ addProductParts }>Add Parts</button>
            </div>
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
                    {
                        productParts && productParts.map((parts, index) => (
                            <div className="grid-row">
                                <div className="grid-cell warehouse-cell">
                                    <TextField
                                        select 
                                        name={ `partName-${ index }` }
                                        label="Parts" 
                                        margin="normal"
                                        className={classes.textField}  
                                        onChange={ onChangeSelectParts } // eslint-disable-line
                                        value = { parts.partName }
                                        SelectProps={{ 
                                            native: true,
                                            MenuProps: { 
                                                className: classes.menu,
                                            }
                                        }}
                                    >
                                    <option key="" value=""></option>
                                    {partsList && partsList.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                    </TextField>
                                    
                                </div>
                                <div className="grid-cell">
                                    <TextField 
                                        name={ `power-${ index }` }
                                        className={classes.textField} 
                                        margin="normal"
                                        value= { parts.power }
                                        inputProps={{
                                            autoComplete: "none",
                                            readOnly: true
                                        }}
                                    />        
                                </div>
                                <div className="grid-cell">
                                    <TextField 
                                        name={ `quantity-${ index }` }
                                        className={classes.textField} 
                                        margin="normal"
                                        value= { parts.quantity }
                                        onChange={ onFieldChange }
                                        inputProps={{
                                            autoComplete: "none",
                                            maxLength: 5,
                                        }}
                                    />    
                                </div>
                                <div className="grid-cell">
                                    <TextField 
                                        name={ `residential-${ index }` }
                                        className={classes.textField} 
                                        margin="normal"
                                        value= { parts.residential }
                                        inputProps={{
                                            autoComplete: "none",
                                            readOnly: true
                                        }}
                                    />    
                                </div>
                                <div className="grid-cell">
                                    <TextField 
                                        name={ `commercial-${ index }` }
                                        className={classes.textField} 
                                        margin="normal"
                                        value= { parts.commercial }
                                        inputProps={{
                                            autoComplete: "none",
                                            readOnly: true
                                        }}
                                    />    
                                </div>
                                <div className="grid-cell">
                                    <TextField 
                                        name={ `nonProfit-${ index }` }
                                        className={classes.textField} 
                                        margin="normal"
                                        value= { parts.nonProfit }
                                        InputProps={{
                                            autoComplete: "none",
                                            readOnly: true
                                        }}
                                    />    
                                </div>
                                <div className="grid-cell">
                                    <TextField 
                                        name={ `industrial-${ index }` }
                                        className={classes.textField} 
                                        margin="normal"
                                        value= { parts.industrial }
                                        inputProps={{
                                            autoComplete: "none",
                                            readOnly: true
                                        }}
                                    />    
                                </div>
                                <div className="grid-cell grid-delete-cell">
                                    <span>
                                        <NavLink to="#delete_product_specification"><DeleteIcon id={ index } className="imgIconCurosr" alt="delete" onClick={ onDeleteProductPart }/></NavLink>
                                    </span>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="table-heading grand-total-assembly">
                    <div className="grid-row">
                        <div className="header">Grand Total</div>
                        <div className="header no-border"></div>
                        <div className="header no-border"></div>
                        <div className="header">{ grandTotalPartsResidential }</div>
                        <div className="header">{ grandTotalPartsCommercial }</div>
                        <div className="header">{ grandTotalPartsNonProfit }</div>
                        <div className="header">{ grandTotalPartsIndustrial }</div>
                        <div className="header"></div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default withStyles(styles, { name: "ProductPartsComponent" })(ProductPartsComponent);