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

var repoDetails = []; // I need ownRepoCount to split my own repo with my starred repo(with a star label)
// repoDetails is mean to be deleted

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultRepoIdx: 0,
      defaultRepoID: null,
      currentTab: "profile"
    };
  }

  changeTab = tabValue => this.setState({currentTab: tabValue});
  handleRepoClick = (idx, ID) => this.setState({defaultRepoIdx: idx, defaultRepoID: ID});

  render() {
    console.log('data from github: ', this.props.data);
    var repoInfo = [], pageContent, ownRepoCount = 0;
    if (this.props.data.error) {
      pageContent = <div>Error: {this.props.data.error}</div>
    } else if (this.props.data.loading){
      pageContent = <div>Loading...</div>
    }else {
      repoInfo.length = 0; repoInfo = [];
      this.props.data.user.repositories.edges.forEach(r => {
        repoInfo.push({
          name: r.node.name, description: r.node.description, id: r.node.id,
          primaryLanguage: r.node.primaryLanguage, pushedAt: r.node.pushedAt
        })
      });

      ownRepoCount = this.props.data.user.repositories.edges.length;
      this.props.data.user.starredRepositories.edges.forEach(r => {
        repoInfo.push({
          name: r.node.name, description: r.node.description, id: r.node.id,
          primaryLanguage: r.node.primaryLanguage, pushedAt: r.node.pushedAt
        })
      });

      repoDetails = this.props.data.user.repositories.edges.concat(this.props.data.user.starredRepositories.edges);

      pageContent = <Tabs value={this.state.currentTab} onChange={this.changeTab}>
                        <Tab label="Profile" value="profile">
                          <Profile changeTab={this.changeTab} data={this.props.data.user} repoInfo={repoInfo} ownRepoCount={ownRepoCount}
                                   repoClickHandler={this.handleRepoClick} defaultRepoIdx={this.state.defaultRepoIdx} defaultRepoID={this.state.defaultRepoID}/>
                        </Tab>
                        <Tab label="Commit history" value="commit">
                          <CommitsHist repoInfo={repoInfo} ownRepoCount={ownRepoCount} repoClickHandler={this.handleRepoClick}
                                       defaultRepoIdx={this.state.defaultRepoIdx} defaultRepoID={this.state.defaultRepoID}/>
                        </Tab>
                        <Tab label="Issue list" value="issue">
                          <IssuesList data={repoDetails} repoInfo={repoInfo} ownRepoCount={ownRepoCount} repoClickHandler={this.handleRepoClick}
                                      defaultRepoIdx={this.state.defaultRepoIdx} defaultRepoID={this.state.defaultRepoID}/>
                        </Tab>
                        <Tab label="Charts" value="chart">
                          <Chart data={repoDetails} repoInfo={repoInfo} ownRepoCount={ownRepoCount} repoClickHandler={this.handleRepoClick}
                                 defaultRepoIdx={this.state.defaultRepoIdx} defaultRepoID={this.state.defaultRepoID}/>
                        </Tab>
                      </Tabs>
    }

    return pageContent ;
  }
}

export default graphql(profileQL, {
  options: ({login}) => ({variables: {login}})
})(Main);
