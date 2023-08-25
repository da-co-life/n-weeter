import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
import "./styles.css";
import {BrowserRouter as Router} from 'react-router-dom'; 

ReactDOM.render(
  <React.StrictMode>
    <Router basename={process.env.PUBLIC_URL}>
      <App />
    </Router>
    
  </React.StrictMode>,
  document.getElementById("root")
);