import React, {Component} from 'react';
import { gql, graphql } from 'react-apollo';
import timeago from 'timeago.js';
import RepoList from './RepoList';
import commitHistQL from '../graphql/commitHistQL';


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
            <CommitsWithData id={this.props.defaultRepoID} />
          </div>
        </div>
    )}
}
export default CommitsHist;

const Commits = props =>
    <div>
      {props.data.loading
          ? <span>loading</span>
          : !props.data.node.ref
          ? null : props.data.node.ref.target.history.edges.map(item =>
          <div style={{borderBottom: '1px #e1e4e8 solid', marginBottom: 18, padding: 12}}
               key={item.node.oid.substr(8)}>
            <div style={{marginBottom: 8}}>
              <span
                  style={{color: 'gray', fontWeidht: 'bold'}}>{item.node.author.name} {timeago().format(item.node.author.date)}</span>
            </div>
            <div style={{maxHeight: 100, overflow: 'scroll'}}>{item.node.message}</div>
          </div>)
      }
    </div>;

const CommitsWithData = graphql(commitHistQL, {
  options: ({id}) => ({variables: {id}})
})(Commits);

