import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import { columnsTemplate, dataTemplate, allColumnTypes } from '../../../util/utility';
import { TABLE_OPTIONS, DEACTIVE } from '../../../constants/constants'; 
import { MANAGE_WAREHOUSE_COLUMNS } from '../../../constants/GridConfig';

class ManageWarehouseComponent extends Component {
    
    constructor(props) {
        super(props);
        this.options = {
           ...TABLE_OPTIONS,
            onRowClick: this._onRowClick,
            onRowsDelete: this._onRowsDelete,
            downloadOptions: {
                filename: 'warehouse.csv',
            }		
        }
    }

    _onRowsDelete = (rowsDeleted) => {
        const data = rowsDeleted && rowsDeleted.data;
        let dataIndexs = data.map(data => {
            return data.dataIndex;
        });
        const { warehouses } = this.props;
        const warehouseList = warehouses && warehouses.warehouses;
        let Ids = [], isWarehouseDeActive = false;
        warehouseList && warehouseList.filter((warehouse, index) => {
            dataIndexs && dataIndexs.map(dataIndex => {
                if(index === dataIndex) {
                    if(warehouse.status === DEACTIVE) {
                        isWarehouseDeActive = true;
                    }
                    Ids.push(warehouse.warehouseId);
                }
            })
        });
        if(Ids && Ids.length > 0) {
            if(isWarehouseDeActive) {
                this.props.deleteWarehouse(isWarehouseDeActive);
            } else {
                this.props.deleteWarehouse(Ids);
            }
        }
    }

    _onRowClick = (rowData, rowMeta) => {
        const { warehouses } = this.props;
        const { dataIndex } = rowMeta;
        const warehouseList = warehouses && warehouses.warehouses;
        let warehouseId = null;
        warehouseList && warehouseList.filter((warehouse, index) => {
            if(index === dataIndex) {
                warehouseId = warehouse.warehouseId;
            }
        });
        if(warehouseId) {
            this.props.getWarehouseData(warehouseId);
        }
    }


    render() {
        const { warehouses } = this.props;
        const data = dataTemplate(warehouses && warehouses.warehouses);
        // const allColumn = allColumnTypes(data);
        // const columns = columnsTemplate(allColumn && allColumn);
        return (
            <div>
                {
                    data && data.length > 0 ? <MUIDataTable
                    title={"Warehouse List"}
                    data={ data ? data : null }
                    columns={ MANAGE_WAREHOUSE_COLUMNS ? MANAGE_WAREHOUSE_COLUMNS : null }
                    options={ this.options }
                  /> : ''
                }
            </div>
        )
    }
}

export default ManageWarehouseComponent;
