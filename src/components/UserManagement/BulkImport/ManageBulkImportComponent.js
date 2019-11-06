import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import { dataTemplate } from '../../../util/utility';
import { TABLE_OPTIONS } from '../../../constants/constants'; 
import { BULK_IMPORT_COLUMNS} from '../../../constants/GridConfig';


class ManageBulkImportComponent extends Component {
    constructor(props) {
        super(props);
        this.options = {
           ...TABLE_OPTIONS,
            selectableRows: 'none',		
        }
    }

    render() {
        const { imports } = this.props;
        const data = dataTemplate(imports);
        return (
            <div>
                {
                    data && data.length > 0 ? <MUIDataTable
                    title={"Bulk Import List"}
                    data={ data ? data : null }
                    columns={ BULK_IMPORT_COLUMNS ? BULK_IMPORT_COLUMNS : null }
                    options={ this.options }
                  /> : ''
                }
            </div>
        )
    }
}

export default ManageBulkImportComponent;
