import React, { Component } from 'react';
import API from '../utils/API';
import Jumbotron from '../components/Jumbotron';
import Nav from '../components/Nav';
import SavedArticle from '../components/SavedArticle';

class Saved extends Component {
  state = {
    savedArticles: []
  };

  componentDidMount() {
    this.loadSavedArticles();
  }

  renderSavedArticles = () => {
    return this.state.savedArticles.map(article => (
      <SavedArticle
        _id={article._id}
        key={article._id}
        title={article.title}
        image={article.image}
        link={article.link}
        synopsis={article.synopsis}
        clearSavedArticle={this.clearSavedArticle}
      />
    ));
  };

  loadSavedArticles = () => {
    API.showSavedArticles()
      .then(res => {
        console.log(res.data);
        this.setState({ savedArticles: res.data });
      })
      .catch(err => console.log(err));
  };

  clearSavedArticle = id => {
    API.unSaveArticle(id)
      .then(res => this.loadSavedArticles())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="text-center mx-auto">
        <Nav saved={true} />
        <Jumbotron>
          <h1 style={{ fontSize: 80 }}>Saved Articles</h1>
          <p style={{ fontSize: 30 }}>View saved articles and make notes.</p>
        </Jumbotron>
        {this.state.savedArticles.length ? (
          <div className="row mx-auto">{this.renderSavedArticles()}</div>
        ) : (
          <div>
            <h1>No saved articles to display.</h1>
            <button className="btn btn-danger" href="/">
              Go back to main page.
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Saved;
