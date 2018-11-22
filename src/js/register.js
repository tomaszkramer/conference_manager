import React from 'react'
// import ReactDOM from 'react-dom'
//import './scss/main.scss
// import obrazka:
//import logo from './logo.svg' - w przypadku, dgy są to obrazki lokalne. W sassie tego nie stosukemy tylko przez style
//np background image


class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            participants:[
                {id:'', name: '', lastname:'', company: '', nip:'', street:'',
                streetNumber:'', postcode:'', city:'', email:'', tel:''},
            ],
            wronganswear: [],
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleFormValidation = (element) => {
        element.preventDefault();
        const myArr = [];

        if (this.state.participants.name === '') {

            myArr.push('Pole imię musi być uzupełnione')

        } else if (this.state.participants.lastname === '') {

            myArr.push('Pole nazwisko musi być uzupełnione')

        } else if (this.state.participants.company === ''){

            myArr.push('Pole firma musi być uzupełnione')

        } else if(this.state.participants.nip ===''){

            myArr.push('Pole NIP musi być uzupełnione')

        }else if(this.state.participants.street ===''){
            myArr.push('Pole ulica musi być wypełnione')

        }else if(this.state.participants.streetNumber === ''){

            myArr.push('Pole numer musi być wypełnione')

        }else if(this.state.participants.postcode === ''){

            myArr.push('Pole kod pocztowy musi być wypełnione')

        }else if (this.state.participants.city ===''){
            myArr.push('Pole miasto musi być wypełnione')

        } else if (this.state.participants.email === '' || this.state.participants.email.indexOf('@') === -1) {

            myArr.push('Pole e-mail musi być uzupełnione i zawierać znak @')

        } else if (this.state.participants.tel === '') {

            myArr.push('Pole departament musi być uzupełnione')

        } else {

            myArr.push('Formularz wypełniony poprawnie');
        //    sendData

        }

        this.setState({
            wronganswear: myArr,
        })

    };

    onSubmit=(el)=> {
        let participants = []
        if (el.id) {
            participants = this.state.participants.filter(e => {
                return e.id !== el.id
            })
        } else {
            participants.id = participants + 1
        }
    }

    render() {
        return (
            <div>
                <section>
                    <div className='poster__picture'></div>
                </section>
                <section className= 'section'>
                    <form className='form' onSubmit={this.handleFormValidation}>


                        <label htmlFor="name">Imię</label>
                        <input id='name' name='name' type="text" value={this.state.name}
                               onChange={this.handleChange}/><br/>

                        <label htmlFor="lastname">Nazwisko</label>
                        <input id='lastname' name='lastname' type="text" value={this.state.lastname}
                               onChange={this.handleChange}/><br/>

                        <label htmlFor="company">Firma</label>
                        <input id ='company' name='company' type="text" value={this.state.company}
                                onChange={this.handleChange}/><br/>

                        <label htmlFor="nip">NIP</label>
                        <input id= 'nip' name='nip' type="text" value={this.state.nip}
                                onChange={this.handleChange}/><br/>

                        <label htmlFor="street">Ulica</label>
                        <input id='street' name = 'street' type="text" value={this.state.street}
                                onChange={this.handleChange}/>

                        <label htmlFor="streetNumber">nr</label>
                        <input  className='street__nr' id='streetNumber'  name='streetNumber'  type="text" value={this.state.streetNumber}
                                onChange={this.handleChange}/><br/>

                        <label htmlFor="email">e-mail</label>
                        <input id='email' name='email' type="text" value={this.state.email}
                               onChange={this.handleChange}/><br/>

                        <label htmlFor="tel">telefon</label>

                        <input id='tel' name='tel' type="text" value={this.state.tel}
                               onChange={this.handleChange}/><br/>

                        <input type="submit" value='Wprowadź dane'/>
                        {this.state.wronganswear.map(element => {
                            return <p>{element}</p>
                        })}
                    </form>
                </section>
            </div>
        )
    }
}

export default RegisterForm;