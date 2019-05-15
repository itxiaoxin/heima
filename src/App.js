import React from 'react';
import { HashRouter as Router, Route,Switch } from 'react-router-dom';
import Mylayout from './layouts/Mylayout';
import Home from './views/Home';
import Cart from './views/Cart';
import Mine from './views/Mine';

function App() {
  return (
    <Router>
      <Switch>
      <Route path='/' exact render={(props) => <Mylayout {...props}><Home></Home></Mylayout>}></Route>
      <Route path='/cart' render={(props)=><Mylayout {...props}><Cart></Cart></Mylayout>}></Route>
      <Route path='/mine' render={(props)=><Mylayout {...props}><Mine></Mine></Mylayout>}></Route>
      </Switch>
    </Router>
  );
}

export default App;
