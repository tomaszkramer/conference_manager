import React from 'react'
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink
} from 'react-router-dom'



class ShowPanels  extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataConf: false,
            dataLec: false,
            dataPart: false
        }
    }



    componentDidMount() {
        fetch(`http://localhost:4000/conferences`)
            .then(resp => {
                if (resp.ok)
                    return resp.json()
                else
                    throw new Error("Błąd sieci")
            })
            .then(data => {
                this.setState({
                    dataConf: data,
                })
            })

        fetch(`http://localhost:4000/lecturers`)
            .then(resp=>{
                if (resp.ok)
                    return resp.json()
                else
                    throw new Error('Błąd sieci')
            })
            .then(data =>{
                this.setState({
                    dataLec: data,
                })
            })

        fetch(`http://localhost:4000/participants`)
            .then(resp=>{
                if(resp.ok)
                    return resp.json()
                else
                    throw new Error('Błąd sieci')
            })
            .then(data=>{
                this.setState({
                    dataPart: data,
                })
            })
    }

    render() {
        if (this.state.dataConf === false )
            return <h2>Ładowanie</h2>
        return <div>
                        {this.state.dataConf.map(item => {
                            return <Conferency conferency={item}
                                               lecturers ={this.state.dataLec}
                                               participants = {this.state.dataPart}/>
                        })}


        </div>

    }
}

class Conferency extends React.Component{
    render(){

        return (
                <div className='main__div'>
                    {this.props.conferency.panels.map(el=> {
                        const panelLecturer = this.props.lecturers ? this.props.lecturers.find((lecture) => lecture.id === el.lecturer_id) : {};
                        console.log(panelLecturer)
                        return <div className='d-flex justify-content-center position-relative custom__class'>
                            <div className='w-100 ml-5 mr-5  mt-4 shadow p-3 mb-5 bg-white rounded position-relative'>
                                <h1 key ={panelLecturer.id} className='component__title'>{el.subject}</h1>
                                <h2  key ={panelLecturer.id} className='lecturer'>{panelLecturer.title}{' '}{panelLecturer.name}{' '}{panelLecturer.lastname}</h2>
                                <h3 key = {panelLecturer.id}>{panelLecturer.company}</h3>
                                <p key={el.id}>{el.description}</p>
                                <div>
                                    <span>{el.participants}</span><span></span>
                                </div>
                                <div>
                                    <Link to={'/RegisterParticipants/'+el.id+"/"+ el.subject}>Zapisz się na panel</Link>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
        )
    }
}
export default ShowPanels