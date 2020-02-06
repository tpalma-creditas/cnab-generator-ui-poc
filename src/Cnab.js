import React, { Component } from 'react'
import axios from 'axios'
import qs from 'querystring'
    
class Cnab extends Component {
    state = {
        layoutName: "", 
        assignmentDate: ""
    }

    requestCnab = () => { 
        const postData = {
            formData:{
                ...this.state
            }
        }
        const url = "http://localhost:8080/cnab/"+this.state.layoutName 
        axios.post(url, postData)
            .then(response => {
                console.log(response)
            });
    }
    
    layoutNameChangedHandler = (event) => {
        this.setState(
            {
                layoutName:event.target.value
            }
        )
    }

    assignmentDateChangedHander = (event) => {
        this.setState(
            {
                assignmentDate: event.target.value
            }
        )
    }

    contractsFileChanged = (event) => {
        let files=event.target.files;
        console.log(this.state);
        console.log(files)

        let reader = new FileReader();
        reader.readAsText(files[0]);
        reader.onload = (readEvent) => {
            // console.log(readEvent.target.result)
            this.setState({contracts:readEvent.target.result})
        }
        
    }

    render(){
        return (
            <div height="10vh">
                Layout: <input type="text" value={this.state.layoutName} onChange={this.layoutNameChangedHandler}/><br></br>
                Data de cessão: <input type="text" value={this.state.assignmentDate} onChange={this.assignmentDateChangedHander}/><br></br>
                Contratos: <input type="file" name="contracts" onChange={this.contractsFileChanged}/><br></br>
                <input type="submit" value="Gerar CNAB" onClick={this.requestCnab}/>
            </div>
        )
    
    }
}

export default Cnab