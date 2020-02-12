import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { createBrowserHistory as createHistory } from "history";

import AllOpenResturants from './components/resturants';


const history = createHistory();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        
        <Route path="/" exact component={AllOpenResturants} />
      
    </Router>
    </div>
  );
}

export default App;
