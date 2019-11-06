/**
 * User Block Component
 */
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Badge } from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import { getUserData } from '../../actions/UserManagement/userManagement';
import { deleteLocalData, loadData } from '../../util/storage';

// components
// import SupportPage from '../Support/Support';

// redux action
import { logoutUserFromFirebase } from 'Actions';

// intl messages
import IntlMessages from 'Util/IntlMessages';

class UserBlock extends Component {
	state = {
		userDropdownMenu: false,
		isSupportModal: false,
		firstName: '',
		userType: '',
		email: ''
	}

	componentWillReceiveProps(nextProps) {
		const id = loadData('registerId');
		if(nextProps && nextProps.users) {
			const { firstName, userType, email, registerId } = nextProps.users
			if(parseInt(id) === parseInt(registerId)) {
				this.setState({ 
					firstName,
					userType,
					email
				});
			}
		}
	}
	/**
	 * get profile details
	 */
	getProfileDetails() {
		const { login } = this.props;
		let firstName = login && login.firstName;
		let userType = login && login.userType;
		let email = login && login.email;
		this.setState({ 
			firstName,
			userType,
			email
		});
	}

	_getUserData = () => {
        const { login } = this.props;
        let id = login && login.registerId ? login.registerId : null;
        let authToken = login && login.authToken ? login.authToken : '';
        if(!id) {
            id = loadData('registerId');
            authToken = loadData('authToken');
			const dataObj = {
			authToken,
			id
			}
			if(id) {
				this.props.getUserData(dataObj);
			}
		}
    }

	componentDidMount() {
		this._getUserData();
		this.getProfileDetails();
	}

	/**
	 * Logout User
	 */
	logoutUser() {
		this.props.logoutUserFromFirebase();
	}

	/**
	 * Toggle User Dropdown Menu
	 */
	toggleUserDropdownMenu() {
		this.setState({ userDropdownMenu: !this.state.userDropdownMenu });
	}

	/**
	 * Open Support Modal
	 */
	openSupportModal() {
		this.setState({ isSupportModal: true });
	}

	/**
	 * On Close Support Page
	 */
	onCloseSupportPage() {
		this.setState({ isSupportModal: false });
	}

	/**
	 * On Submit Support Page
	 */
	onSubmitSupport() {
		this.setState({ isSupportModal: false });
		NotificationManager.success('Message has been sent successfully!');
	}
	

	/**
	 * On logout clear the authToken
	 */
	_removeUserToken() {
		deleteLocalData('authToken');
		deleteLocalData('registerId');
		deleteLocalData('userType');
	}

	render() {
		const { firstName, userType } = this.state;
		return (
			<div className="top-sidebar">
				<div className="sidebar-user-block">
					<Dropdown
						isOpen={this.state.userDropdownMenu}
						toggle={() => this.toggleUserDropdownMenu()}
						className="rct-dropdown"
					>
						<DropdownToggle
							tag="div"
							className="d-flex align-items-center"
						>
							<div className="user-profile">
								<img
									src={require('Assets/avatars/profile.jpg')}
									alt="user profile"
									className="img-fluid rounded-circle"
									width="50"
									height="100"
								/>
							</div>
							<div className="user-info">
								<span className="user-name ml-4">{ firstName }</span>
								<i className="zmdi zmdi-chevron-down dropdown-icon mx-4"></i>
							</div>
						</DropdownToggle>
						<DropdownMenu>
							<ul className="list-unstyled mb-0">
								<li className="p-15 border-bottom user-profile-top bg-primary rounded-top">
									<p className="text-white mb-0 fs-14">{ firstName }</p>
									<span className="text-white fs-14">{ userType }</span>
								</li>
								<li>
									<Link to={{
										pathname: '/app/Profile/UserProfileDetails/',
										state: { activeTab: 0 }
									}}>
										<i className="zmdi zmdi-account text-primary mr-3"></i>
										<IntlMessages id="widgets.profile" />
									</Link>
								</li>
								{/* <li>
									<Link to={{
										pathname: '/app/users/user-profile-1',
										state: { activeTab: 2 }
									}}>
										<i className="zmdi zmdi-comment-text-alt text-success mr-3"></i>
										<IntlMessages id="widgets.messages" />
										<Badge color="danger" className="pull-right">3</Badge>
									</Link>
								</li> */}
								<li>
									<Link to="/app/Profile/ChangePassword/">
										<i className="zmdi zmdi-edit text-warning mr-3"></i>
										<IntlMessages id="sidebar.changePassword" />
										{/* <Badge color="info" className="pull-right">1</Badge> */}
									</Link>
								</li>
								<li className="border-top">
									<Link to="/signin" onClick={ this._removeUserToken }>
										<i className="zmdi zmdi-power text-danger mr-3"></i>
										<IntlMessages id="widgets.logOut" />
									</Link>
								</li>
							</ul>
						</DropdownMenu>
					</Dropdown>
				</div>
				{/* <SupportPage
					isOpen={this.state.isSupportModal}
					onCloseSupportPage={() => this.onCloseSupportPage()}
					onSubmit={() => this.onSubmitSupport()}
				/> */}
			</div>
		);
	}
}


// map state to props
const mapStateToProps = state => {
	const { UserManagement, settings  } = state;
	const login = UserManagement && UserManagement.login;
	const users = UserManagement && UserManagement.userData && UserManagement.userData.user;
	return {
	   login,
	   settings,
	   users
	};
 };

 const mapDispatchToProps = dispatch => {
    return {
        getUserData: data => {
            return dispatch(getUserData(data))
		},
		logoutUserFromFirebase
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBlock);
