import React, {Component} from 'react';
//import {addOneStatus, addManyStatus, replyStatus, clearOtherStatus, delStatus} from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import RepoList from './RepoList';
import timeago from 'timeago.js';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render (){
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
            <ul style={{listStyle: 'none', paddingTop: 16, paddingBottom: 16, borderTop: '1px #e1e4e8 solid', paddingLeft: 0, marginTop: 0, marginBottom: 0}}>
              <li style={{paddingTop: 4}}>my own repos: {data.repositories.totalCount}</li>
              <li style={{paddingTop: 4}}>starred repos: {data.starredRepositories.totalCount}</li>
              <li style={{paddingTop: 4}}>contributed repos: {data.contributedRepositories.totalCount}</li>
              <li style={{paddingTop: 4}}>watching repos: {data.watching.totalCount}</li>
              <li style={{paddingTop: 4}}>followers: {data.followers.totalCount}</li>
              <li style={{paddingTop: 4}}>following: {data.following.totalCount}</li>
            </ul>
          </div>
          <div style={{width: 735, paddingLeft: 40}}>
            <RepoList changeTab={this.props.changeTab} repoInfo={this.props.repoInfo} ownRepoCount={this.props.ownRepoCount} isShort={false} repoClickHanlder={this.props.repoClickHanlder} defaultRepoIdx={this.props.defaultRepoIdx}/>
          </div>
        </div>
    )}
}
export default Profile;
