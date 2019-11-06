import React, { Component } from 'react';
import { getDateTime } from '../../util/utility';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';

class AdminCommentsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrowDirection: 'down-arrow',
            showHideCommentBox: 'hide-commentbox'
        };
    }

    _toggleComments = () => {
        let arrowDirection = this.state.arrowDirection === 'down-arrow' ? 'up-arrow' :'down-arrow';
        let showHideCommentBox = this.state.showHideCommentBox === 'hide-commentbox' ? 'show-commentbox' : 'hide-commentbox';
        this.setState({
            arrowDirection,
            showHideCommentBox
        });
    }   

    render() {
        const { arrowDirection, showHideCommentBox } = this.state;
        const { userComments } = this.props;
        // Turn createdDateTime strings into dates, and then subtract them and sort
        const sortUserComments = userComments && userComments.length > 0 && userComments.sort(function(a,b){
            return new Date(b.createdDateTime) - new Date(a.createdDateTime);
        });

        const adminComments = sortUserComments && sortUserComments.length > 0 && Object.keys(sortUserComments).map( (key, index) => {
            const comment = sortUserComments[key];
            const dateTimeStamp = comment.createdDateTime && comment.createdDateTime;
            const commentDate = dateTimeStamp && getDateTime('date', dateTimeStamp);
            const commentTime = dateTimeStamp && getDateTime('time', dateTimeStamp);
    
            return ( <div className="comment-wrapper" key={ `comment ${index}` }>
                <MessageOutlinedIcon className="comment-image" />
                <span className="comment-text">{ comment.commentText }</span><br />
                <span className="comment-date">{ commentDate }</span> <span className="comment-time">{ commentTime }</span>
            </div> );
        });
        
        return ( 
            <div className="row commentbox-wrapper">
                <h4 className="header-text" onClick={ this._toggleComments }>{ arrowDirection === 'down-arrow' ? <ExpandMoreOutlinedIcon className="down-arrow" /> : <ExpandLessOutlinedIcon className="up-arrow" /> } Message </h4>
                <div className={ `message-block ${ showHideCommentBox } ` }>
                    { adminComments}   
                </div>
            </div>
        );
    }
}

export default AdminCommentsComponent;
