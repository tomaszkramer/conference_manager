import React from 'react'
import {
    HshRouter,
    Route,
    Link,
    Switch,
    NavLink
} from 'react-router-dom'
import ShowPanels from "./panels";
import * as jsPDF from "jspdf";

export default class RegisterParticipants extends React.Component{
    constructor(props){
        super(props)
        this.state ={
                id: this.props.match.params.panelId,
                name: '',
                lastname:'',
                email: '',
                panelId: '',
                isRegistered:[],
                counter: ''
        }
    }

    handleChange = event =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit =(element)=> {
        element.preventDefault()
        const myArr = []
        if (this.state.name === '') {
            myArr.push('Pole imię nie może być puste')
        } else if (this.state.lastname === '') {
            myArr.push('Pole nazwisko nie może być puste')
        } else if (this.state.email === '') {
            myArr.push('Pole email nie może być puste')
        } else {
            myArr.push('Zarejestrowałeś się na panel')
        }
        this.setState({
            isRegistered: myArr,
            counter: this.state.counter +1

        })

        const myObj = {
            id: this.props.match.params.panelId,
            name: this.state.name,
            lastname: this.state.lastname,
            email: this.state.email,
        }

        fetch('http://localhost:4000/participants',  {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
            method: 'POST',
            body: JSON.stringify(myObj),

        })

    }

    printDocument =()=>{
        const text = this.state.name + '  '+this.state.lastname
        const panelInfo = this.props.match.params.panelSubject
        const imgData = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4QCARXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAAABIAAAAAQAAAEgAAAABAAOQAAAHAAAABDAyMTCgAAAHAAAABDAxMDCgAQADAAAAAf//AAAAAAAA/+ECkmh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiB4bWxuczpleGlmPSdodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyc+CiAgPGV4aWY6WFJlc29sdXRpb24+NzI8L2V4aWY6WFJlc29sdXRpb24+CiAgPGV4aWY6WVJlc29sdXRpb24+NzI8L2V4aWY6WVJlc29sdXRpb24+CiAgPGV4aWY6UmVzb2x1dGlvblVuaXQ+Q2FsPC9leGlmOlJlc29sdXRpb25Vbml0PgogIDxleGlmOkV4aWZWZXJzaW9uPkV4aWYgdyB3ZXJzamkgMi4xPC9leGlmOkV4aWZWZXJzaW9uPgogIDxleGlmOkZsYXNoUGl4VmVyc2lvbj5GbGFzaFBpeCB3IHdlcnNqaSAxLjA8L2V4aWY6Rmxhc2hQaXhWZXJzaW9uPgogIDxleGlmOkNvbG9yU3BhY2U+QsWCxIVkIHdld27EmXRyem55IChuaWV6bmFuYSB3YXJ0b8WbxIcgNjU1MzUpPC9leGlmOkNvbG9yU3BhY2U+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCjwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9J3InPz4K/9sAQwAOCgsMCwkODAsMEA8OERUjFxUTExUrHyEaIzMtNjUyLTEwOD9RRTg8TT0wMUZgR01UVltcWzdEY2pjWGpRWVtX/9sAQwEPEBAVEhUpFxcpVzoxOldX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'

        const myDoc = new jsPDF()
        myDoc.addFont('Lobster-Regular.ttf', 'Lobster-Regular', 'normal')
        myDoc.setFont('Lobster-Regular')
        myDoc.addImage(imgData,'PNG', 10,40, 100, 70)
        myDoc.setFontSize(30)
        myDoc.text(text, 25, 75)
        myDoc.setFontSize(15)
        myDoc.text(panelInfo, 25, 80)
        myDoc.save('test.pdf', 10, 10)
    }

    render(){
        return(
            <div className={'section__bgGround'}>
                <section></section>
                <section className={'custom__class height__100vh'}>
                    <div className={'regFormBackground'}></div>
                    <h1 className={'text-center'}>{this.props.match.params.panelSubject}</h1>
                    <form className={'form-group'} onSubmit={this.onSubmit}>
                        <h2></h2>
                        <label htmlFor="name">Imię</label><br/>
                        <input className={'form-control'} id='name' name = 'name' type="text" value={this.state.name}
                                onChange={this.handleChange}/><br/>
                        <label htmlFor="lastname">Nazwisko</label><br/>
                        <input className={'form-control'} id='lastname' name='lastname' type="text" value ={this.state.lastname}
                                onChange={this.handleChange}/><br/>
                        <label htmlFor="email">e-mail</label><br/>
                        <input className={'form-control'} id='email' name='email' type="email" value ={this.state.value}
                                onChange={this.handleChange}/><br/>
                        <input className={'btn btn-primary mr-3'} type="submit" value='Wprowadź dane'/>
                        <button className={'btn btn-primary ml-3'}
                        onClick={this.printDocument}>Drukuj identyfikator</button>
                        {this.state.isRegistered.map(el=>{
                            return <p className={'alert alert-primary'}>{el}</p>

                        })}
                    </form>
                </section>
            </div>
        )
    }

}
