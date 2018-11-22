import React from 'react'
import {
    HshRouter,
    Route,
    Link,
    Switch,
    NavLink
} from 'react-router-dom'
import ShowPanels from "./panels";

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
            myArr.push('Pole imię musi nie moze być puste')
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

    render(){
        return(
            <div className={'section__bgGround'}>
                <section></section>
                <section className={'custom__class'}>
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
                        <input className={'btn btn-primary'} type="submit" value='Wprowadź dane'/>
                        {this.state.isRegistered.map(el=>{
                            return <p>{el}</p>
                        })}

                    </form>
                    <div>
                        <Link className={'btn btn-primary'} to={'/prints/'}>Drukuj identyfikator</Link>
                    </div>
                </section>
            </div>
        )
    }

}
