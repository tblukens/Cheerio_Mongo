import React, { Component } from "react";
import { ClipLoader } from "react-spinners";
import API from "../utils/API";
import Jumbotron from "../components/Jumbotron";
import Nav from "../components/Nav";
import Article from "../components/Article";

class Articles extends Component {
  state = {
    articles: [],
    loading: true
  };

  componentDidMount() {
    this.loadArticles();
  }

  renderArticles = () => {
    return this.state.articles.map(article => (
      <Article
        _id={article._id}
        key={article._id}
        title={article.title}
        image={article.image}
        link={article.link}
        synopsis={article.synopsis}
        saveArticle={this.saveArticle}
      />
    ));
  };

  loadArticles = () => {
    API.getArticles()
      .then(res => {
        console.log(res.data);
        this.setState({ loading: false, articles: res.data });
      })
      .catch(err => console.log(err));
  };

  scrapeArticles = () => {
    this.setState({ loading: true });
    API.scrapeArticles()
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  clearArticles = () => {
    API.clearArticles()
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  saveArticle = id => {
    API.saveArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="text-center mx-auto">
        <Nav articles={this.state.articles.length} home={true} clearClick={this.clearArticles}>
          {" "}
          <button className="btn btn-warning" onClick={this.scrapeArticles}>
            SCRAPE NEW ARTICLES!
          </button>{" "}
        </Nav>
        <Jumbotron>
          <h1 style={{ fontSize: 80 }}>Mongo Scraper</h1>
          <p style={{ fontSize: 30 }}>PCGAMER Edition</p>
        </Jumbotron>
        {this.state.articles.length >= 0 && (
          <div className="row mx-auto">{this.renderArticles()}</div>
        )}
        {this.state.loading && (
          <div>
            <ClipLoader
              // css={override}
              sizeUnit={"px"}
              size={150}
              color={"#123abc"}
              loading={this.state.loading}
            />
          </div>
        )} 
        {!this.state.loading && !this.state.articles.length && (
          <div>
            <h1>No new articles to display.</h1>
            <button className="btn btn-danger" onClick={this.scrapeArticles}>
              Click to Scrape Articles
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Articles;
