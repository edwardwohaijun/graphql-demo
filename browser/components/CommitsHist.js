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
    console.log('commit hist: ', this.props.data.repositories.edges[1].node.ref.target.history.edges);
    return (
        <div style={{marginTop: 20, display: 'flex'}}>
          <div style={{width: 245}}>
            <RepoList data={this.props.data} isShort={true}/>
          </div>
          <div style={{width: 735}}>
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
                  this.props.data.repositories.edges[this.props.defaultRepoIdx].node.ref.target.history.edges.map((item, idx) => {
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

//const mapStateToProps = state => ({buddies: state.peers.get('u'), posts: state.statusFeed, profile: state.profile});
//const mapDispatchToProps = dispatch => bindActionCreators({addOneStatus, addManyStatus, replyStatus, clearOtherStatus, delStatus}, dispatch);
//export default connect(mapStateToProps, mapDispatchToProps)(BuddyStatus);
