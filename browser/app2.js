import React from 'react';
import ReactDOM from 'react-dom';
import {fromJS} from 'immutable';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'
import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './Main'

const gitToken = localStorage.getItem('github-token');
import {ApolloClient, createNetworkInterface } from 'apollo-client';
import {gql, graphql} from 'react-apollo';
const networkInterface = createNetworkInterface({
  uri: 'https://api.github.com/graphql'
});
networkInterface.use([{
  applyMiddleware(req, next){
    if (!req.options.headers){
      req.options.headers = {}
    }
    req.options.headers.Authorization = 'bearer ' + gitToken;
    req.options.headers['Content-Type'] = 'application/json';
    next()
  }
}]);

const gqlClient = new ApolloClient({networkInterface});

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

const TrainerQuery = gql`
  query TrainerQuery {
    Trainer(name: "Edward Wo") {
      name
    }
  }
`;

gqlClient.query({
  query: gql`
    query {
      user(login: "edwardwohaijun"){
        login, name, avatarUrl, websiteUrl, bio, email, location
        starredRepositories {
          totalCount
        }
        contributedRepositories{
          totalCount
        }
        followers{
          totalCount
        }
        following{
          totalCount
        }
        starredRepositories{
          totalCount
        }
        watching{
          totalCount
        }
        repositories(first: 5){
          totalCount
          edges{
            node{
              name
              stargazers{
                totalCount
              }
              forks{
                totalCount
              }
              watchers{
                totalCount
              }
              issues(states:[OPEN]){
                totalCount
              }
            }
          }
        }
      }
    }
  `
})
  .then(data => {
      console.log('data from querying gql: ', data);
      const App = () => {
        return <MuiThemeProvider><Main /></MuiThemeProvider>
      };
      ReactDOM.render(
          <Provider store={store}><App /></Provider>, document.getElementById('main-content-wrapper')
      );
  })
  .catch(err => {
      console.log('err queyring gql: ', err)
  })
;
