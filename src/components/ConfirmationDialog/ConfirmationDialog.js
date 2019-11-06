/**
 * Delete Confirmation Dialog
 */
import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class ConfirmationDialog extends Component {

   // state = {
   //    open: false
   // }

   // // open dialog
   // open() {
   //    this.setState({ open: true });
   // }

   // close dialog
   _closeModal = () => {
      this.props.closeModal();
   }

  _confirmModal = () => {
      this.props.confirmModal();
   }

   render() {
      const { title, message, isShowModal } = this.props;
      return (
         <Dialog
            open={ isShowModal }
            onClose={ this._closeModal }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-description">
                  {message}
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={ this._closeModal } className="btn-secondary text-white">
                  Cancel
               </Button>
               <Button onClick={ this._confirmModal } className="btn-primary text-white" autoFocus>
                  Ok
               </Button>
            </DialogActions>
         </Dialog>
      );
   }
}

export default ConfirmationDialog;
