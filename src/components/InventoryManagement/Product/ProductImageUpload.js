import React, { Component } from 'react';
// import { ICONS } from '../../../constants';
import { NavLink } from 'react-router-dom';
import PublishIcon from '@material-ui/icons/Publish';
import DeleteIcon from '@material-ui/icons/Delete';

class ProductImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageName: '',
      fileError: ''
    };
  }

  _fileChange = e => {
    const { uploadImages } = this.props;
    if(uploadImages.length < 5) {
      file = null; let fileError = null;
      let target = e.target || e.srcElement;
      let file=null;
      if (target.value.length === 0) {
  
          file = null;
      } else {
          file = e.target.files[0];
      }
  
      let fileExtension = file.name.split('.');
      fileExtension = fileExtension[fileExtension.length -1];
      if(file) {
        if(fileExtension === 'jpeg' || fileExtension === 'jpg' || fileExtension === 'png') {
          fileError = '';
        } else {
          fileError = 'Please select proper image';
        }
      } else {
        fileError = 'Please select image';
      }
      this.setState({
        imageName: file.name,
        error: fileError
     });
     if(!fileError && file) {
      this.props.fileChange(file);
      e.target.value = null;
     }  
    }
}

  render() {
    //const { fileError } = this.state;
    const { uploadImages, onDeleteProductImage } = this.props;
    const uploadImagesList = uploadImages && uploadImages.map((image, index) => (
      <div className="product-upload-image">
        <div className="row">
            <img src={ image.filePath } className="image-path" width="28" height="35" alt="upload-image"/>
              <span className="image-name">{image.fileName}</span>
              <span>
                <NavLink to="#delete_product_image"><DeleteIcon id={ index } className="img-delete" alt="delete" onClick={ onDeleteProductImage }/></NavLink>
              </span>
        </div>
      </div>
    ));
    return (
         <div className="product-image-upload-wrapper">
            <div className="file-upload">
                <div className="upload-btn-wrapper">
                    <span className="btn-wrapper">
                        <button className="btn"><PublishIcon /><br />
                          <span className="upload-text">Upload Product Image</span> <br />
                          <span className="upload-size-text">(Upload limit 5 Images) </span>
                        </button>
                    </span>
                    <input 
                      className='file-input' 
                      placeholder='Upload'
                      type='file'
                      name='file'
                      onChange={ this._fileChange }
                      accept="image/x-png,image/jpg,image/jpeg"
                    />
                </div>
            </div>
            <div className='clear'></div>
            <div className="upload-images">
                { uploadImagesList }
            </div>
        </div>
    );
  }

}

export default ProductImageUpload;
