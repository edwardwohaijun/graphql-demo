import React, {Component} from 'react';
import timeago from 'timeago.js';
import RepoList from './RepoList';

class CommitsHist extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render (){
    return (
        <div style={{marginTop: 20, display: 'flex'}}>
          <div style={{width: 245}}>
            repo list
          </div>
          <div style={{width: 735, paddingLeft: 40}}>
            commit list
          </div>
        </div>
    )}
}
export default CommitsHist;

