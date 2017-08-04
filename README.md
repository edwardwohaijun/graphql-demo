# GraphQL-demo

This demo is a learning experience, showing how to grab data from github GraphQL backend. The resulting data include: your personal profile, repositories, commit history, issue list.

## Getting Started

```bash
git clone https://github.com/edwardwohaijun/graphql-demo
cd graphql-demo
npm install
npm start
```
To communicate with the github GraphQL server, you need an OAuth token with the right scopes. Follow the step in [Creating a personal github access token for the command lines](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) to create a token, then save it in your browser's local Storage as the following key/value:

key: github-token, value: your token

Finally, open your browser at http://127.0.0.1:3456. You can also go to [my site: http://worksphere.cn/home/graphql-demo](http://worksphere.cn/home/graphql-demo) to experience it(you still need a valid github access token).

## Built with

* [React](https://github.com/facebook/react) - The view layer
* [Material-ui](https://github.com/callemall/material-ui) - The UI library
* [apollo-client](https://github.com/apollographql/apollo-client) - The GraphQL client
* [Highcharts](https://github.com/highcharts/highcharts) - The JavaScript charting framework

## License

This project is licensed under the [MIT License](/LICENSE.md).
