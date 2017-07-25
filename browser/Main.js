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

var repoInfo = [], repoDetails = [], ownRepoCount = 0;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginName: 'edwardwohaijun',
      defaultRepoIdx: 0,
      currentTab: "profile" // 4 tabs, value range from 0 to 3
    };
  }

  componentWillReceiveProps = nextProps => {
    if (!nextProps.data.loading && !nextProps.data.error){
      console.log('nextProsp:', nextProps.data);
      nextProps.data.user.repositories.edges.forEach(r =>
              repoInfo.push({
                name: r.node.name, description: r.node.description,
                primaryLanguage: r.node.primaryLanguage, pushedAt: r.node.pushedAt })
      );
      ownRepoCount = nextProps.data.user.repositories.edges.length;
      nextProps.data.user.starredRepositories.edges.forEach(r =>
              repoInfo.push({
                name: r.node.name, description: r.node.description,
                primaryLanguage: r.node.primaryLanguage, pushedAt: r.node.pushedAt })
      );
      repoDetails = nextProps.data.user.repositories.edges.concat(nextProps.data.user.starredRepositories.edges);
    }
  };

  handleChange = e => {
    this.setState({loginName: e.target.value})
  };
  changeTab = tabValue => {
    console.log('I am being clicked, new tab: ', tabValue);
    this.setState({currentTab: tabValue})
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
              this.props.data.error ? <div>error: {this.props.data.error.message}</div> :
              <Tabs value={this.state.currentTab} onChange={this.changeTab}>
                <Tab label="Profile" value="profile">
                  <Profile changeTab={this.changeTab} data={this.props.data.user} repoInfo={repoInfo} ownRepoCount={ownRepoCount} repoClickHanlder={this.handleRepoClick} defaultRepoIdx={this.state.defaultRepoIdx}/>
                </Tab>
                <Tab label="Commit history" value="commit">
                  <CommitsHist data={repoDetails} repoInfo={repoInfo} ownRepoCount={ownRepoCount} repoClickHanlder={this.handleRepoClick} defaultRepoIdx={this.state.defaultRepoIdx}/>
                </Tab>
                <Tab label="Issue list" value="issue">
                  <IssuesList data={repoDetails} repoInfo={repoInfo} ownRepoCount={ownRepoCount} repoClickHanlder={this.handleRepoClick} defaultRepoIdx={this.state.defaultRepoIdx}/>
                </Tab>
                <Tab label="Charts" value="chart">
                  <Charts data={repoDetails} repoInfo={repoInfo} ownRepoCount={ownRepoCount} repoClickHanlder={this.handleRepoClick} defaultRepoIdx={this.state.defaultRepoIdx}/>
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
