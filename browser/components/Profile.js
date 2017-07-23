import React, {Component} from 'react';
//import {addOneStatus, addManyStatus, replyStatus, clearOtherStatus, delStatus} from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import RepoList from './RepoList';
import timeago from 'timeago.js';
//import CircularProgress from 'material-ui/CircularProgress';
//import {grey50, grey100, grey500, grey800} from 'material-ui/styles/colors';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render (){
    console.log('profile data: ', this.props.data);
    var data = this.props.data;
    return (
        <div style={{marginTop: 20, display: 'flex'}}>
          <div style={{width: 245}}>
            <Avatar src={data.avatarUrl} size={100} />
            <div style={{lineHeight: 1, paddingTop: 16, paddingBottom: 16}}>
              <div style={{fontSize: 26}}>{data.name}</div>
              <div style={{fontSize: 20, fontStyle: 'normal', color: '#666'}}>{data.login}</div>
            </div>
            <div style={{marginBottom: 12, overflow: 'hidden', fontSize: 14, color: '#6a737d'}}>{data.bio}</div>
            <ul style={{listStyle: 'none', paddingTop: 16, paddingBottom: 16, borderTop: '1px #e1e4e8 solid', paddingLeft: 0, marginTop: 0, marginBottom: 0}}>
              <li style={{paddingTop: 4}}>{data.location}</li>
              <li style={{paddingTop: 4}}>{data.email}</li>
              <li style={{paddingTop: 4}}>{data.websiteUrl}</li>
            </ul>
          </div>
          <div style={{width: 735}}>
            <RepoList data={data}/>
          </div>
        </div>
    )}
}
export default Profile;

//const mapStateToProps = state => ({buddies: state.peers.get('u'), posts: state.statusFeed, profile: state.profile});
//const mapDispatchToProps = dispatch => bindActionCreators({addOneStatus, addManyStatus, replyStatus, clearOtherStatus, delStatus}, dispatch);
//export default connect(mapStateToProps, mapDispatchToProps)(BuddyStatus);
