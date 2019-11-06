import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserProfileComponent from '../../../Components/Profile/UserProfileComponent';
import { getUserData, postEditProfile } from '../../../actions/UserManagement/userManagement';
import { loadData } from '../../../util/storage';

class UserProfileDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            profileResponseMessage: '',
            showSucessMessage: false
        };
        this._getUserData(props);
    }

    componentWillReceiveProps(nextProps) {
        const { editProfile } =  nextProps;
        let profileResponseMessage = '';
        if(editProfile) {
           const profilePasswordResponseMsg = editProfile && editProfile.message ? editProfile.message : '';
           const profilePasswordSuccessCode = editProfile && editProfile.code ? editProfile.code : null;
           if(profilePasswordSuccessCode === 200) {
              profileResponseMessage = profilePasswordResponseMsg;
              this._showSuccessNotification(profilePasswordSuccessCode);
           }
           this.setState({
              profileResponseMessage
           });
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
              this.props.history.push("/app/Profile/UserProfileDetails");
           }, 2000);
        }
    }

    _submitForm = data => {
        const authToken = loadData('authToken');
        const dataObj = {
           data,
           authToken
        };
        this.props.postEditProfile(dataObj);
    }

    _getUserData = (props) => {
        const { login } = props;
        let id = login && login.registerId ? login.registerId : null;
        let authToken = login && login.authToken ? login.authToken : '';
        if(!id) {
            id = loadData('registerId');
            authToken = loadData('authToken');
        }
        const dataObj = {
           authToken,
           id
        }
        if(id) {
            this.props.getUserData(dataObj);
        }
    }

    render() {
        const { users } = this.props;
        const { profileResponseMessage, showSucessMessage } = this.state;
        return (
            <div className="ecom-dashboard-wrapper">
                {
                    showSucessMessage ? <div className="alert alert-success" role="alert">
                    { profileResponseMessage } </div> : null
                }
                <UserProfileComponent submitForm = { this._submitForm } userData={ users } />
            </div>
        );
    }
}

// map state to props
const mapStateToProps = state => {
    const { UserManagement  } = state;
    const login = UserManagement && UserManagement.login;
    const users = UserManagement && UserManagement.userData && UserManagement.userData.user;
    const editProfile = UserManagement && UserManagement.editProfile && UserManagement.editProfile;
    return {
       login,
       users,
       editProfile
    };
 };
 
 const mapDispatchToProps = dispatch => {
    return {
        getUserData: data => {
            return dispatch(getUserData(data))
        },
        postEditProfile: data => {
            return dispatch(postEditProfile(data))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileDetails);
