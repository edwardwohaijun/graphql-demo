import {gql} from 'react-apollo';

export default gql`
  query CurrentRepoCommitHist($id: ID!) {
    node(id: $id) {
      ... on Repository {
        ref(qualifiedName: "master") {
          target {
            ... on Commit {
              id
              history(first: 30) {

                pageInfo {
                  hasNextPage
                }

                edges {
                  node {
                    oid message author {name email date}
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
