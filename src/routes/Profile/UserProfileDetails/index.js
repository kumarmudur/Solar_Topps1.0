import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import IntlMessages from 'Util/IntlMessages';
import UserProfileDetailsComponent from '../../../Components/Profile/UserProfileDetailsComponent';
import { getUserData, postEditProfile } from '../../../actions/UserManagement/userManagement';
import { loadData } from '../../../util/storage';

class UserProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
        this._getUserData(props);
    }

    _openEditProfilePage = () => {
        this.props.history.push("/app/Profile/UserProfile");
        this.props.postEditProfile();
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
        const { match, users } = this.props;

        return (
            <div className="ecom-dashboard-wrapper">
                <Helmet> <title>View Profile</title> </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.ViewProfile" />} match={match} />
                <div className="add-button"> 
                    <button type="button" className="btn btn-primary" onClick={ this._openEditProfilePage }>Edit</button>
                </div>
                <UserProfileDetailsComponent userData={ users } />
            </div>
        );
    }
}

// map state to props
const mapStateToProps = state => {
    const { UserManagement  } = state;
    const login = UserManagement && UserManagement.login;
    const users = UserManagement && UserManagement.userData && UserManagement.userData.user;
    return {
       login,
       users
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
 
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
