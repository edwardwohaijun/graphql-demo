import React, {Component} from 'react';
import timeago from 'timeago.js';
import RepoList from './RepoList';

class CommitsHist extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render (){
    var ref = this.props.data[ this.props.defaultRepoIdx ].node.ref; // sometimes ref is null, because I grab the commit history from master branch
    // but some repo has no master branch.
    return (
        <div style={{marginTop: 20, display: 'flex'}}>
          <div style={{width: 245}}>
            <RepoList changeTab={()=>{}} repoInfo={this.props.repoInfo} ownRepoCount={this.props.ownRepoCount} isShort={true} repoClickHanlder={this.props.repoClickHanlder} defaultRepoIdx={this.props.defaultRepoIdx}/>
          </div>
          <div style={{width: 735, paddingLeft: 40}}>
            {
              !ref ? null : ref.target.history.edges.map((item, idx) => {
                return (
                    <div style={{borderBottom: '1px #e1e4e8 solid', marginBottom: 18, padding: 12}} key={item.node.oid.substr(8)}>
                      <div style={{marginBottom: 8}}>
                        <span style={{color: 'gray', fontWeidht: 'bold'}}>{item.node.author.name} {timeago().format(item.node.author.date)}</span>
                      </div>
                      <div style={{maxHeight: 100, overflow: 'scroll'}}>{item.node.message}</div>
                    </div>
                )
              })
            }
          </div>
        </div>
    )}
}
export default CommitsHist;

