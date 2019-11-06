import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import IntlMessages from 'Util/IntlMessages';
import Footer from 'Components/Footer/Footer';
import GetAppIcon from '@material-ui/icons/GetApp';
import BulkImportModalComponent from 'Components/UserManagement/BulkImport/BulkImportModalComponent';
import { BULK_IMPORT } from '../../../constants/constants';
import { connect } from 'react-redux';
import { getBulkImportList } from '../../../actions/UserManagement/userManagement';
import ManageBulkImportComponent from '../../../components/UserManagement/BulkImport/ManageBulkImportComponent';
import { postBulkImport } from '../../../actions/UserManagement/userManagement';
import { loadData } from '../../../util/storage';


class BulkImport extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isShowBulkImportModal: false,
         showSucessMessage: false
      };
   }

   componentWillReceiveProps(nextProps) {
      const { BulkImportStatus } = nextProps;
      if(BulkImportStatus && BulkImportStatus.code === 200) {
          this.setState({
            showSucessMessage: true
         });

         setTimeout(() => {
            this.setState({
               showSucessMessage: false
            })
         }, 2000)
         this.props.postBulkImport();
         this._getData(
            {
                pageNumber: 0,
                pageSize: 10
            }
        );
      }
   }

   _openBulkImportModal = () => {
      this.setState({
         isShowBulkImportModal: true
     });
   }

   _closeBulkImportModal = () => {
      this.setState({
         isShowBulkImportModal: false
     });
   }

   _modalSubmitHandler = (data, importMode) => {
      const dataObj = {
         data,
         importMode
      };
      this.setState({
         isShowBulkImportModal: false
      });
      this.props.postBulkImport(dataObj);
      
   }


   componentDidMount() {
      this._getData(
         {
             pageNumber: 0,
             pageSize: 100
         }
     );
   }

   _getData = data => {
      const authToken = loadData('authToken');
      data.authToken = authToken;
      this.props.getBulkImportList(data);
    }


   render() {
      const { match, imports } = this.props;
      const { isShowBulkImportModal, showSucessMessage } = this.state;

      return (
         <div className="ecom-dashboard-wrapper">
            <Helmet>
               <title>Bulk Import</title>
            </Helmet>
            {
               showSucessMessage &&
               <div class="alert alert-success" role="alert"> Success! CSV file has been imported successfully </div>
            }
            <PageTitleBar title={<IntlMessages id="sidebar.manageBulkImport" />} match={match} />
            <div className="add-button bulk-import-download-sample"> 
               <div className='download-file'>
                  <a className='download-tag' target='_self' href={ BULK_IMPORT.SAMPLE_FILE_DOWNLOAD_PATH }><GetAppIcon /> Download Sample CSV</a>
               </div>
               <button type="button" className="btn btn-primary" onClick={ this._openBulkImportModal }>Import</button>
            </div>
            <div className="page-min-ht">
               <ManageBulkImportComponent
                  imports={ imports }
               />     
            </div>
            <BulkImportModalComponent 
               isShowModal= { isShowBulkImportModal }
               closeModal={ this._closeBulkImportModal }
               submitHandler={ this._modalSubmitHandler }
            />
           
         <Footer />
         </div>
      )
   }
}

const mapStateToProps = state => {
   const { UserManagement } = state;
   const imports = UserManagement && UserManagement.imports && UserManagement.imports.importedFiles;
   const BulkImportStatus = UserManagement && UserManagement.bulkImport;
   return {
      imports,
      BulkImportStatus
   }
 };

 const mapDispatchToProps = dispatch => {
    return {
      getBulkImportList: data => {
         return dispatch(getBulkImportList(data))
      },
      postBulkImport: data => {
         return dispatch(postBulkImport(data))
      }
    }
 }


export default connect(mapStateToProps, mapDispatchToProps)(BulkImport);
