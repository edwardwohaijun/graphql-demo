import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import timeago from 'timeago.js';
import RepoList from './RepoList';
import NewComment from './NewComment';

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
    var issues = this.props.data[ this.props.defaultRepoIdx ].node.issues;
    var currentIssueComments = [], currentIssueBody = '', currentIssueID = null, currentIssueBy = '', currentIssueAt;
    if (issues.edges[ this.state.selectedIssueIdx ]){ // not all repo have issues, check against null
      currentIssueComments = issues.edges[ this.state.selectedIssueIdx ].node.comments.edges;
      currentIssueBody = issues.edges[ this.state.selectedIssueIdx ].node.body;
      currentIssueID = issues.edges[ this.state.selectedIssueIdx ].node.id;
      currentIssueBy = issues.edges[ this.state.selectedIssueIdx ].node.author.login;
      currentIssueAt = timeago().format(issues.edges[ this.state.selectedIssueIdx ].node.createdAt);
    }

    return (
        <div style={{marginTop: 20, display: 'flex'}}>
          <div style={{width: 245}}>
            <RepoList repoInfo={this.props.repoInfo} ownRepoCount={this.props.ownRepoCount} isShort={true} repoClickHanlder={this.props.repoClickHanlder} defaultRepoIdx={this.props.defaultRepoIdx}/>
          </div>
          <div style={{width: 735, paddingLeft: 40}}>
            <SelectField floatingLabelText="Issue list" value={this.state.selectedIssueIdx} onChange={this.handleSelect}>
              {
                issues.edges.map((item, idx) => {
                  return <MenuItem key={item.node.title} value={idx} primaryText={item.node.title} />
                })
              }
            </SelectField>
            {
              issues.edges.length == 0
                  ? null
                  : <span style={{marginLeft: 18, top: -10, position: 'relative', fontSize: 11, color: 'gray'}}>raised by: {currentIssueBy} at {currentIssueAt}</span>
            }
            <div style={{border: '1px #e1e4e8 solid', overflow: 'scroll', height: 80, marginTop: 18, padding: 8}}>
              {currentIssueBody}
            </div>
            <NewComment subjectId={currentIssueID}/>
            <Table fixedHeader={true} fixedFooter={true} selectable={false}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn style={{width:100}}>Comment date</TableHeaderColumn>
                  <TableHeaderColumn style={{width:100}}>Comment author</TableHeaderColumn>
                  <TableHeaderColumn>Content</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {
                  currentIssueComments.map((item, idx) => {
                      return (
                        <TableRow key={item.node.id} displayBorder={false}>
                          <TableRowColumn style={{width:100}}>{timeago().format( item.node.createdAt )}</TableRowColumn>
                          <TableRowColumn style={{width:100}}>{item.node.author.login }</TableRowColumn>
                          <TableRowColumn>{item.node.body}</TableRowColumn>
                        </TableRow>)
                    })
                }
              </TableBody>
            </Table>
          </div>
        </div>
    )}
}
export default IssuesList;

//const mapStateToProps = state => ({buddies: state.peers.get('u'), posts: state.statusFeed, profile: state.profile});
//const mapDispatchToProps = dispatch => bindActionCreators({addOneStatus, addManyStatus, replyStatus, clearOtherStatus, delStatus}, dispatch);
//export default connect(mapStateToProps, mapDispatchToProps)(BuddyStatus);
