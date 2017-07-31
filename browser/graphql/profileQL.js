import {gql} from 'react-apollo';

export default gql`
  query CurrentUserProfile($login: String!) {
    user(login: $login){
      login, name, avatarUrl, websiteUrl, bio, email, location
      contributedRepositories { totalCount }
      followers { totalCount }
      following { totalCount }
      watching { totalCount }

      starredRepositories(first: 10) {
        totalCount
        edges{
          node{
            id name, description, primaryLanguage{color name}, pushedAt
            stargazers { totalCount }
            forks { totalCount }
            watchers { totalCount }
          }
        }
      }

      repositories(first: 10){
        totalCount
        edges{
          node{
            id name, description, primaryLanguage{color name}, pushedAt
            stargazers { totalCount }
            forks { totalCount }
            watchers { totalCount }
          }
        }
      }
    }
  }
`;
