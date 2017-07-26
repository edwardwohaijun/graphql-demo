import React, {Component} from 'react';
import {gql, graphql} from 'react-apollo';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class NewComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      submitting: false
    };
  }

  handleChange = e => {
    this.setState({comment: e.target.value});
  };

  onClick = () => {
    if (this.state.comment.trim() == '') {
      return
    }
    this.setState({submitting: true});
    this.props.mutate({
      variables: {subjectId: this.props.subjectId, body: this.state.comment}
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
    }
  }
`;

export default graphql(newCommentQuery)(NewComment);
