import React from 'react'
import Inquiry from './components/Inquiry'
import Answers from './components/Answers'
import Home from './components/Home'
import {Switch,Route} from 'react-router-dom';
import './App.css';

const App = () => {

  return (
    <div className="container">
      <h1><a href="/" style={{textDecoration:"none"}}>Asiakaspalautteet</a></h1>
      <nav>
        <a href="/inquiry">Uusi kysely</a> |
        <a href="/answers">Vastaukset</a> 
      </nav>
      <Switch>
          <Route path='/answers' component={Answers}/>
          <Route path='/inquiry' component={Inquiry}/>
          <Route exact path='/' component={Home}/>
      </Switch>
      
    </div>
  )
}

export default App;