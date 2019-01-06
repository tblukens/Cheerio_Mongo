import React from 'react';

const Note = props => {
  return (
    <div className="row mx-auto mb-4">
      <div className="col-6 offset-3 align-self-center p-2 border border-info mr-2">
        <p>{props.comment}</p>
      </div>
      <div>
        <button
          className="col btn btn-danger p-2"
          onClick={() => props.deleteNote(props._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Note;
