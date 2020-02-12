import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { createBrowserHistory as createHistory } from "history";

import AllOpenResturants from './components/resturants';

import FilterResturants from './components/filter-restaurant';


const history = createHistory();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        
        <Route path="/" exact component={AllOpenResturants} />

        <Route path="/filter-restaurant" component={FilterResturants} />
      
    </Router>
    </div>
  );
}

export default App;
