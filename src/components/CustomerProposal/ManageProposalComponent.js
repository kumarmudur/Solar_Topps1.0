import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import { columnsTemplate, dataTemplate, allColumnTypes } from '../../util/utility';
import { TABLE_OPTIONS } from '../../constants/constants'; 
import { MANAGE_CUSTOMER_PROPOSAL_COLUMNS } from '../../constants/GridConfig';

class ManageProposalComponent extends Component {
    constructor(props) {
        super(props);
        this.options = {
           ...TABLE_OPTIONS,
           selectableRows: 'none',			
        }
    }

    render() {
        const { proposals } = this.props;
        const data = dataTemplate(proposals);
        // const allColumn = allColumnTypes(data && data);
        // const columns = columnsTemplate(allColumn && allColumn);
        return (
            <div>
                {
                    data && data.length > 0 ? <MUIDataTable
                    title={" Proposal List"}
                    data={ data ? data : null }
                    columns={ MANAGE_CUSTOMER_PROPOSAL_COLUMNS ? MANAGE_CUSTOMER_PROPOSAL_COLUMNS : null }
                    options={ this.options }
                  /> : ''
                }
            </div>
        )
    }
}

export default ManageProposalComponent;
