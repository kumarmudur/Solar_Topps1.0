import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import { columnsTemplate, dataTemplate, allColumnTypes } from '../../../util/utility';
import { TABLE_OPTIONS, DEACTIVE } from '../../../constants/constants'; 
import {MANAGE_PRODUCTS_COLUMNS} from '../../../constants/GridConfig';

class ManageProductComponent extends Component {

    constructor(props) {
        super(props);
        this.options = {
           ...TABLE_OPTIONS,
            onRowClick: this._onRowClick,
            onRowsDelete: this._onRowsDelete,
            downloadOptions: {
                filename: 'product.csv',
            }			
        }
    }

    _onRowsDelete = (rowsDeleted) => {
        const data = rowsDeleted && rowsDeleted.data;
        let dataIndexs = data.map(data => {
            return data.dataIndex;
        });
        const { products } = this.props;
        const productList = products && products.products;
        let Ids = [], isProductDeActive = false;;
        productList && productList.filter((product, index) => {
            dataIndexs && dataIndexs.map(dataIndex => {
                if(index === dataIndex) {
                    if(product.status === DEACTIVE) {
                        isProductDeActive = true;
                    }
                    Ids.push(product.productId);
                }
            })
        });
        if(Ids && Ids.length > 0) {
            if(isProductDeActive) {
                this.props.deleteProduct(isProductDeActive);
            } else {
                this.props.deleteProduct(Ids);
            }
        }
    }

    _onRowClick = (rowData, rowMeta) => {
        const { products } = this.props;
        const { dataIndex } = rowMeta;
        const productList = products && products.products;
        let productId = null;
        productList && productList.filter((product, index) => {
            if(index === dataIndex) {
                productId = product.productId;
            }
        });
        if(productId) {
            this.props.getProductData(productId);
        }
    }


    render() {
        const { products } = this.props;
        const data = dataTemplate(products && products.products);
        // const allColumn = allColumnTypes(data);
        // const columns = columnsTemplate(allColumn && allColumn);
        return (
            <div>
                {
                    data && data.length > 0 ? <MUIDataTable
                    title={"Product List"}
                    data={ data ? data : null }
                    columns={ MANAGE_PRODUCTS_COLUMNS ? MANAGE_PRODUCTS_COLUMNS : null }
                    options={ this.options }
                  /> : ''
                }
            </div>
        )
    }
}

export default ManageProductComponent;
