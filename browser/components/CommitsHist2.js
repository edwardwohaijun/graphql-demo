import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
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
            <Table fixedHeader={true} fixedFooter={true} selectable={false}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn style={{width:100}}>date</TableHeaderColumn>
                  <TableHeaderColumn style={{width:100}}>author</TableHeaderColumn>
                  <TableHeaderColumn>msg</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {
                  !ref ? null : ref.target.history.edges.map((item, idx) => {
                    return (
                        <TableRow key={item.node.oid.substr(8)} displayBorder={false}>
                          <TableRowColumn style={{width:100}}>{timeago().format(item.node.author.date)}</TableRowColumn>
                          <TableRowColumn style={{width:100}}>{item.node.author.name}</TableRowColumn>
                          <TableRowColumn>{item.node.message}</TableRowColumn>
                        </TableRow>)
                  })
                }
              </TableBody>
            </Table>
          </div>
        </div>
    )}
}
export default CommitsHist;

