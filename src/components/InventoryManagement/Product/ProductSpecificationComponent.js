import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from "@material-ui/core/";
import { styles } from '../../../util/styles';
import { NavLink } from 'react-router-dom';
import PublishIcon from '@material-ui/icons/Publish';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const ProductSpecificationComponent = props => {
    const { checkDimension, checkWeight, checkColor, specifications,
        checkDocumentUpload, onCheckboxFieldChange, onFieldChange, 
        onDeleteProductSpecification, addSpecification, onChangeSelectProductSpecification, classes } = props;
    return (
        <Fragment>
            <div className="select-checkbox-appicable">Select checkbox if applicable</div>
            <FormGroup className='MuiFormGroup-row'>
                <FormControlLabel
                    name="checkDimension"
                    value={ checkDimension }
                    control={<Checkbox color="primary" checked={ checkDimension } onChange={ onCheckboxFieldChange } />}
                    label="Dimension"
                    labelPlacement="end"
                />
                <FormControlLabel
                    name="checkWeight"
                    value={ checkWeight}
                    control={<Checkbox color="primary" checked={ checkWeight } onChange={ onCheckboxFieldChange } />}
                    label="Weight"
                    labelPlacement="end"
                />
                <FormControlLabel
                    name="checkColor"
                    value={ checkColor}
                    control={<Checkbox color="primary"  checked={ checkColor } onChange={ onCheckboxFieldChange } />}
                    label="Color"
                    labelPlacement="end"
                />
                <FormControlLabel
                    name="checkDocumentUpload"
                    value={ checkDocumentUpload}
                    control={<Checkbox color="primary"  checked={ checkDocumentUpload } onChange={ onCheckboxFieldChange } />}
                    label="Document Upload"
                    labelPlacement="end"
                />
            </FormGroup>
              
              <div className="product-grid">
                {
                  specifications && specifications.length > 0 ? <div className="table-heading">
                      <div className="grid-row">
                          <div className="header">Measurement Variable</div>
                          <div className="header">Type</div>
                          <div className="header">Value</div>
                          <div className="header">Actions</div>
                      </div>
                    </div> : null
                }
                <div className="grid-body">
                        {
                          specifications && specifications.map((sp, index) => (
                                <div className="grid-row">
                                    <div className="grid-cell">
                                        <TextField 
                                            name={ `measurementVariable-${ index }` }  measurementVaraible
                                            label="" 
                                            className={classes.textField} 
                                            margin="normal"
                                            value= { sp.measurementVariable }
                                            onChange={ onFieldChange }
                                            maxLength={ 100 } 
                                            inputProps={{ autoComplete: "none" }}
                                        />
                                    </div>
                                    <div className="grid-cell warehouse-cell">
                                        <TextField
                                            select 
                                            name={ `measurementType-${ index }` } 
                                            label="" 
                                            margin="normal"
                                            className={classes.textField}  
                                            onChange={ onChangeSelectProductSpecification } // eslint-disable-line
                                            value = { sp.measurementType }
                                            SelectProps={{ 
                                                native: true,
                                                MenuProps: { 
                                                    className: classes.menu,
                                                }
                                            }}
                                        >
                                        <option key="" value=""></option>
                                        {sp.listType && sp.listType.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                        </TextField>
                                    </div>
                                    <div className="grid-cell">
                                    {
                                      sp.name !== 'checkDocumentUpload' ? <TextField 
                                        type={ sp.name === 'checkDocumentUpload' ? 'file' : 'text' }
                                        placeholder={ sp.name === 'checkDocumentUpload' ? 'Upload File' : '' }
                                        name={ `measurementValue-${ index }` }
                                        maxLength={ 25 }  
                                        onChange={ onFieldChange }
                                        value={ sp.measurementValue }
                                      /> : <div className="docupload">
                                           <div className="upload-btn-wrapper">
                                            <span className="btn-wrapper"><button className="btn"><PublishIcon />{ } </button> Upload</span>
                                            <input 
                                              type='file'
                                              name={ `measurementValue-${ index }` }
                                              id='addfile-0'
                                              onChange={ onFieldChange }
                                            />
                                        </div>
                                        { sp.measurementValue }
                                      </div>
                                    }
                                    </div>
                                    <div className="grid-cell">
                                     <span>
                                        <NavLink to="#add_product_specification"><AddIcon id={ sp.name } className="imgIconCurosr" onClick={ addSpecification }/></NavLink>
                                      </span>
                                      <span>
                                        <NavLink to="#delete_product_specification"><DeleteIcon id={ index } className="imgIconCurosr" onClick={ onDeleteProductSpecification }/></NavLink>
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

export default withStyles(styles, { name: "ProductSpecificationComponent" })(ProductSpecificationComponent);
