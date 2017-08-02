import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { gql, graphql } from 'react-apollo';
import timeago from 'timeago.js';
import RepoList from './RepoList';
import commitHistQL from '../graphql/commitHistQL';

var cursor = null;
class CommitsHist extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render (){
    return (
        <div style={{marginTop: 20, display: 'flex'}}>
          <div style={{width: 245}}>
            <RepoList changeTab={()=>{}} repoInfo={this.props.repoInfo} ownRepoCount={this.props.ownRepoCount} isShort={true}
                      repoClickHandler={this.props.repoClickHandler} defaultRepoIdx={this.props.defaultRepoIdx}/>
          </div>
          <div style={{width: 735, paddingLeft: 40}}>
            {
              this.props.defaultRepoID
                  ? <CommitsWithData id={this.props.defaultRepoID} />
                  : null
            }
          </div>
        </div>
    )}
}
export default CommitsHist;

class Commits extends Component {
constructor(props) {
    super(props);
    this.state = {};
  }

render(){
console.log('this.props.: ', this.props);
return (
<div>
{
  this.props.data.loading
      ? <span>loading</span>
      : !this.props.data.node.ref
      ? null : this.props.data.node.ref.target.history.edges.map(item =>
      <div style={{borderBottom: '1px #e1e4e8 solid', marginBottom: 18, padding: 12}}
           key={item.node.oid.substr(8)}>
        <div style={{marginBottom: 8}}>
          <span
              style={{color: 'gray', fontWeidht: 'bold'}}>{item.node.author.name} {timeago().format(item.node.author.date)}</span>
        </div>
        <div style={{maxHeight: 100, overflow: 'scroll'}}>{item.node.message}</div>
      </div>)
}
<RaisedButton onTouchTap={()=> {
}} label="load more" style={{margin: 12}} />
</div>)}  ;
}

const CommitsWithData = graphql(commitHistQL, {
  options: ({id}) => ({variables: {id}})
})(Commits);

