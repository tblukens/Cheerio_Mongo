import React from 'react';

function Jumbotron({ children }) {
  // const jumboStyle = {
  //     fontSize: 80
  // }
  return (
    <div className="jumbotron text-center">
      <div className="overlay" />
      <div className="background-image" />
      <div className="caption">{children}</div>
    </div>
  );
}

export default Jumbotron;
