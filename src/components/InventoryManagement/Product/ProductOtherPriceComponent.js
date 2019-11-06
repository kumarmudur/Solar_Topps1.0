import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/";
import { styles } from '../../../util/styles';
import DeleteIcon from '@material-ui/icons/Delete';


const ProductOtherPriceComponent = props => {
    const { otherPrice, addOtherPrices, otherPrices, onChangeSelectSubCategory, onChangeSelectUnit,
      onDeleteProductOtherPrice, onChangeSelect, configurationsList, onFieldTextChangeOtherPrice, classes } = props;
    const categoryList = configurationsList && configurationsList.map(category => {
      return {
        label: category.category,
        value: `${category.configurationId}-${category.category}`
      };
    });
    
    return (
        <Fragment>
            <div className='btn-footer-group'>
                <button type="button" className="btn btn-primary" onClick={ addOtherPrices }>Add Category</button>
            </div>
            <div className="product-grid">
                 <div className="table-heading">
                    <div className="grid-row">
                        <div className="header">Category</div>
                        <div className="header">Sub Category</div>
                        <div className="header">Unit</div>
                        <div className="header">Quantity</div>
                        <div className="header">Unit Cost $</div>
                        <div className="header">Margin %</div>
                        <div className="header">Total Cost</div>
                        <div className="header">Actions</div>
                    </div>
                  </div>
                  <div className="grid-body">
                      {
                        otherPrices && otherPrices.map((price, index) => (
                          <Fragment>
                            <div className="grid-row">
                                <div className="grid-cell other-price-cell">
                                    <TextField
                                        select 
                                        name={ `category-${ index }` }
                                        margin="normal"
                                        className={classes.textField}  
                                        onChange={ onChangeSelect }
                                        value = { price.category ? price.category : '' }
                                        InputLabelProps={{shrink: true }}
                                        SelectProps={{ 
                                            native: true,
                                            MenuProps: { 
                                                className: classes.menu,
                                            }
                                        }}
                                    >
                                    <option key="" value=""></option>
                                    {categoryList && categoryList.map(option => (
                                        <option key={option.label} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                    </TextField>
                                </div>
                                <div className="grid-cell other-price-cell">
                                    <TextField
                                        select 
                                        name={ `subCategory-${ index }` }
                                        margin="normal"
                                        className={classes.textField}  
                                        onChange={ onChangeSelectSubCategory } // eslint-disable-line
                                        value = { price.subCategory }
                                        SelectProps={{ 
                                            native: true,
                                            MenuProps: { 
                                                className: classes.menu,
                                            }
                                        }}
                                    >
                                    <option key="" value=""></option>
                                    {price.subCategoryList && price.subCategoryList.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                    </TextField>                                            
                                </div>
                                <div className="grid-cell other-price-cell">
                                    <TextField
                                        select 
                                        name={ `unit-${ index }` }
                                        margin="normal"
                                        className={classes.textField}  
                                        onChange={ onChangeSelectUnit } // eslint-disable-line
                                        value = { price.unit }
                                        SelectProps={{ 
                                            native: true,
                                            MenuProps: { 
                                                className: classes.menu,
                                            }
                                        }}
                                    >
                                    <option key="" value=""></option>
                                    {price.unitList && price.unitList.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                    </TextField>        
                                </div>
                                <div className="grid-cell">
                                    <TextField 
                                        name={ `quantity-${ index }` }
                                        className={classes.textField} 
                                        margin="normal"
                                        value= { price.quantity }
                                        maxLength={ 10 }
                                        onChange={ onFieldTextChangeOtherPrice }
                                        inputProps={{
                                            maxLength: 10,
                                            autoComplete: "none",
                                            readOnly: price.unit ? false : true,
                                        }}
                                    />                                                  
                                </div>
                                <div className="grid-cell">
                                    <TextField 
                                        name={ `cost-${ index }` }
                                        className={classes.textField} 
                                        margin="normal"
                                        value= { price.cost ? `$${price.cost}` : price.cost }
                                        inputProps={{
                                            autoComplete: "none",
                                            readOnly: true
                                        }}
                                    />  
                                </div>
                                <div className="grid-cell">
                                    <TextField 
                                        name={ `margin-${ index }` }
                                        className={classes.textField} 
                                        margin="normal"
                                        value= { price.margin }
                                        maxLength={ 5 } 
                                        onChange={ onFieldTextChangeOtherPrice }
                                        inputProps={{
                                            autoComplete: "none",
                                            readOnly: price.unit ? false : true
                                        }}
                                    />      
                                </div>
                                <div className="grid-cell">
                                    <TextField 
                                        name={ `totalCost-${ index }` }
                                        className={classes.textField} 
                                        margin="normal"
                                        value= { price.totalCost ? `$${price.totalCost}` : price.totalCost }
                                        inputProps={{
                                            readOnly: true
                                        }}
                                    />                                              
                                </div>
                                <div className="grid-cell grid-delete-cell">
                                    <span>
                                    <NavLink to="#delete_product_other_price"><DeleteIcon id={ `${index}-${price.totalCost}` }  className="imgIconCurosr" onClick={ onDeleteProductOtherPrice }/></NavLink>
                                    </span>
                                </div>
                            </div>
                        </Fragment>
                        ))
                    }
                  </div>
                  <div className="table-heading grand-total-assembly">
                        <div className="grid-row">
                            <div className="header">Grand Total</div>
                            <div className="header no-border"></div>
                            <div className="header no-border"></div>
                            <div className="header no-border"></div>
                            <div className="header no-border"></div>
                            <div className="header no-border"></div>
                            <div className="header no-border">{ otherPrice ? `$${otherPrice}` : otherPrice }</div>
                            <div className="header no-border"></div>
                        </div>
                    </div>
                </div>
        </Fragment>
    );
};

export default withStyles(styles, { name: "ProductOtherPriceComponent" })(ProductOtherPriceComponent);
