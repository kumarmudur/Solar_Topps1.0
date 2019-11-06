import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import CustomerDetailComponent from '../../../components/UserManagement/Customers/CustomerDetailsComponent';

class ViewCustomerDetails extends Component {

openEditUserPage = () => {
    this.props.history.push("/app/UserManagement/Customers");
}

render () {
    const { userData } = this.props;
    return (
        <Fragment>
            <CustomerDetailComponent 
                userData={ userData && userData.user }  
                openEditUserPage={ this.openEditUserPage }
            />
       </Fragment>
    );
 }
}

const mapStateToProps = state => {
    const { UserManagement } = state;
    const userData = UserManagement && UserManagement.userData;
    return {
        userData
    }
  };
 
export default connect(mapStateToProps, null)(ViewCustomerDetails);
