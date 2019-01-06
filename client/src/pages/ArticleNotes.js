import React, { Component } from 'react';
import API from '../utils/API';
import Jumbotron from '../components/Jumbotron';
import Nav from '../components/Nav';
import Note from '../components/Note';
import { TextArea, FormBtn } from '../components/Form';

class ArticleNotes extends Component {
  state = {
    article: {},
    notes: [],
    comment: ''
  };

  componentDidMount() {
    this.loadArticle();
  }

  loadArticle() {
    API.getSpecificArticle(this.props.match.params.id)
      .then(res => {
        this.setState({
          article: res.data[0],
          notes: res.data[0].note,
          comment: ''
        });
        console.log(res.data[0]);
      })
      .catch(err => console.log(err));
  }
  renderNotes = () => {
    return this.state.notes.map(note => (
      <Note
        _id={note._id}
        key={note._id}
        comment={note.comment}
        deleteNote={this.deleteNote}
      />
    ));
  };

  deleteNote = id => {
    API.deleteNote(id)
      .then(res => this.loadArticle())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.comment) {
      API.addNote(this.state.article._id, {
        comment: this.state.comment
      })
        .then(res => this.loadArticle())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div className="text-center mx-auto">
        <Nav />
        <Jumbotron>
          <h1 style={{ fontSize: 60 }}>Article {this.state.article.title}</h1>
          <p style={{ fontSize: 20 }}>{this.state.article.synopsis}</p>
        </Jumbotron>
        {this.state.notes.length ? (
          <article className="mx-auto">{this.renderNotes()}</article>
        ) : (
          <div>
            <h1>No notes to display.</h1>
          </div>
        )}
        <p className="mt-2">Add a note below...</p>
        <div className="row mx-auto my-3">
          <div className="col-6 offset-3">
            <form>
              <TextArea
                value={this.state.comment}
                onChange={this.handleInputChange}
                name="comment"
                placeholder="Type comment here"
              />
              <FormBtn
                disabled={!this.state.comment}
                onClick={this.handleFormSubmit}
              >
                Add Comment
              </FormBtn>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleNotes;
