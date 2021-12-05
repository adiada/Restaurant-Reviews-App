import React, { useState } from 'react';
import { Switch, Route, Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import AddReview from './components/addReview';
import Restaurant from './components/restaurants';
import RestaurantsList from './components/restaurantsList';
import Login from './components/login';

function App() {

  const [user,setUser] = useState(null);


  async function login(user = null){
    setUser(user);

  }

  async function logout(){
    setUser(null);
  }

  return(<>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/restaurants">
            Restaurant Reviews
          </a>

        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> */}
        
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to='/restaurants' className='nav-link' >
                  Restaurants
              </Link>
            </li>
            <li className="nav-item">
              { user ? (
                <a onClick={logout} className='nav-link' style={{cursor:"pointer"}} >
                  Logout {user.name}
                </a>
              ) : (
                 <Link to="/login" className="nav-link" >
                   Login
                 </Link>
              )  } 
              again
            </li>
          </ul>
        
      </nav>


      <div className="container mt-3" >
    
        <Switch>
          <Route exact path={['/','/restaurants']} component={RestaurantsList} />
          <Route path = '/restaurants/:id/review' 
                 render = { (props) => {return ( <AddReview {...props} user={user} />) } 
                 }
           />
          <Route path='/restaurants/:id'
                 render={ (props) => {return ( <Restaurant {...props} user={user} />) }
                } 
            />
          <Route exact path='/login'
                 render={ (props) => { return ( <Login {...props} login={login} />)}
                }
            />
        </Switch>
      
      </div>
      </div>  
  </>);
}

export default App;
