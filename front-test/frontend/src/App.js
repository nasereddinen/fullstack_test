import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Docs from './components/ListDocs';
import Document from './components/Document';


  

class App extends React.Component {
  
render(){
  return (

    <div className="App">
   
    
      <div>
        <Router>
       
          <Routes>
          <Route exact path="/:id/" element={<Document/>}/>
            <Route exact path="/" element={<Docs/>} />
           
          </Routes>
        </Router>
      </div>
  </div>
      
  );
}
}

export default App;
