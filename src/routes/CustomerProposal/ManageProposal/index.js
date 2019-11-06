import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import IntlMessages from 'Util/IntlMessages';
import Footer from 'Components/Footer/Footer';
import { getProposalList } from '../../../actions/CustomerProposal/proposal';
import ManageProposalComponent from '../../../components/CustomerProposal/ManageProposalComponent';
import { loadData } from '../../../util/storage';


class ManageProposal extends Component {

   componentDidMount() {
      this._getData(
         {
             pageNumber: 0,
             pageSize: 10
         }
     );
   }

   _getData = data => {
      const authToken = loadData('authToken');
      data.authToken = authToken;
      this.props.getProposalList(data);
   }

   render() {
      const { match, proposals } = this.props;

      return (
         <div className="ecom-dashboard-wrapper">
            <Helmet> <title>Manage Proposal</title> </Helmet>
            <PageTitleBar title={<IntlMessages id="sidebar.ManageProposal" />} match={match} />
            <div className="page-min-ht">
               <ManageProposalComponent 
                  proposals={ proposals && proposals.proposal }
               />
           </div>
         <Footer />
         </div>
      )
   }
}

const mapStateToProps = state => {
   const { Proposal } = state;
   const proposals = Proposal && Proposal.proposals;
   return {
      proposals
   }
 };

 const mapDispatchToProps = dispatch => {
    return {
      getProposalList: data => {
         return dispatch(getProposalList(data))
      },
    }
 }

export default connect(mapStateToProps, mapDispatchToProps)(ManageProposal);
