import React from 'react'



class ShowPanels  extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            data: false,
        }
    }

    componentDidMount(){
        fetch(`http://localhost3000/conferences`)
            .then(resp=>{
                if(resp.ok)
                    return resp.json()
                else
                    throw new Error("Błąd sieci")
            })
            .then(data=>{
                this.setState({
                    data: data,
                })
            })
    }

    render(){
        return <div></div>
    }

}

export default ShowPanels