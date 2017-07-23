import React, {Component} from 'react';
//import {addOneStatus, addManyStatus, replyStatus, clearOtherStatus, delStatus} from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import RaisedButton from 'material-ui/RaisedButton';
//import FlatButton from 'material-ui/FlatButton';
//import IconButton from 'material-ui/IconButton';
//import FontIcon from 'material-ui/FontIcon';
//import CircularProgress from 'material-ui/CircularProgress';
//import {grey50, grey100, grey500, grey800} from 'material-ui/styles/colors';

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render (){
    return (
        <div>
          Chart page
        </div>
    )}
}
export default Charts;

//const mapStateToProps = state => ({buddies: state.peers.get('u'), posts: state.statusFeed, profile: state.profile});
//const mapDispatchToProps = dispatch => bindActionCreators({addOneStatus, addManyStatus, replyStatus, clearOtherStatus, delStatus}, dispatch);
//export default connect(mapStateToProps, mapDispatchToProps)(BuddyStatus);
