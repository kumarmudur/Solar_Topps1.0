import React, { Component} from 'react';
import { connect } from 'react-redux';
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/";
import { styles } from '../../util/styles';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

class UserProfileDetailsComponent extends Component {

    constructor(props){
        super(props);
        this.state = {

        };
    }


render () {
    const { classes, userData } = this.props;
    const contactPersonFields = userData && userData.contactPersons && userData.contactPersons.map(item => (
        <div>
            <TextField 
                name="name" 
                label="Name" 
                className={classes.textField} 
                margin="normal"
                value= { item.name } 
                InputLabelProps={{shrink:true }}
                InputProps={{
                    readOnly: true
                }}
            />
            <TextField 
                name="Email" 
                label="Email" 
                className={classes.textField} 
                margin="normal"
                value= { item.email }  
                InputLabelProps={{shrink:true }}
                InputProps={{
                    readOnly: true
                }}
            />
            <TextField 
                name="phone" 
                label="Phone" 
                className={classes.textField} 
                margin="normal"
                value= { item.phone }
                InputLabelProps={{shrink:true }}
                InputProps={{
                    readOnly: true
                }}
            />
        </div>
    ));

    return (
        <div className="ecom-dashboard-wrapper page-readonly-view profile-view">
      <div className="rct-block ">
            
            <div className="collapse show">
               <div className="rct-block-content">
               
               <Grid container justify="flex-start" alignItems="flex-start">
               <img src={ require('Assets/img/profile-bg.jpg')} alt="profile banner" className="img-fluid" width="1920" height="345"></img>
                  <div className="profile-img-icon">
                    <Avatar alt="Remy Sharp" src={ require('Assets/avatars/profile.jpg')} className="user-icon"/>
                    <div className="profile-text">
                        <h2>{userData && userData.firstName} {userData && userData.lastName }</h2>
                        <h4>{userData && userData.userType}</h4>
                        <div>
                            <span>{userData && userData.email} </span>
                            <span className="verified-color">(Verified)</span>
                        </div>
                        <span>{userData && userData.phone}</span>
                    </div>
                  </div>
                  
               </Grid>
              
         </div>
            </div>
         </div>
         <div className="rct-block ">
                <div className="rct-block-title ">
                    <h4>Company Details</h4>
                </div>
                <div className="collapse show">
                    <div className="rct-block-content">
                        <TextField 
                            name="Companyname" 
                            label="Company Name" 
                            className={classes.textField} 
                            margin="normal"
                            value= {userData ? userData.companyName : ''} 
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            name="Companyssn" 
                            label="Company EIN / SSN" 
                            className={classes.textField} 
                            margin="normal"
                            value= {userData ? userData.companyEin : ''} 
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            name="Companyregistrationstate" 
                            label="Company Registration State" 
                            className={classes.textField} 
                            margin="normal"
                            value= {userData ? userData.companyRegistrationState : ''} 
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        /> 
                    </div>
                </div>
            </div>
            <div className="rct-block ">
                <div className="rct-block-title ">
                <h4>Address</h4>
                </div>
                <div className="collapse show">
                    <div className="rct-block-content">
                        <TextField 
                            name="houseBuilding" 
                            label="Address 1" 
                            className={classes.textField} 
                            margin="normal"
                            value= {userData ? userData.houseBuilding : ''}
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            name="street" 
                            label="Address 2" 
                            className={classes.textField} 
                            margin="normal"
                            value= {userData ? userData.street : ''}
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            name="zipCode" 
                            label="Zip Code" 
                            className={classes.textField} 
                            margin="normal"
                            value= {userData ? userData.zipCode : ''} 
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            name="city" 
                            label="City" 
                            className={classes.textField} 
                            margin="normal"
                            value= {userData ? userData.city : ''} 
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            name="county" 
                            label="County" 
                            className={classes.textField} 
                            margin="normal"
                            value= {userData ? userData.county : ''}  
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            name="state" 
                            label="State" 
                            className={classes.textField} 
                            margin="normal"
                            value= {userData ? userData.state : ''}
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField 
                            name="country" 
                            label="Country" 
                            className={classes.textField} 
                            margin="normal"
                            value= {userData ? userData.country : ''}
                            InputLabelProps={{shrink:true }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="rct-block ">
                <div className="rct-block-title ">
                <h4>Contact Person</h4>
                </div>
                <div className="collapse show">
                    <div className="rct-block-content">
                        { contactPersonFields }    
                        
                    </div>
                </div>
            </div>
     </div>
    );
}

}

export default compose(
    withStyles(styles, { name: "UserProfileDetailsComponent" }),
    connect(
      null,
      null
    )
  )(UserProfileDetailsComponent);