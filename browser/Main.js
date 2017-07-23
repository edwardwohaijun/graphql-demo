import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import {updateVideoPeer, startChatSession, addBadge, removeBadge, addNotice, addChatMsg, dumpChats, addBuddy, removeBuddy, removePeerChat, joinGroup} from './actions';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import CircularProgress from 'material-ui/CircularProgress';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';
import {Tabs, Tab} from 'material-ui/Tabs';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log('data: ', this.props.data);
    return (
        <div id='main-content'>
          <Tabs>
            <Tab label="Profile" >
              <div>
                <h2 style={styles.headline}>Tab One</h2>
                <p>
                  This is an example tab.
                </p>
                <p>
                  You can put any sort of HTML or react component in here. It even keeps the component state!
                </p>

              </div>
            </Tab>
            <Tab label="Commits" >
              <div>
                <h2 style={styles.headline}>Tab Two</h2>
                <p>
                  This is another example tab.
                </p>
              </div>
            </Tab>
            <Tab
                label="Issue list"
                >
              <div>
                <h2 style={styles.headline}>Tab Three</h2>
                <p>
                  This is a third example tab.
                </p>
              </div>
            </Tab>
            <Tab
                label="Charts"
                >
              <div>
                <h2 style={styles.headline}>Tab Three</h2>
                <p>
                  Charts
                </p>
              </div>
            </Tab>
          </Tabs>
        </div>
    )}
}

export default Main;
//const mapStateToProps = state => ({ui: state.ui, profile: state.profile});
//const mapDispatchToProps = dispatch => bindActionCreators({updateVideoPeer, startChatSession, addBadge, removeBadge, addNotice, addChatMsg, dumpChats, addBuddy, removeBuddy, removePeerChat, joinGroup}, dispatch);
//export default connect(mapStateToProps, mapDispatchToProps)(Main);
