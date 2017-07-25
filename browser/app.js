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
import Main from './Main'

import {ApolloClient, createNetworkInterface } from 'apollo-client';
import {gql, graphql, ApolloProvider} from 'react-apollo';

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

const Feed = ({data}) => {
  return  <MuiThemeProvider muiTheme={muiTheme}><Main data={data} /></MuiThemeProvider>
};
const FeedWithData  = graphql(gql`{
      user(login: "edwardwohaijun"){
        login, name, avatarUrl, websiteUrl, bio, email, location
        starredRepositories(first: 5) {
          totalCount
          edges{
            node{
              id
              ref(qualifiedName: "master") {
                target {
                  ... on Commit {
                    history(first: 30){
                      pageInfo {
                        hasNextPage, hasPreviousPage, startCursor, endCursor
                      }
                      edges{
                        node {
                          oid, message
                          author{name, email, date}
                        }
                        cursor
                      }
                    }
                  }
                }
              }
              name, description, primaryLanguage{color name}, pushedAt
              stargazers { totalCount }
              forks { totalCount }
              watchers { totalCount }
              issues(last:10, states:OPEN){
                totalCount
                edges{
                  node {
                    id, author{login, avatarUrl}, createdAt, title, body
                    comments(first:10){
                      totalCount
                      edges{
                        node{
                          author{login, avatarUrl}, body, createdAt, id, authorAssociation
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }

        contributedRepositories { totalCount }
        followers { totalCount }
        following { totalCount }
        watching { totalCount }
        repositories(first: 5){
          totalCount
          edges{
            node{
              id
              ref(qualifiedName: "master") {
                target {
                  ... on Commit {
                    history(first: 30){
                      pageInfo {
                        hasNextPage, hasPreviousPage, startCursor, endCursor
                      }
                      edges{
                        node {
                          oid, message
                          author{name, email, date}
                        }
                        cursor
                      }
                    }
                  }
                }
              }
              name, description, primaryLanguage{color name}, pushedAt
              stargazers { totalCount }
              forks { totalCount }
              watchers { totalCount }
              issues(last:10, states:OPEN){
                totalCount
                edges{
                  node {
                    id, author{login, avatarUrl}, createdAt, title, body
                    comments(first:10){
                      totalCount
                      edges{
                        node{
                          author{login, avatarUrl}, body, createdAt, id, authorAssociation
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
}`, { options: { notifyOnNetworkStatusChange: false } })(Feed);

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
  return new ApolloClient({
    networkInterface: networkInterface
  });
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ApolloProvider client={createClient()} store={store}>
        <FeedWithData />
      </ApolloProvider>
    );
  }
}

ReactDOM.render(
    <App />, document.getElementById('main-content-wrapper')
);
