import React, {Component} from 'react';
import {gql, graphql} from 'react-apollo';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import issueListQL from '../graphql/issueListQL';

class NewComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      submitting: false
    };
  }

  handleChange = e => this.setState({comment: e.target.value});

  onClick = () => {
    if (this.state.comment.trim() == '') {
      return
    }
    this.setState({submitting: true});
    this.props.mutate({
      variables: {subjectId: this.props.subjectId, body: this.state.comment},
      refetchQueries:[{
        query: issueListQL,
        variables: {id: this.props.repoId}
      }]

      // it's more efficient to call update() rather than refetchQueries(), but I just can't figure out how
      //variables: {subjectId: this.props.subjectId, body: this.state.comment},
      //update: (store, {data: {addComment}}) => { // addComment is the server response from mutation operation
        //const data = store.readQuery(
            //{
              //query: issueListQL,
              //variables: {id: this.props.subjectId}
            //});
        //console.log('data from reading local cache: ', data);
        //console.log('data from addComment: ', addComment);
        //data.comments.push(submitComment);
        //store.writeQuery({ query: CommentAppQuery, data });
      //}
    })
    .then(({data}) => {
          this.setState({comment: '', submitting: false});
    }).catch(err => {
          console.log('error: ', err);
          this.setState({submitting: false});
    })
  };

  componentDidMount = () => {
    this._input.focus()
  };

  render (){
    console.log('props of newComment: ', this.props);
    return (
        <div style={{marginBottom: 28}}>
          <TextField id="newComment" value={this.state.comment} ref={c => this._input = c}
                     multiLine={true} rowsMax={2} rows={2} style={{width: '100%'}}
                     onChange={this.handleChange} hintText='Leave a comment' maxLength='300'/>
          <RaisedButton onClick={this.onClick} disabled={!this.props.subjectId || this.state.submitting}
                        label={this.state.submitting ? "submitting..." : "submit comment"} primary={true} style={{margin: '16 0'}} />
        </div>
    )
  }
}

const newCommentQuery = gql`
  mutation addComment($subjectId: ID!, $body: String!){
    addComment(input: {subjectId: $subjectId, body: $body}){
      clientMutationId
      commentEdge{
        node{
          author{login, avatarUrl}
          body
          createdAt
          id
          authorAssociation
        }
      }
    }
  }
`;

export default graphql(newCommentQuery)(NewComment);
