import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import timeago from 'timeago.js';
import RepoList from './RepoList';
import { gql, graphql } from 'react-apollo';
import NewComment from './NewComment';
import issueListQL from '../graphql/issueListQL';

class IssuesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIssueIdx: 0
    };
  }
  handleSelect = (event, index, value) => this.setState({selectedIssueIdx: value});

  componentWillReceiveProps = nextProps => { // when we are at repoA which has 10 issues, looking at issue 10, then switch to repoB which has only 2 issues
    if (nextProps.defaultRepoIdx != this.props.defaultRepoIdx){ // but issueIdx still points to 10, thus, whenever user switch to other repo, reset "selectedIssueIdx" to 0
      this.setState({selectedIssueIdx: 0})
    }
  };

  render (){
    return (
        <div style={{marginTop: 20, display: 'flex'}}>
          <div style={{width: 245}}>
            <RepoList changeTab={()=>{}} repoInfo={this.props.repoInfo} ownRepoCount={this.props.ownRepoCount} isShort={true}
                      repoClickHandler={this.props.repoClickHandler} defaultRepoIdx={this.props.defaultRepoIdx}/>
          </div>
          <div style={{width: 735, paddingLeft: 40}}>
            {this.props.defaultRepoID ? <IssuesWithData id={this.props.defaultRepoID}/> : <span>tada</span>}
          </div>
        </div>
    )}
}
export default IssuesList;

class Issues extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(){
    console.log('this.props.: ', this.props);
    return (
        <div>
          {

          }
        </div>)}  ;
}

const IssuesWithData = graphql(issueListQL, {
  options: ({id}) => {
    return {
      variables: {id}
    }
  },
  props: ({data: {loading, issueList, fetchMore}}) => {
    return {
      loading,
      issueList,
      loadMoreEntries: () => {
        return fetchMore({
          query: issueListQL,
          variables: {
            //cursor: issueList.ref.target.history.pageInfo.endCursor,
            id: issueList.id
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const newEdges = fetchMoreResult.issueList.ref.target.history.edges;
            const pageInfo = fetchMoreResult.issueList.ref.target.history.pageInfo;
            var ref = fetchMoreResult.issueList.ref;
            ref.target.history.edges = [...previousResult.issueList.ref.target.history.edges, ...newEdges];
            ref.target.history.pageInfo = pageInfo;
            return {
              issueList: {
                id: fetchMoreResult.issueList.id,
                //ref: fetchMoreResult.commitHist.ref,
                ref: ref,
                __typename: "Repository",
                //edges: [...previousResult.commitHist.ref.target.history.edges, ...newEdges],
                //pageInfo
              }
            };
          }
        });
      }
    };
  }
})(Issues);
