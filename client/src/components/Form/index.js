import React from 'react';

export function TextArea(props) {
  return (
    <div className="form-group">
      <textarea className="form-control" rows="5" {...props} />
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button
      {...props}
      style={{ float: 'right', marginBottom: 10 }}
      className="btn btn-success"
    >
      {props.children}
    </button>
  );
}
