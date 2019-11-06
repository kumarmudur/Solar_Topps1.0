import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import UserDetailComponent from '../../../components/UserManagement/Users/UserDetailComponent';
import { postAdminAdditionalInfo, postAdminRejectAssociate } from '../../../actions/UserManagement/userManagement';
import { loadData } from '../../../util/storage';

class ViewUserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
           associateResponseMessage: '',
           showSucessMessage: false
        };
    }

    componentWillReceiveProps(nextProps) {
        const { adminAdditionalInfo, adminRejectUser } =  nextProps;
        let associateResponseMessage = '';
        let associateResponseMsg = '';
        let associateSuccessCode = null;
        if(nextProps) {
           if(adminAdditionalInfo) {
              associateResponseMsg = adminAdditionalInfo && adminAdditionalInfo.message ? adminAdditionalInfo.message : '';
              associateSuccessCode = adminAdditionalInfo && adminAdditionalInfo.code ? adminAdditionalInfo.code : null;
              if(associateSuccessCode === 200) {
                 associateResponseMessage = associateResponseMsg;
              }
           }
           if(adminRejectUser) {
              associateResponseMsg = adminRejectUser && adminRejectUser.message ? adminRejectUser.message : '';
              associateSuccessCode = adminRejectUser && adminRejectUser.code ? adminRejectUser.code : null;
              if(associateSuccessCode === 200) {
                 associateResponseMessage = associateResponseMsg;
              }
           }
           this.setState({
              associateResponseMessage
           });
           this._showSuccessNotification(associateSuccessCode);
        }
    }

    _showSuccessNotification = successCode => {
        if(successCode === 200) {
           this.setState ({
              showSucessMessage: true
           })
           setTimeout(() => {
              this.setState({
                 showSucessMessage: false
              })
           }, 2000);
           this.props.postAdminAdditionalInfo();
           this.props.postAdminRejectAssociate();
           this.props.history.push('/app/UserManagement/ManageUsers');
        }
    }

    openEditUserPage = () => {
        this.props.history.push("/app/UserManagement/Users");
    }

    _requestAdditionalDocs = data => {
        const authToken = loadData('authToken');
        if(data) {
            const dataObj = {
                data,
                authToken
            };
            this.props.postAdminAdditionalInfo(dataObj);
        }
    }

    _rejectUser = data => {
        const authToken = loadData('authToken');
        const dataObj = {
            data,
            authToken
        };
        this.props.postAdminRejectAssociate(dataObj);
    }

    _sendAgreementRegisterId = data => {
        const { authToken } = this.props.Login;
        if(data) {
            data.authToken = authToken;
            this.props.sendAgreementRegisterId(data);
        }
    }

    _printAgreement = data => {
        const { authToken } = this.props.Login;
        const dataObj = {
            data,
            authToken
        };
        this.props.printAgreement(dataObj);
    }


    render () {
        const { userData, login } = this.props;
        const loggedInUserType = login && login.userType;
        const printAgreementUrl = '';
        return (
            <Fragment>
                <UserDetailComponent 
                    userData={ userData && userData.user }  
                    openEditUserPage={ this.openEditUserPage }
                    loggedInUserType = { loggedInUserType }
                    requestAdditionalDocs={ this._requestAdditionalDocs } 
                    rejectUser={ this._rejectUser } 
                    sendAgreementRegisterId = { this._sendAgreementRegisterId } 
                    printAgreement= { this._printAgreement }
                    agreementPath={ printAgreementUrl }
                />
        </Fragment>
        );
    }
}

const mapStateToProps = state => {
    const { UserManagement } = state;
    const userData = UserManagement && UserManagement.userData;
    const login = UserManagement && UserManagement.login;
    const adminAdditionalInfo = UserManagement && UserManagement.adminAdditionalInfo;
    const adminRejectUser = UserManagement && UserManagement.adminRejectUser;
    return {
        userData,
        login,
        adminAdditionalInfo,
        adminRejectUser
    }
};

const mapDispatchToProps = dispatch => {
    return {
        postAdminAdditionalInfo: data => {
          return dispatch(postAdminAdditionalInfo(data))
        },
        postAdminRejectAssociate: data => {
            return dispatch(postAdminRejectAssociate(data))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewUserDetails);
