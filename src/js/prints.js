import React from 'react'
import * as jsPDF from 'jspdf'
import{
    HshRouter,
    Route,
    Link,
    Switch,
    NavLink
} from 'react-router-dom'
import ShowPanels from './panels';

export default class PrintDoc extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            name: "Jerzy",
            lastname:'Potocki',
            company: 'Pfizer'
        }
    }

    printDocument =()=>{
        const name = this.state.name
        const lastname = this.state.lastname
        const company = this.state.company

        const myDoc = new jsPDF()
        myDoc.text(name, 10, 10)
        myDoc.text(lastname, 10, 25)
        myDoc.text(company, 10, 50)
        myDoc.save('test.pdf', 10, 70)
    }


    render(){
        return(
            <div>
                <button className={'btn btn-primary'} onClick={this.printDocument}>DRUKUJ IDENTYFIKATOR</button>
            </div>
        )
    }
}

