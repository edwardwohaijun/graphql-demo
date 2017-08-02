import {gql} from 'react-apollo';

export default gql`
  query CurrentRepoCommitHist($id: ID!, $cursor: String) {
    commitHist: node(id: $id) {
      id
      ... on Repository {
        id
        ref(qualifiedName: "master") {
          target {
            ... on Commit {
              id
              history(first: 2, after: $cursor) {
                pageInfo {endCursor hasNextPage}
                edges {
                  cursor
                  node {
                    id oid message author {name email date}
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
