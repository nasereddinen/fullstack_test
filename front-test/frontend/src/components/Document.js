import { TokenAnnotator} from "react-text-annotate";
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import React from "react";
import axios from 'axios';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
  }

const TAG_COLORS = {
    SKILLS: "#CD5C5C",
    EXPERIENCE: "BlueViolet",
    DIPLOMA:"green",
    DIPLOMA_MAJOR:'#A52A2A',

  };


class Document extends React.Component {
   
    state = {
        value: [
         
        ],
        tag: "SKILLS",
        Doc : '',
        DocName:''
      };


    componentDidMount() {
        let { id } = this.props.params;
        console.log(id)
        this.fetchDocument(id);
      }
        
      
       fetchDocument = (id) => {
       
        axios.get(`http://127.0.0.1:8000/api/docs/${id}/`)
        .then(res => {
          const documents = res.data;
          console.log(documents)
          this.setState({Doc: documents.text });
          this.setState({DocName: documents.title });
          
          
        })
        }
 

  handleChange = (value) => {
    this.setState({ value });
  };

  handleTagChange = (e) => {
    this.setState({ tag: e.target.value });
  };

  exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(this.state.value, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "document.json";

    link.click();
  };
render(){
    
  return (
    <div style={{ padding: 24, fontFamily: "IBM Plex Sans" }}>
        <h3 style={{ marginTop: 0 }}>Label Liste</h3>
       
        <p>I'm Sorry for the delay</p>
        <div style={{ display: "flex", marginBottom: 24 ,focus:'outline'}}>
          <Card style={{margin:'auto'}}>
            <h4>{this.state.DocName}</h4>
            <select size={4} style={{marginBottom:-60,appearance: "none",overflow:'hidden',backgroundcolor: "transparent",border: 0,padding:"10px", outline: 'none'}}  onChange={this.handleTagChange} value={this.state.tag}>
              <option style={{display:'inline-block',backgroundColor:'DarkRed',borderRadius:'4px',margin:"10px 10px 10px 10px", padding:"10px",color:'white'}}  value="SKILLS">Skills</option>
              <option style={{display:'inline-block',backgroundColor:'#8A2BE2',borderRadius:'4px',margin:"10px 10px 10px 10px", padding:"10px",color:'white'}} value="EXPERIENCE">Experience</option>
              <option style={{display:'inline-block',backgroundColor:'green',borderRadius:'4px',margin:"10px 10px 10px 10px", padding:"10px",color:'white'}} value="DIPLOMA">Diploma</option>
              <option style={{display:'inline-block',backgroundColor:'#A52A2A',borderRadius:'4px',margin:"10px 10px 10px 10px", padding:"10px",color:'white'}} value="DIPLOMA_MAJOR">Diploma_major</option>
            </select>
            <TokenAnnotator
              style={{
                maxWidth: 800,
                lineHeight: 1.9,
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize: '20px',
              }}
              tokens={this.state.Doc.split(" ")}
              value={this.state.value}
              onChange={this.handleChange}
              getSpan={(span) => ({
                ...span,
                tag: this.state.tag,
                color: TAG_COLORS[this.state.tag]
              })}
              renderMark={(props) => (
                <mark
                  key={props.key}
                  onClick={() =>
                    props.onClick({
                      start: props.start,
                      end: props.end,
                      text: props.text,
                      tag: props.tag,
                      color: props.color
                    })
                  }
                  style={{
                    padding: ".2em .3em",
                    margin: "0 .25em",
                    lineHeight: "1",
                    display: "inline-block",
                    borderRadius: ".25em",
                    background: props.color,
                    color:"white",
                    fontFamily: "Arial, Helvetica, sans-serif"
                 
                  }}
                >
                  {props.content}{" "}
                  <span
                    style={{
                      boxSizing: "border-box",
                      content: "attr(data-entity)",
                      fontSize: ".55em",
                      lineHeight: "1",
                      padding: ".35em .35em",
                      borderRadius: ".35em",
                      textTransform: "uppercase",
                      display: "inline-block",
                      verticalAlign: "middle",
                      margin: "0 0 .15rem .5rem",
                      background: "#fff",
                      fontWeight: "700",
                      color:"black"
                     
                    }}
                  >
                    {" "}
                    {props.tag}
                  </span>
                </mark>
              )}
            />
          </Card>
        </div>

        {}
        <Card>
         <Button onClick={this.exportData}>Export data</Button>
        </Card>
      </div>
    
  );
}
}


export default withParams(Document);