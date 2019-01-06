import React from 'react';

const Article = props => {
  return (
    <div className="col mx-auto">
      <div className="card border" style={{ width: '18rem' }}>
        <img src={props.image} className="card-img-top" alt={props.title} />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.synopsis}</p>
          <button
            className="btn btn-primary"
            onClick={() => props.saveArticle(props._id)}
          >
            Save Article
          </button>
          <a href={props.link} className="btn btn-primary">
            View Article
          </a>
        </div>
      </div>
    </div>
  );
};

export default Article;
