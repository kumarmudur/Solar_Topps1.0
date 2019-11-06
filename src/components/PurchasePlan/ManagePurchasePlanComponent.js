import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import { columnsTemplate, dataTemplate, allColumnTypes } from '../../util/utility';
import { TABLE_OPTIONS, DEACTIVE } from '../../constants/constants'; 
import { MANAGE_PURCHASE_PLAN_COLUMNS } from '../../constants/GridConfig';

class ManagePurchasePlanComponent extends Component {
    constructor(props) {
        super(props);
        this.options = {
           ...TABLE_OPTIONS,
            onRowClick: this._onRowClick,
            onRowsDelete: this._onRowsDelete,
            downloadOptions: {
                filename: 'purchasePlan.csv',
            }			
        }
    }

    _onRowClick = (rowData, rowMeta) => {
        const { purchasePlans } = this.props;
        const { dataIndex } = rowMeta;
        const purchasePlanList = purchasePlans && purchasePlans.purchasePlans;
        let planId = null;
        purchasePlanList && purchasePlanList.filter((plan, index) => {
            if(index === dataIndex) {
                planId = plan.purchasePlanId;
            }
        });
        if(planId) {
            this.props.getPurchasePlanData(planId);
        }
    }

    _onRowsDelete = (rowsDeleted) => {
        const data = rowsDeleted && rowsDeleted.data;
        let dataIndexs = data.map(data => {
            return data.dataIndex;
        });
        const { purchasePlans } = this.props;
        const purchasePlanList = purchasePlans && purchasePlans.purchasePlans;
        let Ids = [], isPlanDeActive = false;
        purchasePlanList && purchasePlanList.filter((plan, index) => {
            dataIndexs && dataIndexs.map(dataIndex => {
                if(index === dataIndex) {
                    if(plan.status === DEACTIVE) {
                        isPlanDeActive = true;
                    }
                    Ids.push(plan.purchasePlanId);
                }
            })
        });
        if(Ids && Ids.length > 0) {
            if(isPlanDeActive) {
                this.props.deletePurchasePlan(isPlanDeActive);
            } else {
                this.props.deletePurchasePlan(Ids);
            }
        }
    }

    render() {
        const { purchasePlans } = this.props;
        const data = dataTemplate(purchasePlans && purchasePlans.purchasePlans);
        // const allColumn = allColumnTypes(data);
        // const columns = columnsTemplate(allColumn && allColumn);

        return (
            <div>
                {
                    data && data.length > 0 ? <MUIDataTable
                    title={"Purchase Plan List"}
                    data={ data ? data : null }
                    columns={ MANAGE_PURCHASE_PLAN_COLUMNS ? MANAGE_PURCHASE_PLAN_COLUMNS : null }
                    options={ this.options }
                  /> : ''
                }
            </div>
        )
    }
}

export default ManagePurchasePlanComponent;
