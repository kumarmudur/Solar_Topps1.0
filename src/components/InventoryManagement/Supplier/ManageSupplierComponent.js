import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import { columnsTemplate, dataTemplate, allColumnTypes } from '../../../util/utility';
import { TABLE_OPTIONS, DEACTIVE } from '../../../constants/constants'; 
import { MANAGE_SUPPLIER_COLUMNS } from '../../../constants/GridConfig';


class ManageSupplierComponent extends Component {

    constructor(props) {
        super(props);
        this.options = {
           ...TABLE_OPTIONS,
            onRowClick: this._onRowClick,
            onRowsDelete: this._onRowsDelete,
            downloadOptions: {
                filename: 'supplier.csv',
            }			
        }
    }

    _onRowClick = (rowData, rowMeta) => {
        const { suppliers } = this.props;
        const { dataIndex } = rowMeta;
        const supplierList = suppliers && suppliers.suppliers;
        let supplierId = null;
        supplierList && supplierList.filter((supplier, index) => {
            if(index === dataIndex) {
                supplierId = supplier.supplierId;
            }
        });
        if(supplierId) {
            this.props.getSupplierData(supplierId);
        }
    }

    _onRowsDelete = (rowsDeleted) => {
        const data = rowsDeleted && rowsDeleted.data;
        let dataIndexs = data.map(data => {
            return data.dataIndex;
        });
        const { suppliers } = this.props;
        const supplierList = suppliers && suppliers.suppliers;
        let Ids = [], isSupplierDeActive = false;
        supplierList && supplierList.filter((supplier, index) => {
            dataIndexs && dataIndexs.map(dataIndex => {
                if(index === dataIndex) {
                    if(supplier.status === DEACTIVE) {
                        isSupplierDeActive = true;
                    }
                    Ids.push(supplier.supplierId);
                }
            })
        });
        if(Ids && Ids.length > 0) {
            if(isSupplierDeActive) {
                this.props.deleteSupplier(isSupplierDeActive);
            } else {
                this.props.deleteSupplier(Ids);
            }
        }
    }


    render() {
        const { suppliers } = this.props;

        const data = dataTemplate(suppliers && suppliers.suppliers);
        // const allColumn = allColumnTypes(data);
        // const columns = columnsTemplate(allColumn && allColumn);
        return (
            <div>
                {
                    data && data.length > 0 ? <MUIDataTable
                    title={"Supplier List"}
                    data={ data ? data : null }
                    columns={ MANAGE_SUPPLIER_COLUMNS ? MANAGE_SUPPLIER_COLUMNS : null }
                    options={ this.options }
                  /> : ''
                }
            </div>
        )
    }
}

export default ManageSupplierComponent;
