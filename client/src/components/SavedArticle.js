import React from 'react';

import { Link } from 'react-router-dom';

const SavedArticle = props => {
  return (
    <div className="col mx-auto">
      <div className="card border" style={{ width: '18rem' }}>
        <img src={props.image} className="card-img-top" alt={props.title} />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.synopsis}</p>
          <Link to={'/saved/' + props._id}>
            <button className="btn btn-primary">View Notes</button>
          </Link>
          <button
            className="btn btn-primary"
            onClick={() => props.clearSavedArticle(props._id)}
          >
            Clear Save
          </button>
          <a href={props.link} className="btn btn-primary">
            View Article
          </a>
        </div>
      </div>
    </div>
  );
};

export default SavedArticle;
