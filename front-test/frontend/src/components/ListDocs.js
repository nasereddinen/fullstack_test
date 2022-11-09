import axios from 'axios';
import React from "react";
import { Card, Button,ListGroup } from 'react-bootstrap';
import { Link,Outlet} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

class Docs extends React.Component {
  state = {
    documents: []
  }

  componentDidMount() {
    this.fetchDocuments();
  }
    
  
   fetchDocuments = () => {
    axios.get(`http://127.0.0.1:8000/api/docs/`)
    .then(res => {
      const documents = res.data;
      this.setState({ documents });
    })
    }
  
render(){
  return (
    <main className="container">
        <h1 className="text-uppercase text-center my-4">List Documents</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
            
              <ListGroup>
                
    {
      this.state.documents
        .map(doc =>
          
            <ListGroup.Item key={doc.id}>
             <Link to={`/${doc.id}`}>{doc.title}</Link>
            </ListGroup.Item>
          
          
        )
        
    }
   
    </ListGroup>
       
    
       </div>
          </div>
        </div>
      </main>
  );
}
}

export default Docs;
