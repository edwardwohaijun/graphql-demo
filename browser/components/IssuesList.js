import React, {Component} from 'react';
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


    return (
        <div style={{marginTop: 20, display: 'flex'}}>
          <div style={{width: 245}}>
            repo list
          </div>
          <div style={{width: 735, paddingLeft: 40}}>
            issue list
          </div>
        </div>
    )}
}
export default IssuesList;
