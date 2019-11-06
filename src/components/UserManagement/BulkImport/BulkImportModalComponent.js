import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { radioStyles } from '../../../util/styles';
import BulkImportFileUploadComponent from './BulkImportFileUploadComponent';


class BulkImportModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filePath: '',
            file: '',
            uploadStatus: '',
            importMode: 'Add',
            uploadValidation: false,
            fileError: ''
        };
    }

    _closeModal = () => {
        this.setState({
            file: '',
            uploadValidation: false,
            fileError: '',
            filePath: ''
        });
        this.props.closeModal();
    }

    _submitHandler = () => {
        let { file, importMode } = this.state;
        if(!file) {
            this.setState({
                fileError: 'Please upload a file'
            });
        } else {
            this.props.submitHandler(file, importMode);
        }
    }

    _handleFileUpload = fileData => {
        this.setState({
            file: fileData,
            uploadValidation: fileData ? true : false
        });
    }

    _handleChange = e => {
        const { value } = e.currentTarget;
        this.setState({
            importMode: value 
        });
    }

    render () {
        const { classes, isShowModal } = this.props;
        const { fileError, importMode } = this.state;
        if(!isShowModal) {
            return null;
        }
        return (
            <div>
                <Dialog className="bulk-import-modal" open={isShowModal} onClose={ this._closeModal } aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">Bulk Import</DialogTitle>
                    <DialogContent>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <RadioGroup
                                aria-label="mode-option"
                                className="MuiFormGroup-row"
                                name="importMode"
                                value={ importMode }
                                onChange={ this._handleChange }
                            >
                                <FormControlLabel value="Add" control={<Radio />} label="Add/Update" />
                                <FormControlLabel value="Replace" control={<Radio />} label="Replace" />
                            </RadioGroup>
                        </FormControl>
                        <BulkImportFileUploadComponent fileUpload={ this._handleFileUpload } fileError={ fileError }/>
                    </DialogContent>
                    <DialogActions>
                        <button type="button" className="btn btn-secondary" onClick={ this._closeModal }>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={ this._submitHandler }>Save</button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default compose(
    withStyles(radioStyles, { name: "BulkImportModalComponent" }),
    connect(
      null,
      null
    )
)(BulkImportModalComponent);
