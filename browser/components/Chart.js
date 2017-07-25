import React, {Component} from 'react';
import RepoList from './RepoList';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render (){
    return (
        <div style={{marginTop: 20, display: 'flex'}}>
          <div style={{width: 245}}>
            <RepoList changeTab={()=>{}} repoInfo={this.props.repoInfo} ownRepoCount={this.props.ownRepoCount} isShort={true} repoClickHanlder={this.props.repoClickHanlder} defaultRepoIdx={this.props.defaultRepoIdx}/>
          </div>
          <div style={{width: 735, paddingLeft: 40}}>
            charts
          </div>
        </div>
    )}
}
export default Chart;
