import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {fromJS} from 'immutable';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {grey500, grey900} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Main from './Main'

import {ApolloClient, createNetworkInterface } from 'apollo-client';
import {gql, graphql, ApolloProvider} from 'react-apollo';
import { IntrospectionFragmentMatcher } from 'react-apollo';

var initialState = {
  comments: fromJS([])
};

var store;
if (process.env.NODE_ENV === 'development'){
  store = createStore(reducers, initialState, compose(
	applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));
} else {
  const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
  store = createStoreWithMiddleware(reducers, initialState);
  if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__
		&& Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers).length ){
	  window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers = {};
  }
}

const muiTheme = getMuiTheme({
  tabs: {backgroundColor: '#E0E0E0', selectedTextColor: grey900, textColor: grey500}
});

const myFragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: "INTERFACE",
          name: "Node",
          possibleTypes: [
            { name: "Commit" },
            { name: "Repository" }
          ]
        }
      ]
    }
  }
});

function createClient() {
  const networkInterface = createNetworkInterface({
    uri: 'https://api.github.com/graphql'
  });
  networkInterface.use([{
    applyMiddleware(req, next){
      if (!req.options.headers){
        req.options.headers = {}
      }
      req.options.headers.Authorization = 'bearer ' + localStorage.getItem('github-token');
      req.options.headers['Content-Type'] = 'application/json';
      next()
    }
  }]);
  networkInterface.useAfter([{
    applyAfterware({ response }, next) {
      if (response.status === 401) {
        alert("Unauthorized access to https://api.github.com/graphql, please save a valid github-token in your localStorage, then retry.");
      } else if (response.status === 500 ) {
        alert("Server error, please retry later.");
      }
      next();
    }
  }]);
  return new ApolloClient({
    fragmentMatcher: myFragmentMatcher,
    networkInterface: networkInterface,
    dataIdFromObject: object => object.id
  });
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {loginName: 'edwardwohaijun'};
  }

  clickHandler = evt => this.setState({loginName: document.getElementById('loginName').value});

  render() {
    return (
      <ApolloProvider client={createClient()} store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <TextField id="loginName" defaultValue="edwardwohaijun" floatingLabelText="Input a valid github login name"/>
            <RaisedButton onTouchTap={this.clickHandler} label="Go" primary={true} style={{margin: 12}} />
            <Main login={this.state.loginName}/>
          </div>
        </MuiThemeProvider>
      </ApolloProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('main-content-wrapper'));
