import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import CircularProgress from 'material-ui/CircularProgress';
import {Tabs, Tab} from 'material-ui/Tabs';

import { gql, graphql } from 'react-apollo';
import profileQL from './graphql/profileQL';

import Profile from './components/Profile';
import CommitsHist from './components/CommitsHist';
import IssuesList from './components/IssuesList';
import Chart from './components/Chart';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

var repoInfo = [], repoDetails = [], ownRepoCount = 0; // I need this value to split my own repo with my starred repo(with a star label)

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultRepoIdx: 0,
      currentTab: "profile"
    };
  }

  changeTab = tabValue => {
    this.setState({currentTab: tabValue})
  };
  handleRepoClick = idx => {
    this.setState({defaultRepoIdx: idx})
  };

  componentWillReceiveProps = nextProps => {
    if (!nextProps.data.loading && !nextProps.data.error){
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
// <Profile changeTab={this.changeTab} data={this.props.data.user} repoInfo={repoInfo} ownRepoCount={ownRepoCount} repoClickHanlder={this.handleRepoClick} defaultRepoIdx={this.state.defaultRepoIdx}/>

  render() {
    console.log('data from github: ', this.props.data);
    return (
        <div>
          {
              this.props.data.error
                  ? <span>error: {this.props.data.error}</span>
                  :
                  this.props.data.loading
                      ? <span>loading...</span>
                      :
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
                          <Chart data={repoDetails} repoInfo={repoInfo} ownRepoCount={ownRepoCount} repoClickHanlder={this.handleRepoClick} defaultRepoIdx={this.state.defaultRepoIdx}/>
                        </Tab>
                      </Tabs>
          }
        </div>
    );
  }
}

export default graphql(profileQL, {
  options: ({login}) => ({variables: {login}})
})(Main);
