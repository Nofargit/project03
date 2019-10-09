

import React from 'react';
import {Route ,BrowserRouter as Router, Link } from 'react-router-dom'
// import {Route ,Redirect,BrowserRouter as Router, Link ,Switch} from 'react-router-dom'
import SignUp from './SignUp';
import AdminPage from './AdminPage';
import LoginPage from './LoginPage'
import Main from './Main';
// import Vacations from './Vacations'

function App()
{
    return(
      <div>
        <h1>hello project 3</h1>
        <Router>
          <div>
            <Link to="SignUp">Sign up</Link>
            <Link to="LoginPage">Login</Link>
            <Link to="Main"></Link>
            {/* <Link to= "Vacations"></Link> */}
            
          </div>

          <hr/>
          <Route exact path='/SignUp' component={SignUp} /> <hr/>
          <Route exact path='/AdminPage' component={AdminPage} />
          <Route exact path='/LoginPage' component={LoginPage} />
          {/* <Route exact path='/Vacations' component={Vacations} /> */}
          <Route exact path='/Main' component={Main} />
          {/* <Redirect to='./Main' /> */}
        </Router>
      </div>
        
         
    )

}

export default App;