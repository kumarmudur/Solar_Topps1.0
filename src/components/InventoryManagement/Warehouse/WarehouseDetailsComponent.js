import React, { Component } from 'react';
import compose from "recompose/compose";
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/";
import { styles } from '../../../util/styles';

class WarehouseDetailsComponent extends Component {

_openEditPage = () => {
    this.props.openEditPage();
}   

render () {
    const { classes, warehouseData } = this.props;
    return (
        <div className="ecom-dashboard-wrapper page-readonly-view">
            <h1>Warehouse Details</h1>
            <div className="add-button"> 
                <button type="button" className="btn btn-primary" onClick={ this._openEditPage }>Edit</button>
            </div>

            <div className="rct-block ">
                <div className="rct-block-title ">
                    <h4>Warehouse Information</h4>
                </div>
                <div className="collapse show">
                    <div className="rct-block-content">
                        <TextField 
                            name="warehouseID" 
                            label="Warehouse ID" 
                            className={classes.textField} 
                            margin="normal"
                            value={ warehouseData ? warehouseData.warehouseId : '' } 
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            name="Warehousename" 
                            label="Warehouse Name" 
                            className={classes.textField} 
                            margin="normal"
                            value={ warehouseData ? warehouseData.warehouseName : '' } 
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            name="address1" 
                            label="Address 1" 
                            className={classes.textField} 
                            margin="normal"
                            value={ warehouseData ? warehouseData.address1 : '' } 
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                         <TextField 
                            name="address2" 
                            label="Address 2" 
                            className={classes.textField} 
                            margin="normal"
                            value={ warehouseData ? warehouseData.address2 : '' } 
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            name="city" 
                            label="City" 
                            className={classes.textField} 
                            margin="normal"
                            value={ warehouseData ? warehouseData.city : '' } 
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            name="state" 
                            label="State" 
                            className={classes.textField} 
                            margin="normal"
                            value={ warehouseData ? warehouseData.state : '' } 
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            name="country" 
                            label="Country" 
                            className={classes.textField} 
                            margin="normal"
                            value={ warehouseData ? warehouseData.country : '' } 
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            name="managerName" 
                            label="Manager Name" 
                            className={classes.textField} 
                            margin="normal"
                            value={ warehouseData ? warehouseData.managerName : '' } 
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                         <TextField 
                            name="managerEmail" 
                            label="Manager Email" 
                            className={classes.textField} 
                            margin="normal"
                            value={ warehouseData ? warehouseData.managerEmail : '' } 
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            name="phone" 
                            label="Phone" 
                            className={classes.textField} 
                            margin="normal"
                            value={ warehouseData ? warehouseData.managerPhone : '' } 
                            InputLabelProps={{shrink:true }} 
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            name="status" 
                            label="Status" 
                            className={classes.textField} 
                            margin="normal"
                            value={ warehouseData ? warehouseData.status : '' } 
                            InputLabelProps={{shrink:true }} 
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default compose(withStyles(styles, { name: "WarehouseDetailsComponent" }),)(WarehouseDetailsComponent);