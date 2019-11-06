import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import { dataTemplate } from '../../../util/utility';
import { TABLE_OPTIONS, DELETED } from '../../../constants/constants';
import { MANAGE_CUSTOMERS_COLUMNS } from '../../../constants/GridConfig';

class ManageCustomerComponent extends Component {

    constructor(props) {
        super(props);
        this.options = {
           ...TABLE_OPTIONS,
            onRowClick: this._onRowClick,
            onRowsDelete: this._onRowsDelete,
            downloadOptions: {
                filename: 'customers.csv',
            }			
        }
    }

    _onRowsDelete = (rowsDeleted) => {
        const data = rowsDeleted && rowsDeleted.data;
        let dataIndexs = data.map(data => {
            return data.dataIndex;
        });
        
        const { users } = this.props;
        const userList = users && users.users;
        let userIds = [], isCustomerDeleted = false;;
        userList && userList.filter((user, index) => {
            dataIndexs.map(dataIndex => {
                if(index === dataIndex) {
                    if(user.status === DELETED) {
                        isCustomerDeleted = true;
                    }
                    userIds.push(user.registerId);
                }
            })
        });
        if(userIds && userIds.length > 0) {
            if(isCustomerDeleted) {
                this.props.deleteUser(isCustomerDeleted);
            } else {
                this.props.deleteUser(userIds);
            }
        }
    }

    _onRowClick = (rowData, rowMeta) => {
        const { users } = this.props;
        const { dataIndex } = rowMeta;
        const userList = users && users.users;
        let registerId = null;
        userList && userList.filter((user, index) => {
            if(index === dataIndex) {
                registerId = user.registerId;
            }
        });
        if(registerId) {
            this.props.getUserData(registerId);
        }
    }

    render() {
        const { users } = this.props;
        const data = dataTemplate(users && users.users);

        return (
            <div>
                {
                    data && data.length > 0 ? <MUIDataTable
                    title={"Customer List"}
                    data={ data ? data : null }
                    columns={ MANAGE_CUSTOMERS_COLUMNS ? MANAGE_CUSTOMERS_COLUMNS : null }
                    options={ this.options }
                  /> : ''
                }
            </div>
        )
    }
}

export default ManageCustomerComponent;
