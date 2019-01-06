import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Articles from './pages/Articles';
import Saved from './pages/Saved';
import ArticleNotes from './pages/ArticleNotes';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Articles} />
          <Route path="/saved/:id" component={ArticleNotes} />
          <Route exact path="/saved" component={Saved} />
          {/* <Route component={NoMatch} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
