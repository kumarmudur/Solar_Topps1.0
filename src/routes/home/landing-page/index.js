import React, { Component } from 'react'
import { Helmet } from "react-helmet";
import IntlMessages from 'Util/IntlMessages';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

export default class HomeLandingPage extends Component {
   render() {
      const { match } = this.props;
      return (
         <div className="ecom-dashboard-wrapper landing-page">
            <Helmet>
               <title>Welcome To SolarTopps App</title>
               <meta name="description" content="Welcome to SolarTopps App" />
            </Helmet>
            <PageTitleBar title={<IntlMessages id="sidebar.Welcome" />} match={match} />

            <div className="container h-100">
               <div className="row h-100 justify-content-center align-items-center">
                  <div className="landing-page">
                  <div><img src={require('Assets/img/st-logo.png')} className="mr-15" alt="site logo" width="300" height="71" /></div>
                  <div className="lp-title"> Enabling the meaningful work you do every day. </div>
                  <div className="lp-modules-list">This SolarTopps application supports multilple modules like:
                     <ul>
                        <li>User Management</li>
                        <li>Inventory Management</li>
                        <li>Purchase Plan Management</li>
                        <li>Customer Proposal</li>
                        <li>Project Management</li>
                     </ul>
                  </div>
                  <div className="lp-started">Let's get started.</div>
               </div>
               </div>  
            </div>


         </div>
      )
   }
}
