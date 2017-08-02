import {gql} from 'react-apollo';

export default gql`
  query CurrentRepoIssueList($id: ID!) {
    issueList: node(id: $id) {
      id
      ... on Repository {
        id
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
`;
