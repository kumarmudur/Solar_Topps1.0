import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChangePasswordComponent from '../../../components/Profile/ChangePasswordComponent';
import Footer from 'Components/Footer/Footer';
import { postChangePassword } from './../../../actions/UserManagement/userManagement';
import { deleteLocalData } from '../../../util/storage';

class ChangePassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            showSucessMessage: false
        };
    }

    _removeUserToken() {
        deleteLocalData('authToken');
        deleteLocalData('registerId');
        deleteLocalData('userType');
    }
    
    componentWillReceiveProps(nextProps) {
        const sucessCode = nextProps && nextProps.changePassword && nextProps.changePassword.code;
        if(nextProps && sucessCode === 200) {
           this.setState ({
              showSucessMessage: true
           })
           setTimeout(() => {
              this.setState({
                 showSucessMessage: false
              })
              this._removeUserToken();
              this.props.history.push("/signin");
           }, 1000);
        }
    }

    _submitForm = data => {
        const { email, authToken } = this.props.login;
        const dataObj = {
            data: {
                email: email,
                password: data.oldPassword,
                newPassword: data.newPassword
            },
            authToken
        };
        this.props.postChangePassword(dataObj);
    }

    render() {
        const { changePassword } = this.props;
        const { showSucessMessage } = this.state;
        const sucessMessage = changePassword && changePassword.message ? changePassword.message : '';
        return (
            <div className="ecom-dashboard-wrapper">
                <div className="page-min-ht">
                    {
                        showSucessMessage ? <div className="alert alert-success" role="alert">
                        { sucessMessage } </div> : null
                    }
                    <ChangePasswordComponent 
                        changePassword={ changePassword } 
                        submitForm= { this._submitForm } 
                    />
                </div>
                <Footer />
            </div>
        );
    }
}

// map state to props
const mapStateToProps = state => {
    const { UserManagement  } = state;
    const login = UserManagement && UserManagement.login;
    const changePassword = UserManagement && UserManagement.changePassword;
    return {
       login,
       changePassword
    };
 };
 
 const mapDispatchToProps = dispatch => {
    return {
        postChangePassword: data => {
          return dispatch(postChangePassword(data))
        }
    };
 };
 
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
 
