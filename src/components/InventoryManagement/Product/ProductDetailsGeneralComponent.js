import React, { Component } from 'react';
import compose from "recompose/compose";
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/";
import { styles } from '../../../util/styles';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

class ProductDetailsGeneralComponent extends Component {

render () {
    const { classes, productData } = this.props;
    const carouselImages = productData &&  productData.uploadImages && productData.uploadImages.map(image => {
        return <div>
            <img src={ image.filePath } alt="product_images"/>
        </div>;
    });
    return (
        <div className="ecom-dashboard-wrapper page-readonly-view view-inventory">
            
            <div className="rct-block ">
            <div className="product-view-inventory">
            
            <div className="inventory-image">
                {
                    carouselImages && carouselImages.length > 0 ?  <Carousel autoPlay>
                    {
                        carouselImages
                    }
                </Carousel> : <img src={require('Assets/img/placeholder-img.jpg')} alt="" width="320" height="290" />
                }
               
            </div> 
                 
            <div className="product-details">
               <div>
                <TextField 
                    name="productName" 
                    label="Product Name" 
                    className={classes.textField} 
                    margin="normal"
                    value={ productData ? productData.productName : '' } 
                    InputLabelProps={{shrink:true }}
                    InputProps={{
                        readOnly: true,
                    }}
                 />
                </div>
                <div>
                 <TextField 
                    name="manufacturer" 
                    label="Manufacturer" 
                    className={classes.textField} 
                    margin="normal"
                    value={ productData ? productData.manufacturer : ''} 
                    InputLabelProps={{shrink:true }}
                    InputProps={{
                        readOnly: true,
                    }}
                 />
                </div>
                <div>
                 <TextField 
                    name="quantityType" 
                    label="Quantity Type" 
                    className={classes.textField} 
                    margin="normal"
                    value={ productData ? productData.quantityType : '' } 
                    InputLabelProps={{shrink:true }}
                    InputProps={{
                        readOnly: true,
                    }}
                 />
                </div>
                <div>
                 <TextField 
                    name="quantityBox" 
                    label="Quantity in Box" 
                    className={classes.textField} 
                    margin="normal"
                    value={ productData ? productData.quantityInBox : '' } 
                    InputLabelProps={{shrink:true }}
                    InputProps={{
                        readOnly: true,
                    }}
                 />
                </div>
                <div>
                 <TextField 
                    name="promotion" 
                    label="Promotion" 
                    className={classes.textField} 
                    margin="normal"
                    value={ productData ? productData.promotion : ''} 
                    InputLabelProps={{shrink:true }}
                    InputProps={{
                        readOnly: true,
                    }}
                 />
                </div>
               </div>
               <div className="product-details">
                <div>
                
                <TextField 
                    name="description" 
                    label="Description" 
                    className={classes.textField} 
                    margin="normal"
                    value={ productData ? productData.description : '' } 
                    InputLabelProps={{shrink:true }}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                </div>
                <div>
                <TextField 
                    name="modelNumber" 
                    label="Model Number" 
                    className={classes.textField} 
                    margin="normal"
                    value={ productData ? productData.modelNumber : '' } 
                    InputLabelProps={{shrink:true }}
                />
                </div>
                <div>
                <TextField 
                    name="minimumrequiredQuantity" 
                    label="Minimum Required Quantity" 
                    className={classes.textField} 
                    margin="normal"
                    value={ productData ? productData.threshold : '' } 
                    InputLabelProps={{shrink:true }}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                </div>
                <div>
                <TextField 
                    name="preferredSupplier" 
                    label="Preferred Supplier" 
                    className={classes.textField} 
                    margin="normal"
                    value={ productData ? productData.quantity : '' } 
                    InputLabelProps={{shrink:true }}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                </div>
                <div>
                <TextField 
                    name="status" 
                    label="Status" 
                    className={classes.textField} 
                    margin="normal"
                    value={ productData ? productData.status : '' } 
                    InputLabelProps={{shrink:true }}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                </div>
                </div>
                <div className="product-details">
                <div>
                <TextField 
                    name="category" 
                    label="Category" 
                    className={classes.textField} 
                    margin="normal"
                    value={ productData ? productData.category : '' } 
                    InputLabelProps={{shrink:true }}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                </div>
                <div>
                <TextField 
                    name="quantity" 
                    label="Quantity" 
                    className={classes.textField} 
                    margin="normal"
                    value={ productData ? productData.quantity : '' }
                    InputLabelProps={{shrink:true }}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                </div>
                <div>
                <TextField 
                    name="stockAvailability" 
                    label="Stock Availability" 
                    className={classes.textField} 
                    margin="normal"
                    value={ productData ? productData.stockAvailability : '' } 
                    InputLabelProps={{shrink:true }}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField 
                    name="productWarranty" 
                    label="Product has warranty" 
                    className={classes.textField} 
                    margin="normal"
                    value={ productData ? productData.productHasWarranty : '' } 
                    InputLabelProps={{shrink:true }}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                </div>
              </div>
            </div>
            </div>
            <div className="rct-block ">
            <div className="rct-block-title ">
               <h4>Product Specification</h4>
            </div>
            <div className="collapse show">
               <div className="rct-block-content product-main-wrapper">
               <form className={classes.container} noValidate autoComplete="none">
               
            <div className="product-grid">
                {
                    productData && productData.specifications && productData.specifications.length > 0 ? <div className="table-heading">
                    <div className="grid-row">
                            <div className="header">Measurement Variable</div>
                            <div className="header">Measurement Type</div>
                        <div className="header">Measurement Value </div>
                    </div>
                    </div> : ''
                }
                <div className="grid-body">
                    {
                     productData && productData.specifications && productData.specifications.map(spec => (
                        <div className="grid-row">
                            <div className="grid-cell">
                                <span className="form-label-text">{ spec.measurementVariable }</span>
                            </div>
                            <div className="grid-cell">
                                <span className="form-label-text">{ spec.measurementType }</span>
                            </div>
                            <div className="grid-cell">
                                <span className="form-label-text">{ spec.measurementValue }</span>
                            </div>
                        </div>
                     ))
                  }
                 </div>  
                </div>
               </form>
               </div>
            </div>
        </div>
        <div className="rct-block ">
            <div className="rct-block-title ">
               <h4>Product Cost</h4>
            </div>
            <div className="collapse show">
               <div className="rct-block-content">
               <form className={classes.container} noValidate autoComplete="off">
                <TextField
                     name="productCost" 
                     label="Product Cost" 
                     className={classes.textField} 
                     margin="normal"
                     value={ productData && productData.productCost ? `$ ${productData.productCost }` : '' }
                     InputLabelProps={{shrink:true }}
                     InputProps={{
                        readOnly: true,
                    }}
                />      
               <div className="color-selling-price">
               <h4>Selling Price</h4>
                  <TextField
                     name="residential" 
                     label="Residential" 
                     className={classes.textField} 
                     margin="normal"
                     value={ productData && productData.residential ? `$ ${productData.residential}` : '' }
                     InputLabelProps={{shrink:true }}
                     InputProps={{
                        readOnly: true,
                    }}
                  />
                  <TextField 
                     name="commercial" 
                     label="Commercial" 
                     className={classes.textField} 
                     margin="normal"
                     value={ productData && productData.commercial ? `$ ${productData.commercial}` : '' }                     
                     InputLabelProps={{shrink:true }}
                     InputProps={{
                        readOnly: true,
                    }}
                  />
                  <TextField 
                     name="nonProfit" 
                     label="Non Profit" 
                     className={classes.textField} 
                     margin="normal"
                     value={ productData && productData.nonProfit ? `$ ${productData.nonProfit}` : '' }
                     InputLabelProps={{shrink:true }}
                     InputProps={{
                        readOnly: true,
                    }}
                  />
                  <TextField
                     name="industrial" 
                     label="Industrial" 
                     className={classes.textField} 
                     margin="normal"
                     value={ productData && productData.industrial ? `$ ${productData.industrial}` : '' }
                     InputLabelProps={{shrink:true }}
                     InputProps={{
                        readOnly: true,
                    }}
                  />
                  </div>

                  <div className="color-selling-price">
                   <h4>Other Price</h4>
                    <TextField
                      name="otherPrice" 
                      label="Total Cost" 
                      className={classes.textField} 
                      margin="normal"
                      value={ productData && productData.otherPrice ? `$ ${productData.otherPrice}` : '' }
                      InputLabelProps={{shrink:true }}
                      InputProps={{
                        readOnly: true,
                    }}
                   />
                  </div>
               </form>
               </div>
            </div>
         </div>
        </div>
    );
  }
}

export default compose(withStyles(styles, { name: "ProductDetailsComponent" }),)(ProductDetailsGeneralComponent);