import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import { dataTemplate } from '../../../util/utility';
import { TABLE_OPTIONS, DELETED } from '../../../constants/constants'; 
import { MANAGE_USERS_COLUMNS } from '../../../constants/GridConfig';

class ManageUserComponent extends Component {

    constructor(props) {
        super(props);
        this.options = {
           ...TABLE_OPTIONS,
            onRowClick: this._onRowClick,
            onRowsDelete: this._onRowsDelete,
            downloadOptions: {
                filename: 'users.csv',
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
        let userIds = [], isUserDeleted = false;
        userList && userList.filter((user, index) => {
            dataIndexs.map(dataIndex => {
                if(index === dataIndex) {
                    if(user.status === DELETED) {
                        isUserDeleted = true;
                    }
                    userIds.push(user.registerId);
                }
            })
        });
        if(userIds && userIds.length > 0) {
            if(isUserDeleted) {
                this.props.deleteUser(isUserDeleted);
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
        //const allColumn = allColumnTypes(data);
        //const columns = columnsTemplate(allColumn && allColumn);
        return (
            <div>
                {
                    data && data.length > 0 ? <MUIDataTable
                    title={"User List"}
                    data={ data ? data : null }
                    columns={ MANAGE_USERS_COLUMNS ? MANAGE_USERS_COLUMNS : null }
                    options={ this.options }
                  /> : ''
                }
            </div>
        )
    }
}

export default ManageUserComponent;
