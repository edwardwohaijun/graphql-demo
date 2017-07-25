import React, {Component} from 'react';
import {gql, graphql} from 'react-apollo';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class NewComment extends Component {
  constructor(props) {
    super(props);
    this.state = {comment: ''}; // 为空， strip后为空， 不能submit
  }

  handleChange = e => {
    this.setState({comment: e.target.value});
  };

  onClick = () => {
    if (this.state.comment.trim() == '') {
      return
    }
    this.props.mutate({
      variables: {subjectId: this.props.subjectId, body: this.state.comment}
    })
    .then(({data}) => {
          this.setState({comment: ''});
          console.log('got data: ', data)
    }).catch(err => {
          console.log('error: ', err)
    })
  };

  render (){
    return (
        <div>
          <TextField id="newComment" value={this.state.comment} multiLine={true} rowsMax={2} rows={2} style={{width: '100%'}} onChange={this.handleChange} hintText='Leave a comment' maxLength='300'/>
          <RaisedButton onClick={this.onClick} disabled={!this.props.subjectId} label="submit comment" primary={true} style={{margin: '16 0'}} />
        </div>
    )
  }
}

const newCommentQuery = gql`
  mutation addComment($subjectId: ID!, $body: String!){
    addComment(input: {subjectId: $subjectId, body: $body}){
      clientMutationId
    }
  }
`;

export default graphql(newCommentQuery)(NewComment);
