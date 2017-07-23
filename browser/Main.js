import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import {updateVideoPeer, startChatSession, addBadge, removeBadge, addNotice, addChatMsg, dumpChats, addBuddy, removeBuddy, removePeerChat, joinGroup} from './actions';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';

import Profile from './components/Profile';
import CommitsHist from './components/CommitsHist';
import IssuesList from './components/IssuesList';
import Charts from './components/Charts';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginName: 'edwardwohaijun',
      defaultRepoIdx: 0     // default commit history, issue list to show on tab2, tab3
    };
  }
  handleChange = e => {
    this.setState({loginName: e.target.value})
  };
  changeTab = e => {

  };
  handleRepoClick = idx => {
    this.setState({defaultRepoIdx: idx})
  };

  render() {
    console.log('data from github: ', this.props.data);
    return (
        <div>
          <TextField hintText="Github login name" floatingLabelText="Github login name"
                     value={this.state.loginName} onChange={this.handleChange} />
          <RaisedButton label="Go" primary={true} style={{margin: 12}} disabled={this.props.data.loading} /><br />
          {this.props.data.loading ?
              <CircularProgress size={80} thickness={4} /> :
              <Tabs>
                <Tab label="Profile">
                  <Profile data={this.props.data.user} repoClickHanlder={this.handleRepoClick} defaultRepoIdx={this.state.defaultRepoIdx}/>
                </Tab>
                <Tab label="Commits">
                  <CommitsHist data={this.props.data.user} repoClickHanlder={this.handleRepoClick} defaultRepoIdx={this.state.defaultRepoIdx}/>
                </Tab>
                <Tab label="Issue list">
                  <IssuesList data={this.props.data.user} repoClickHanlder={this.handleRepoClick} defaultRepoIdx={this.state.defaultRepoIdx}/>
                </Tab>
                <Tab label="Charts">
                  <Charts data={this.props.data.user} repoClickHanlder={this.handleRepoClick} defaultRepoIdx={this.state.defaultRepoIdx}/>
                </Tab>
              </Tabs>
          }
        </div>
    );
  }
}

export default Main;
//const mapStateToProps = state => ({ui: state.ui, profile: state.profile});
//const mapDispatchToProps = dispatch => bindActionCreators({updateVideoPeer, startChatSession, addBadge, removeBadge, addNotice, addChatMsg, dumpChats, addBuddy, removeBuddy, removePeerChat, joinGroup}, dispatch);
//export default connect(mapStateToProps, mapDispatchToProps)(Main);
