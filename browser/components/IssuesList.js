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
            {this.props.defaultRepoID ? <IssuesWithData id={this.props.defaultRepoID}/> : null}
          </div>
        </div>
    )}
}
export default IssuesList;

class Issues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIssueIdx: 0
    };
  }
  handleSelect = (event, index, value) => this.setState({selectedIssueIdx: value});

  render(){
    if (this.props.loading){
      return <span>loading</span>
    }

    var issues = this.props.issueList.issues;
    var currentIssueComments = [], currentIssueBody = '', currentIssueID = null, currentIssueBy = '', currentIssueAt;

    var currentIssueNode = issues.edges[ this.state.selectedIssueIdx ].node;
    if (currentIssueNode){ // not all repo have issues, check against null
      currentIssueComments = currentIssueNode.comments.edges;
      currentIssueBody = currentIssueNode.body;
      currentIssueID = currentIssueNode.id;
      currentIssueBy = currentIssueNode.author.login;
      currentIssueAt = timeago().format(currentIssueNode.createdAt);
    }
    return (
        <div>
          <SelectField floatingLabelText="Issue list" value={this.state.selectedIssueIdx} onChange={this.handleSelect}>
            {
              issues.edges.map((item, idx) => {
                return <MenuItem key={item.node.id} value={idx} primaryText={item.node.title} />
              })
            }
          </SelectField>
          {
            issues.edges.length == 0
                ? null
                : <span style={{marginLeft: 18, top: -10, position: 'relative', fontSize: 11, color: 'gray'}}>raised by: {currentIssueBy} {currentIssueAt}</span>
          }
          <div style={{border: '1px #e1e4e8 solid', overflow: 'scroll', height: 80, marginTop: 18, padding: 8}}>
            {currentIssueBody}
          </div>
          <NewComment subjectId={currentIssueID} repoId={this.props.id}/>

          <span>Comments</span>
          <hr style={{border: 0, backgroundColor: '#e1e4e8', height: 1}} />
          {
            currentIssueComments.map((item, idx) => {
              return (
                  <div key={item.node.id.substr(8)} style={{borderBottom: '1px #e1e4e8 solid', marginBottom: 18, padding: 12}}>
                    <div style={{marginBottom: 8}}>
                      <span style={{color: 'gray', fontWeight: 'bold'}}>{item.node.author.login } {timeago().format( item.node.createdAt )}</span>
                    </div>
                    <div style={{maxHeight: 100, overflow: 'scroll'}}>{item.node.body}</div>
                  </div>
              )
            })
          }
        </div>
    )
  };
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
