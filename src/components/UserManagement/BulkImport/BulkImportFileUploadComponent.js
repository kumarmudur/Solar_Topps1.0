import React, { Component } from 'react';
import { BULK_IMPORT } from '../../../constants/constants';
import PublishIcon from '@material-ui/icons/Publish';
import DeleteIcon from '@material-ui/icons/Delete';

class BulkImportFileUploadComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            fileExtension: ''
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.fileError) {
            this.setState({
                error: nextProps.fileError
            });
        }
    }

    _submitForm = file => {
        if (!file || file.size<=0 ) {
            this.setState({
                error: 'Please upload a file'
            });
        }
        else if(file) { 
            
            let fileExtension = file.name.split('.');
            fileExtension = fileExtension[fileExtension.length -1];
            if((fileExtension === 'csv' ) === false) {
                this.setState({error:'Invalid File Format. Please select file of extension .csv'});
            } else {
               this.props.fileUpload(file);    

            }
        }
        this.resetForm();
    }

    resetForm = () => {
        this.uploadFormRef.reset();
    }
    _fileChange = e => {
        const targetId = e.currentTarget.id;
        let fileError = null;
        if(targetId === 'delete') {
            let file = '';
            this.setState({
                fileName: '',
                error: 'Please upload a file'
            });
            this.props.fileUpload(file); 
        }
        else {
            fileError = null;
            let target = e.target || e.srcElement;
            let file=null;
            if (target.value.length === 0) {

                file = null;
            } else {
                file = e.target.files[0];
            }

            let fileExtension = file.name.split('.');
            fileExtension = fileExtension[fileExtension.length -1];
            
            if((fileExtension === 'csv') === false) {
                fileError = 'Invalid File Format. Please upload .csv file';
            }
            if(file.size > BULK_IMPORT.FILE_UPLOAD_SIZE) {
                fileError = 'Please select less than 10mb file';
                
            }
            this.setState({
                fileName: file.name,
                error: fileError,
                fileExtension
            });
            if(!fileError && file) {
                this._submitForm(file);
            }
        }    
    }

    render() {
      let { fileName, error, fileExtension } = this.state;
      const uploadedFileName = fileName && fileName ? fileName : '';
      if(uploadedFileName && fileExtension === 'csv') {
        error = '';
      }
      return (
          <form enctype='multipart/form-data' ref={ (el) => this.uploadFormRef = el }> { /* eslint-disable-line */}
                <div className="bulk-import-wrapper">
                    <div className="file-upload">
                        <div className="upload-btn-wrapper">
                            <span className="btn-wrapper">
                                <button className="btn"><PublishIcon /><br />
                                <span className="upload-text">Upload CSV File </span> <br />
                                <span className="upload-size-text">(Max 10MB) </span>
                                </button>
                            </span>
                            <input 
                              className='file-input' 
                              placeholder='Upload'
                              type='file'
                              name='file'
                              onChange={ this._fileChange }
                            />
                        </div>
                        { uploadedFileName && !error &&
                            <div className="uploaded-file">
                                <span className="file-name">{ uploadedFileName } </span>
                                <span className="delete">
                                    <DeleteIcon id="delete" onClick={ this._fileChange } />
                                </span>
                            </div>
                        }
                    </div>
                    <span className="error"> { error ? error : '' } </span>
                </div>
              <div className='clear'></div>
          </form>
      );
    }
}

export default BulkImportFileUploadComponent;