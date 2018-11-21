import React from 'react'



class ShowPanels  extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataConf: false,
            dataLec: false,
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
    }


    render() {
        if (this.state.dataConf === false )
            return <h2>Ładowanie</h2>
        return <div>
                        {this.state.dataConf.map(item => {
                            return <Conferency conferency={item} lecturers ={this.state.dataLec}/>
                        })}


        </div>

    }
}

class Conferency extends React.Component{
    render(){

        return (

                <div>
                    {this.props.conferency.panels.map(el=> {
                        const panelLecturer = this.props.lecturers ? this.props.lecturers.find((lecture) => lecture.id === el.lecturer_id) : null;
                        console.log(panelLecturer)
                        return <div>
                            <div>
                                <h1>{el.subject}</h1>
                                <h2>Prelegent: {panelLecturer.title}{' '}{panelLecturer.name}{' '}{panelLecturer.lastname}</h2>
                                <p></p>

                            </div>

                        </div>
                    })}
                </div>

        )
    }
}
export default ShowPanels