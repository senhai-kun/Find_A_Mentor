import React from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import Pages from './pages/index'

function App() {

  return (
    <React.Fragment>
      <Router>
        <Pages />
      </Router>
    </React.Fragment>
  );
}

export default App;
