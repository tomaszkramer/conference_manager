import React, { Component } from 'react';
// import logo from './logo.svg';
import ShowPanels from './js/panels.js'
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink
} from 'react-router-dom'
import RegisterParticipants from "./js/RegisterParticipant";
import PrintDoc from "./js/prints"


class App extends Component {
  render() {
    return (
       <HashRouter>
           <div>
                <Route  exact path='/' component={ShowPanels}/>
                <Route path='/RegisterParticipants/:panelId/:panelSubject' component={RegisterParticipants}/>
               <Route path='/prints/' component={PrintDoc}/>
           </div>
       </HashRouter>

    );
  }
}

export default App;
